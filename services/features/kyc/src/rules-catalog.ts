/** Extended rules catalog for Kyc */
export interface CatalogRule {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  weight: number;
  category: string;
}

export const KYC_RULES: CatalogRule[] = [
  { id: 'kyc-rule-001', name: 'Rule 1 for Kyc', description: 'Automated control 1 in kyc pipeline', enabled: true, weight: 1, category: 'velocity' },
  { id: 'kyc-rule-002', name: 'Rule 2 for Kyc', description: 'Automated control 2 in kyc pipeline', enabled: true, weight: 2, category: 'geo' },
  { id: 'kyc-rule-003', name: 'Rule 3 for Kyc', description: 'Automated control 3 in kyc pipeline', enabled: true, weight: 3, category: 'device' },
  { id: 'kyc-rule-004', name: 'Rule 4 for Kyc', description: 'Automated control 4 in kyc pipeline', enabled: true, weight: 4, category: 'behavior' },
  { id: 'kyc-rule-005', name: 'Rule 5 for Kyc', description: 'Automated control 5 in kyc pipeline', enabled: true, weight: 5, category: 'list' },
  { id: 'kyc-rule-006', name: 'Rule 6 for Kyc', description: 'Automated control 6 in kyc pipeline', enabled: true, weight: 6, category: 'velocity' },
  { id: 'kyc-rule-007', name: 'Rule 7 for Kyc', description: 'Automated control 7 in kyc pipeline', enabled: true, weight: 7, category: 'geo' },
  { id: 'kyc-rule-008', name: 'Rule 8 for Kyc', description: 'Automated control 8 in kyc pipeline', enabled: true, weight: 8, category: 'device' },
  { id: 'kyc-rule-009', name: 'Rule 9 for Kyc', description: 'Automated control 9 in kyc pipeline', enabled: true, weight: 9, category: 'behavior' },
  { id: 'kyc-rule-010', name: 'Rule 10 for Kyc', description: 'Automated control 10 in kyc pipeline', enabled: true, weight: 10, category: 'list' },
  { id: 'kyc-rule-011', name: 'Rule 11 for Kyc', description: 'Automated control 11 in kyc pipeline', enabled: true, weight: 1, category: 'velocity' },
  { id: 'kyc-rule-012', name: 'Rule 12 for Kyc', description: 'Automated control 12 in kyc pipeline', enabled: true, weight: 2, category: 'geo' },
  { id: 'kyc-rule-013', name: 'Rule 13 for Kyc', description: 'Automated control 13 in kyc pipeline', enabled: true, weight: 3, category: 'device' },
  { id: 'kyc-rule-014', name: 'Rule 14 for Kyc', description: 'Automated control 14 in kyc pipeline', enabled: true, weight: 4, category: 'behavior' },
  { id: 'kyc-rule-015', name: 'Rule 15 for Kyc', description: 'Automated control 15 in kyc pipeline', enabled: true, weight: 5, category: 'list' },
  { id: 'kyc-rule-016', name: 'Rule 16 for Kyc', description: 'Automated control 16 in kyc pipeline', enabled: true, weight: 6, category: 'velocity' },
  { id: 'kyc-rule-017', name: 'Rule 17 for Kyc', description: 'Automated control 17 in kyc pipeline', enabled: true, weight: 7, category: 'geo' },
  { id: 'kyc-rule-018', name: 'Rule 18 for Kyc', description: 'Automated control 18 in kyc pipeline', enabled: true, weight: 8, category: 'device' },
  { id: 'kyc-rule-019', name: 'Rule 19 for Kyc', description: 'Automated control 19 in kyc pipeline', enabled: true, weight: 9, category: 'behavior' },
  { id: 'kyc-rule-020', name: 'Rule 20 for Kyc', description: 'Automated control 20 in kyc pipeline', enabled: true, weight: 10, category: 'list' },
  { id: 'kyc-rule-021', name: 'Rule 21 for Kyc', description: 'Automated control 21 in kyc pipeline', enabled: true, weight: 1, category: 'velocity' },
  { id: 'kyc-rule-022', name: 'Rule 22 for Kyc', description: 'Automated control 22 in kyc pipeline', enabled: true, weight: 2, category: 'geo' },
  { id: 'kyc-rule-023', name: 'Rule 23 for Kyc', description: 'Automated control 23 in kyc pipeline', enabled: true, weight: 3, category: 'device' },
  { id: 'kyc-rule-024', name: 'Rule 24 for Kyc', description: 'Automated control 24 in kyc pipeline', enabled: true, weight: 4, category: 'behavior' },
  { id: 'kyc-rule-025', name: 'Rule 25 for Kyc', description: 'Automated control 25 in kyc pipeline', enabled: true, weight: 5, category: 'list' },
];

export function enabledRules(): CatalogRule[] {
  return KYC_RULES.filter((r) => r.enabled);
}

export function totalWeight(): number {
  return enabledRules().reduce((a, r) => a + r.weight, 0);
}
