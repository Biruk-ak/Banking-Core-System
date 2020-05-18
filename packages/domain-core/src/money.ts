/** Money value object — Banking Core System */
export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'ETB' | 'AED' | 'JPY' | 'CHF' | 'CAD' | 'AUD' | 'CNY';
export class Money {
  private constructor(
    public readonly amountMinor: bigint,
    public readonly currency: CurrencyCode,
  ) {
    if (!Number.isFinite(Number(amountMinor))) {
      throw new Error('Invalid money amount');
    }
  }
  static of(amount: number | string | bigint, currency: CurrencyCode): Money {
    const n = typeof amount === 'bigint' ? amount : BigInt(Math.round(Number(amount) * 100));
    return new Money(n, currency);
  }
  static zero(currency: CurrencyCode): Money {
    return new Money(0n, currency);
  }
  add(other: Money): Money {
    this.assertSameCurrency(other);
    return new Money(this.amountMinor + other.amountMinor, this.currency);
  }
  subtract(other: Money): Money {
    this.assertSameCurrency(other);
    return new Money(this.amountMinor - other.amountMinor, this.currency);
  }
  multiply(factor: number): Money {
    const result = BigInt(Math.round(Number(this.amountMinor) * factor));
    return new Money(result, this.currency);
  }
  isPositive(): boolean { return this.amountMinor > 0n; }
  isNegative(): boolean { return this.amountMinor < 0n; }
  isZero(): boolean { return this.amountMinor === 0n; }
  greaterThan(other: Money): boolean {
    this.assertSameCurrency(other);
    return this.amountMinor > other.amountMinor;
  }
  lessThan(other: Money): boolean {
    this.assertSameCurrency(other);
    return this.amountMinor < other.amountMinor;
  }
  equals(other: Money): boolean {
    return this.currency === other.currency && this.amountMinor === other.amountMinor;
  }
  toMajorUnits(): number { return Number(this.amountMinor) / 100; }
  format(locale = 'en-US'): string {
    return new Intl.NumberFormat(locale, { style: 'currency', currency: this.currency }).format(this.toMajorUnits());
  }
  private assertSameCurrency(other: Money): void {
    if (this.currency !== other.currency) {
      throw new Error(`Currency mismatch: ${this.currency} vs ${other.currency}`);
    }
  }
}
