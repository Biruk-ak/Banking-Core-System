import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  if (!body?.fromAccountId || !body?.toAccountId || !body?.amount) {
    return NextResponse.json({ error: 'Invalid transfer payload' }, { status: 400 });
  }
  return NextResponse.json({
    transferId: crypto.randomUUID(),
    status: 'accepted',
    ...body,
    createdAt: new Date().toISOString(),
  });
}
