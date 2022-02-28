import type { ForeignExchangeQuery, ForeignExchangeListItem, Page } from './queries';
import type { ForeignExchangeSnapshot } from '../domain/types';
import type { ForeignExchangeReadModel } from '../infrastructure/read-model';
export class ForeignExchangeQueryHandler {
  constructor(private readonly read: ForeignExchangeReadModel) {}
  async handle(query: ForeignExchangeQuery): Promise<unknown> {
    switch (query.type) {
      case 'GetForeignExchangeById':
        return this.read.byId(query.productId);
      case 'ListForeignExchangeByCustomer':
        return this.read.byCustomer(query.customerId, query.status);
      case 'SearchForeignExchange':
        return this.read.search(query.q, query.riskTier, query.page, query.pageSize);
      case 'GetForeignExchangeAudit':
        return this.read.audit(query.productId, query.limit ?? 50);
      case 'ForeignExchangePortfolioSummary':
        return this.read.portfolioSummary(query.customerId);
      case 'ForeignExchangeRiskReport':
        return this.read.riskReport(query.from, query.to);
      default:
        throw new Error('Unknown query');
    }
  }
}
export type { ForeignExchangeListItem, Page, ForeignExchangeSnapshot };
