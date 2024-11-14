export function formatMoney(amount: number, currency = 'USD', locale = 'en-US'): string {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
}

export function formatDate(iso: string, locale = 'en-US'): string {
  return new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(iso));
}

export function maskAccount(ibanOrNumber: string): string {
  if (ibanOrNumber.length <= 4) return ibanOrNumber;
  return '••••' + ibanOrNumber.slice(-4);
}

export function percent(n: number, digits = 1): string {
  return `${n.toFixed(digits)}%`;
}
