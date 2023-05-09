import { BillPaymentsEngine, type BillPaymentsInput, type BillPaymentsDecision } from './engine';
import type { EventBus } from '../../../shared/infra/event-bus';
import type { CacheClient } from '../../../shared/infra/redis-cache';

export class BillPaymentsService {
  private engine = new BillPaymentsEngine();

  constructor(
    private readonly bus: EventBus,
    private readonly cache: CacheClient,
  ) {}

  async assess(input: BillPaymentsInput): Promise<BillPaymentsDecision> {
    const cacheKey = `bcs:bill-payments:${input.customerId}:${input.amountMinor ?? 0}`;
    const cached = await this.cache.get<BillPaymentsDecision>(cacheKey);
    if (cached) return cached;

    const decision = this.engine.evaluate(input);
    await this.cache.set(cacheKey, decision, decision.ttlSeconds);
    await this.bus.publish('bcs.bill-payments.decision', decision);
    return decision;
  }

  async bulkAssess(inputs: BillPaymentsInput[]): Promise<BillPaymentsDecision[]> {
    const out: BillPaymentsDecision[] = [];
    for (const input of inputs) out.push(await this.assess(input));
    return out;
  }

  history(customerId?: string) {
    return this.engine.getHistory(customerId);
  }
}
