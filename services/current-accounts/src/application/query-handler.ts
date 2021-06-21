import type { CurrentAccountsQuery, CurrentAccountsListItem, Page } from './queries';
import type { CurrentAccountsSnapshot } from '../domain/types';
import type { CurrentAccountsReadModel } from '../infrastructure/read-model';
export class CurrentAccountsQueryHandler {
  constructor(private readonly read: CurrentAccountsReadModel) {}
  async handle(query: CurrentAccountsQuery): Promise<unknown> {
    switch (query.type) {
      case 'GetCurrentAccountsById':
        return this.read.byId(query.productId);
      case 'ListCurrentAccountsByCustomer':
        return this.read.byCustomer(query.customerId, query.status);
      case 'SearchCurrentAccounts':
        return this.read.search(query.q, query.riskTier, query.page, query.pageSize);
      case 'GetCurrentAccountsAudit':
        return this.read.audit(query.productId, query.limit ?? 50);
      case 'CurrentAccountsPortfolioSummary':
        return this.read.portfolioSummary(query.customerId);
      case 'CurrentAccountsRiskReport':
        return this.read.riskReport(query.from, query.to);
      default:
        throw new Error('Unknown query');
    }
  }
}
export type { CurrentAccountsListItem, Page, CurrentAccountsSnapshot };
