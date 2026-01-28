import { NextResponse } from 'next/server';

export async function POST(req) {
  const { email, password } = await req.json();

  if (email === 'test@test.com' && password === '123456') {
    return NextResponse.json({ message: 'Success.' });
  }

  return NextResponse.json({ message: 'Error' }, { status: 401 });
}
