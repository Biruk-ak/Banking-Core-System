/** InternetBanking domain types — Banking Core System */
export type InternetBankingStatus = 'draft' | 'pending' | 'active' | 'suspended' | 'closed' | 'defaulted' | 'matured';
export type InternetBankingRiskTier = 'low' | 'medium' | 'high' | 'critical';
export interface InternetBankingCustomerRef {
  customerId: string;
  kycLevel: 1 | 2 | 3;
  residencyCountry: string;
  taxIdHash: string;
}
export interface InternetBankingFeeSchedule {
  monthlyMaintenanceMinor: number;
  transactionFeeMinor: number;
  overdraftFeeMinor: number;
  earlyClosurePenaltyBps: number;
  fxMarkupBps: number;
}
export interface InternetBankingLimits {
  dailyDebitMinor: number;
  dailyCreditMinor: number;
  singleTxnMinor: number;
  monthlyVolumeMinor: number;
  openPositionsMax: number;
}
export interface InternetBankingAuditTrail {
  actorId: string;
  action: string;
  at: string;
  ip?: string;
  metadata?: Record<string, unknown>;
}
export interface InternetBankingSnapshot {
  id: string;
  customerId: string;
  status: InternetBankingStatus;
  riskTier: InternetBankingRiskTier;
  balanceMinor: number;
  currency: string;
  openedAt: string;
  updatedAt: string;
  version: number;
  fees: InternetBankingFeeSchedule;
  limits: InternetBankingLimits;
  tags: string[];
  metadata: Record<string, unknown>;
}
