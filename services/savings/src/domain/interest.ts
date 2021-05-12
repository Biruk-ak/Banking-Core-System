/** Interest and accrual helpers for Savings */
export interface AccrualConfig {
  annualRateBps: number;
  compounding: 'daily' | 'monthly' | 'quarterly' | 'annually';
  dayCount: 'ACT/365' | 'ACT/360' | '30/360';
  minimumBalanceMinor: number;
}
export class SavingsInterestCalculator {
  constructor(private readonly config: AccrualConfig) {}
  dailyRate(): number {
    const annual = this.config.annualRateBps / 10_000;
    const days = this.config.dayCount === 'ACT/360' ? 360 : 365;
    return annual / days;
  }
  accrue(balanceMinor: number, days: number): number {
    if (balanceMinor < this.config.minimumBalanceMinor) return 0;
    const interest = balanceMinor * this.dailyRate() * days;
    return Math.round(interest);
  }
  project(balanceMinor: number, months: number): { month: number; balanceMinor: number; interestMinor: number }[] {
    const schedule: { month: number; balanceMinor: number; interestMinor: number }[] = [];
    let bal = balanceMinor;
    for (let m = 1; m <= months; m++) {
      const days = this.config.compounding === 'monthly' ? 30 : 30;
      const interestMinor = this.accrue(bal, days);
      if (this.config.compounding === 'monthly' || this.config.compounding === 'daily') {
        bal += interestMinor;
      }
      schedule.push({ month: m, balanceMinor: bal, interestMinor });
    }
    return schedule;
  }
  aprToApy(aprBps: number, periodsPerYear: number): number {
    const apr = aprBps / 10_000;
    return (Math.pow(1 + apr / periodsPerYear, periodsPerYear) - 1) * 10_000;
  }
}
