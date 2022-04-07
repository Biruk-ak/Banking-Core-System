import type { InsuranceQuery, InsuranceListItem, Page } from './queries';
import type { InsuranceSnapshot } from '../domain/types';
import type { InsuranceReadModel } from '../infrastructure/read-model';
export class InsuranceQueryHandler {
  constructor(private readonly read: InsuranceReadModel) {}
  async handle(query: InsuranceQuery): Promise<unknown> {
    switch (query.type) {
      case 'GetInsuranceById':
        return this.read.byId(query.productId);
      case 'ListInsuranceByCustomer':
        return this.read.byCustomer(query.customerId, query.status);
      case 'SearchInsurance':
        return this.read.search(query.q, query.riskTier, query.page, query.pageSize);
      case 'GetInsuranceAudit':
        return this.read.audit(query.productId, query.limit ?? 50);
      case 'InsurancePortfolioSummary':
        return this.read.portfolioSummary(query.customerId);
      case 'InsuranceRiskReport':
        return this.read.riskReport(query.from, query.to);
      default:
        throw new Error('Unknown query');
    }
  }
}
export type { InsuranceListItem, Page, InsuranceSnapshot };
