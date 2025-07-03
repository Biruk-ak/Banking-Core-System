import { CurrentAccountsHttpApi } from '../services/current-accounts/src/api/routes';
import { CurrentAccountsCommandHandler } from '../services/current-accounts/src/application/command-handler';
import { CurrentAccountsQueryHandler } from '../services/current-accounts/src/application/query-handler';
import { InMemoryCurrentAccountsRepository } from '../services/current-accounts/src/infrastructure/repository';
import { InMemoryCurrentAccountsReadModel } from '../services/current-accounts/src/infrastructure/read-model';
import { InMemoryEventBus } from '../services/shared/infra/event-bus';

describe('Current accounts HTTP API', () => {
  test('requires auth', async () => {
    const api = new CurrentAccountsHttpApi(
      new CurrentAccountsCommandHandler(new InMemoryCurrentAccountsRepository(), new InMemoryEventBus()),
      new CurrentAccountsQueryHandler(new InMemoryCurrentAccountsReadModel()),
    );
    const res = await api.handle({ method: 'POST', path: '/current-accounts/commands', body: {} });
    expect(res.status).toBe(401);
  });

  test('opens via command endpoint', async () => {
    const api = new CurrentAccountsHttpApi(
      new CurrentAccountsCommandHandler(new InMemoryCurrentAccountsRepository(), new InMemoryEventBus()),
      new CurrentAccountsQueryHandler(new InMemoryCurrentAccountsReadModel()),
    );
    const res = await api.handle({
      method: 'POST',
      path: '/current-accounts/commands',
      headers: { authorization: 'Bearer t' },
      body: { type: 'OpenCurrentAccounts', customerId: 'c1', currency: 'USD', actorId: 'u' },
    });
    expect(res.status).toBe(200);
  });
});
