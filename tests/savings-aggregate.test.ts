import { SavingsAggregate } from '../services/savings/src/domain/aggregate';
import { Money } from '../packages/domain-core/src/money';

const fees = { monthlyMaintenanceMinor: 100, transactionFeeMinor: 10, overdraftFeeMinor: 500, earlyClosurePenaltyBps: 10, fxMarkupBps: 20 };
const limits = { dailyDebitMinor: 1_000_000_00, dailyCreditMinor: 2_000_000_00, singleTxnMinor: 500_000_00, monthlyVolumeMinor: 10_000_000_00, openPositionsMax: 5 };

describe('SavingsAggregate', () => {
  test('open activate credit debit', () => {
    const agg = SavingsAggregate.open('s1', 'c1', 'USD', fees, limits, 'teller');
    agg.activate('ops');
    agg.credit(Money.of(100, 'USD'), 'teller', 'DEP-1');
    agg.debit(Money.of(40, 'USD'), 'teller', 'WDR-1');
    expect(agg.toSnapshot().balanceMinor).toBe(6000);
    expect(agg.toSnapshot().status).toBe('active');
  });

  test('cannot debit more than balance', () => {
    const agg = SavingsAggregate.open('s2', 'c1', 'USD', fees, limits, 'teller');
    agg.activate('ops');
    expect(() => agg.debit(Money.of(1, 'USD'), 'teller', 'x')).toThrow(/Insufficient/);
  });

  test('suspend and risk reassessment', () => {
    const agg = SavingsAggregate.open('s3', 'c1', 'USD', fees, limits, 'teller');
    agg.activate('ops');
    agg.reassessRisk(85, 'risk');
    expect(agg.toSnapshot().riskTier).toBe('critical');
    agg.suspend('aml', 'suspicious');
    expect(agg.toSnapshot().status).toBe('suspended');
  });

  test('domain events emitted', () => {
    const agg = SavingsAggregate.open('s4', 'c1', 'USD', fees, limits, 'teller');
    const events = agg.pullDomainEvents();
    expect(events.some((e) => e.eventType === 'savings.opened')).toBe(true);
  });
});
