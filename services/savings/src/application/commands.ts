/** CQRS commands for Savings */
export type SavingsCommand =
  | { type: 'OpenSavings'; customerId: string; currency: string; actorId: string }
  | { type: 'ActivateSavings'; productId: string; actorId: string }
  | { type: 'SuspendSavings'; productId: string; actorId: string; reason: string }
  | { type: 'CloseSavings'; productId: string; actorId: string }
  | { type: 'CreditSavings'; productId: string; amountMajor: number; currency: string; actorId: string; reference: string }
  | { type: 'DebitSavings'; productId: string; amountMajor: number; currency: string; actorId: string; reference: string }
  | { type: 'ApplySavingsFee'; productId: string; actorId: string }
  | { type: 'ReassessSavingsRisk'; productId: string; score: number; actorId: string }
  | { type: 'UpdateSavingsLimits'; productId: string; limits: Record<string, number>; actorId: string };
export interface CommandResult {
  success: boolean;
  productId?: string;
  version?: number;
  error?: string;
  eventsPublished?: number;
}
