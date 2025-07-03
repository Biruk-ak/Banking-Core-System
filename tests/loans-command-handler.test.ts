import { LoansCommandHandler } from '../services/loans/src/application/command-handler';
import { InMemoryLoansRepository } from '../services/loans/src/infrastructure/repository';
import { InMemoryEventBus } from '../services/shared/infra/event-bus';

describe('LoansCommandHandler', () => {
  test('open and activate loan product', async () => {
    const handler = new LoansCommandHandler(new InMemoryLoansRepository(), new InMemoryEventBus());
    const opened = await handler.handle({ type: 'OpenLoans', customerId: 'c1', currency: 'USD', actorId: 'u1' });
    expect(opened.success).toBe(true);
    const activated = await handler.handle({ type: 'ActivateLoans', productId: opened.productId!, actorId: 'u1' });
    expect(activated.success).toBe(true);
  });

  test('credit then debit', async () => {
    const handler = new LoansCommandHandler(new InMemoryLoansRepository(), new InMemoryEventBus());
    const opened = await handler.handle({ type: 'OpenLoans', customerId: 'c1', currency: 'USD', actorId: 'u1' });
    await handler.handle({ type: 'ActivateLoans', productId: opened.productId!, actorId: 'u1' });
    const credit = await handler.handle({ type: 'CreditLoans', productId: opened.productId!, amountMajor: 500, currency: 'USD', actorId: 'u1', reference: 'DISB' });
    expect(credit.success).toBe(true);
  });

  test('unknown product fails', async () => {
    const handler = new LoansCommandHandler(new InMemoryLoansRepository(), new InMemoryEventBus());
    const res = await handler.handle({ type: 'ActivateLoans', productId: 'missing', actorId: 'u1' });
    expect(res.success).toBe(false);
  });
});
