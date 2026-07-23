import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    service: 'Banking Core System',
    status: 'healthy',
    owner: 'Biruk-ak',
    email: 'birukaklilu0110@gmail.com',
    timestamp: new Date().toISOString(),
  });
}
