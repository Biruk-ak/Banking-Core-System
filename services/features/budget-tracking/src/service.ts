import { BudgetTrackingEngine, type BudgetTrackingInput, type BudgetTrackingDecision } from './engine';
import type { EventBus } from '../../../shared/infra/event-bus';
import type { CacheClient } from '../../../shared/infra/redis-cache';

export class BudgetTrackingService {
  private engine = new BudgetTrackingEngine();

  constructor(
    private readonly bus: EventBus,
    private readonly cache: CacheClient,
  ) {}

  async assess(input: BudgetTrackingInput): Promise<BudgetTrackingDecision> {
    const cacheKey = `bcs:budget-tracking:${input.customerId}:${input.amountMinor ?? 0}`;
    const cached = await this.cache.get<BudgetTrackingDecision>(cacheKey);
    if (cached) return cached;

    const decision = this.engine.evaluate(input);
    await this.cache.set(cacheKey, decision, decision.ttlSeconds);
    await this.bus.publish('bcs.budget-tracking.decision', decision);
    return decision;
  }

  async bulkAssess(inputs: BudgetTrackingInput[]): Promise<BudgetTrackingDecision[]> {
    const out: BudgetTrackingDecision[] = [];
    for (const input of inputs) out.push(await this.assess(input));
    return out;
  }

  history(customerId?: string) {
    return this.engine.getHistory(customerId);
  }
}
