import { CqrsMediator } from '../services/shared/infra/cqrs';

describe('CqrsMediator', () => {
  test('routes commands and queries', async () => {
    const m = new CqrsMediator();
    m.registerCommand('Ping', async (cmd) => ({ pong: cmd.type }));
    m.registerQuery('GetTime', async () => ({ now: 1 }));
    await expect(m.send({ type: 'Ping' })).resolves.toEqual({ pong: 'Ping' });
    await expect(m.ask({ type: 'GetTime' })).resolves.toEqual({ now: 1 });
  });

  test('throws when handler missing', async () => {
    const m = new CqrsMediator();
    await expect(m.send({ type: 'Nope' })).rejects.toThrow(/No command handler/);
  });
});
