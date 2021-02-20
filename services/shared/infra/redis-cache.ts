/** Redis cache layer for Banking Core System */
export interface CacheClient {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, ttlSeconds?: number): Promise<void>;
  del(key: string): Promise<void>;
  incr(key: string): Promise<number>;
  expire(key: string, ttlSeconds: number): Promise<void>;
}

interface Entry { value: unknown; expiresAt?: number }

export class InMemoryRedisCache implements CacheClient {
  private store = new Map<string, Entry>();

  async get<T>(key: string): Promise<T | null> {
    const e = this.store.get(key);
    if (!e) return null;
    if (e.expiresAt && Date.now() > e.expiresAt) {
      this.store.delete(key);
      return null;
    }
    return e.value as T;
  }

  async set<T>(key: string, value: T, ttlSeconds?: number): Promise<void> {
    this.store.set(key, {
      value,
      expiresAt: ttlSeconds ? Date.now() + ttlSeconds * 1000 : undefined,
    });
  }

  async del(key: string): Promise<void> { this.store.delete(key); }

  async incr(key: string): Promise<number> {
    const cur = (await this.get<number>(key)) ?? 0;
    const next = cur + 1;
    await this.set(key, next);
    return next;
  }

  async expire(key: string, ttlSeconds: number): Promise<void> {
    const e = this.store.get(key);
    if (e) e.expiresAt = Date.now() + ttlSeconds * 1000;
  }
}

export class SessionCache {
  constructor(private readonly cache: CacheClient, private readonly prefix = 'bcs:session:') {}
  key(sessionId: string) { return this.prefix + sessionId; }
  async put(sessionId: string, data: Record<string, unknown>, ttl = 3600) {
    await this.cache.set(this.key(sessionId), data, ttl);
  }
  async get(sessionId: string) { return this.cache.get<Record<string, unknown>>(this.key(sessionId)); }
  async revoke(sessionId: string) { await this.cache.del(this.key(sessionId)); }
}

export class RateLimiter {
  constructor(private readonly cache: CacheClient) {}
  async allow(key: string, limit: number, windowSeconds: number): Promise<{ allowed: boolean; remaining: number }> {
    const rk = 'bcs:rl:' + key;
    const count = await this.cache.incr(rk);
    if (count === 1) await this.cache.expire(rk, windowSeconds);
    return { allowed: count <= limit, remaining: Math.max(0, limit - count) };
  }
}
