import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyPassword, generateToken } from '@/lib/auth';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // Check if the user exists
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 400 });
  }

  // Verify the password
  const isValid = await verifyPassword(password, user.passwordHash);
  if (!isValid) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 400 });
  }

  // Generate a JSON Web Token
  const token = generateToken({ userId: user.id, email: user.email });

  return NextResponse.json({ message: 'Login successful', token });
}