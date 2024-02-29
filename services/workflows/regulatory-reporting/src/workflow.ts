/** RegulatoryReporting workflow — Banking Core System */
export type RegulatoryReportingStage =
  | 'initiated'
  | 'validated'
  | 'compliance_check'
  | 'risk_assessment'
  | 'approval_pending'
  | 'approved'
  | 'executing'
  | 'settled'
  | 'rejected'
  | 'cancelled';

export interface RegulatoryReportingContext {
  workflowId: string;
  customerId: string;
  stage: RegulatoryReportingStage;
  amountMinor?: number;
  currency?: string;
  assignee?: string;
  notes: string[];
  checklist: Record<string, boolean>;
  createdAt: string;
  updatedAt: string;
  metadata: Record<string, unknown>;
}

const TRANSITIONS: Record<RegulatoryReportingStage, RegulatoryReportingStage[]> = {
  initiated: ['validated', 'cancelled'],
  validated: ['compliance_check', 'rejected', 'cancelled'],
  compliance_check: ['risk_assessment', 'rejected'],
  risk_assessment: ['approval_pending', 'rejected'],
  approval_pending: ['approved', 'rejected'],
  approved: ['executing', 'cancelled'],
  executing: ['settled', 'rejected'],
  settled: [],
  rejected: [],
  cancelled: [],
};

export class RegulatoryReportingWorkflow {
  private ctx: RegulatoryReportingContext;

  constructor(customerId: string, metadata: Record<string, unknown> = {}) {
    const now = new Date().toISOString();
    this.ctx = {
      workflowId: crypto.randomUUID(),
      customerId,
      stage: 'initiated',
      notes: [],
      checklist: {
        identityVerified: false,
        documentsComplete: false,
        sanctionsCleared: false,
        riskAccepted: false,
        fundingConfirmed: false,
      },
      createdAt: now,
      updatedAt: now,
      metadata,
    };
  }

  get context(): RegulatoryReportingContext { return { ...this.ctx, notes: [...this.ctx.notes], checklist: { ...this.ctx.checklist } }; }

  setAmount(amountMinor: number, currency: string): void {
    this.ctx.amountMinor = amountMinor;
    this.ctx.currency = currency;
    this.touch();
  }

  check(item: keyof RegulatoryReportingContext['checklist'], value = true): void {
    this.ctx.checklist[item] = value;
    this.touch();
  }

  note(text: string): void {
    this.ctx.notes.push(`[${new Date().toISOString()}] ${text}`);
    this.touch();
  }

  assign(userId: string): void {
    this.ctx.assignee = userId;
    this.touch();
  }

  transition(to: RegulatoryReportingStage): void {
    const allowed = TRANSITIONS[this.ctx.stage];
    if (!allowed.includes(to)) {
      throw new Error(`Invalid regulatory-reporting transition ${this.ctx.stage} -> ${to}`);
    }
    if (to === 'compliance_check' && !this.ctx.checklist.identityVerified) {
      throw new Error('Identity must be verified before compliance');
    }
    if (to === 'approved' && !this.ctx.checklist.riskAccepted) {
      throw new Error('Risk must be accepted before approval');
    }
    this.ctx.stage = to;
    this.note(`Transitioned to ${to}`);
    this.touch();
  }

  isTerminal(): boolean {
    return ['settled', 'rejected', 'cancelled'].includes(this.ctx.stage);
  }

  completionRatio(): number {
    const values = Object.values(this.ctx.checklist);
    return values.filter(Boolean).length / values.length;
  }

  private touch(): void {
    this.ctx.updatedAt = new Date().toISOString();
  }
}

export class RegulatoryReportingWorkflowService {
  private store = new Map<string, RegulatoryReportingWorkflow>();

  start(customerId: string, metadata?: Record<string, unknown>): RegulatoryReportingWorkflow {
    const wf = new RegulatoryReportingWorkflow(customerId, metadata);
    this.store.set(wf.context.workflowId, wf);
    return wf;
  }

  get(id: string): RegulatoryReportingWorkflow | undefined {
    return this.store.get(id);
  }

  listByCustomer(customerId: string): RegulatoryReportingContext[] {
    return [...this.store.values()].map((w) => w.context).filter((c) => c.customerId === customerId);
  }

  advanceToSettlement(id: string): RegulatoryReportingContext {
    const wf = this.store.get(id);
    if (!wf) throw new Error('Workflow not found');
    const path: RegulatoryReportingStage[] = ['validated', 'compliance_check', 'risk_assessment', 'approval_pending', 'approved', 'executing', 'settled'];
    wf.check('identityVerified');
    wf.check('documentsComplete');
    wf.check('sanctionsCleared');
    wf.check('riskAccepted');
    wf.check('fundingConfirmed');
    for (const stage of path) {
      if (!wf.isTerminal() && wf.context.stage !== stage) {
        try { wf.transition(stage); } catch { /* skip if already past */ }
      }
    }
    return wf.context;
  }
}
