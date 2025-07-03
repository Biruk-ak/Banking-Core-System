import { InMemoryCreditCardsReadModel } from '../services/credit-cards/src/infrastructure/read-model';

describe('Credit cards read model', () => {
  test('upsert search portfolio', async () => {
    const rm = new InMemoryCreditCardsReadModel();
    rm.upsert({
      id: 'cc1',
      customerId: 'c1',
      status: 'active',
      riskTier: 'low',
      balanceMinor: 25000,
      currency: 'USD',
      openedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: 1,
      fees: { monthlyMaintenanceMinor: 0, transactionFeeMinor: 0, overdraftFeeMinor: 0, earlyClosurePenaltyBps: 0, fxMarkupBps: 0 },
      limits: { dailyDebitMinor: 1, dailyCreditMinor: 1, singleTxnMinor: 1, monthlyVolumeMinor: 1, openPositionsMax: 1 },
      tags: ['premium'],
      metadata: {},
    });
    const page = await rm.search('premium', 'low', 1, 10);
    expect(page.total).toBe(1);
    const summary = await rm.portfolioSummary('c1');
    expect(summary.count).toBe(1);
  });
});
