/** Savings domain types — Banking Core System */
export type SavingsStatus = 'draft' | 'pending' | 'active' | 'suspended' | 'closed' | 'defaulted' | 'matured';
export type SavingsRiskTier = 'low' | 'medium' | 'high' | 'critical';
export interface SavingsCustomerRef {
  customerId: string;
  kycLevel: 1 | 2 | 3;
  residencyCountry: string;
  taxIdHash: string;
}
export interface SavingsFeeSchedule {
  monthlyMaintenanceMinor: number;
  transactionFeeMinor: number;
  overdraftFeeMinor: number;
  earlyClosurePenaltyBps: number;
  fxMarkupBps: number;
}
export interface SavingsLimits {
  dailyDebitMinor: number;
  dailyCreditMinor: number;
  singleTxnMinor: number;
  monthlyVolumeMinor: number;
  openPositionsMax: number;
}
export interface SavingsAuditTrail {
  actorId: string;
  action: string;
  at: string;
  ip?: string;
  metadata?: Record<string, unknown>;
}
export interface SavingsSnapshot {
  id: string;
  customerId: string;
  status: SavingsStatus;
  riskTier: SavingsRiskTier;
  balanceMinor: number;
  currency: string;
  openedAt: string;
  updatedAt: string;
  version: number;
  fees: SavingsFeeSchedule;
  limits: SavingsLimits;
  tags: string[];
  metadata: Record<string, unknown>;
}
