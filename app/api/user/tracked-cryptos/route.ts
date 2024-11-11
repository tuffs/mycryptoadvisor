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