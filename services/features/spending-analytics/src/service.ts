import { SpendingAnalyticsEngine, type SpendingAnalyticsInput, type SpendingAnalyticsDecision } from './engine';
import type { EventBus } from '../../../shared/infra/event-bus';
import type { CacheClient } from '../../../shared/infra/redis-cache';

export class SpendingAnalyticsService {
  private engine = new SpendingAnalyticsEngine();

  constructor(
    private readonly bus: EventBus,
    private readonly cache: CacheClient,
  ) {}

  async assess(input: SpendingAnalyticsInput): Promise<SpendingAnalyticsDecision> {
    const cacheKey = `bcs:spending-analytics:${input.customerId}:${input.amountMinor ?? 0}`;
    const cached = await this.cache.get<SpendingAnalyticsDecision>(cacheKey);
    if (cached) return cached;

    const decision = this.engine.evaluate(input);
    await this.cache.set(cacheKey, decision, decision.ttlSeconds);
    await this.bus.publish('bcs.spending-analytics.decision', decision);
    return decision;
  }

  async bulkAssess(inputs: SpendingAnalyticsInput[]): Promise<SpendingAnalyticsDecision[]> {
    const out: SpendingAnalyticsDecision[] = [];
    for (const input of inputs) out.push(await this.assess(input));
    return out;
  }

  history(customerId?: string) {
    return this.engine.getHistory(customerId);
  }
}
