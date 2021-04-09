/** Elasticsearch search/index layer */
export interface EsHit<T> { _id: string; _source: T; _score?: number }
export interface EsSearchResponse<T> {
  hits: { hits: EsHit<T>[]; total: { value: number } };
}

export class InMemoryElasticsearch {
  private indexes = new Map<string, Map<string, unknown>>();

  async index<T>(index: string, id: string, doc: T): Promise<void> {
    if (!this.indexes.has(index)) this.indexes.set(index, new Map());
    this.indexes.get(index)!.set(id, doc);
  }

  async get<T>(index: string, id: string): Promise<EsHit<T> | null> {
    const doc = this.indexes.get(index)?.get(id);
    if (!doc) return null;
    return { _id: id, _source: doc as T };
  }

  async search<T>(index: string, query: { match?: Record<string, string>; term?: Record<string, string> }): Promise<EsSearchResponse<T>> {
    const all = [...(this.indexes.get(index)?.entries() ?? [])];
    let filtered = all;
    if (query.term) {
      const [k, v] = Object.entries(query.term)[0] ?? [];
      if (k) filtered = filtered.filter(([, doc]) => (doc as Record<string, unknown>)[k] === v);
    }
    if (query.match) {
      const [k, v] = Object.entries(query.match)[0] ?? [];
      if (k && v) {
        filtered = filtered.filter(([, doc]) => String((doc as Record<string, unknown>)[k] ?? '').toLowerCase().includes(v.toLowerCase()));
      }
    }
    return {
      hits: {
        hits: filtered.map(([id, doc]) => ({ _id: id, _source: doc as T, _score: 1 })),
        total: { value: filtered.length },
      },
    };
  }

  async delete(index: string, id: string): Promise<void> {
    this.indexes.get(index)?.delete(id);
  }
}
