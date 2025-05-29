import { InMemoryEventBus } from '../services/shared/infra/event-bus';
import { InMemoryPgPool, MIGRATIONS } from '../services/shared/infra/postgres';

describe('Event bus and postgres', () => {
  test('publish subscribe', async () => {
    const bus = new InMemoryEventBus();
    const seen: unknown[] = [];
    bus.subscribe('t', async (p) => { seen.push(p); });
    await bus.publish('t', { a: 1 });
    expect(seen).toEqual([{ a: 1 }]);
    expect(bus.getLog()).toHaveLength(1);
  });

  test('pg pool insert select shim', async () => {
    const pg = new InMemoryPgPool();
    expect(MIGRATIONS.length).toBeGreaterThan(0);
    await pg.query('INSERT INTO customers (id) VALUES ($1)', ['c1']);
    const res = await pg.query('SELECT * FROM customers WHERE id = $1', ['c1']);
    expect(res.rowCount).toBe(1);
  });
});
