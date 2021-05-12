/** CQRS queries for Savings */
export type SavingsQuery =
  | { type: 'GetSavingsById'; productId: string }
  | { type: 'ListSavingsByCustomer'; customerId: string; status?: string }
  | { type: 'SearchSavings'; q: string; riskTier?: string; page: number; pageSize: number }
  | { type: 'GetSavingsAudit'; productId: string; limit?: number }
  | { type: 'SavingsPortfolioSummary'; customerId: string }
  | { type: 'SavingsRiskReport'; from: string; to: string };
export interface SavingsListItem {
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
