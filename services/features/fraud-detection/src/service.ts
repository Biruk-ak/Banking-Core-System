import { FraudDetectionEngine, type FraudDetectionInput, type FraudDetectionDecision } from './engine';
import type { EventBus } from '../../../shared/infra/event-bus';
import type { CacheClient } from '../../../shared/infra/redis-cache';

export class FraudDetectionService {
  private engine = new FraudDetectionEngine();

  constructor(
    private readonly bus: EventBus,
    private readonly cache: CacheClient,
  ) {}

  async assess(input: FraudDetectionInput): Promise<FraudDetectionDecision> {
    const cacheKey = `bcs:fraud-detection:${input.customerId}:${input.amountMinor ?? 0}`;
    const cached = await this.cache.get<FraudDetectionDecision>(cacheKey);
    if (cached) return cached;

    const decision = this.engine.evaluate(input);
    await this.cache.set(cacheKey, decision, decision.ttlSeconds);
    await this.bus.publish('bcs.fraud-detection.decision', decision);
    return decision;
  }

  async bulkAssess(inputs: FraudDetectionInput[]): Promise<FraudDetectionDecision[]> {
    const out: FraudDetectionDecision[] = [];
    for (const input of inputs) out.push(await this.assess(input));
    return out;
  }

  history(customerId?: string) {
    return this.engine.getHistory(customerId);
  }
}
