import type { InternetBankingQuery, InternetBankingListItem, Page } from './queries';
import type { InternetBankingSnapshot } from '../domain/types';
import type { InternetBankingReadModel } from '../infrastructure/read-model';
export class InternetBankingQueryHandler {
  constructor(private readonly read: InternetBankingReadModel) {}
  async handle(query: InternetBankingQuery): Promise<unknown> {
    switch (query.type) {
      case 'GetInternetBankingById':
        return this.read.byId(query.productId);
      case 'ListInternetBankingByCustomer':
        return this.read.byCustomer(query.customerId, query.status);
      case 'SearchInternetBanking':
        return this.read.search(query.q, query.riskTier, query.page, query.pageSize);
      case 'GetInternetBankingAudit':
        return this.read.audit(query.productId, query.limit ?? 50);
      case 'InternetBankingPortfolioSummary':
        return this.read.portfolioSummary(query.customerId);
      case 'InternetBankingRiskReport':
        return this.read.riskReport(query.from, query.to);
      default:
        throw new Error('Unknown query');
    }
  }
}
export type { InternetBankingListItem, Page, InternetBankingSnapshot };
