import { NextResponse } from 'next/server';

const DEMO = [
  { id: 'acc-sav-001', name: 'Primary Savings', type: 'savings', balance: 12500.45, currency: 'USD' },
  { id: 'acc-cur-001', name: 'Everyday Current', type: 'current', balance: 3420.1, currency: 'USD' },
  { id: 'acc-fx-001', name: 'EUR Wallet', type: 'fx', balance: 890.0, currency: 'EUR' },
];

export async function GET() {
  return NextResponse.json({ accounts: DEMO });
}
