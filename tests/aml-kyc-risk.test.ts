import { AmlEngine } from '../services/features/aml/src/engine';
import { KycEngine } from '../services/features/kyc/src/engine';
import { RiskEngineEngine } from '../services/features/risk-engine/src/engine';

describe('Compliance engines', () => {
  test('AML evaluates input', () => {
    const d = new AmlEngine().evaluate({ customerId: 'c1', amountMinor: 1_000_00, channel: 'web' });
    expect(['allow', 'review', 'deny', 'challenge']).toContain(d.outcome);
  });

  test('KYC evaluates input', () => {
    const d = new KycEngine().evaluate({ customerId: 'c1', metadata: { docType: 'passport' } });
    expect(d.feature).toBe('kyc');
  });

  test('Risk engine scores', () => {
    const d = new RiskEngineEngine().evaluate({ customerId: 'c1', amountMinor: 80_000_00, country: 'IR' });
    expect(d.score).toBeGreaterThan(0);
  });
});
