import { InsuranceCommandHandler } from '../services/insurance/src/application/command-handler';
import { InMemoryInsuranceRepository } from '../services/insurance/src/infrastructure/repository';
import { MobileBankingCommandHandler } from '../services/mobile-banking/src/application/command-handler';
import { InMemoryMobileBankingRepository } from '../services/mobile-banking/src/infrastructure/repository';
import { InternetBankingCommandHandler } from '../services/internet-banking/src/application/command-handler';
import { InMemoryInternetBankingRepository } from '../services/internet-banking/src/infrastructure/repository';
import { InMemoryEventBus } from '../services/shared/infra/event-bus';

describe('Insurance mobile internet handlers', () => {
  test('insurance open', async () => {
    const h = new InsuranceCommandHandler(new InMemoryInsuranceRepository(), new InMemoryEventBus());
    const r = await h.handle({ type: 'OpenInsurance', customerId: 'c1', currency: 'USD', actorId: 'u' });
    expect(r.success).toBe(true);
  });
  test('mobile banking open', async () => {
    const h = new MobileBankingCommandHandler(new InMemoryMobileBankingRepository(), new InMemoryEventBus());
    const r = await h.handle({ type: 'OpenMobileBanking', customerId: 'c1', currency: 'USD', actorId: 'u' });
    expect(r.success).toBe(true);
  });
  test('internet banking open', async () => {
    const h = new InternetBankingCommandHandler(new InMemoryInternetBankingRepository(), new InMemoryEventBus());
    const r = await h.handle({ type: 'OpenInternetBanking', customerId: 'c1', currency: 'USD', actorId: 'u' });
    expect(r.success).toBe(true);
  });
});
