import type { InvestmentsQuery, InvestmentsListItem, Page } from './queries';
import type { InvestmentsSnapshot } from '../domain/types';
import type { InvestmentsReadModel } from '../infrastructure/read-model';
export class InvestmentsQueryHandler {
  constructor(private readonly read: InvestmentsReadModel) {}
  async handle(query: InvestmentsQuery): Promise<unknown> {
    switch (query.type) {
      case 'GetInvestmentsById':
        return this.read.byId(query.productId);
      case 'ListInvestmentsByCustomer':
        return this.read.byCustomer(query.customerId, query.status);
      case 'SearchInvestments':
        return this.read.search(query.q, query.riskTier, query.page, query.pageSize);
      case 'GetInvestmentsAudit':
        return this.read.audit(query.productId, query.limit ?? 50);
      case 'InvestmentsPortfolioSummary':
        return this.read.portfolioSummary(query.customerId);
      case 'InvestmentsRiskReport':
        return this.read.riskReport(query.from, query.to);
      default:
        throw new Error('Unknown query');
    }
  }
}
export type { InvestmentsListItem, Page, InvestmentsSnapshot };
