import { SavingsAggregate } from '../domain/aggregate';
import type { SavingsSnapshot, SavingsFeeSchedule, SavingsLimits } from '../domain/types';
import { Money, type CurrencyCode } from '../../../../packages/domain-core/src';
export interface SavingsRepository {
  findById(id: string): Promise<SavingsAggregate | null>;
  save(agg: SavingsAggregate): Promise<void>;
  listByCustomer(customerId: string): Promise<SavingsSnapshot[]>;
}
/** In-memory repository used for local/dev and tests */
export class InMemorySavingsRepository implements SavingsRepository {
  private store = new Map<string, SavingsSnapshot>();
  private aggregates = new Map<string, SavingsAggregate>();
  async findById(id: string): Promise<SavingsAggregate | null> {
    return this.aggregates.get(id) ?? null;
  }
  async save(agg: SavingsAggregate): Promise<void> {
    const snap = agg.toSnapshot();
    this.store.set(agg.id, snap);
    this.aggregates.set(agg.id, agg);
  }
  async listByCustomer(customerId: string): Promise<SavingsSnapshot[]> {
    return [...this.store.values()].filter((s) => s.customerId === customerId);
  }
  /** Rehydrate helper for projections */
  static rehydrate(snap: SavingsSnapshot): SavingsAggregate {
    const fees: SavingsFeeSchedule = snap.fees;
    const limits: SavingsLimits = snap.limits;
    const agg = SavingsAggregate.open(
      snap.id,
      snap.customerId,
      snap.currency as CurrencyCode,
      fees,
      limits,
      'system-rehydrate',
    );
    if (snap.status === 'active') agg.activate('system-rehydrate');
    if (snap.balanceMinor > 0) {
      agg.credit(Money.of(snap.balanceMinor / 100, snap.currency as CurrencyCode), 'system-rehydrate', 'rehydrate');
    }
    return agg;
  }
}
/** Postgres-backed repository skeleton */
export class PostgresSavingsRepository implements SavingsRepository {
  constructor(private readonly pool: { query: (sql: string, params?: unknown[]) => Promise<{ rows: SavingsSnapshot[] }> }) {}
  async findById(id: string): Promise<SavingsAggregate | null> {
    const { rows } = await this.pool.query(
      'SELECT * FROM savings WHERE id = $1',
      [id],
    );
    if (!rows[0]) return null;
    return InMemorySavingsRepository.rehydrate(rows[0]);
  }
  async save(agg: SavingsAggregate): Promise<void> {
    const s = agg.toSnapshot();
    await this.pool.query(
      `INSERT INTO savings (id, customer_id, status, risk_tier, balance_minor, currency, opened_at, updated_at, version, fees, limits, tags, metadata)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
       ON CONFLICT (id) DO UPDATE SET
         status = EXCLUDED.status,
         risk_tier = EXCLUDED.risk_tier,
         balance_minor = EXCLUDED.balance_minor,
         updated_at = EXCLUDED.updated_at,
         version = EXCLUDED.version,
         fees = EXCLUDED.fees,
         limits = EXCLUDED.limits,
         tags = EXCLUDED.tags,
         metadata = EXCLUDED.metadata`,
      [s.id, s.customerId, s.status, s.riskTier, s.balanceMinor, s.currency, s.openedAt, s.updatedAt, s.version, JSON.stringify(s.fees), JSON.stringify(s.limits), JSON.stringify(s.tags), JSON.stringify(s.metadata)],
    );
  }
  async listByCustomer(customerId: string): Promise<SavingsSnapshot[]> {
    const { rows } = await this.pool.query(
      'SELECT * FROM savings WHERE customer_id = $1 ORDER BY opened_at DESC',
      [customerId],
    );
    return rows;
  }
}
