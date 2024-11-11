import { NextResponse } from 'next/server';
import { getCoinbasePrice } from '@/lib/crypto';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol') ?? 'ETH';
  const currency = searchParams.get('currency') ?? 'USD';

  const priceData = await getCoinbasePrice(symbol, currency);

  if (!priceData) {
    return NextResponse.json({ error: 'Failed to fetch price data' }, { status: 500 });
  }

  return NextResponse.json(priceData);
}