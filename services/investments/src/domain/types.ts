/** Investments domain types — Banking Core System */
export type InvestmentsStatus = 'draft' | 'pending' | 'active' | 'suspended' | 'closed' | 'defaulted' | 'matured';
export type InvestmentsRiskTier = 'low' | 'medium' | 'high' | 'critical';
export interface InvestmentsCustomerRef {
  customerId: string;
  kycLevel: 1 | 2 | 3;
  residencyCountry: string;
  taxIdHash: string;
}
export interface InvestmentsFeeSchedule {
  monthlyMaintenanceMinor: number;
  transactionFeeMinor: number;
  overdraftFeeMinor: number;
  earlyClosurePenaltyBps: number;
  fxMarkupBps: number;
}
export interface InvestmentsLimits {
  dailyDebitMinor: number;
  dailyCreditMinor: number;
  singleTxnMinor: number;
  monthlyVolumeMinor: number;
  openPositionsMax: number;
}
export interface InvestmentsAuditTrail {
  actorId: string;
  action: string;
  at: string;
  ip?: string;
  metadata?: Record<string, unknown>;
}
export interface InvestmentsSnapshot {
  id: string;
  customerId: string;
  status: InvestmentsStatus;
  riskTier: InvestmentsRiskTier;
  balanceMinor: number;
  currency: string;
  openedAt: string;
  updatedAt: string;
  version: number;
  fees: InvestmentsFeeSchedule;
  limits: InvestmentsLimits;
  tags: string[];
  metadata: Record<string, unknown>;
}
