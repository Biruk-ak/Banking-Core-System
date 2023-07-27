/** Extended rules catalog for MerchantDashboard */
export interface CatalogRule {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  weight: number;
  category: string;
}

export const MERCHANTDASHBOARD_RULES: CatalogRule[] = [
  { id: 'merchant-dashboard-rule-001', name: 'Rule 1 for MerchantDashboard', description: 'Automated control 1 in merchant-dashboard pipeline', enabled: true, weight: 1, category: 'velocity' },
  { id: 'merchant-dashboard-rule-002', name: 'Rule 2 for MerchantDashboard', description: 'Automated control 2 in merchant-dashboard pipeline', enabled: true, weight: 2, category: 'geo' },
  { id: 'merchant-dashboard-rule-003', name: 'Rule 3 for MerchantDashboard', description: 'Automated control 3 in merchant-dashboard pipeline', enabled: true, weight: 3, category: 'device' },
  { id: 'merchant-dashboard-rule-004', name: 'Rule 4 for MerchantDashboard', description: 'Automated control 4 in merchant-dashboard pipeline', enabled: true, weight: 4, category: 'behavior' },
  { id: 'merchant-dashboard-rule-005', name: 'Rule 5 for MerchantDashboard', description: 'Automated control 5 in merchant-dashboard pipeline', enabled: true, weight: 5, category: 'list' },
  { id: 'merchant-dashboard-rule-006', name: 'Rule 6 for MerchantDashboard', description: 'Automated control 6 in merchant-dashboard pipeline', enabled: true, weight: 6, category: 'velocity' },
  { id: 'merchant-dashboard-rule-007', name: 'Rule 7 for MerchantDashboard', description: 'Automated control 7 in merchant-dashboard pipeline', enabled: true, weight: 7, category: 'geo' },
  { id: 'merchant-dashboard-rule-008', name: 'Rule 8 for MerchantDashboard', description: 'Automated control 8 in merchant-dashboard pipeline', enabled: true, weight: 8, category: 'device' },
  { id: 'merchant-dashboard-rule-009', name: 'Rule 9 for MerchantDashboard', description: 'Automated control 9 in merchant-dashboard pipeline', enabled: true, weight: 9, category: 'behavior' },
  { id: 'merchant-dashboard-rule-010', name: 'Rule 10 for MerchantDashboard', description: 'Automated control 10 in merchant-dashboard pipeline', enabled: true, weight: 10, category: 'list' },
  { id: 'merchant-dashboard-rule-011', name: 'Rule 11 for MerchantDashboard', description: 'Automated control 11 in merchant-dashboard pipeline', enabled: true, weight: 1, category: 'velocity' },
  { id: 'merchant-dashboard-rule-012', name: 'Rule 12 for MerchantDashboard', description: 'Automated control 12 in merchant-dashboard pipeline', enabled: true, weight: 2, category: 'geo' },
  { id: 'merchant-dashboard-rule-013', name: 'Rule 13 for MerchantDashboard', description: 'Automated control 13 in merchant-dashboard pipeline', enabled: true, weight: 3, category: 'device' },
  { id: 'merchant-dashboard-rule-014', name: 'Rule 14 for MerchantDashboard', description: 'Automated control 14 in merchant-dashboard pipeline', enabled: true, weight: 4, category: 'behavior' },
  { id: 'merchant-dashboard-rule-015', name: 'Rule 15 for MerchantDashboard', description: 'Automated control 15 in merchant-dashboard pipeline', enabled: true, weight: 5, category: 'list' },
  { id: 'merchant-dashboard-rule-016', name: 'Rule 16 for MerchantDashboard', description: 'Automated control 16 in merchant-dashboard pipeline', enabled: true, weight: 6, category: 'velocity' },
  { id: 'merchant-dashboard-rule-017', name: 'Rule 17 for MerchantDashboard', description: 'Automated control 17 in merchant-dashboard pipeline', enabled: true, weight: 7, category: 'geo' },
  { id: 'merchant-dashboard-rule-018', name: 'Rule 18 for MerchantDashboard', description: 'Automated control 18 in merchant-dashboard pipeline', enabled: true, weight: 8, category: 'device' },
  { id: 'merchant-dashboard-rule-019', name: 'Rule 19 for MerchantDashboard', description: 'Automated control 19 in merchant-dashboard pipeline', enabled: true, weight: 9, category: 'behavior' },
  { id: 'merchant-dashboard-rule-020', name: 'Rule 20 for MerchantDashboard', description: 'Automated control 20 in merchant-dashboard pipeline', enabled: true, weight: 10, category: 'list' },
  { id: 'merchant-dashboard-rule-021', name: 'Rule 21 for MerchantDashboard', description: 'Automated control 21 in merchant-dashboard pipeline', enabled: true, weight: 1, category: 'velocity' },
  { id: 'merchant-dashboard-rule-022', name: 'Rule 22 for MerchantDashboard', description: 'Automated control 22 in merchant-dashboard pipeline', enabled: true, weight: 2, category: 'geo' },
  { id: 'merchant-dashboard-rule-023', name: 'Rule 23 for MerchantDashboard', description: 'Automated control 23 in merchant-dashboard pipeline', enabled: true, weight: 3, category: 'device' },
  { id: 'merchant-dashboard-rule-024', name: 'Rule 24 for MerchantDashboard', description: 'Automated control 24 in merchant-dashboard pipeline', enabled: true, weight: 4, category: 'behavior' },
  { id: 'merchant-dashboard-rule-025', name: 'Rule 25 for MerchantDashboard', description: 'Automated control 25 in merchant-dashboard pipeline', enabled: true, weight: 5, category: 'list' },
];

export function enabledRules(): CatalogRule[] {
  return MERCHANTDASHBOARD_RULES.filter((r) => r.enabled);
}

export function totalWeight(): number {
  return enabledRules().reduce((a, r) => a + r.weight, 0);
}
