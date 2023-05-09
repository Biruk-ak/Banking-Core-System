/** Extended rules catalog for BillPayments */
export interface CatalogRule {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  weight: number;
  category: string;
}

export const BILLPAYMENTS_RULES: CatalogRule[] = [
  { id: 'bill-payments-rule-001', name: 'Rule 1 for BillPayments', description: 'Automated control 1 in bill-payments pipeline', enabled: true, weight: 1, category: 'velocity' },
  { id: 'bill-payments-rule-002', name: 'Rule 2 for BillPayments', description: 'Automated control 2 in bill-payments pipeline', enabled: true, weight: 2, category: 'geo' },
  { id: 'bill-payments-rule-003', name: 'Rule 3 for BillPayments', description: 'Automated control 3 in bill-payments pipeline', enabled: true, weight: 3, category: 'device' },
  { id: 'bill-payments-rule-004', name: 'Rule 4 for BillPayments', description: 'Automated control 4 in bill-payments pipeline', enabled: true, weight: 4, category: 'behavior' },
  { id: 'bill-payments-rule-005', name: 'Rule 5 for BillPayments', description: 'Automated control 5 in bill-payments pipeline', enabled: true, weight: 5, category: 'list' },
  { id: 'bill-payments-rule-006', name: 'Rule 6 for BillPayments', description: 'Automated control 6 in bill-payments pipeline', enabled: true, weight: 6, category: 'velocity' },
  { id: 'bill-payments-rule-007', name: 'Rule 7 for BillPayments', description: 'Automated control 7 in bill-payments pipeline', enabled: true, weight: 7, category: 'geo' },
  { id: 'bill-payments-rule-008', name: 'Rule 8 for BillPayments', description: 'Automated control 8 in bill-payments pipeline', enabled: true, weight: 8, category: 'device' },
  { id: 'bill-payments-rule-009', name: 'Rule 9 for BillPayments', description: 'Automated control 9 in bill-payments pipeline', enabled: true, weight: 9, category: 'behavior' },
  { id: 'bill-payments-rule-010', name: 'Rule 10 for BillPayments', description: 'Automated control 10 in bill-payments pipeline', enabled: true, weight: 10, category: 'list' },
  { id: 'bill-payments-rule-011', name: 'Rule 11 for BillPayments', description: 'Automated control 11 in bill-payments pipeline', enabled: true, weight: 1, category: 'velocity' },
  { id: 'bill-payments-rule-012', name: 'Rule 12 for BillPayments', description: 'Automated control 12 in bill-payments pipeline', enabled: true, weight: 2, category: 'geo' },
  { id: 'bill-payments-rule-013', name: 'Rule 13 for BillPayments', description: 'Automated control 13 in bill-payments pipeline', enabled: true, weight: 3, category: 'device' },
  { id: 'bill-payments-rule-014', name: 'Rule 14 for BillPayments', description: 'Automated control 14 in bill-payments pipeline', enabled: true, weight: 4, category: 'behavior' },
  { id: 'bill-payments-rule-015', name: 'Rule 15 for BillPayments', description: 'Automated control 15 in bill-payments pipeline', enabled: true, weight: 5, category: 'list' },
  { id: 'bill-payments-rule-016', name: 'Rule 16 for BillPayments', description: 'Automated control 16 in bill-payments pipeline', enabled: true, weight: 6, category: 'velocity' },
  { id: 'bill-payments-rule-017', name: 'Rule 17 for BillPayments', description: 'Automated control 17 in bill-payments pipeline', enabled: true, weight: 7, category: 'geo' },
  { id: 'bill-payments-rule-018', name: 'Rule 18 for BillPayments', description: 'Automated control 18 in bill-payments pipeline', enabled: true, weight: 8, category: 'device' },
  { id: 'bill-payments-rule-019', name: 'Rule 19 for BillPayments', description: 'Automated control 19 in bill-payments pipeline', enabled: true, weight: 9, category: 'behavior' },
  { id: 'bill-payments-rule-020', name: 'Rule 20 for BillPayments', description: 'Automated control 20 in bill-payments pipeline', enabled: true, weight: 10, category: 'list' },
  { id: 'bill-payments-rule-021', name: 'Rule 21 for BillPayments', description: 'Automated control 21 in bill-payments pipeline', enabled: true, weight: 1, category: 'velocity' },
  { id: 'bill-payments-rule-022', name: 'Rule 22 for BillPayments', description: 'Automated control 22 in bill-payments pipeline', enabled: true, weight: 2, category: 'geo' },
  { id: 'bill-payments-rule-023', name: 'Rule 23 for BillPayments', description: 'Automated control 23 in bill-payments pipeline', enabled: true, weight: 3, category: 'device' },
  { id: 'bill-payments-rule-024', name: 'Rule 24 for BillPayments', description: 'Automated control 24 in bill-payments pipeline', enabled: true, weight: 4, category: 'behavior' },
  { id: 'bill-payments-rule-025', name: 'Rule 25 for BillPayments', description: 'Automated control 25 in bill-payments pipeline', enabled: true, weight: 5, category: 'list' },
];

export function enabledRules(): CatalogRule[] {
  return BILLPAYMENTS_RULES.filter((r) => r.enabled);
}

export function totalWeight(): number {
  return enabledRules().reduce((a, r) => a + r.weight, 0);
}
