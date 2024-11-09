import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: 'Auth GET route placeholder' });
}

export async function POST(request: NextRequest) {
  return NextResponse.json({ message: 'Auth POST route placeholder' });
}