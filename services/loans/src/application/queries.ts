/** CQRS queries for Loans */
export type LoansQuery =
  | { type: 'GetLoansById'; productId: string }
  | { type: 'ListLoansByCustomer'; customerId: string; status?: string }
  | { type: 'SearchLoans'; q: string; riskTier?: string; page: number; pageSize: number }
  | { type: 'GetLoansAudit'; productId: string; limit?: number }
  | { type: 'LoansPortfolioSummary'; customerId: string }
  | { type: 'LoansRiskReport'; from: string; to: string };
export interface LoansListItem {
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
