import { SagaOrchestrator, createPaymentTransferSaga } from '../services/shared/infra/saga';

describe('SagaOrchestrator', () => {
  test('completes happy path', async () => {
    const calls: string[] = [];
    const saga = createPaymentTransferSaga({
      debit: async () => { calls.push('debit'); },
      credit: async () => { calls.push('credit'); },
      notify: async () => { calls.push('notify'); },
      reverseDebit: async () => { calls.push('rev-debit'); },
      reverseCredit: async () => { calls.push('rev-credit'); },
      reverseNotify: async () => { calls.push('rev-notify'); },
    });
    const result = await saga.run();
    expect(result.state).toBe('completed');
    expect(calls).toEqual(['debit', 'credit', 'notify']);
  });

  test('compensates on failure', async () => {
    const calls: string[] = [];
    const saga = new SagaOrchestrator('test')
      .addStep({ name: 'a', execute: async () => { calls.push('a'); }, compensate: async () => { calls.push('comp-a'); } })
      .addStep({ name: 'b', execute: async () => { throw new Error('boom'); }, compensate: async () => { calls.push('comp-b'); } });
    const result = await saga.run();
    expect(result.state).toBe('failed');
    expect(calls).toContain('comp-a');
  });
});
