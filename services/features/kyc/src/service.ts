import { KycEngine, type KycInput, type KycDecision } from './engine';
import type { EventBus } from '../../../shared/infra/event-bus';
import type { CacheClient } from '../../../shared/infra/redis-cache';

export class KycService {
  private engine = new KycEngine();

  constructor(
    private readonly bus: EventBus,
    private readonly cache: CacheClient,
  ) {}

  async assess(input: KycInput): Promise<KycDecision> {
    const cacheKey = `bcs:kyc:${input.customerId}:${input.amountMinor ?? 0}`;
    const cached = await this.cache.get<KycDecision>(cacheKey);
    if (cached) return cached;

    const decision = this.engine.evaluate(input);
    await this.cache.set(cacheKey, decision, decision.ttlSeconds);
    await this.bus.publish('bcs.kyc.decision', decision);
    return decision;
  }

  async bulkAssess(inputs: KycInput[]): Promise<KycDecision[]> {
    const out: KycDecision[] = [];
    for (const input of inputs) out.push(await this.assess(input));
    return out;
  }

  history(customerId?: string) {
    return this.engine.getHistory(customerId);
  }
}
