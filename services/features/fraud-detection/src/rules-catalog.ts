/** Extended rules catalog for FraudDetection */
export interface CatalogRule {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  weight: number;
  category: string;
}

export const FRAUDDETECTION_RULES: CatalogRule[] = [
  { id: 'fraud-detection-rule-001', name: 'Rule 1 for FraudDetection', description: 'Automated control 1 in fraud-detection pipeline', enabled: true, weight: 1, category: 'velocity' },
  { id: 'fraud-detection-rule-002', name: 'Rule 2 for FraudDetection', description: 'Automated control 2 in fraud-detection pipeline', enabled: true, weight: 2, category: 'geo' },
  { id: 'fraud-detection-rule-003', name: 'Rule 3 for FraudDetection', description: 'Automated control 3 in fraud-detection pipeline', enabled: true, weight: 3, category: 'device' },
  { id: 'fraud-detection-rule-004', name: 'Rule 4 for FraudDetection', description: 'Automated control 4 in fraud-detection pipeline', enabled: true, weight: 4, category: 'behavior' },
  { id: 'fraud-detection-rule-005', name: 'Rule 5 for FraudDetection', description: 'Automated control 5 in fraud-detection pipeline', enabled: true, weight: 5, category: 'list' },
  { id: 'fraud-detection-rule-006', name: 'Rule 6 for FraudDetection', description: 'Automated control 6 in fraud-detection pipeline', enabled: true, weight: 6, category: 'velocity' },
  { id: 'fraud-detection-rule-007', name: 'Rule 7 for FraudDetection', description: 'Automated control 7 in fraud-detection pipeline', enabled: true, weight: 7, category: 'geo' },
  { id: 'fraud-detection-rule-008', name: 'Rule 8 for FraudDetection', description: 'Automated control 8 in fraud-detection pipeline', enabled: true, weight: 8, category: 'device' },
  { id: 'fraud-detection-rule-009', name: 'Rule 9 for FraudDetection', description: 'Automated control 9 in fraud-detection pipeline', enabled: true, weight: 9, category: 'behavior' },
  { id: 'fraud-detection-rule-010', name: 'Rule 10 for FraudDetection', description: 'Automated control 10 in fraud-detection pipeline', enabled: true, weight: 10, category: 'list' },
  { id: 'fraud-detection-rule-011', name: 'Rule 11 for FraudDetection', description: 'Automated control 11 in fraud-detection pipeline', enabled: true, weight: 1, category: 'velocity' },
  { id: 'fraud-detection-rule-012', name: 'Rule 12 for FraudDetection', description: 'Automated control 12 in fraud-detection pipeline', enabled: true, weight: 2, category: 'geo' },
  { id: 'fraud-detection-rule-013', name: 'Rule 13 for FraudDetection', description: 'Automated control 13 in fraud-detection pipeline', enabled: true, weight: 3, category: 'device' },
  { id: 'fraud-detection-rule-014', name: 'Rule 14 for FraudDetection', description: 'Automated control 14 in fraud-detection pipeline', enabled: true, weight: 4, category: 'behavior' },
  { id: 'fraud-detection-rule-015', name: 'Rule 15 for FraudDetection', description: 'Automated control 15 in fraud-detection pipeline', enabled: true, weight: 5, category: 'list' },
  { id: 'fraud-detection-rule-016', name: 'Rule 16 for FraudDetection', description: 'Automated control 16 in fraud-detection pipeline', enabled: true, weight: 6, category: 'velocity' },
  { id: 'fraud-detection-rule-017', name: 'Rule 17 for FraudDetection', description: 'Automated control 17 in fraud-detection pipeline', enabled: true, weight: 7, category: 'geo' },
  { id: 'fraud-detection-rule-018', name: 'Rule 18 for FraudDetection', description: 'Automated control 18 in fraud-detection pipeline', enabled: true, weight: 8, category: 'device' },
  { id: 'fraud-detection-rule-019', name: 'Rule 19 for FraudDetection', description: 'Automated control 19 in fraud-detection pipeline', enabled: true, weight: 9, category: 'behavior' },
  { id: 'fraud-detection-rule-020', name: 'Rule 20 for FraudDetection', description: 'Automated control 20 in fraud-detection pipeline', enabled: true, weight: 10, category: 'list' },
  { id: 'fraud-detection-rule-021', name: 'Rule 21 for FraudDetection', description: 'Automated control 21 in fraud-detection pipeline', enabled: true, weight: 1, category: 'velocity' },
  { id: 'fraud-detection-rule-022', name: 'Rule 22 for FraudDetection', description: 'Automated control 22 in fraud-detection pipeline', enabled: true, weight: 2, category: 'geo' },
  { id: 'fraud-detection-rule-023', name: 'Rule 23 for FraudDetection', description: 'Automated control 23 in fraud-detection pipeline', enabled: true, weight: 3, category: 'device' },
  { id: 'fraud-detection-rule-024', name: 'Rule 24 for FraudDetection', description: 'Automated control 24 in fraud-detection pipeline', enabled: true, weight: 4, category: 'behavior' },
  { id: 'fraud-detection-rule-025', name: 'Rule 25 for FraudDetection', description: 'Automated control 25 in fraud-detection pipeline', enabled: true, weight: 5, category: 'list' },
];

export function enabledRules(): CatalogRule[] {
  return FRAUDDETECTION_RULES.filter((r) => r.enabled);
}

export function totalWeight(): number {
  return enabledRules().reduce((a, r) => a + r.weight, 0);
}
