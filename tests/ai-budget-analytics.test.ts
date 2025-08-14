import { AiAssistantEngine } from '../services/features/ai-assistant/src/engine';
import { BudgetTrackingEngine } from '../services/features/budget-tracking/src/engine';
import { SpendingAnalyticsEngine } from '../services/features/spending-analytics/src/engine';

describe('AI budget analytics', () => {
  test('ai assistant decision shape', () => {
    const d = new AiAssistantEngine().evaluate({ customerId: 'c1', metadata: { prompt: 'budget tip' } });
    expect(d.decisionId).toBeTruthy();
  });
  test('budget and spending engines', () => {
    expect(new BudgetTrackingEngine().evaluate({ customerId: 'c1' }).feature).toBe('budget-tracking');
    expect(new SpendingAnalyticsEngine().evaluate({ customerId: 'c1', amountMinor: 2000 }).feature).toBe('spending-analytics');
  });
});
