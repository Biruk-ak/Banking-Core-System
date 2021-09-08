/** CQRS queries for CreditCards */
export type CreditCardsQuery =
  | { type: 'GetCreditCardsById'; productId: string }
  | { type: 'ListCreditCardsByCustomer'; customerId: string; status?: string }
  | { type: 'SearchCreditCards'; q: string; riskTier?: string; page: number; pageSize: number }
  | { type: 'GetCreditCardsAudit'; productId: string; limit?: number }
  | { type: 'CreditCardsPortfolioSummary'; customerId: string }
  | { type: 'CreditCardsRiskReport'; from: string; to: string };
export interface CreditCardsListItem {
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
