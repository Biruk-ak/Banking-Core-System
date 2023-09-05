/** Extended rules catalog for AdminConsole */
export interface CatalogRule {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  weight: number;
  category: string;
}

export const ADMINCONSOLE_RULES: CatalogRule[] = [
  { id: 'admin-console-rule-001', name: 'Rule 1 for AdminConsole', description: 'Automated control 1 in admin-console pipeline', enabled: true, weight: 1, category: 'velocity' },
  { id: 'admin-console-rule-002', name: 'Rule 2 for AdminConsole', description: 'Automated control 2 in admin-console pipeline', enabled: true, weight: 2, category: 'geo' },
  { id: 'admin-console-rule-003', name: 'Rule 3 for AdminConsole', description: 'Automated control 3 in admin-console pipeline', enabled: true, weight: 3, category: 'device' },
  { id: 'admin-console-rule-004', name: 'Rule 4 for AdminConsole', description: 'Automated control 4 in admin-console pipeline', enabled: true, weight: 4, category: 'behavior' },
  { id: 'admin-console-rule-005', name: 'Rule 5 for AdminConsole', description: 'Automated control 5 in admin-console pipeline', enabled: true, weight: 5, category: 'list' },
  { id: 'admin-console-rule-006', name: 'Rule 6 for AdminConsole', description: 'Automated control 6 in admin-console pipeline', enabled: true, weight: 6, category: 'velocity' },
  { id: 'admin-console-rule-007', name: 'Rule 7 for AdminConsole', description: 'Automated control 7 in admin-console pipeline', enabled: true, weight: 7, category: 'geo' },
  { id: 'admin-console-rule-008', name: 'Rule 8 for AdminConsole', description: 'Automated control 8 in admin-console pipeline', enabled: true, weight: 8, category: 'device' },
  { id: 'admin-console-rule-009', name: 'Rule 9 for AdminConsole', description: 'Automated control 9 in admin-console pipeline', enabled: true, weight: 9, category: 'behavior' },
  { id: 'admin-console-rule-010', name: 'Rule 10 for AdminConsole', description: 'Automated control 10 in admin-console pipeline', enabled: true, weight: 10, category: 'list' },
  { id: 'admin-console-rule-011', name: 'Rule 11 for AdminConsole', description: 'Automated control 11 in admin-console pipeline', enabled: true, weight: 1, category: 'velocity' },
  { id: 'admin-console-rule-012', name: 'Rule 12 for AdminConsole', description: 'Automated control 12 in admin-console pipeline', enabled: true, weight: 2, category: 'geo' },
  { id: 'admin-console-rule-013', name: 'Rule 13 for AdminConsole', description: 'Automated control 13 in admin-console pipeline', enabled: true, weight: 3, category: 'device' },
  { id: 'admin-console-rule-014', name: 'Rule 14 for AdminConsole', description: 'Automated control 14 in admin-console pipeline', enabled: true, weight: 4, category: 'behavior' },
  { id: 'admin-console-rule-015', name: 'Rule 15 for AdminConsole', description: 'Automated control 15 in admin-console pipeline', enabled: true, weight: 5, category: 'list' },
  { id: 'admin-console-rule-016', name: 'Rule 16 for AdminConsole', description: 'Automated control 16 in admin-console pipeline', enabled: true, weight: 6, category: 'velocity' },
  { id: 'admin-console-rule-017', name: 'Rule 17 for AdminConsole', description: 'Automated control 17 in admin-console pipeline', enabled: true, weight: 7, category: 'geo' },
  { id: 'admin-console-rule-018', name: 'Rule 18 for AdminConsole', description: 'Automated control 18 in admin-console pipeline', enabled: true, weight: 8, category: 'device' },
  { id: 'admin-console-rule-019', name: 'Rule 19 for AdminConsole', description: 'Automated control 19 in admin-console pipeline', enabled: true, weight: 9, category: 'behavior' },
  { id: 'admin-console-rule-020', name: 'Rule 20 for AdminConsole', description: 'Automated control 20 in admin-console pipeline', enabled: true, weight: 10, category: 'list' },
  { id: 'admin-console-rule-021', name: 'Rule 21 for AdminConsole', description: 'Automated control 21 in admin-console pipeline', enabled: true, weight: 1, category: 'velocity' },
  { id: 'admin-console-rule-022', name: 'Rule 22 for AdminConsole', description: 'Automated control 22 in admin-console pipeline', enabled: true, weight: 2, category: 'geo' },
  { id: 'admin-console-rule-023', name: 'Rule 23 for AdminConsole', description: 'Automated control 23 in admin-console pipeline', enabled: true, weight: 3, category: 'device' },
  { id: 'admin-console-rule-024', name: 'Rule 24 for AdminConsole', description: 'Automated control 24 in admin-console pipeline', enabled: true, weight: 4, category: 'behavior' },
  { id: 'admin-console-rule-025', name: 'Rule 25 for AdminConsole', description: 'Automated control 25 in admin-console pipeline', enabled: true, weight: 5, category: 'list' },
];

export function enabledRules(): CatalogRule[] {
  return ADMINCONSOLE_RULES.filter((r) => r.enabled);
}

export function totalWeight(): number {
  return enabledRules().reduce((a, r) => a + r.weight, 0);
}
