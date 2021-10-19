/** CQRS commands for Mortgages */
export type MortgagesCommand =
  | { type: 'OpenMortgages'; customerId: string; currency: string; actorId: string }
  | { type: 'ActivateMortgages'; productId: string; actorId: string }
  | { type: 'SuspendMortgages'; productId: string; actorId: string; reason: string }
  | { type: 'CloseMortgages'; productId: string; actorId: string }
  | { type: 'CreditMortgages'; productId: string; amountMajor: number; currency: string; actorId: string; reference: string }
  | { type: 'DebitMortgages'; productId: string; amountMajor: number; currency: string; actorId: string; reference: string }
  | { type: 'ApplyMortgagesFee'; productId: string; actorId: string }
  | { type: 'ReassessMortgagesRisk'; productId: string; score: number; actorId: string }
  | { type: 'UpdateMortgagesLimits'; productId: string; limits: Record<string, number>; actorId: string };
export interface CommandResult {
  success: boolean;
  productId?: string;
  version?: number;
  error?: string;
  eventsPublished?: number;
}
