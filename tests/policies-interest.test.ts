import { SavingsPolicyEngine } from '../services/savings/src/domain/policies';
import { SavingsInterestCalculator } from '../services/savings/src/domain/interest';

describe('Policies and interest', () => {
  test('open policy blocks sanctioned', () => {
    const engine = new SavingsPolicyEngine();
    const d = engine.evaluateOpen(3, 'US', true);
    expect(d.allowed).toBe(false);
  });

  test('interest accrual', () => {
    const calc = new SavingsInterestCalculator({
      annualRateBps: 500,
      compounding: 'daily',
      dayCount: 'ACT/365',
      minimumBalanceMinor: 0,
    });
    expect(calc.accrue(100_000_00, 30)).toBeGreaterThan(0);
    expect(calc.project(100_000_00, 3)).toHaveLength(3);
  });

  test('apr to apy', () => {
    const calc = new SavingsInterestCalculator({
      annualRateBps: 500,
      compounding: 'monthly',
      dayCount: 'ACT/365',
      minimumBalanceMinor: 0,
    });
    expect(calc.aprToApy(500, 12)).toBeGreaterThan(500);
  });
});
