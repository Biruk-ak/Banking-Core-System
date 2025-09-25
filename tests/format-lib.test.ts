import { formatMoney, maskAccount, percent } from '../src/lib/format';

describe('format helpers', () => {
  test('formatMoney', () => {
    expect(formatMoney(12.5, 'USD')).toContain('12');
  });
  test('maskAccount', () => {
    expect(maskAccount('1234567890')).toBe('••••7890');
  });
  test('percent', () => {
    expect(percent(12.34)).toBe('12.3%');
  });
});
