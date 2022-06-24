/** CQRS commands for InternetBanking */
export type InternetBankingCommand =
  | { type: 'OpenInternetBanking'; customerId: string; currency: string; actorId: string }
  | { type: 'ActivateInternetBanking'; productId: string; actorId: string }
  | { type: 'SuspendInternetBanking'; productId: string; actorId: string; reason: string }
  | { type: 'CloseInternetBanking'; productId: string; actorId: string }
  | { type: 'CreditInternetBanking'; productId: string; amountMajor: number; currency: string; actorId: string; reference: string }
  | { type: 'DebitInternetBanking'; productId: string; amountMajor: number; currency: string; actorId: string; reference: string }
  | { type: 'ApplyInternetBankingFee'; productId: string; actorId: string }
  | { type: 'ReassessInternetBankingRisk'; productId: string; score: number; actorId: string }
  | { type: 'UpdateInternetBankingLimits'; productId: string; limits: Record<string, number>; actorId: string };
export interface CommandResult {
  success: boolean;
  productId?: string;
  version?: number;
  error?: string;
  eventsPublished?: number;
}
