/** CQRS commands for MobileBanking */
export type MobileBankingCommand =
  | { type: 'OpenMobileBanking'; customerId: string; currency: string; actorId: string }
  | { type: 'ActivateMobileBanking'; productId: string; actorId: string }
  | { type: 'SuspendMobileBanking'; productId: string; actorId: string; reason: string }
  | { type: 'CloseMobileBanking'; productId: string; actorId: string }
  | { type: 'CreditMobileBanking'; productId: string; amountMajor: number; currency: string; actorId: string; reference: string }
  | { type: 'DebitMobileBanking'; productId: string; amountMajor: number; currency: string; actorId: string; reference: string }
  | { type: 'ApplyMobileBankingFee'; productId: string; actorId: string }
  | { type: 'ReassessMobileBankingRisk'; productId: string; score: number; actorId: string }
  | { type: 'UpdateMobileBankingLimits'; productId: string; limits: Record<string, number>; actorId: string };
export interface CommandResult {
  success: boolean;
  productId?: string;
  version?: number;
  error?: string;
  eventsPublished?: number;
}
