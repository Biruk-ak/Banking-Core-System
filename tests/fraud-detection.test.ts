import { FraudDetectionEngine } from '../services/features/fraud-detection/src/engine';
import { FraudDetectionService } from '../services/features/fraud-detection/src/service';
import { InMemoryEventBus } from '../services/shared/infra/event-bus';
import { InMemoryRedisCache } from '../services/shared/infra/redis-cache';

describe('Fraud detection', () => {
  test('flags sanctioned geography', () => {
    const engine = new FraudDetectionEngine();
    const d = engine.evaluate({ customerId: 'c1', country: 'KP', amountMinor: 100 });
    expect(d.outcome).toBe('deny');
    expect(d.score).toBeGreaterThanOrEqual(50);
  });

  test('service caches decisions', async () => {
    const svc = new FraudDetectionService(new InMemoryEventBus(), new InMemoryRedisCache());
    const a = await svc.assess({ customerId: 'c1', amountMinor: 100 });
    const b = await svc.assess({ customerId: 'c1', amountMinor: 100 });
    expect(a.decisionId).toBe(b.decisionId);
  });

  test('large amount increases score', () => {
    const engine = new FraudDetectionEngine();
    const d = engine.evaluate({ customerId: 'c1', amountMinor: 60_000_00 });
    expect(d.score).toBeGreaterThanOrEqual(25);
  });
});
