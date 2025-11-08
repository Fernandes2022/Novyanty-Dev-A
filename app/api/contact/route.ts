import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;
    
    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // TODO: Implement actual email sending logic (SendGrid, Resend, etc.)
    console.log('Contact form submission:', { name, email, message });
    
    // For now, just return success
    return NextResponse.json({ 
      status: 'success', 
      message: 'Message received! We\'ll get back to you soon.' 
    });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
