/** SpendingAnalytics feature engine — Banking Core System */
export interface SpendingAnalyticsInput {
  customerId: string;
  amountMinor?: number;
  currency?: string;
  channel?: 'mobile' | 'web' | 'atm' | 'branch' | 'api';
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  deviceId?: string;
  country?: string;
}

export interface SpendingAnalyticsSignal {
  code: string;
  severity: 'info' | 'low' | 'medium' | 'high' | 'critical';
  message: string;
  score: number;
}

export interface SpendingAnalyticsDecision {
  decisionId: string;
  feature: 'spending-analytics';
  customerId: string;
  outcome: 'allow' | 'review' | 'deny' | 'challenge';
  score: number;
  signals: SpendingAnalyticsSignal[];
  reasons: string[];
  decidedAt: string;
  ttlSeconds: number;
}

export class SpendingAnalyticsEngine {
  private history: SpendingAnalyticsDecision[] = [];
  private rules: Array<(input: SpendingAnalyticsInput) => SpendingAnalyticsSignal | null> = [];

  constructor() {
    this.registerDefaultRules();
  }

  registerRule(rule: (input: SpendingAnalyticsInput) => SpendingAnalyticsSignal | null): void {
    this.rules.push(rule);
  }

  evaluate(input: SpendingAnalyticsInput): SpendingAnalyticsDecision {
    const signals: SpendingAnalyticsSignal[] = [];
    for (const rule of this.rules) {
      const s = rule(input);
      if (s) signals.push(s);
    }
    const score = Math.min(100, signals.reduce((a, s) => a + s.score, 0));
    let outcome: SpendingAnalyticsDecision['outcome'] = 'allow';
    if (score >= 80) outcome = 'deny';
    else if (score >= 60) outcome = 'review';
    else if (score >= 40) outcome = 'challenge';
    const decision: SpendingAnalyticsDecision = {
      decisionId: crypto.randomUUID(),
      feature: 'spending-analytics',
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

  getHistory(customerId?: string): SpendingAnalyticsDecision[] {
    return customerId ? this.history.filter((h) => h.customerId === customerId) : [...this.history];
  }

  private registerDefaultRules(): void {
    this.registerRule((input) => {
      if ((input.amountMinor ?? 0) > 50_000_00) {
        return { code: 'spending-analytics.large_amount', severity: 'high', message: 'Large amount detected', score: 25 };
      }
      return null;
    });
    this.registerRule((input) => {
      if (input.country && ['KP', 'IR', 'SY', 'CU'].includes(input.country)) {
        return { code: 'spending-analytics.sanctioned_geo', severity: 'critical', message: 'Sanctioned geography', score: 80 };
      }
      return null;
    });
    this.registerRule((input) => {
      if (input.channel === 'api' && !input.deviceId) {
        return { code: 'spending-analytics.missing_device', severity: 'medium', message: 'API channel without device binding', score: 15 };
      }
      return null;
    });
    this.registerRule((input) => {
      const hour = new Date().getUTCHours();
      if (hour >= 1 && hour <= 4 && (input.amountMinor ?? 0) > 10_000_00) {
        return { code: 'spending-analytics.odd_hours', severity: 'medium', message: 'Unusual hour activity', score: 20 };
      }
      return null;
    });
  }
}
