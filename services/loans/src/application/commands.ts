/** CQRS commands for Loans */
export type LoansCommand =
  | { type: 'OpenLoans'; customerId: string; currency: string; actorId: string }
  | { type: 'ActivateLoans'; productId: string; actorId: string }
  | { type: 'SuspendLoans'; productId: string; actorId: string; reason: string }
  | { type: 'CloseLoans'; productId: string; actorId: string }
  | { type: 'CreditLoans'; productId: string; amountMajor: number; currency: string; actorId: string; reference: string }
  | { type: 'DebitLoans'; productId: string; amountMajor: number; currency: string; actorId: string; reference: string }
  | { type: 'ApplyLoansFee'; productId: string; actorId: string }
  | { type: 'ReassessLoansRisk'; productId: string; score: number; actorId: string }
  | { type: 'UpdateLoansLimits'; productId: string; limits: Record<string, number>; actorId: string };
export interface CommandResult {
  success: boolean;
  productId?: string;
  version?: number;
  error?: string;
  eventsPublished?: number;
}
