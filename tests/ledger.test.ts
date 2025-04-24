import { DoubleEntryLedger } from '../services/ledger/src/double-entry';
import { findAccount, accountsByType } from '../services/ledger/src/chart-of-accounts';

describe('DoubleEntryLedger', () => {
  test('posts balanced journal', () => {
    const ledger = new DoubleEntryLedger();
    const entry = ledger.post('DEP-1', [
      { accountCode: '1000', direction: 'debit', amountMinor: 10000, currency: 'USD', narrative: 'Cash in' },
      { accountCode: '2100', direction: 'credit', amountMinor: 10000, currency: 'USD', narrative: 'Savings' },
    ]);
    expect(entry.status).toBe('posted');
    expect(ledger.balanceOf('1000', 'USD')).toBe(10000);
  });

  test('rejects unbalanced journal', () => {
    const ledger = new DoubleEntryLedger();
    expect(() =>
      ledger.post('BAD', [
        { accountCode: '1000', direction: 'debit', amountMinor: 100, currency: 'USD', narrative: 'x' },
        { accountCode: '2100', direction: 'credit', amountMinor: 50, currency: 'USD', narrative: 'y' },
      ]),
    ).toThrow(/Unbalanced/);
  });

  test('reverse journal', () => {
    const ledger = new DoubleEntryLedger();
    const entry = ledger.post('T1', [
      { accountCode: '1000', direction: 'debit', amountMinor: 500, currency: 'USD', narrative: 'a' },
      { accountCode: '2100', direction: 'credit', amountMinor: 500, currency: 'USD', narrative: 'b' },
    ]);
    ledger.reverse(entry.id);
    expect(ledger.balanceOf('1000', 'USD')).toBe(0);
  });

  test('chart of accounts helpers', () => {
    expect(findAccount('1000')?.type).toBe('asset');
    expect(accountsByType('liability').length).toBeGreaterThan(0);
  });
});
