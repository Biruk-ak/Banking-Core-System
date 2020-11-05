/** Saga orchestration — Banking Core System */
export type SagaStepStatus = 'pending' | 'completed' | 'compensated' | 'failed';

export interface SagaStep {
  name: string;
  status: SagaStepStatus;
  execute: () => Promise<void>;
  compensate: () => Promise<void>;
}

export type SagaState = 'running' | 'completed' | 'compensating' | 'failed';

export class SagaOrchestrator {
  private steps: SagaStep[] = [];
  private state: SagaState = 'running';
  private readonly id: string;
  private readonly sagaType: string;
  private error?: string;

  constructor(sagaType: string, id = crypto.randomUUID()) {
    this.sagaType = sagaType;
    this.id = id;
  }

  addStep(step: Omit<SagaStep, 'status'>): this {
    this.steps.push({ ...step, status: 'pending' });
    return this;
  }

  async run(): Promise<{ id: string; state: SagaState; error?: string }> {
    this.state = 'running';
    const completed: SagaStep[] = [];
    try {
      for (const step of this.steps) {
        await step.execute();
        step.status = 'completed';
        completed.push(step);
      }
      this.state = 'completed';
    } catch (e) {
      this.error = e instanceof Error ? e.message : String(e);
      this.state = 'compensating';
      for (const step of [...completed].reverse()) {
        try {
          await step.compensate();
          step.status = 'compensated';
        } catch {
          step.status = 'failed';
        }
      }
      this.state = 'failed';
    }
    return { id: this.id, state: this.state, error: this.error };
  }

  snapshot() {
    return {
      id: this.id,
      sagaType: this.sagaType,
      state: this.state,
      error: this.error,
      steps: this.steps.map((s) => ({ name: s.name, status: s.status })),
    };
  }
}

/** Payment transfer saga example */
export function createPaymentTransferSaga(deps: {
  debit: () => Promise<void>;
  credit: () => Promise<void>;
  reverseDebit: () => Promise<void>;
  reverseCredit: () => Promise<void>;
  notify: () => Promise<void>;
  reverseNotify: () => Promise<void>;
}): SagaOrchestrator {
  return new SagaOrchestrator('PaymentTransfer')
    .addStep({ name: 'debit-source', execute: deps.debit, compensate: deps.reverseDebit })
    .addStep({ name: 'credit-destination', execute: deps.credit, compensate: deps.reverseCredit })
    .addStep({ name: 'notify-parties', execute: deps.notify, compensate: deps.reverseNotify });
}
