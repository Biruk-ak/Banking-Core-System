/** MobileBanking domain types — Banking Core System */
export type MobileBankingStatus = 'draft' | 'pending' | 'active' | 'suspended' | 'closed' | 'defaulted' | 'matured';
export type MobileBankingRiskTier = 'low' | 'medium' | 'high' | 'critical';
export interface MobileBankingCustomerRef {
  customerId: string;
  kycLevel: 1 | 2 | 3;
  residencyCountry: string;
  taxIdHash: string;
}
export interface MobileBankingFeeSchedule {
  monthlyMaintenanceMinor: number;
  transactionFeeMinor: number;
  overdraftFeeMinor: number;
  earlyClosurePenaltyBps: number;
  fxMarkupBps: number;
}
export interface MobileBankingLimits {
  dailyDebitMinor: number;
  dailyCreditMinor: number;
  singleTxnMinor: number;
  monthlyVolumeMinor: number;
  openPositionsMax: number;
}
export interface MobileBankingAuditTrail {
  actorId: string;
  action: string;
  at: string;
  ip?: string;
  metadata?: Record<string, unknown>;
}
export interface MobileBankingSnapshot {
  id: string;
  customerId: string;
  status: MobileBankingStatus;
  riskTier: MobileBankingRiskTier;
  balanceMinor: number;
  currency: string;
  openedAt: string;
  updatedAt: string;
  version: number;
  fees: MobileBankingFeeSchedule;
  limits: MobileBankingLimits;
  tags: string[];
  metadata: Record<string, unknown>;
}
