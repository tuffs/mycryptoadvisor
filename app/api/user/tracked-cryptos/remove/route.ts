import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  const userId = 1; // Example user ID, replaced with real auth logic
  const { symbol } = await request.json();

  if (!symbol) {
    return NextResponse.json({ error: 'Symbol is required' }, { status: 400 });
  }

  const trackedCryptoMatches = await prisma.trackedCrypto.findMany({
    where: { symbol: symbol.toUpperCase(), userId },
  });

  if (trackedCryptoMatches.length > 0) {
    await prisma.trackedCrypto.deleteMany({
      where: {
        symbol: symbol,
        userId: userId,
      }
    });
  } else {
    return NextResponse.json({ error: 'Symbol or user not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}