/** CQRS queries for Insurance */
export type InsuranceQuery =
  | { type: 'GetInsuranceById'; productId: string }
  | { type: 'ListInsuranceByCustomer'; customerId: string; status?: string }
  | { type: 'SearchInsurance'; q: string; riskTier?: string; page: number; pageSize: number }
  | { type: 'GetInsuranceAudit'; productId: string; limit?: number }
  | { type: 'InsurancePortfolioSummary'; customerId: string }
  | { type: 'InsuranceRiskReport'; from: string; to: string };
export interface InsuranceListItem {
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
