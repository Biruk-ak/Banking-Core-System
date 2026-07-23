/** AiAssistant feature engine — Banking Core System */
export interface AiAssistantInput {
  customerId: string;
  amountMinor?: number;
  currency?: string;
  channel?: 'mobile' | 'web' | 'atm' | 'branch' | 'api';
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  deviceId?: string;
  country?: string;
}

export interface AiAssistantSignal {
  code: string;
  severity: 'info' | 'low' | 'medium' | 'high' | 'critical';
  message: string;
  score: number;
}

export interface AiAssistantDecision {
  decisionId: string;
  feature: 'ai-assistant';
  customerId: string;
  outcome: 'allow' | 'review' | 'deny' | 'challenge';
  score: number;
  signals: AiAssistantSignal[];
  reasons: string[];
  decidedAt: string;
  ttlSeconds: number;
}

export class AiAssistantEngine {
  private history: AiAssistantDecision[] = [];
  private rules: Array<(input: AiAssistantInput) => AiAssistantSignal | null> = [];

  constructor() {
    this.registerDefaultRules();
  }

  registerRule(rule: (input: AiAssistantInput) => AiAssistantSignal | null): void {
    this.rules.push(rule);
  }

  evaluate(input: AiAssistantInput): AiAssistantDecision {
    const signals: AiAssistantSignal[] = [];
    for (const rule of this.rules) {
      const s = rule(input);
      if (s) signals.push(s);
    }
    const score = Math.min(100, signals.reduce((a, s) => a + s.score, 0));
    let outcome: AiAssistantDecision['outcome'] = 'allow';
    if (score >= 80) outcome = 'deny';
    else if (score >= 60) outcome = 'review';
    else if (score >= 40) outcome = 'challenge';
    const decision: AiAssistantDecision = {
      decisionId: crypto.randomUUID(),
      feature: 'ai-assistant',
      customerId: input.customerId,
      outcome,
      score,
      signals,
      reasons: signals.map((s) => s.message),
      decidedAt: new Date().toISOString(),
      ttlSeconds: 300,
    };
    this.history.push(decision);
    return decision;
  }

  getHistory(customerId?: string): AiAssistantDecision[] {
    return customerId ? this.history.filter((h) => h.customerId === customerId) : [...this.history];
  }

  private registerDefaultRules(): void {
    this.registerRule((input) => {
      if ((input.amountMinor ?? 0) > 50_000_00) {
        return { code: 'ai-assistant.large_amount', severity: 'high', message: 'Large amount detected', score: 25 };
      }
      return null;
    });
    this.registerRule((input) => {
      if (input.country && ['KP', 'IR', 'SY', 'CU'].includes(input.country)) {
        return { code: 'ai-assistant.sanctioned_geo', severity: 'critical', message: 'Sanctioned geography', score: 80 };
      }
      return null;
    });
    this.registerRule((input) => {
      if (input.channel === 'api' && !input.deviceId) {
        return { code: 'ai-assistant.missing_device', severity: 'medium', message: 'API channel without device binding', score: 15 };
      }
      return null;
    });
    this.registerRule((input) => {
      const hour = new Date().getUTCHours();
      if (hour >= 1 && hour <= 4 && (input.amountMinor ?? 0) > 10_000_00) {
        return { code: 'ai-assistant.odd_hours', severity: 'medium', message: 'Unusual hour activity', score: 20 };
      }
      return null;
    });
  }
}
