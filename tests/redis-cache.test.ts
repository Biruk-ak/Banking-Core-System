import { InMemoryRedisCache, RateLimiter, SessionCache } from '../services/shared/infra/redis-cache';

describe('Redis cache abstractions', () => {
  test('set get del', async () => {
    const c = new InMemoryRedisCache();
    await c.set('k', { a: 1 }, 60);
    expect(await c.get('k')).toEqual({ a: 1 });
    await c.del('k');
    expect(await c.get('k')).toBeNull();
  });

  test('rate limiter', async () => {
    const rl = new RateLimiter(new InMemoryRedisCache());
    const a = await rl.allow('u1', 2, 60);
    const b = await rl.allow('u1', 2, 60);
    const c = await rl.allow('u1', 2, 60);
    expect(a.allowed && b.allowed).toBe(true);
    expect(c.allowed).toBe(false);
  });

  test('session cache', async () => {
    const s = new SessionCache(new InMemoryRedisCache());
    await s.put('sid', { userId: 'u' });
    expect(await s.get('sid')).toEqual({ userId: 'u' });
    await s.revoke('sid');
    expect(await s.get('sid')).toBeNull();
  });
});
