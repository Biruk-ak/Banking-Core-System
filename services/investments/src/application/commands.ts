/** CQRS commands for Investments */
export type InvestmentsCommand =
  | { type: 'OpenInvestments'; customerId: string; currency: string; actorId: string }
  | { type: 'ActivateInvestments'; productId: string; actorId: string }
  | { type: 'SuspendInvestments'; productId: string; actorId: string; reason: string }
  | { type: 'CloseInvestments'; productId: string; actorId: string }
  | { type: 'CreditInvestments'; productId: string; amountMajor: number; currency: string; actorId: string; reference: string }
  | { type: 'DebitInvestments'; productId: string; amountMajor: number; currency: string; actorId: string; reference: string }
  | { type: 'ApplyInvestmentsFee'; productId: string; actorId: string }
  | { type: 'ReassessInvestmentsRisk'; productId: string; score: number; actorId: string }
  | { type: 'UpdateInvestmentsLimits'; productId: string; limits: Record<string, number>; actorId: string };
export interface CommandResult {
  success: boolean;
  productId?: string;
  version?: number;
  error?: string;
  eventsPublished?: number;
}
