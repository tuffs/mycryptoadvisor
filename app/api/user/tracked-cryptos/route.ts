import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const userId = 1; // Example user ID; replace with real auth logic

  const trackedCryptos = await prisma.trackedCrypto.findMany({
    where: { userId },
    include: { trades: true },
  });

  return NextResponse.json(trackedCryptos);
}

export async function POST(request: Request) {
  const userId = 1; // Example user ID; replace with real auth logic
  const { symbol } = await request.json();

  if (!symbol) {
    return NextResponse.json({ error: 'Symbol is required' }, { status: 400 });
  }

  try {
    const newCrypto = await prisma.trackedCrypto.create({
      data: {
        symbol: symbol.toUpperCase(),
        userId,
      },
    });

    return NextResponse.json(newCrypto, { status: 201 });
  } catch (error) {
    console.error('Error tracking new cryptocurrency:', error);
    return NextResponse.json({ error: 'Failed to add tracked cryptocurrency' }, { status: 500 });
  }
}