import type { MobileBankingQuery, MobileBankingListItem, Page } from './queries';
import type { MobileBankingSnapshot } from '../domain/types';
import type { MobileBankingReadModel } from '../infrastructure/read-model';
export class MobileBankingQueryHandler {
  constructor(private readonly read: MobileBankingReadModel) {}
  async handle(query: MobileBankingQuery): Promise<unknown> {
    switch (query.type) {
      case 'GetMobileBankingById':
        return this.read.byId(query.productId);
      case 'ListMobileBankingByCustomer':
        return this.read.byCustomer(query.customerId, query.status);
      case 'SearchMobileBanking':
        return this.read.search(query.q, query.riskTier, query.page, query.pageSize);
      case 'GetMobileBankingAudit':
        return this.read.audit(query.productId, query.limit ?? 50);
      case 'MobileBankingPortfolioSummary':
        return this.read.portfolioSummary(query.customerId);
      case 'MobileBankingRiskReport':
        return this.read.riskReport(query.from, query.to);
      default:
        throw new Error('Unknown query');
    }
  }
}
export type { MobileBankingListItem, Page, MobileBankingSnapshot };
