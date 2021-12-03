/** Double-entry ledger — Banking Core System */
export type EntryDirection = 'debit' | 'credit';

export interface JournalLine {
  accountCode: string;
  direction: EntryDirection;
  amountMinor: number;
  currency: string;
  narrative: string;
}

export interface JournalEntry {
  id: string;
  valueDate: string;
  bookingDate: string;
  reference: string;
  lines: JournalLine[];
  status: 'draft' | 'posted' | 'reversed';
}

export class LedgerError extends Error {}

export class DoubleEntryLedger {
  private journals: JournalEntry[] = [];
  private balances = new Map<string, number>();

  post(reference: string, lines: JournalLine[], valueDate = new Date().toISOString()): JournalEntry {
    if (lines.length < 2) throw new LedgerError('Journal requires at least two lines');
    const byCcy = new Map<string, number>();
    for (const line of lines) {
      const signed = line.direction === 'debit' ? line.amountMinor : -line.amountMinor;
      byCcy.set(line.currency, (byCcy.get(line.currency) ?? 0) + signed);
    }
    for (const [ccy, net] of byCcy) {
      if (net !== 0) throw new LedgerError(`Unbalanced journal for ${ccy}: net ${net}`);
    }
    const entry: JournalEntry = {
      id: crypto.randomUUID(),
      valueDate,
      bookingDate: new Date().toISOString(),
      reference,
      lines,
      status: 'posted',
    };
    for (const line of lines) {
      const key = `${line.accountCode}:${line.currency}`;
      const delta = line.direction === 'debit' ? line.amountMinor : -line.amountMinor;
      this.balances.set(key, (this.balances.get(key) ?? 0) + delta);
    }
    this.journals.push(entry);
    return entry;
  }

  reverse(journalId: string): JournalEntry {
    const original = this.journals.find((j) => j.id === journalId);
    if (!original) throw new LedgerError('Journal not found');
    if (original.status === 'reversed') throw new LedgerError('Already reversed');
    const lines = original.lines.map((l) => ({
      ...l,
      direction: (l.direction === 'debit' ? 'credit' : 'debit') as EntryDirection,
      narrative: 'Reversal of ' + original.reference,
    }));
    const rev = this.post('REV-' + original.reference, lines);
    original.status = 'reversed';
    return rev;
  }

  balanceOf(accountCode: string, currency: string): number {
    return this.balances.get(`${accountCode}:${currency}`) ?? 0;
  }

  list(referencePrefix?: string): JournalEntry[] {
    return referencePrefix
      ? this.journals.filter((j) => j.reference.startsWith(referencePrefix))
      : [...this.journals];
  }
}
