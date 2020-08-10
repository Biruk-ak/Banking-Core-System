export interface EventBus {
  publish(topic: string, payload: unknown): Promise<void>;
  subscribe(topic: string, handler: (payload: unknown) => Promise<void>): void;
}

export class InMemoryEventBus implements EventBus {
  private handlers = new Map<string, Array<(payload: unknown) => Promise<void>>>();
  private log: { topic: string; payload: unknown; at: string }[] = [];

  async publish(topic: string, payload: unknown): Promise<void> {
    this.log.push({ topic, payload, at: new Date().toISOString() });
    const hs = this.handlers.get(topic) ?? [];
    for (const h of hs) await h(payload);
    const wild = this.handlers.get('*') ?? [];
    for (const h of wild) await h({ topic, payload });
  }

  subscribe(topic: string, handler: (payload: unknown) => Promise<void>): void {
    const list = this.handlers.get(topic) ?? [];
    list.push(handler);
    this.handlers.set(topic, list);
  }

  getLog() { return [...this.log]; }
}
