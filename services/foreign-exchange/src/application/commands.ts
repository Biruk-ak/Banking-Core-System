/** CQRS commands for ForeignExchange */
export type ForeignExchangeCommand =
  | { type: 'OpenForeignExchange'; customerId: string; currency: string; actorId: string }
  | { type: 'ActivateForeignExchange'; productId: string; actorId: string }
  | { type: 'SuspendForeignExchange'; productId: string; actorId: string; reason: string }
  | { type: 'CloseForeignExchange'; productId: string; actorId: string }
  | { type: 'CreditForeignExchange'; productId: string; amountMajor: number; currency: string; actorId: string; reference: string }
  | { type: 'DebitForeignExchange'; productId: string; amountMajor: number; currency: string; actorId: string; reference: string }
  | { type: 'ApplyForeignExchangeFee'; productId: string; actorId: string }
  | { type: 'ReassessForeignExchangeRisk'; productId: string; score: number; actorId: string }
  | { type: 'UpdateForeignExchangeLimits'; productId: string; limits: Record<string, number>; actorId: string };
export interface CommandResult {
  success: boolean;
  productId?: string;
  version?: number;
  error?: string;
  eventsPublished?: number;
}
