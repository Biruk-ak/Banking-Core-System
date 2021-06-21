/** CQRS commands for CurrentAccounts */
export type CurrentAccountsCommand =
  | { type: 'OpenCurrentAccounts'; customerId: string; currency: string; actorId: string }
  | { type: 'ActivateCurrentAccounts'; productId: string; actorId: string }
  | { type: 'SuspendCurrentAccounts'; productId: string; actorId: string; reason: string }
  | { type: 'CloseCurrentAccounts'; productId: string; actorId: string }
  | { type: 'CreditCurrentAccounts'; productId: string; amountMajor: number; currency: string; actorId: string; reference: string }
  | { type: 'DebitCurrentAccounts'; productId: string; amountMajor: number; currency: string; actorId: string; reference: string }
  | { type: 'ApplyCurrentAccountsFee'; productId: string; actorId: string }
  | { type: 'ReassessCurrentAccountsRisk'; productId: string; score: number; actorId: string }
  | { type: 'UpdateCurrentAccountsLimits'; productId: string; limits: Record<string, number>; actorId: string };
export interface CommandResult {
  success: boolean;
  productId?: string;
  version?: number;
  error?: string;
  eventsPublished?: number;
}
