import type { CreditCardsQuery, CreditCardsListItem, Page } from './queries';
import type { CreditCardsSnapshot } from '../domain/types';
import type { CreditCardsReadModel } from '../infrastructure/read-model';
export class CreditCardsQueryHandler {
  constructor(private readonly read: CreditCardsReadModel) {}
  async handle(query: CreditCardsQuery): Promise<unknown> {
    switch (query.type) {
      case 'GetCreditCardsById':
        return this.read.byId(query.productId);
      case 'ListCreditCardsByCustomer':
        return this.read.byCustomer(query.customerId, query.status);
      case 'SearchCreditCards':
        return this.read.search(query.q, query.riskTier, query.page, query.pageSize);
      case 'GetCreditCardsAudit':
        return this.read.audit(query.productId, query.limit ?? 50);
      case 'CreditCardsPortfolioSummary':
        return this.read.portfolioSummary(query.customerId);
      case 'CreditCardsRiskReport':
        return this.read.riskReport(query.from, query.to);
      default:
        throw new Error('Unknown query');
    }
  }
}
export type { CreditCardsListItem, Page, CreditCardsSnapshot };
