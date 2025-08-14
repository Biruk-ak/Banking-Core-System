import { MerchantDashboardEngine } from '../services/features/merchant-dashboard/src/engine';
import { AdminConsoleEngine } from '../services/features/admin-console/src/engine';

describe('Merchant and admin', () => {
  test('merchant dashboard', () => {
    const d = new MerchantDashboardEngine().evaluate({ customerId: 'm1', channel: 'api' });
    expect(d.feature).toBe('merchant-dashboard');
  });
  test('admin console', () => {
    const d = new AdminConsoleEngine().evaluate({ customerId: 'admin', metadata: { action: 'freeze' } });
    expect(d.outcome).toBeTruthy();
  });
});
