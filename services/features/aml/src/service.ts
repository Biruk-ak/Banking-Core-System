import { AmlEngine, type AmlInput, type AmlDecision } from './engine';
import type { EventBus } from '../../../shared/infra/event-bus';
import type { CacheClient } from '../../../shared/infra/redis-cache';

export class AmlService {
  private engine = new AmlEngine();

  constructor(
    private readonly bus: EventBus,
    private readonly cache: CacheClient,
  ) {}

  async assess(input: AmlInput): Promise<AmlDecision> {
    const cacheKey = `bcs:aml:${input.customerId}:${input.amountMinor ?? 0}`;
    const cached = await this.cache.get<AmlDecision>(cacheKey);
    if (cached) return cached;

    const decision = this.engine.evaluate(input);
    await this.cache.set(cacheKey, decision, decision.ttlSeconds);
    await this.bus.publish('bcs.aml.decision', decision);
    return decision;
  }

  async bulkAssess(inputs: AmlInput[]): Promise<AmlDecision[]> {
    const out: AmlDecision[] = [];
    for (const input of inputs) out.push(await this.assess(input));
    return out;
  }

  history(customerId?: string) {
    return this.engine.getHistory(customerId);
  }
}
