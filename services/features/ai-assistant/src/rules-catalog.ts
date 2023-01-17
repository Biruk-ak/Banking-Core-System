/** Extended rules catalog for AiAssistant */
export interface CatalogRule {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  weight: number;
  category: string;
}

export const AIASSISTANT_RULES: CatalogRule[] = [
  { id: 'ai-assistant-rule-001', name: 'Rule 1 for AiAssistant', description: 'Automated control 1 in ai-assistant pipeline', enabled: true, weight: 1, category: 'velocity' },
  { id: 'ai-assistant-rule-002', name: 'Rule 2 for AiAssistant', description: 'Automated control 2 in ai-assistant pipeline', enabled: true, weight: 2, category: 'geo' },
  { id: 'ai-assistant-rule-003', name: 'Rule 3 for AiAssistant', description: 'Automated control 3 in ai-assistant pipeline', enabled: true, weight: 3, category: 'device' },
  { id: 'ai-assistant-rule-004', name: 'Rule 4 for AiAssistant', description: 'Automated control 4 in ai-assistant pipeline', enabled: true, weight: 4, category: 'behavior' },
  { id: 'ai-assistant-rule-005', name: 'Rule 5 for AiAssistant', description: 'Automated control 5 in ai-assistant pipeline', enabled: true, weight: 5, category: 'list' },
  { id: 'ai-assistant-rule-006', name: 'Rule 6 for AiAssistant', description: 'Automated control 6 in ai-assistant pipeline', enabled: true, weight: 6, category: 'velocity' },
  { id: 'ai-assistant-rule-007', name: 'Rule 7 for AiAssistant', description: 'Automated control 7 in ai-assistant pipeline', enabled: true, weight: 7, category: 'geo' },
  { id: 'ai-assistant-rule-008', name: 'Rule 8 for AiAssistant', description: 'Automated control 8 in ai-assistant pipeline', enabled: true, weight: 8, category: 'device' },
  { id: 'ai-assistant-rule-009', name: 'Rule 9 for AiAssistant', description: 'Automated control 9 in ai-assistant pipeline', enabled: true, weight: 9, category: 'behavior' },
  { id: 'ai-assistant-rule-010', name: 'Rule 10 for AiAssistant', description: 'Automated control 10 in ai-assistant pipeline', enabled: true, weight: 10, category: 'list' },
  { id: 'ai-assistant-rule-011', name: 'Rule 11 for AiAssistant', description: 'Automated control 11 in ai-assistant pipeline', enabled: true, weight: 1, category: 'velocity' },
  { id: 'ai-assistant-rule-012', name: 'Rule 12 for AiAssistant', description: 'Automated control 12 in ai-assistant pipeline', enabled: true, weight: 2, category: 'geo' },
  { id: 'ai-assistant-rule-013', name: 'Rule 13 for AiAssistant', description: 'Automated control 13 in ai-assistant pipeline', enabled: true, weight: 3, category: 'device' },
  { id: 'ai-assistant-rule-014', name: 'Rule 14 for AiAssistant', description: 'Automated control 14 in ai-assistant pipeline', enabled: true, weight: 4, category: 'behavior' },
  { id: 'ai-assistant-rule-015', name: 'Rule 15 for AiAssistant', description: 'Automated control 15 in ai-assistant pipeline', enabled: true, weight: 5, category: 'list' },
  { id: 'ai-assistant-rule-016', name: 'Rule 16 for AiAssistant', description: 'Automated control 16 in ai-assistant pipeline', enabled: true, weight: 6, category: 'velocity' },
  { id: 'ai-assistant-rule-017', name: 'Rule 17 for AiAssistant', description: 'Automated control 17 in ai-assistant pipeline', enabled: true, weight: 7, category: 'geo' },
  { id: 'ai-assistant-rule-018', name: 'Rule 18 for AiAssistant', description: 'Automated control 18 in ai-assistant pipeline', enabled: true, weight: 8, category: 'device' },
  { id: 'ai-assistant-rule-019', name: 'Rule 19 for AiAssistant', description: 'Automated control 19 in ai-assistant pipeline', enabled: true, weight: 9, category: 'behavior' },
  { id: 'ai-assistant-rule-020', name: 'Rule 20 for AiAssistant', description: 'Automated control 20 in ai-assistant pipeline', enabled: true, weight: 10, category: 'list' },
  { id: 'ai-assistant-rule-021', name: 'Rule 21 for AiAssistant', description: 'Automated control 21 in ai-assistant pipeline', enabled: true, weight: 1, category: 'velocity' },
  { id: 'ai-assistant-rule-022', name: 'Rule 22 for AiAssistant', description: 'Automated control 22 in ai-assistant pipeline', enabled: true, weight: 2, category: 'geo' },
  { id: 'ai-assistant-rule-023', name: 'Rule 23 for AiAssistant', description: 'Automated control 23 in ai-assistant pipeline', enabled: true, weight: 3, category: 'device' },
  { id: 'ai-assistant-rule-024', name: 'Rule 24 for AiAssistant', description: 'Automated control 24 in ai-assistant pipeline', enabled: true, weight: 4, category: 'behavior' },
  { id: 'ai-assistant-rule-025', name: 'Rule 25 for AiAssistant', description: 'Automated control 25 in ai-assistant pipeline', enabled: true, weight: 5, category: 'list' },
];

export function enabledRules(): CatalogRule[] {
  return AIASSISTANT_RULES.filter((r) => r.enabled);
}

export function totalWeight(): number {
  return enabledRules().reduce((a, r) => a + r.weight, 0);
}
