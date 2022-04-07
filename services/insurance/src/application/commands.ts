/** CQRS commands for Insurance */
export type InsuranceCommand =
  | { type: 'OpenInsurance'; customerId: string; currency: string; actorId: string }
  | { type: 'ActivateInsurance'; productId: string; actorId: string }
  | { type: 'SuspendInsurance'; productId: string; actorId: string; reason: string }
  | { type: 'CloseInsurance'; productId: string; actorId: string }
  | { type: 'CreditInsurance'; productId: string; amountMajor: number; currency: string; actorId: string; reference: string }
  | { type: 'DebitInsurance'; productId: string; amountMajor: number; currency: string; actorId: string; reference: string }
  | { type: 'ApplyInsuranceFee'; productId: string; actorId: string }
  | { type: 'ReassessInsuranceRisk'; productId: string; score: number; actorId: string }
  | { type: 'UpdateInsuranceLimits'; productId: string; limits: Record<string, number>; actorId: string };
export interface CommandResult {
  success: boolean;
  productId?: string;
  version?: number;
  error?: string;
  eventsPublished?: number;
}
