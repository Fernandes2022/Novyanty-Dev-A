import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    return NextResponse.json({
      status: 'ok',
      received: body,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: 'Invalid request' },
      { status: 400 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    endpoint: '/api/theme',
    methods: ['GET', 'POST']
  });
}
