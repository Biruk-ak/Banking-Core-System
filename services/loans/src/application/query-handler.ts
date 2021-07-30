import type { LoansQuery, LoansListItem, Page } from './queries';
import type { LoansSnapshot } from '../domain/types';
import type { LoansReadModel } from '../infrastructure/read-model';
export class LoansQueryHandler {
  constructor(private readonly read: LoansReadModel) {}
  async handle(query: LoansQuery): Promise<unknown> {
    switch (query.type) {
      case 'GetLoansById':
        return this.read.byId(query.productId);
      case 'ListLoansByCustomer':
        return this.read.byCustomer(query.customerId, query.status);
      case 'SearchLoans':
        return this.read.search(query.q, query.riskTier, query.page, query.pageSize);
      case 'GetLoansAudit':
        return this.read.audit(query.productId, query.limit ?? 50);
      case 'LoansPortfolioSummary':
        return this.read.portfolioSummary(query.customerId);
      case 'LoansRiskReport':
        return this.read.riskReport(query.from, query.to);
      default:
        throw new Error('Unknown query');
    }
  }
}
export type { LoansListItem, Page, LoansSnapshot };
