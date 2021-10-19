/** Mortgages domain types — Banking Core System */
export type MortgagesStatus = 'draft' | 'pending' | 'active' | 'suspended' | 'closed' | 'defaulted' | 'matured';
export type MortgagesRiskTier = 'low' | 'medium' | 'high' | 'critical';
export interface MortgagesCustomerRef {
  customerId: string;
  kycLevel: 1 | 2 | 3;
  residencyCountry: string;
  taxIdHash: string;
}
export interface MortgagesFeeSchedule {
  monthlyMaintenanceMinor: number;
  transactionFeeMinor: number;
  overdraftFeeMinor: number;
  earlyClosurePenaltyBps: number;
  fxMarkupBps: number;
}
export interface MortgagesLimits {
  dailyDebitMinor: number;
  dailyCreditMinor: number;
  singleTxnMinor: number;
  monthlyVolumeMinor: number;
  openPositionsMax: number;
}
export interface MortgagesAuditTrail {
  actorId: string;
  action: string;
  at: string;
  ip?: string;
  metadata?: Record<string, unknown>;
}
export interface MortgagesSnapshot {
  id: string;
  customerId: string;
  status: MortgagesStatus;
  riskTier: MortgagesRiskTier;
  balanceMinor: number;
  currency: string;
  openedAt: string;
  updatedAt: string;
  version: number;
  fees: MortgagesFeeSchedule;
  limits: MortgagesLimits;
  tags: string[];
  metadata: Record<string, unknown>;
}
