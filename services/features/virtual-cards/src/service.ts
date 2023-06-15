import { VirtualCardsEngine, type VirtualCardsInput, type VirtualCardsDecision } from './engine';
import type { EventBus } from '../../../shared/infra/event-bus';
import type { CacheClient } from '../../../shared/infra/redis-cache';

export class VirtualCardsService {
  private engine = new VirtualCardsEngine();

  constructor(
    private readonly bus: EventBus,
    private readonly cache: CacheClient,
  ) {}

  async assess(input: VirtualCardsInput): Promise<VirtualCardsDecision> {
    const cacheKey = `bcs:virtual-cards:${input.customerId}:${input.amountMinor ?? 0}`;
    const cached = await this.cache.get<VirtualCardsDecision>(cacheKey);
    if (cached) return cached;

    const decision = this.engine.evaluate(input);
    await this.cache.set(cacheKey, decision, decision.ttlSeconds);
    await this.bus.publish('bcs.virtual-cards.decision', decision);
    return decision;
  }

  async bulkAssess(inputs: VirtualCardsInput[]): Promise<VirtualCardsDecision[]> {
    const out: VirtualCardsDecision[] = [];
    for (const input of inputs) out.push(await this.assess(input));
    return out;
  }

  history(customerId?: string) {
    return this.engine.getHistory(customerId);
  }
}
