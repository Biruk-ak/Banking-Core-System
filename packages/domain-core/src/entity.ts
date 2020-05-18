export abstract class Entity<TId extends string = string> {
  protected constructor(public readonly id: TId) {}
  equals(other: Entity<TId>): boolean { return this.id === other.id; }
}
export abstract class AggregateRoot<TId extends string = string> extends Entity<TId> {
  private _domainEvents: DomainEvent[] = [];
  protected addDomainEvent(event: DomainEvent): void { this._domainEvents.push(event); }
  pullDomainEvents(): DomainEvent[] {
    const events = [...this._domainEvents];
    this._domainEvents = [];
    return events;
  }
}
export interface DomainEvent {
  readonly eventId: string;
  readonly aggregateId: string;
  readonly eventType: string;
  readonly occurredAt: Date;
  readonly payload: Record<string, unknown>;
}
export function createEvent(
  aggregateId: string,
  eventType: string,
  payload: Record<string, unknown>,
): DomainEvent {
  return {
    eventId: crypto.randomUUID(),
    aggregateId,
    eventType,
    occurredAt: new Date(),
    payload,
  };
}
