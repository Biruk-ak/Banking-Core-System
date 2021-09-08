/** CQRS commands for CreditCards */
export type CreditCardsCommand =
  | { type: 'OpenCreditCards'; customerId: string; currency: string; actorId: string }
  | { type: 'ActivateCreditCards'; productId: string; actorId: string }
  | { type: 'SuspendCreditCards'; productId: string; actorId: string; reason: string }
  | { type: 'CloseCreditCards'; productId: string; actorId: string }
  | { type: 'CreditCreditCards'; productId: string; amountMajor: number; currency: string; actorId: string; reference: string }
  | { type: 'DebitCreditCards'; productId: string; amountMajor: number; currency: string; actorId: string; reference: string }
  | { type: 'ApplyCreditCardsFee'; productId: string; actorId: string }
  | { type: 'ReassessCreditCardsRisk'; productId: string; score: number; actorId: string }
  | { type: 'UpdateCreditCardsLimits'; productId: string; limits: Record<string, number>; actorId: string };
export interface CommandResult {
  success: boolean;
  productId?: string;
  version?: number;
  error?: string;
  eventsPublished?: number;
}
