import { Money, type CurrencyCode } from '../../../../packages/domain-core/src';
import { SavingsAggregate } from '../domain/aggregate';
import type { SavingsCommand, CommandResult } from './commands';
import type { SavingsFeeSchedule, SavingsLimits } from '../domain/types';
import type { EventBus } from '../../../shared/infra/event-bus';
import type { SavingsRepository } from '../infrastructure/repository';
const DEFAULT_FEES: SavingsFeeSchedule = {
  monthlyMaintenanceMinor: 500,
  transactionFeeMinor: 25,
  overdraftFeeMinor: 1500,
  earlyClosurePenaltyBps: 50,
  fxMarkupBps: 30,
};
const DEFAULT_LIMITS: SavingsLimits = {
  dailyDebitMinor: 500_000_00,
  dailyCreditMinor: 1_000_000_00,
  singleTxnMinor: 100_000_00,
  monthlyVolumeMinor: 5_000_000_00,
  openPositionsMax: 20,
};
export class SavingsCommandHandler {
  constructor(
    private readonly repo: SavingsRepository,
    private readonly bus: EventBus,
  ) {}
  async handle(cmd: SavingsCommand): Promise<CommandResult> {
    try {
      switch (cmd.type) {
        case 'OpenSavings': {
          const id = crypto.randomUUID();
          const agg = SavingsAggregate.open(
            id,
            cmd.customerId,
            cmd.currency as CurrencyCode,
            DEFAULT_FEES,
            DEFAULT_LIMITS,
            cmd.actorId,
          );
          await this.persist(agg);
          return { success: true, productId: id, version: agg.toSnapshot().version, eventsPublished: 1 };
        }
        case 'ActivateSavings': {
          const agg = await this.load(cmd.productId);
          agg.activate(cmd.actorId);
          await this.persist(agg);
          return { success: true, productId: cmd.productId, version: agg.toSnapshot().version };
        }
        case 'SuspendSavings': {
          const agg = await this.load(cmd.productId);
          agg.suspend(cmd.actorId, cmd.reason);
          await this.persist(agg);
          return { success: true, productId: cmd.productId };
        }
        case 'CloseSavings': {
          const agg = await this.load(cmd.productId);
          agg.close(cmd.actorId);
          await this.persist(agg);
          return { success: true, productId: cmd.productId };
        }
        case 'CreditSavings': {
          const agg = await this.load(cmd.productId);
          agg.credit(Money.of(cmd.amountMajor, cmd.currency as CurrencyCode), cmd.actorId, cmd.reference);
          await this.persist(agg);
          return { success: true, productId: cmd.productId };
        }
        case 'DebitSavings': {
          const agg = await this.load(cmd.productId);
          agg.debit(Money.of(cmd.amountMajor, cmd.currency as CurrencyCode), cmd.actorId, cmd.reference);
          await this.persist(agg);
          return { success: true, productId: cmd.productId };
        }
        case 'ApplySavingsFee': {
          const agg = await this.load(cmd.productId);
          agg.applyFee(cmd.actorId);
          await this.persist(agg);
          return { success: true, productId: cmd.productId };
        }
        case 'ReassessSavingsRisk': {
          const agg = await this.load(cmd.productId);
          agg.reassessRisk(cmd.score, cmd.actorId);
          await this.persist(agg);
          return { success: true, productId: cmd.productId };
        }
        case 'UpdateSavingsLimits': {
          const agg = await this.load(cmd.productId);
          agg.updateLimits(cmd.limits as never, cmd.actorId);
          await this.persist(agg);
          return { success: true, productId: cmd.productId };
        }
        default:
          return { success: false, error: 'Unknown command' };
      }
    } catch (e) {
      return { success: false, error: e instanceof Error ? e.message : String(e) };
    }
  }
  private async load(id: string): Promise<SavingsAggregate> {
    const found = await this.repo.findById(id);
    if (!found) throw new Error('Savings not found: ' + id);
    return found;
  }
  private async persist(agg: SavingsAggregate): Promise<void> {
    await this.repo.save(agg);
    const events = agg.pullDomainEvents();
    for (const ev of events) await this.bus.publish(ev.eventType, ev);
  }
}
