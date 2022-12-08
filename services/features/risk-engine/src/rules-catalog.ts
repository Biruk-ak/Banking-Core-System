/** Extended rules catalog for RiskEngine */
export interface CatalogRule {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  weight: number;
  category: string;
}

export const RISKENGINE_RULES: CatalogRule[] = [
  { id: 'risk-engine-rule-001', name: 'Rule 1 for RiskEngine', description: 'Automated control 1 in risk-engine pipeline', enabled: true, weight: 1, category: 'velocity' },
  { id: 'risk-engine-rule-002', name: 'Rule 2 for RiskEngine', description: 'Automated control 2 in risk-engine pipeline', enabled: true, weight: 2, category: 'geo' },
  { id: 'risk-engine-rule-003', name: 'Rule 3 for RiskEngine', description: 'Automated control 3 in risk-engine pipeline', enabled: true, weight: 3, category: 'device' },
  { id: 'risk-engine-rule-004', name: 'Rule 4 for RiskEngine', description: 'Automated control 4 in risk-engine pipeline', enabled: true, weight: 4, category: 'behavior' },
  { id: 'risk-engine-rule-005', name: 'Rule 5 for RiskEngine', description: 'Automated control 5 in risk-engine pipeline', enabled: true, weight: 5, category: 'list' },
  { id: 'risk-engine-rule-006', name: 'Rule 6 for RiskEngine', description: 'Automated control 6 in risk-engine pipeline', enabled: true, weight: 6, category: 'velocity' },
  { id: 'risk-engine-rule-007', name: 'Rule 7 for RiskEngine', description: 'Automated control 7 in risk-engine pipeline', enabled: true, weight: 7, category: 'geo' },
  { id: 'risk-engine-rule-008', name: 'Rule 8 for RiskEngine', description: 'Automated control 8 in risk-engine pipeline', enabled: true, weight: 8, category: 'device' },
  { id: 'risk-engine-rule-009', name: 'Rule 9 for RiskEngine', description: 'Automated control 9 in risk-engine pipeline', enabled: true, weight: 9, category: 'behavior' },
  { id: 'risk-engine-rule-010', name: 'Rule 10 for RiskEngine', description: 'Automated control 10 in risk-engine pipeline', enabled: true, weight: 10, category: 'list' },
  { id: 'risk-engine-rule-011', name: 'Rule 11 for RiskEngine', description: 'Automated control 11 in risk-engine pipeline', enabled: true, weight: 1, category: 'velocity' },
  { id: 'risk-engine-rule-012', name: 'Rule 12 for RiskEngine', description: 'Automated control 12 in risk-engine pipeline', enabled: true, weight: 2, category: 'geo' },
  { id: 'risk-engine-rule-013', name: 'Rule 13 for RiskEngine', description: 'Automated control 13 in risk-engine pipeline', enabled: true, weight: 3, category: 'device' },
  { id: 'risk-engine-rule-014', name: 'Rule 14 for RiskEngine', description: 'Automated control 14 in risk-engine pipeline', enabled: true, weight: 4, category: 'behavior' },
  { id: 'risk-engine-rule-015', name: 'Rule 15 for RiskEngine', description: 'Automated control 15 in risk-engine pipeline', enabled: true, weight: 5, category: 'list' },
  { id: 'risk-engine-rule-016', name: 'Rule 16 for RiskEngine', description: 'Automated control 16 in risk-engine pipeline', enabled: true, weight: 6, category: 'velocity' },
  { id: 'risk-engine-rule-017', name: 'Rule 17 for RiskEngine', description: 'Automated control 17 in risk-engine pipeline', enabled: true, weight: 7, category: 'geo' },
  { id: 'risk-engine-rule-018', name: 'Rule 18 for RiskEngine', description: 'Automated control 18 in risk-engine pipeline', enabled: true, weight: 8, category: 'device' },
  { id: 'risk-engine-rule-019', name: 'Rule 19 for RiskEngine', description: 'Automated control 19 in risk-engine pipeline', enabled: true, weight: 9, category: 'behavior' },
  { id: 'risk-engine-rule-020', name: 'Rule 20 for RiskEngine', description: 'Automated control 20 in risk-engine pipeline', enabled: true, weight: 10, category: 'list' },
  { id: 'risk-engine-rule-021', name: 'Rule 21 for RiskEngine', description: 'Automated control 21 in risk-engine pipeline', enabled: true, weight: 1, category: 'velocity' },
  { id: 'risk-engine-rule-022', name: 'Rule 22 for RiskEngine', description: 'Automated control 22 in risk-engine pipeline', enabled: true, weight: 2, category: 'geo' },
  { id: 'risk-engine-rule-023', name: 'Rule 23 for RiskEngine', description: 'Automated control 23 in risk-engine pipeline', enabled: true, weight: 3, category: 'device' },
  { id: 'risk-engine-rule-024', name: 'Rule 24 for RiskEngine', description: 'Automated control 24 in risk-engine pipeline', enabled: true, weight: 4, category: 'behavior' },
  { id: 'risk-engine-rule-025', name: 'Rule 25 for RiskEngine', description: 'Automated control 25 in risk-engine pipeline', enabled: true, weight: 5, category: 'list' },
];

export function enabledRules(): CatalogRule[] {
  return RISKENGINE_RULES.filter((r) => r.enabled);
}

export function totalWeight(): number {
  return enabledRules().reduce((a, r) => a + r.weight, 0);
}
