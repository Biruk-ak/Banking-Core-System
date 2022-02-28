/** ForeignExchange domain types — Banking Core System */
export type ForeignExchangeStatus = 'draft' | 'pending' | 'active' | 'suspended' | 'closed' | 'defaulted' | 'matured';
export type ForeignExchangeRiskTier = 'low' | 'medium' | 'high' | 'critical';
export interface ForeignExchangeCustomerRef {
  customerId: string;
  kycLevel: 1 | 2 | 3;
  residencyCountry: string;
  taxIdHash: string;
}
export interface ForeignExchangeFeeSchedule {
  monthlyMaintenanceMinor: number;
  transactionFeeMinor: number;
  overdraftFeeMinor: number;
  earlyClosurePenaltyBps: number;
  fxMarkupBps: number;
}
export interface ForeignExchangeLimits {
  dailyDebitMinor: number;
  dailyCreditMinor: number;
  singleTxnMinor: number;
  monthlyVolumeMinor: number;
  openPositionsMax: number;
}
export interface ForeignExchangeAuditTrail {
  actorId: string;
  action: string;
  at: string;
  ip?: string;
  metadata?: Record<string, unknown>;
}
export interface ForeignExchangeSnapshot {
  id: string;
  customerId: string;
  status: ForeignExchangeStatus;
  riskTier: ForeignExchangeRiskTier;
  balanceMinor: number;
  currency: string;
  openedAt: string;
  updatedAt: string;
  version: number;
  fees: ForeignExchangeFeeSchedule;
  limits: ForeignExchangeLimits;
  tags: string[];
  metadata: Record<string, unknown>;
}
