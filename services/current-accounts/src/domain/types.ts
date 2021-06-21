/** CurrentAccounts domain types — Banking Core System */
export type CurrentAccountsStatus = 'draft' | 'pending' | 'active' | 'suspended' | 'closed' | 'defaulted' | 'matured';
export type CurrentAccountsRiskTier = 'low' | 'medium' | 'high' | 'critical';
export interface CurrentAccountsCustomerRef {
  customerId: string;
  kycLevel: 1 | 2 | 3;
  residencyCountry: string;
  taxIdHash: string;
}
export interface CurrentAccountsFeeSchedule {
  monthlyMaintenanceMinor: number;
  transactionFeeMinor: number;
  overdraftFeeMinor: number;
  earlyClosurePenaltyBps: number;
  fxMarkupBps: number;
}
export interface CurrentAccountsLimits {
  dailyDebitMinor: number;
  dailyCreditMinor: number;
  singleTxnMinor: number;
  monthlyVolumeMinor: number;
  openPositionsMax: number;
}
export interface CurrentAccountsAuditTrail {
  actorId: string;
  action: string;
  at: string;
  ip?: string;
  metadata?: Record<string, unknown>;
}
export interface CurrentAccountsSnapshot {
  id: string;
  customerId: string;
  status: CurrentAccountsStatus;
  riskTier: CurrentAccountsRiskTier;
  balanceMinor: number;
  currency: string;
  openedAt: string;
  updatedAt: string;
  version: number;
  fees: CurrentAccountsFeeSchedule;
  limits: CurrentAccountsLimits;
  tags: string[];
  metadata: Record<string, unknown>;
}
