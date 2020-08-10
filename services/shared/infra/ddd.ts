/** DDD building blocks re-exported for services */
export type { DomainEvent } from '../../../packages/domain-core/src/entity';
export { Entity, AggregateRoot, createEvent } from '../../../packages/domain-core/src/entity';
export { Money } from '../../../packages/domain-core/src/money';
export type { CurrencyCode } from '../../../packages/domain-core/src/money';
export { ok, err, Ok, Err } from '../../../packages/domain-core/src/result';
export type { Result } from '../../../packages/domain-core/src/result';

export abstract class ValueObject<T extends Record<string, unknown>> {
  constructor(protected readonly props: T) { Object.freeze(this.props); }
  equals(other: ValueObject<T>): boolean {
    return JSON.stringify(this.props) === JSON.stringify(other.props);
  }
}

export class Specification<T> {
  constructor(private readonly pred: (candidate: T) => boolean, private readonly message = 'Specification not satisfied') {}
  isSatisfiedBy(candidate: T): boolean { return this.pred(candidate); }
  assert(candidate: T): void {
    if (!this.isSatisfiedBy(candidate)) throw new Error(this.message);
  }
  and(other: Specification<T>): Specification<T> {
    return new Specification((c) => this.isSatisfiedBy(c) && other.isSatisfiedBy(c), this.message + ' AND ' + other.message);
  }
  or(other: Specification<T>): Specification<T> {
    return new Specification((c) => this.isSatisfiedBy(c) || other.isSatisfiedBy(c), this.message + ' OR ' + other.message);
  }
}
