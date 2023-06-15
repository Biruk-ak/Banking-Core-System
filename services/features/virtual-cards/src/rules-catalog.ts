/** Extended rules catalog for VirtualCards */
export interface CatalogRule {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  weight: number;
  category: string;
}

export const VIRTUALCARDS_RULES: CatalogRule[] = [
  { id: 'virtual-cards-rule-001', name: 'Rule 1 for VirtualCards', description: 'Automated control 1 in virtual-cards pipeline', enabled: true, weight: 1, category: 'velocity' },
  { id: 'virtual-cards-rule-002', name: 'Rule 2 for VirtualCards', description: 'Automated control 2 in virtual-cards pipeline', enabled: true, weight: 2, category: 'geo' },
  { id: 'virtual-cards-rule-003', name: 'Rule 3 for VirtualCards', description: 'Automated control 3 in virtual-cards pipeline', enabled: true, weight: 3, category: 'device' },
  { id: 'virtual-cards-rule-004', name: 'Rule 4 for VirtualCards', description: 'Automated control 4 in virtual-cards pipeline', enabled: true, weight: 4, category: 'behavior' },
  { id: 'virtual-cards-rule-005', name: 'Rule 5 for VirtualCards', description: 'Automated control 5 in virtual-cards pipeline', enabled: true, weight: 5, category: 'list' },
  { id: 'virtual-cards-rule-006', name: 'Rule 6 for VirtualCards', description: 'Automated control 6 in virtual-cards pipeline', enabled: true, weight: 6, category: 'velocity' },
  { id: 'virtual-cards-rule-007', name: 'Rule 7 for VirtualCards', description: 'Automated control 7 in virtual-cards pipeline', enabled: true, weight: 7, category: 'geo' },
  { id: 'virtual-cards-rule-008', name: 'Rule 8 for VirtualCards', description: 'Automated control 8 in virtual-cards pipeline', enabled: true, weight: 8, category: 'device' },
  { id: 'virtual-cards-rule-009', name: 'Rule 9 for VirtualCards', description: 'Automated control 9 in virtual-cards pipeline', enabled: true, weight: 9, category: 'behavior' },
  { id: 'virtual-cards-rule-010', name: 'Rule 10 for VirtualCards', description: 'Automated control 10 in virtual-cards pipeline', enabled: true, weight: 10, category: 'list' },
  { id: 'virtual-cards-rule-011', name: 'Rule 11 for VirtualCards', description: 'Automated control 11 in virtual-cards pipeline', enabled: true, weight: 1, category: 'velocity' },
  { id: 'virtual-cards-rule-012', name: 'Rule 12 for VirtualCards', description: 'Automated control 12 in virtual-cards pipeline', enabled: true, weight: 2, category: 'geo' },
  { id: 'virtual-cards-rule-013', name: 'Rule 13 for VirtualCards', description: 'Automated control 13 in virtual-cards pipeline', enabled: true, weight: 3, category: 'device' },
  { id: 'virtual-cards-rule-014', name: 'Rule 14 for VirtualCards', description: 'Automated control 14 in virtual-cards pipeline', enabled: true, weight: 4, category: 'behavior' },
  { id: 'virtual-cards-rule-015', name: 'Rule 15 for VirtualCards', description: 'Automated control 15 in virtual-cards pipeline', enabled: true, weight: 5, category: 'list' },
  { id: 'virtual-cards-rule-016', name: 'Rule 16 for VirtualCards', description: 'Automated control 16 in virtual-cards pipeline', enabled: true, weight: 6, category: 'velocity' },
  { id: 'virtual-cards-rule-017', name: 'Rule 17 for VirtualCards', description: 'Automated control 17 in virtual-cards pipeline', enabled: true, weight: 7, category: 'geo' },
  { id: 'virtual-cards-rule-018', name: 'Rule 18 for VirtualCards', description: 'Automated control 18 in virtual-cards pipeline', enabled: true, weight: 8, category: 'device' },
  { id: 'virtual-cards-rule-019', name: 'Rule 19 for VirtualCards', description: 'Automated control 19 in virtual-cards pipeline', enabled: true, weight: 9, category: 'behavior' },
  { id: 'virtual-cards-rule-020', name: 'Rule 20 for VirtualCards', description: 'Automated control 20 in virtual-cards pipeline', enabled: true, weight: 10, category: 'list' },
  { id: 'virtual-cards-rule-021', name: 'Rule 21 for VirtualCards', description: 'Automated control 21 in virtual-cards pipeline', enabled: true, weight: 1, category: 'velocity' },
  { id: 'virtual-cards-rule-022', name: 'Rule 22 for VirtualCards', description: 'Automated control 22 in virtual-cards pipeline', enabled: true, weight: 2, category: 'geo' },
  { id: 'virtual-cards-rule-023', name: 'Rule 23 for VirtualCards', description: 'Automated control 23 in virtual-cards pipeline', enabled: true, weight: 3, category: 'device' },
  { id: 'virtual-cards-rule-024', name: 'Rule 24 for VirtualCards', description: 'Automated control 24 in virtual-cards pipeline', enabled: true, weight: 4, category: 'behavior' },
  { id: 'virtual-cards-rule-025', name: 'Rule 25 for VirtualCards', description: 'Automated control 25 in virtual-cards pipeline', enabled: true, weight: 5, category: 'list' },
];

export function enabledRules(): CatalogRule[] {
  return VIRTUALCARDS_RULES.filter((r) => r.enabled);
}

export function totalWeight(): number {
  return enabledRules().reduce((a, r) => a + r.weight, 0);
}
