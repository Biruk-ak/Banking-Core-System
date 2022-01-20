/** CQRS queries for Investments */
export type InvestmentsQuery =
  | { type: 'GetInvestmentsById'; productId: string }
  | { type: 'ListInvestmentsByCustomer'; customerId: string; status?: string }
  | { type: 'SearchInvestments'; q: string; riskTier?: string; page: number; pageSize: number }
  | { type: 'GetInvestmentsAudit'; productId: string; limit?: number }
  | { type: 'InvestmentsPortfolioSummary'; customerId: string }
  | { type: 'InvestmentsRiskReport'; from: string; to: string };
export interface InvestmentsListItem {
  id: string;
  customerId: string;
  status: string;
  balanceMinor: number;
  currency: string;
  riskTier: string;
}
export interface Page<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
