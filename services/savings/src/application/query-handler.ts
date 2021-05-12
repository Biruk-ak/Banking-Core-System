import type { SavingsQuery, SavingsListItem, Page } from './queries';
import type { SavingsSnapshot } from '../domain/types';
import type { SavingsReadModel } from '../infrastructure/read-model';
export class SavingsQueryHandler {
  constructor(private readonly read: SavingsReadModel) {}
  async handle(query: SavingsQuery): Promise<unknown> {
    switch (query.type) {
      case 'GetSavingsById':
        return this.read.byId(query.productId);
      case 'ListSavingsByCustomer':
        return this.read.byCustomer(query.customerId, query.status);
      case 'SearchSavings':
        return this.read.search(query.q, query.riskTier, query.page, query.pageSize);
      case 'GetSavingsAudit':
        return this.read.audit(query.productId, query.limit ?? 50);
      case 'SavingsPortfolioSummary':
        return this.read.portfolioSummary(query.customerId);
      case 'SavingsRiskReport':
        return this.read.riskReport(query.from, query.to);
      default:
        throw new Error('Unknown query');
    }
  }
}
export type { SavingsListItem, Page, SavingsSnapshot };
