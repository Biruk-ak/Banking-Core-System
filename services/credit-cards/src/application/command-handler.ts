import { Money, type CurrencyCode } from '../../../../packages/domain-core/src';
import { CreditCardsAggregate } from '../domain/aggregate';
import type { CreditCardsCommand, CommandResult } from './commands';
import type { CreditCardsFeeSchedule, CreditCardsLimits } from '../domain/types';
import type { EventBus } from '../../../shared/infra/event-bus';
import type { CreditCardsRepository } from '../infrastructure/repository';
const DEFAULT_FEES: CreditCardsFeeSchedule = {
  monthlyMaintenanceMinor: 500,
  transactionFeeMinor: 25,
  overdraftFeeMinor: 1500,
  earlyClosurePenaltyBps: 50,
  fxMarkupBps: 30,
};
const DEFAULT_LIMITS: CreditCardsLimits = {
  dailyDebitMinor: 500_000_00,
  dailyCreditMinor: 1_000_000_00,
  singleTxnMinor: 100_000_00,
  monthlyVolumeMinor: 5_000_000_00,
  openPositionsMax: 20,
};
export class CreditCardsCommandHandler {
  constructor(
    private readonly repo: CreditCardsRepository,
    private readonly bus: EventBus,
  ) {}
  async handle(cmd: CreditCardsCommand): Promise<CommandResult> {
    try {
      switch (cmd.type) {
        case 'OpenCreditCards': {
          const id = crypto.randomUUID();
          const agg = CreditCardsAggregate.open(
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
        case 'ActivateCreditCards': {
          const agg = await this.load(cmd.productId);
          agg.activate(cmd.actorId);
          await this.persist(agg);
          return { success: true, productId: cmd.productId, version: agg.toSnapshot().version };
        }
        case 'SuspendCreditCards': {
          const agg = await this.load(cmd.productId);
          agg.suspend(cmd.actorId, cmd.reason);
          await this.persist(agg);
          return { success: true, productId: cmd.productId };
        }
        case 'CloseCreditCards': {
          const agg = await this.load(cmd.productId);
          agg.close(cmd.actorId);
          await this.persist(agg);
          return { success: true, productId: cmd.productId };
        }
        case 'CreditCreditCards': {
          const agg = await this.load(cmd.productId);
          agg.credit(Money.of(cmd.amountMajor, cmd.currency as CurrencyCode), cmd.actorId, cmd.reference);
          await this.persist(agg);
          return { success: true, productId: cmd.productId };
        }
        case 'DebitCreditCards': {
          const agg = await this.load(cmd.productId);
          agg.debit(Money.of(cmd.amountMajor, cmd.currency as CurrencyCode), cmd.actorId, cmd.reference);
          await this.persist(agg);
          return { success: true, productId: cmd.productId };
        }
        case 'ApplyCreditCardsFee': {
          const agg = await this.load(cmd.productId);
          agg.applyFee(cmd.actorId);
          await this.persist(agg);
          return { success: true, productId: cmd.productId };
        }
        case 'ReassessCreditCardsRisk': {
          const agg = await this.load(cmd.productId);
          agg.reassessRisk(cmd.score, cmd.actorId);
          await this.persist(agg);
          return { success: true, productId: cmd.productId };
        }
        case 'UpdateCreditCardsLimits': {
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
  private async load(id: string): Promise<CreditCardsAggregate> {
    const found = await this.repo.findById(id);
    if (!found) throw new Error('CreditCards not found: ' + id);
    return found;
  }
  private async persist(agg: CreditCardsAggregate): Promise<void> {
    await this.repo.save(agg);
    const events = agg.pullDomainEvents();
    for (const ev of events) await this.bus.publish(ev.eventType, ev);
  }
}
