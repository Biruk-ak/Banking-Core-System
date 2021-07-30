/** Loans domain types — Banking Core System */
export type LoansStatus = 'draft' | 'pending' | 'active' | 'suspended' | 'closed' | 'defaulted' | 'matured';
export type LoansRiskTier = 'low' | 'medium' | 'high' | 'critical';
export interface LoansCustomerRef {
  customerId: string;
  kycLevel: 1 | 2 | 3;
  residencyCountry: string;
  taxIdHash: string;
}
export interface LoansFeeSchedule {
  monthlyMaintenanceMinor: number;
  transactionFeeMinor: number;
  overdraftFeeMinor: number;
  earlyClosurePenaltyBps: number;
  fxMarkupBps: number;
}
export interface LoansLimits {
  dailyDebitMinor: number;
  dailyCreditMinor: number;
  singleTxnMinor: number;
  monthlyVolumeMinor: number;
  openPositionsMax: number;
}
export interface LoansAuditTrail {
  actorId: string;
  action: string;
  at: string;
  ip?: string;
  metadata?: Record<string, unknown>;
}
export interface LoansSnapshot {
  id: string;
  customerId: string;
  status: LoansStatus;
  riskTier: LoansRiskTier;
  balanceMinor: number;
  currency: string;
  openedAt: string;
  updatedAt: string;
  version: number;
  fees: LoansFeeSchedule;
  limits: LoansLimits;
  tags: string[];
  metadata: Record<string, unknown>;
}
