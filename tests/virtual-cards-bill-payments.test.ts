import { VirtualCardsEngine } from '../services/features/virtual-cards/src/engine';
import { BillPaymentsEngine } from '../services/features/bill-payments/src/engine';
import { enabledRules, totalWeight } from '../services/features/virtual-cards/src/rules-catalog';

describe('Virtual cards and bill payments', () => {
  test('engines produce decisions', () => {
    expect(new VirtualCardsEngine().evaluate({ customerId: 'c1' }).feature).toBe('virtual-cards');
    expect(new BillPaymentsEngine().evaluate({ customerId: 'c1', amountMinor: 5000 }).customerId).toBe('c1');
  });
  test('rules catalog', () => {
    expect(enabledRules().length).toBe(25);
    expect(totalWeight()).toBeGreaterThan(0);
  });
});
