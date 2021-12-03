export interface GlAccount {
  code: string;
  name: string;
  type: 'asset' | 'liability' | 'equity' | 'income' | 'expense';
  parentCode?: string;
  currencyRestricted?: string;
}

export const CHART_OF_ACCOUNTS: GlAccount[] = [
  { code: '1000', name: 'Cash and Cash Equivalents', type: 'asset' },
  { code: '1100', name: 'Customer Deposit Liabilities Clearing', type: 'liability' },
  { code: '1200', name: 'Loans and Advances', type: 'asset' },
  { code: '1300', name: 'Credit Card Receivables', type: 'asset' },
  { code: '1400', name: 'Mortgage Portfolio', type: 'asset' },
  { code: '1500', name: 'Investment Securities', type: 'asset' },
  { code: '1600', name: 'FX Position', type: 'asset' },
  { code: '2000', name: 'Customer Current Accounts', type: 'liability' },
  { code: '2100', name: 'Customer Savings Accounts', type: 'liability' },
  { code: '2200', name: 'Term Deposits', type: 'liability' },
  { code: '3000', name: 'Share Capital', type: 'equity' },
  { code: '3100', name: 'Retained Earnings', type: 'equity' },
  { code: '4000', name: 'Interest Income', type: 'income' },
  { code: '4100', name: 'Fee Income', type: 'income' },
  { code: '4200', name: 'FX Gains', type: 'income' },
  { code: '5000', name: 'Interest Expense', type: 'expense' },
  { code: '5100', name: 'Operating Expense', type: 'expense' },
  { code: '5200', name: 'Credit Loss Provisions', type: 'expense' },
  { code: '5300', name: 'FX Losses', type: 'expense' },
];

export function findAccount(code: string): GlAccount | undefined {
  return CHART_OF_ACCOUNTS.find((a) => a.code === code);
}

export function accountsByType(type: GlAccount['type']): GlAccount[] {
  return CHART_OF_ACCOUNTS.filter((a) => a.type === type);
}
