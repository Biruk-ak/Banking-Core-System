/** Extended rules catalog for SpendingAnalytics */
export interface CatalogRule {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  weight: number;
  category: string;
}

export const SPENDINGANALYTICS_RULES: CatalogRule[] = [
  { id: 'spending-analytics-rule-001', name: 'Rule 1 for SpendingAnalytics', description: 'Automated control 1 in spending-analytics pipeline', enabled: true, weight: 1, category: 'velocity' },
  { id: 'spending-analytics-rule-002', name: 'Rule 2 for SpendingAnalytics', description: 'Automated control 2 in spending-analytics pipeline', enabled: true, weight: 2, category: 'geo' },
  { id: 'spending-analytics-rule-003', name: 'Rule 3 for SpendingAnalytics', description: 'Automated control 3 in spending-analytics pipeline', enabled: true, weight: 3, category: 'device' },
  { id: 'spending-analytics-rule-004', name: 'Rule 4 for SpendingAnalytics', description: 'Automated control 4 in spending-analytics pipeline', enabled: true, weight: 4, category: 'behavior' },
  { id: 'spending-analytics-rule-005', name: 'Rule 5 for SpendingAnalytics', description: 'Automated control 5 in spending-analytics pipeline', enabled: true, weight: 5, category: 'list' },
  { id: 'spending-analytics-rule-006', name: 'Rule 6 for SpendingAnalytics', description: 'Automated control 6 in spending-analytics pipeline', enabled: true, weight: 6, category: 'velocity' },
  { id: 'spending-analytics-rule-007', name: 'Rule 7 for SpendingAnalytics', description: 'Automated control 7 in spending-analytics pipeline', enabled: true, weight: 7, category: 'geo' },
  { id: 'spending-analytics-rule-008', name: 'Rule 8 for SpendingAnalytics', description: 'Automated control 8 in spending-analytics pipeline', enabled: true, weight: 8, category: 'device' },
  { id: 'spending-analytics-rule-009', name: 'Rule 9 for SpendingAnalytics', description: 'Automated control 9 in spending-analytics pipeline', enabled: true, weight: 9, category: 'behavior' },
  { id: 'spending-analytics-rule-010', name: 'Rule 10 for SpendingAnalytics', description: 'Automated control 10 in spending-analytics pipeline', enabled: true, weight: 10, category: 'list' },
  { id: 'spending-analytics-rule-011', name: 'Rule 11 for SpendingAnalytics', description: 'Automated control 11 in spending-analytics pipeline', enabled: true, weight: 1, category: 'velocity' },
  { id: 'spending-analytics-rule-012', name: 'Rule 12 for SpendingAnalytics', description: 'Automated control 12 in spending-analytics pipeline', enabled: true, weight: 2, category: 'geo' },
  { id: 'spending-analytics-rule-013', name: 'Rule 13 for SpendingAnalytics', description: 'Automated control 13 in spending-analytics pipeline', enabled: true, weight: 3, category: 'device' },
  { id: 'spending-analytics-rule-014', name: 'Rule 14 for SpendingAnalytics', description: 'Automated control 14 in spending-analytics pipeline', enabled: true, weight: 4, category: 'behavior' },
  { id: 'spending-analytics-rule-015', name: 'Rule 15 for SpendingAnalytics', description: 'Automated control 15 in spending-analytics pipeline', enabled: true, weight: 5, category: 'list' },
  { id: 'spending-analytics-rule-016', name: 'Rule 16 for SpendingAnalytics', description: 'Automated control 16 in spending-analytics pipeline', enabled: true, weight: 6, category: 'velocity' },
  { id: 'spending-analytics-rule-017', name: 'Rule 17 for SpendingAnalytics', description: 'Automated control 17 in spending-analytics pipeline', enabled: true, weight: 7, category: 'geo' },
  { id: 'spending-analytics-rule-018', name: 'Rule 18 for SpendingAnalytics', description: 'Automated control 18 in spending-analytics pipeline', enabled: true, weight: 8, category: 'device' },
  { id: 'spending-analytics-rule-019', name: 'Rule 19 for SpendingAnalytics', description: 'Automated control 19 in spending-analytics pipeline', enabled: true, weight: 9, category: 'behavior' },
  { id: 'spending-analytics-rule-020', name: 'Rule 20 for SpendingAnalytics', description: 'Automated control 20 in spending-analytics pipeline', enabled: true, weight: 10, category: 'list' },
  { id: 'spending-analytics-rule-021', name: 'Rule 21 for SpendingAnalytics', description: 'Automated control 21 in spending-analytics pipeline', enabled: true, weight: 1, category: 'velocity' },
  { id: 'spending-analytics-rule-022', name: 'Rule 22 for SpendingAnalytics', description: 'Automated control 22 in spending-analytics pipeline', enabled: true, weight: 2, category: 'geo' },
  { id: 'spending-analytics-rule-023', name: 'Rule 23 for SpendingAnalytics', description: 'Automated control 23 in spending-analytics pipeline', enabled: true, weight: 3, category: 'device' },
  { id: 'spending-analytics-rule-024', name: 'Rule 24 for SpendingAnalytics', description: 'Automated control 24 in spending-analytics pipeline', enabled: true, weight: 4, category: 'behavior' },
  { id: 'spending-analytics-rule-025', name: 'Rule 25 for SpendingAnalytics', description: 'Automated control 25 in spending-analytics pipeline', enabled: true, weight: 5, category: 'list' },
];

export function enabledRules(): CatalogRule[] {
  return SPENDINGANALYTICS_RULES.filter((r) => r.enabled);
}

export function totalWeight(): number {
  return enabledRules().reduce((a, r) => a + r.weight, 0);
}
