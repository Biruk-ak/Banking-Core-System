import { ok, err } from '../packages/domain-core/src/result';

describe('Result', () => {
  test('ok map', () => {
    const r = ok(2).map((n) => n * 3);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.value).toBe(6);
  });

  test('err short-circuits map', () => {
    const r = err(new Error('x')).map(() => 1);
    expect(r.ok).toBe(false);
  });

  test('flatMap chains', () => {
    const r = ok(2).flatMap((n) => ok(n + 1));
    expect(r.ok && r.value).toBe(3);
  });
});
