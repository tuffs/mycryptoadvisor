import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

interface Trade {
  cryptoId: number;
  type: 'BUY' | 'SELL';
  quantity: number;
}

export async function GET(request: Request) {
  const { cryptoId, type, quantity } = await request.json() as Trade;
  const trade = await prisma.trade.create({
    data: {
      type,
      quantity,
      trackedCryptoId: cryptoId,
    },
  });

  return NextResponse.json(trade);
}