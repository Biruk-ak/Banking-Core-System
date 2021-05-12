import { AggregateRoot, createEvent, Money, type CurrencyCode } from '../../../../packages/domain-core/src';
import type { SavingsStatus, SavingsRiskTier, SavingsFeeSchedule, SavingsLimits, SavingsSnapshot, SavingsAuditTrail } from './types';
export class SavingsAggregate extends AggregateRoot {
  private status: SavingsStatus = 'draft';
  private riskTier: SavingsRiskTier = 'medium';
  private balance: Money;
  private version = 0;
  private audit: SavingsAuditTrail[] = [];
  private tags: string[] = [];
  private metadata: Record<string, unknown> = {};
  private openedAt?: Date;
  private updatedAt = new Date();
  private constructor(
    id: string,
    private readonly customerId: string,
    currency: CurrencyCode,
    private fees: SavingsFeeSchedule,
    private limits: SavingsLimits,
  ) {
    super(id);
    this.balance = Money.zero(currency);
  }
  static open(
    id: string,
    customerId: string,
    currency: CurrencyCode,
    fees: SavingsFeeSchedule,
    limits: SavingsLimits,
    actorId: string,
  ): SavingsAggregate {
    const agg = new SavingsAggregate(id, customerId, currency, fees, limits);
    agg.status = 'pending';
    agg.openedAt = new Date();
    agg.record('OPENED', actorId, { currency });
    agg.addDomainEvent(createEvent(id, 'savings.opened', { customerId, currency }));
    return agg;
  }
  activate(actorId: string): void {
    if (this.status !== 'pending' && this.status !== 'suspended') {
      throw new Error('Cannot activate from status ' + this.status);
    }
    this.status = 'active';
    this.bump(actorId, 'ACTIVATED');
    this.addDomainEvent(createEvent(this.id, 'savings.activated', { customerId: this.customerId }));
  }
  suspend(actorId: string, reason: string): void {
    if (this.status !== 'active') throw new Error('Only active products can be suspended');
    this.status = 'suspended';
    this.metadata.suspendReason = reason;
    this.bump(actorId, 'SUSPENDED', { reason });
    this.addDomainEvent(createEvent(this.id, 'savings.suspended', { reason }));
  }
  close(actorId: string): void {
    if (this.balance.isPositive()) throw new Error('Balance must be zero to close');
    this.status = 'closed';
    this.bump(actorId, 'CLOSED');
    this.addDomainEvent(createEvent(this.id, 'savings.closed', {}));
  }
  credit(amount: Money, actorId: string, reference: string): void {
    this.assertOperable();
    if (amount.currency !== this.balance.currency) throw new Error('Currency mismatch');
    if (amount.toMajorUnits() * 100 > this.limits.dailyCreditMinor) {
      throw new Error('Daily credit limit exceeded');
    }
    this.balance = this.balance.add(amount);
    this.bump(actorId, 'CREDIT', { reference, amount: amount.toMajorUnits() });
    this.addDomainEvent(createEvent(this.id, 'savings.credited', { reference, amountMinor: Number(amount.amountMinor) }));
  }
  debit(amount: Money, actorId: string, reference: string): void {
    this.assertOperable();
    if (amount.currency !== this.balance.currency) throw new Error('Currency mismatch');
    if (amount.greaterThan(this.balance)) throw new Error('Insufficient funds');
    if (amount.toMajorUnits() * 100 > this.limits.singleTxnMinor) throw new Error('Single transaction limit exceeded');
    this.balance = this.balance.subtract(amount);
    this.bump(actorId, 'DEBIT', { reference, amount: amount.toMajorUnits() });
    this.addDomainEvent(createEvent(this.id, 'savings.debited', { reference, amountMinor: Number(amount.amountMinor) }));
  }
  applyFee(actorId: string): void {
    const fee = Money.of(this.fees.monthlyMaintenanceMinor / 100, this.balance.currency);
    if (fee.greaterThan(this.balance)) {
      this.riskTier = 'high';
      this.bump(actorId, 'FEE_FAILED', {});
      return;
    }
    this.balance = this.balance.subtract(fee);
    this.bump(actorId, 'FEE_APPLIED', { fee: fee.toMajorUnits() });
  }
  reassessRisk(score: number, actorId: string): void {
    if (score >= 80) this.riskTier = 'critical';
    else if (score >= 60) this.riskTier = 'high';
    else if (score >= 30) this.riskTier = 'medium';
    else this.riskTier = 'low';
    this.bump(actorId, 'RISK_REASSESSED', { score, tier: this.riskTier });
  }
  updateLimits(limits: Partial<SavingsLimits>, actorId: string): void {
    this.limits = { ...this.limits, ...limits };
    this.bump(actorId, 'LIMITS_UPDATED', limits as Record<string, unknown>);
  }
  addTag(tag: string, actorId: string): void {
    if (!this.tags.includes(tag)) this.tags.push(tag);
    this.bump(actorId, 'TAG_ADDED', { tag });
  }
  toSnapshot(): SavingsSnapshot {
    return {
      id: this.id,
      customerId: this.customerId,
      status: this.status,
      riskTier: this.riskTier,
      balanceMinor: Number(this.balance.amountMinor),
      currency: this.balance.currency,
      openedAt: (this.openedAt ?? new Date()).toISOString(),
      updatedAt: this.updatedAt.toISOString(),
      version: this.version,
      fees: this.fees,
      limits: this.limits,
      tags: [...this.tags],
      metadata: { ...this.metadata },
    };
  }
  getAuditTrail(): SavingsAuditTrail[] { return [...this.audit]; }
  private assertOperable(): void {
    if (this.status !== 'active') throw new Error('Product not operable in status ' + this.status);
  }
  private bump(actorId: string, action: string, metadata?: Record<string, unknown>): void {
    this.version += 1;
    this.updatedAt = new Date();
    this.record(action, actorId, metadata);
  }
  private record(action: string, actorId: string, metadata?: Record<string, unknown>): void {
    this.audit.push({ actorId, action, at: new Date().toISOString(), metadata });
  }
}
