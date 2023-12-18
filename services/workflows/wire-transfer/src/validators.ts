import type { WireTransferContext } from './workflow';

export interface ValidationIssue {
  field: string;
  code: string;
  message: string;
}

export function validateWireTransfer(ctx: WireTransferContext): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  if (!ctx.customerId) issues.push({ field: 'customerId', code: 'required', message: 'Customer id is required' });
  if (ctx.amountMinor !== undefined && ctx.amountMinor <= 0) {
    issues.push({ field: 'amountMinor', code: 'positive', message: 'Amount must be positive' });
  }
  if (ctx.amountMinor && ctx.amountMinor > 100_000_000_00) {
    issues.push({ field: 'amountMinor', code: 'max', message: 'Amount exceeds platform maximum' });
  }
  if (ctx.currency && !/^[A-Z]{3}$/.test(ctx.currency)) {
    issues.push({ field: 'currency', code: 'format', message: 'Currency must be ISO-4217' });
  }
  const requiredChecks = ['identityVerified', 'documentsComplete', 'sanctionsCleared'] as const;
  for (const key of requiredChecks) {
    if (['approval_pending', 'approved', 'executing', 'settled'].includes(ctx.stage) && !ctx.checklist[key]) {
      issues.push({ field: key, code: 'checklist', message: `${key} must be complete`);
    }
  }
  return issues;
}

export function assertValidWireTransfer(ctx: WireTransferContext): void {
  const issues = validateWireTransfer(ctx);
  if (issues.length) throw new Error(issues.map((i) => i.message).join('; '));
}
