import { MortgagesAggregate } from '../services/mortgages/src/domain/aggregate';
import { InvestmentsAggregate } from '../services/investments/src/domain/aggregate';
import { ForeignExchangeAggregate } from '../services/foreign-exchange/src/domain/aggregate';
import { Money } from '../packages/domain-core/src/money';

const fees = { monthlyMaintenanceMinor: 0, transactionFeeMinor: 0, overdraftFeeMinor: 0, earlyClosurePenaltyBps: 0, fxMarkupBps: 25 };
const limits = { dailyDebitMinor: 9_999_999_00, dailyCreditMinor: 9_999_999_00, singleTxnMinor: 9_999_999_00, monthlyVolumeMinor: 99_999_999_00, openPositionsMax: 50 };

describe('Mortgages investments FX aggregates', () => {
  test('mortgage lifecycle', () => {
    const m = MortgagesAggregate.open('m1', 'c1', 'USD', fees, limits, 'u');
    m.activate('u');
    m.credit(Money.of(250000, 'USD'), 'u', 'principal');
    expect(m.toSnapshot().balanceMinor).toBe(25000000);
  });
  test('investments tags', () => {
    const i = InvestmentsAggregate.open('i1', 'c1', 'USD', fees, limits, 'u');
    i.addTag('equities', 'u');
    expect(i.toSnapshot().tags).toContain('equities');
  });
  test('fx activate', () => {
    const f = ForeignExchangeAggregate.open('f1', 'c1', 'EUR', fees, limits, 'u');
    f.activate('u');
    expect(f.toSnapshot().status).toBe('active');
  });
});
