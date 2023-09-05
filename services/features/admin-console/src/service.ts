import { AdminConsoleEngine, type AdminConsoleInput, type AdminConsoleDecision } from './engine';
import type { EventBus } from '../../../shared/infra/event-bus';
import type { CacheClient } from '../../../shared/infra/redis-cache';

export class AdminConsoleService {
  private engine = new AdminConsoleEngine();

  constructor(
    private readonly bus: EventBus,
    private readonly cache: CacheClient,
  ) {}

  async assess(input: AdminConsoleInput): Promise<AdminConsoleDecision> {
    const cacheKey = `bcs:admin-console:${input.customerId}:${input.amountMinor ?? 0}`;
    const cached = await this.cache.get<AdminConsoleDecision>(cacheKey);
    if (cached) return cached;

    const decision = this.engine.evaluate(input);
    await this.cache.set(cacheKey, decision, decision.ttlSeconds);
    await this.bus.publish('bcs.admin-console.decision', decision);
    return decision;
  }

  async bulkAssess(inputs: AdminConsoleInput[]): Promise<AdminConsoleDecision[]> {
    const out: AdminConsoleDecision[] = [];
    for (const input of inputs) out.push(await this.assess(input));
    return out;
  }

  history(customerId?: string) {
    return this.engine.getHistory(customerId);
  }
}
