import { Money } from '../packages/domain-core/src/money';

describe('Money value object', () => {
  test('creates from major units', () => {
    const m = Money.of(10.5, 'USD');
    expect(m.toMajorUnits()).toBe(10.5);
    expect(Number(m.amountMinor)).toBe(1050);
  });

  test('adds same currency', () => {
    const a = Money.of(5, 'USD');
    const b = Money.of(2.25, 'USD');
    expect(a.add(b).toMajorUnits()).toBe(7.25);
  });

  test('rejects currency mismatch on add', () => {
    expect(() => Money.of(1, 'USD').add(Money.of(1, 'EUR'))).toThrow(/Currency mismatch/);
  });

  test('subtract and compare', () => {
    const a = Money.of(10, 'ETB');
    const b = Money.of(3, 'ETB');
    expect(a.subtract(b).toMajorUnits()).toBe(7);
    expect(a.greaterThan(b)).toBe(true);
    expect(b.lessThan(a)).toBe(true);
  });

  test('multiply and zero', () => {
    expect(Money.of(10, 'USD').multiply(1.5).toMajorUnits()).toBe(15);
    expect(Money.zero('USD').isZero()).toBe(true);
  });

  test('format produces currency string', () => {
    const formatted = Money.of(12, 'USD').format('en-US');
    expect(formatted).toContain('12');
  });
});
