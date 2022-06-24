/** CQRS queries for InternetBanking */
export type InternetBankingQuery =
  | { type: 'GetInternetBankingById'; productId: string }
  | { type: 'ListInternetBankingByCustomer'; customerId: string; status?: string }
  | { type: 'SearchInternetBanking'; q: string; riskTier?: string; page: number; pageSize: number }
  | { type: 'GetInternetBankingAudit'; productId: string; limit?: number }
  | { type: 'InternetBankingPortfolioSummary'; customerId: string }
  | { type: 'InternetBankingRiskReport'; from: string; to: string };
export interface InternetBankingListItem {
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
