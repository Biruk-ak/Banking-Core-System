/** CQRS queries for ForeignExchange */
export type ForeignExchangeQuery =
  | { type: 'GetForeignExchangeById'; productId: string }
  | { type: 'ListForeignExchangeByCustomer'; customerId: string; status?: string }
  | { type: 'SearchForeignExchange'; q: string; riskTier?: string; page: number; pageSize: number }
  | { type: 'GetForeignExchangeAudit'; productId: string; limit?: number }
  | { type: 'ForeignExchangePortfolioSummary'; customerId: string }
  | { type: 'ForeignExchangeRiskReport'; from: string; to: string };
export interface ForeignExchangeListItem {
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
