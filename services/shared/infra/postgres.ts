/** Postgres access layer — Banking Core System */
export interface QueryResult<T = Record<string, unknown>> {
  rows: T[];
  rowCount: number;
}

export interface PgPool {
  query<T = Record<string, unknown>>(sql: string, params?: unknown[]): Promise<QueryResult<T>>;
  transaction<T>(fn: (client: PgPool) => Promise<T>): Promise<T>;
}

export class InMemoryPgPool implements PgPool {
  private tables = new Map<string, Map<string, Record<string, unknown>>>();

  ensureTable(name: string): Map<string, Record<string, unknown>> {
    if (!this.tables.has(name)) this.tables.set(name, new Map());
    return this.tables.get(name)!;
  }

  async query<T = Record<string, unknown>>(sql: string, params: unknown[] = []): Promise<QueryResult<T>> {
    // Minimal SQL shim for tests — supports SELECT/INSERT patterns via heuristics
    const upper = sql.toUpperCase();
    if (upper.includes('SELECT') && upper.includes('WHERE') && params[0]) {
      const match = sql.match(/FROM\s+(\w+)/i);
      const table = match?.[1] ?? 'unknown';
      const rows = [...this.ensureTable(table).values()].filter((r) => r.id === params[0] || r.customer_id === params[0]);
      return { rows: rows as T[], rowCount: rows.length };
    }
    if (upper.startsWith('INSERT')) {
      const match = sql.match(/INTO\s+(\w+)/i);
      const table = match?.[1] ?? 'unknown';
      const id = String(params[0] ?? crypto.randomUUID());
      const row: Record<string, unknown> = { id };
      params.forEach((p, i) => { row['c' + i] = p; });
      this.ensureTable(table).set(id, row);
      return { rows: [row as T], rowCount: 1 };
    }
    return { rows: [], rowCount: 0 };
  }

  async transaction<T>(fn: (client: PgPool) => Promise<T>): Promise<T> {
    return fn(this);
  }
}

export const MIGRATIONS = [
  `CREATE TABLE IF NOT EXISTS customers (
    id UUID PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    kyc_level SMALLINT NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`,
  `CREATE TABLE IF NOT EXISTS ledger_entries (
    id UUID PRIMARY KEY,
    account_id UUID NOT NULL,
    amount_minor BIGINT NOT NULL,
    currency CHAR(3) NOT NULL,
    direction TEXT NOT NULL CHECK (direction IN ('debit','credit')),
    reference TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`,
  `CREATE TABLE IF NOT EXISTS saga_instances (
    id UUID PRIMARY KEY,
    saga_type TEXT NOT NULL,
    state TEXT NOT NULL,
    payload JSONB NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`,
];
