/** CreditCards domain types — Banking Core System */
export type CreditCardsStatus = 'draft' | 'pending' | 'active' | 'suspended' | 'closed' | 'defaulted' | 'matured';
export type CreditCardsRiskTier = 'low' | 'medium' | 'high' | 'critical';
export interface CreditCardsCustomerRef {
  customerId: string;
  kycLevel: 1 | 2 | 3;
  residencyCountry: string;
  taxIdHash: string;
}
export interface CreditCardsFeeSchedule {
  monthlyMaintenanceMinor: number;
  transactionFeeMinor: number;
  overdraftFeeMinor: number;
  earlyClosurePenaltyBps: number;
  fxMarkupBps: number;
}
export interface CreditCardsLimits {
  dailyDebitMinor: number;
  dailyCreditMinor: number;
  singleTxnMinor: number;
  monthlyVolumeMinor: number;
  openPositionsMax: number;
}
export interface CreditCardsAuditTrail {
  actorId: string;
  action: string;
  at: string;
  ip?: string;
  metadata?: Record<string, unknown>;
}
export interface CreditCardsSnapshot {
  id: string;
  customerId: string;
  status: CreditCardsStatus;
  riskTier: CreditCardsRiskTier;
  balanceMinor: number;
  currency: string;
  openedAt: string;
  updatedAt: string;
  version: number;
  fees: CreditCardsFeeSchedule;
  limits: CreditCardsLimits;
  tags: string[];
  metadata: Record<string, unknown>;
}
