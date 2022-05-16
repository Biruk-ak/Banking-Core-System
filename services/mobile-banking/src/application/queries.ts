/** CQRS queries for MobileBanking */
export type MobileBankingQuery =
  | { type: 'GetMobileBankingById'; productId: string }
  | { type: 'ListMobileBankingByCustomer'; customerId: string; status?: string }
  | { type: 'SearchMobileBanking'; q: string; riskTier?: string; page: number; pageSize: number }
  | { type: 'GetMobileBankingAudit'; productId: string; limit?: number }
  | { type: 'MobileBankingPortfolioSummary'; customerId: string }
  | { type: 'MobileBankingRiskReport'; from: string; to: string };
export interface MobileBankingListItem {
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
