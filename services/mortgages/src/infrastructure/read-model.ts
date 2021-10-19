import type { MortgagesSnapshot, MortgagesAuditTrail } from '../domain/types';
import type { MortgagesListItem, Page } from '../application/queries';
export interface MortgagesReadModel {
  byId(id: string): Promise<MortgagesSnapshot | null>;
  byCustomer(customerId: string, status?: string): Promise<MortgagesListItem[]>;
  search(q: string, riskTier: string | undefined, page: number, pageSize: number): Promise<Page<MortgagesListItem>>;
  audit(productId: string, limit: number): Promise<MortgagesAuditTrail[]>;
  portfolioSummary(customerId: string): Promise<{ totalBalanceMinor: number; count: number; byStatus: Record<string, number> }>;
  riskReport(from: string, to: string): Promise<{ tier: string; count: number }[]>;
}
export class ElasticMortgagesReadModel implements MortgagesReadModel {
  constructor(
    private readonly es: {
      search: (body: unknown) => Promise<{ hits: { hits: { _source: MortgagesSnapshot }[]; total: { value: number } } }>;
      get: (id: string) => Promise<{ _source: MortgagesSnapshot } | null>;
    },
    private readonly index = 'mortgages-read',
  ) {}
  async byId(id: string): Promise<MortgagesSnapshot | null> {
    const doc = await this.es.get(id);
    return doc?._source ?? null;
  }
  async byCustomer(customerId: string, status?: string): Promise<MortgagesListItem[]> {
    const must: unknown[] = [{ term: { customerId } }];
    if (status) must.push({ term: { status } });
    const res = await this.es.search({ index: this.index, query: { bool: { must } }, size: 100 });
    return res.hits.hits.map((h) => this.toListItem(h._source));
  }
  async search(q: string, riskTier: string | undefined, page: number, pageSize: number): Promise<Page<MortgagesListItem>> {
    const must: unknown[] = [{ multi_match: { query: q, fields: ['id', 'customerId', 'tags'] } }];
    if (riskTier) must.push({ term: { riskTier } });
    const res = await this.es.search({
      index: this.index,
      query: { bool: { must } },
      from: (page - 1) * pageSize,
      size: pageSize,
    });
    return {
      items: res.hits.hits.map((h) => this.toListItem(h._source)),
      total: res.hits.total.value,
      page,
      pageSize,
    };
  }
  async audit(_productId: string, _limit: number): Promise<MortgagesAuditTrail[]> {
    return [];
  }
  async portfolioSummary(customerId: string): Promise<{ totalBalanceMinor: number; count: number; byStatus: Record<string, number> }> {
    const items = await this.byCustomer(customerId);
    const byStatus: Record<string, number> = {};
    let totalBalanceMinor = 0;
    for (const i of items) {
      byStatus[i.status] = (byStatus[i.status] ?? 0) + 1;
      totalBalanceMinor += i.balanceMinor;
    }
    return { totalBalanceMinor, count: items.length, byStatus };
  }
  async riskReport(_from: string, _to: string): Promise<{ tier: string; count: number }[]> {
    return [
      { tier: 'low', count: 0 },
      { tier: 'medium', count: 0 },
      { tier: 'high', count: 0 },
      { tier: 'critical', count: 0 },
    ];
  }
  private toListItem(s: MortgagesSnapshot): MortgagesListItem {
    return {
      id: s.id,
      customerId: s.customerId,
      status: s.status,
      balanceMinor: s.balanceMinor,
      currency: s.currency,
      riskTier: s.riskTier,
    };
  }
}
export class InMemoryMortgagesReadModel implements MortgagesReadModel {
  private docs = new Map<string, MortgagesSnapshot>();
  private audits = new Map<string, MortgagesAuditTrail[]>();
  upsert(snap: MortgagesSnapshot, audit: MortgagesAuditTrail[] = []): void {
    this.docs.set(snap.id, snap);
    this.audits.set(snap.id, audit);
  }
  async byId(id: string) { return this.docs.get(id) ?? null; }
  async byCustomer(customerId: string, status?: string) {
    return [...this.docs.values()]
      .filter((d) => d.customerId === customerId && (!status || d.status === status))
      .map((s) => ({ id: s.id, customerId: s.customerId, status: s.status, balanceMinor: s.balanceMinor, currency: s.currency, riskTier: s.riskTier }));
  }
  async search(q: string, riskTier: string | undefined, page: number, pageSize: number) {
    let items = [...this.docs.values()].filter((d) =>
      d.id.includes(q) || d.customerId.includes(q) || d.tags.some((t) => t.includes(q)),
    );
    if (riskTier) items = items.filter((d) => d.riskTier === riskTier);
    const total = items.length;
    const slice = items.slice((page - 1) * pageSize, page * pageSize);
    return {
      items: slice.map((s) => ({ id: s.id, customerId: s.customerId, status: s.status, balanceMinor: s.balanceMinor, currency: s.currency, riskTier: s.riskTier })),
      total,
      page,
      pageSize,
    };
  }
  async audit(productId: string, limit: number) {
    return (this.audits.get(productId) ?? []).slice(0, limit);
  }
  async portfolioSummary(customerId: string) {
    const items = await this.byCustomer(customerId);
    const byStatus: Record<string, number> = {};
    let totalBalanceMinor = 0;
    for (const i of items) {
      byStatus[i.status] = (byStatus[i.status] ?? 0) + 1;
      totalBalanceMinor += i.balanceMinor;
    }
    return { totalBalanceMinor, count: items.length, byStatus };
  }
  async riskReport() {
    const counts: Record<string, number> = {};
    for (const d of this.docs.values()) counts[d.riskTier] = (counts[d.riskTier] ?? 0) + 1;
    return Object.entries(counts).map(([tier, count]) => ({ tier, count }));
  }
}
