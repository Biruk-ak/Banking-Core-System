import { Specification, ValueObject } from '../services/shared/infra/ddd';

class Pair extends ValueObject<{ a: number; b: number }> {
  sum() { return this.props.a + this.props.b; }
}

describe('DDD helpers', () => {
  test('value object equality', () => {
    expect(new Pair({ a: 1, b: 2 }).equals(new Pair({ a: 1, b: 2 }))).toBe(true);
    expect(new Pair({ a: 1, b: 2 }).sum()).toBe(3);
  });
  test('specification and/or', () => {
    const positive = new Specification<number>((n) => n > 0, 'positive');
    const even = new Specification<number>((n) => n % 2 === 0, 'even');
    expect(positive.and(even).isSatisfiedBy(4)).toBe(true);
    expect(positive.or(even).isSatisfiedBy(-2)).toBe(true);
    expect(() => positive.assert(-1)).toThrow(/positive/);
  });
});
