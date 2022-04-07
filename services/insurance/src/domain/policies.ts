import type { InsuranceSnapshot, InsuranceRiskTier } from './types';
export interface PolicyDecision {
  allowed: boolean;
  reasons: string[];
  requiredApprovals: number;
  riskImpact: InsuranceRiskTier;
}
export class InsurancePolicyEngine {
  evaluateOpen(customerKycLevel: number, residencyCountry: string, sanctioned: boolean): PolicyDecision {
    const reasons: string[] = [];
    if (sanctioned) reasons.push('Customer appears on sanctions list');
    if (customerKycLevel < 2) reasons.push('KYC level below required threshold');
    if (['KP', 'IR', 'SY'].includes(residencyCountry)) reasons.push('Restricted residency jurisdiction');
    return {
      allowed: reasons.length === 0,
      reasons,
      requiredApprovals: reasons.length > 0 ? 2 : 0,
      riskImpact: reasons.length ? 'high' : 'low',
    };
  }
  evaluateLargeDebit(snap: InsuranceSnapshot, amountMinor: number): PolicyDecision {
    const reasons: string[] = [];
    const pct = snap.balanceMinor === 0 ? 100 : (amountMinor / snap.balanceMinor) * 100;
    if (amountMinor > snap.limits.singleTxnMinor) reasons.push('Exceeds single transaction limit');
    if (pct > 80) reasons.push('Debit exceeds 80% of available balance');
    if (snap.riskTier === 'critical') reasons.push('Account in critical risk tier');
    if (snap.status !== 'active') reasons.push('Account not active');
    return {
      allowed: reasons.length === 0,
      reasons,
      requiredApprovals: amountMinor > 50_000_00 ? 1 : 0,
      riskImpact: pct > 50 ? 'medium' : 'low',
    };
  }
  evaluateClosure(snap: InsuranceSnapshot): PolicyDecision {
    const reasons: string[] = [];
    if (snap.balanceMinor !== 0) reasons.push('Non-zero balance');
    if (snap.tags.includes('litigation-hold')) reasons.push('Litigation hold active');
    if (snap.tags.includes('aml-freeze')) reasons.push('AML freeze active');
    return {
      allowed: reasons.length === 0,
      reasons,
      requiredApprovals: snap.riskTier === 'high' || snap.riskTier === 'critical' ? 2 : 1,
      riskImpact: snap.riskTier,
    };
  }
  scoreInterestEligibility(snap: InsuranceSnapshot, daysActive: number): number {
    let score = 50;
    if (snap.status === 'active') score += 20;
    if (snap.balanceMinor > 100_000_00) score += 15;
    if (daysActive > 365) score += 10;
    if (snap.riskTier === 'low') score += 5;
    if (snap.riskTier === 'critical') score -= 30;
    return Math.max(0, Math.min(100, score));
  }
  computeProvisioning(snap: InsuranceSnapshot): number {
    const rates: Record<InsuranceRiskTier, number> = { low: 0.01, medium: 0.03, high: 0.1, critical: 0.25 };
    return Math.round(snap.balanceMinor * rates[snap.riskTier]);
  }
}
