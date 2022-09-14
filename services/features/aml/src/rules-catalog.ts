/** Extended rules catalog for Aml */
export interface CatalogRule {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  weight: number;
  category: string;
}

export const AML_RULES: CatalogRule[] = [
  { id: 'aml-rule-001', name: 'Rule 1 for Aml', description: 'Automated control 1 in aml pipeline', enabled: true, weight: 1, category: 'velocity' },
  { id: 'aml-rule-002', name: 'Rule 2 for Aml', description: 'Automated control 2 in aml pipeline', enabled: true, weight: 2, category: 'geo' },
  { id: 'aml-rule-003', name: 'Rule 3 for Aml', description: 'Automated control 3 in aml pipeline', enabled: true, weight: 3, category: 'device' },
  { id: 'aml-rule-004', name: 'Rule 4 for Aml', description: 'Automated control 4 in aml pipeline', enabled: true, weight: 4, category: 'behavior' },
  { id: 'aml-rule-005', name: 'Rule 5 for Aml', description: 'Automated control 5 in aml pipeline', enabled: true, weight: 5, category: 'list' },
  { id: 'aml-rule-006', name: 'Rule 6 for Aml', description: 'Automated control 6 in aml pipeline', enabled: true, weight: 6, category: 'velocity' },
  { id: 'aml-rule-007', name: 'Rule 7 for Aml', description: 'Automated control 7 in aml pipeline', enabled: true, weight: 7, category: 'geo' },
  { id: 'aml-rule-008', name: 'Rule 8 for Aml', description: 'Automated control 8 in aml pipeline', enabled: true, weight: 8, category: 'device' },
  { id: 'aml-rule-009', name: 'Rule 9 for Aml', description: 'Automated control 9 in aml pipeline', enabled: true, weight: 9, category: 'behavior' },
  { id: 'aml-rule-010', name: 'Rule 10 for Aml', description: 'Automated control 10 in aml pipeline', enabled: true, weight: 10, category: 'list' },
  { id: 'aml-rule-011', name: 'Rule 11 for Aml', description: 'Automated control 11 in aml pipeline', enabled: true, weight: 1, category: 'velocity' },
  { id: 'aml-rule-012', name: 'Rule 12 for Aml', description: 'Automated control 12 in aml pipeline', enabled: true, weight: 2, category: 'geo' },
  { id: 'aml-rule-013', name: 'Rule 13 for Aml', description: 'Automated control 13 in aml pipeline', enabled: true, weight: 3, category: 'device' },
  { id: 'aml-rule-014', name: 'Rule 14 for Aml', description: 'Automated control 14 in aml pipeline', enabled: true, weight: 4, category: 'behavior' },
  { id: 'aml-rule-015', name: 'Rule 15 for Aml', description: 'Automated control 15 in aml pipeline', enabled: true, weight: 5, category: 'list' },
  { id: 'aml-rule-016', name: 'Rule 16 for Aml', description: 'Automated control 16 in aml pipeline', enabled: true, weight: 6, category: 'velocity' },
  { id: 'aml-rule-017', name: 'Rule 17 for Aml', description: 'Automated control 17 in aml pipeline', enabled: true, weight: 7, category: 'geo' },
  { id: 'aml-rule-018', name: 'Rule 18 for Aml', description: 'Automated control 18 in aml pipeline', enabled: true, weight: 8, category: 'device' },
  { id: 'aml-rule-019', name: 'Rule 19 for Aml', description: 'Automated control 19 in aml pipeline', enabled: true, weight: 9, category: 'behavior' },
  { id: 'aml-rule-020', name: 'Rule 20 for Aml', description: 'Automated control 20 in aml pipeline', enabled: true, weight: 10, category: 'list' },
  { id: 'aml-rule-021', name: 'Rule 21 for Aml', description: 'Automated control 21 in aml pipeline', enabled: true, weight: 1, category: 'velocity' },
  { id: 'aml-rule-022', name: 'Rule 22 for Aml', description: 'Automated control 22 in aml pipeline', enabled: true, weight: 2, category: 'geo' },
  { id: 'aml-rule-023', name: 'Rule 23 for Aml', description: 'Automated control 23 in aml pipeline', enabled: true, weight: 3, category: 'device' },
  { id: 'aml-rule-024', name: 'Rule 24 for Aml', description: 'Automated control 24 in aml pipeline', enabled: true, weight: 4, category: 'behavior' },
  { id: 'aml-rule-025', name: 'Rule 25 for Aml', description: 'Automated control 25 in aml pipeline', enabled: true, weight: 5, category: 'list' },
];

export function enabledRules(): CatalogRule[] {
  return AML_RULES.filter((r) => r.enabled);
}

export function totalWeight(): number {
  return enabledRules().reduce((a, r) => a + r.weight, 0);
}
