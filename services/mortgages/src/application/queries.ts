/** CQRS queries for Mortgages */
export type MortgagesQuery =
  | { type: 'GetMortgagesById'; productId: string }
  | { type: 'ListMortgagesByCustomer'; customerId: string; status?: string }
  | { type: 'SearchMortgages'; q: string; riskTier?: string; page: number; pageSize: number }
  | { type: 'GetMortgagesAudit'; productId: string; limit?: number }
  | { type: 'MortgagesPortfolioSummary'; customerId: string }
  | { type: 'MortgagesRiskReport'; from: string; to: string };
export interface MortgagesListItem {
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
