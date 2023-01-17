import { AiAssistantEngine, type AiAssistantInput, type AiAssistantDecision } from './engine';
import type { EventBus } from '../../../shared/infra/event-bus';
import type { CacheClient } from '../../../shared/infra/redis-cache';

export class AiAssistantService {
  private engine = new AiAssistantEngine();

  constructor(
    private readonly bus: EventBus,
    private readonly cache: CacheClient,
  ) {}

  async assess(input: AiAssistantInput): Promise<AiAssistantDecision> {
    const cacheKey = `bcs:ai-assistant:${input.customerId}:${input.amountMinor ?? 0}`;
    const cached = await this.cache.get<AiAssistantDecision>(cacheKey);
    if (cached) return cached;

    const decision = this.engine.evaluate(input);
    await this.cache.set(cacheKey, decision, decision.ttlSeconds);
    await this.bus.publish('bcs.ai-assistant.decision', decision);
    return decision;
  }

  async bulkAssess(inputs: AiAssistantInput[]): Promise<AiAssistantDecision[]> {
    const out: AiAssistantDecision[] = [];
    for (const input of inputs) out.push(await this.assess(input));
    return out;
  }

  history(customerId?: string) {
    return this.engine.getHistory(customerId);
  }
}
