/** Insurance domain types — Banking Core System */
export type InsuranceStatus = 'draft' | 'pending' | 'active' | 'suspended' | 'closed' | 'defaulted' | 'matured';
export type InsuranceRiskTier = 'low' | 'medium' | 'high' | 'critical';
export interface InsuranceCustomerRef {
  customerId: string;
  kycLevel: 1 | 2 | 3;
  residencyCountry: string;
  taxIdHash: string;
}
export interface InsuranceFeeSchedule {
  monthlyMaintenanceMinor: number;
  transactionFeeMinor: number;
  overdraftFeeMinor: number;
  earlyClosurePenaltyBps: number;
  fxMarkupBps: number;
}
export interface InsuranceLimits {
  dailyDebitMinor: number;
  dailyCreditMinor: number;
  singleTxnMinor: number;
  monthlyVolumeMinor: number;
  openPositionsMax: number;
}
export interface InsuranceAuditTrail {
  actorId: string;
  action: string;
  at: string;
  ip?: string;
  metadata?: Record<string, unknown>;
}
export interface InsuranceSnapshot {
  id: string;
  customerId: string;
  status: InsuranceStatus;
  riskTier: InsuranceRiskTier;
  balanceMinor: number;
  currency: string;
  openedAt: string;
  updatedAt: string;
  version: number;
  fees: InsuranceFeeSchedule;
  limits: InsuranceLimits;
  tags: string[];
  metadata: Record<string, unknown>;
}
