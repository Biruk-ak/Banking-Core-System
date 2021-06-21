/** CQRS queries for CurrentAccounts */
export type CurrentAccountsQuery =
  | { type: 'GetCurrentAccountsById'; productId: string }
  | { type: 'ListCurrentAccountsByCustomer'; customerId: string; status?: string }
  | { type: 'SearchCurrentAccounts'; q: string; riskTier?: string; page: number; pageSize: number }
  | { type: 'GetCurrentAccountsAudit'; productId: string; limit?: number }
  | { type: 'CurrentAccountsPortfolioSummary'; customerId: string }
  | { type: 'CurrentAccountsRiskReport'; from: string; to: string };
export interface CurrentAccountsListItem {
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
