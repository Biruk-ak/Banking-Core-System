import type { MortgagesQuery, MortgagesListItem, Page } from './queries';
import type { MortgagesSnapshot } from '../domain/types';
import type { MortgagesReadModel } from '../infrastructure/read-model';
export class MortgagesQueryHandler {
  constructor(private readonly read: MortgagesReadModel) {}
  async handle(query: MortgagesQuery): Promise<unknown> {
    switch (query.type) {
      case 'GetMortgagesById':
        return this.read.byId(query.productId);
      case 'ListMortgagesByCustomer':
        return this.read.byCustomer(query.customerId, query.status);
      case 'SearchMortgages':
        return this.read.search(query.q, query.riskTier, query.page, query.pageSize);
      case 'GetMortgagesAudit':
        return this.read.audit(query.productId, query.limit ?? 50);
      case 'MortgagesPortfolioSummary':
        return this.read.portfolioSummary(query.customerId);
      case 'MortgagesRiskReport':
        return this.read.riskReport(query.from, query.to);
      default:
        throw new Error('Unknown query');
    }
  }
}
export type { MortgagesListItem, Page, MortgagesSnapshot };
