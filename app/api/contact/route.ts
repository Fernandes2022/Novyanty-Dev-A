import { NextResponse } from 'next/server';

/**
 * Contact Form API Endpoint
 * 
 * @route POST /api/contact
 * @description Handles contact form submissions from the contact page
 * @access Public
 */
export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json();
    
    // Extract required fields from contact form
    const { name, email, message } = body;

    // Validate required fields
    // All three fields (name, email, message) are mandatory
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // TODO: Implement actual email sending logic
    // Recommended services: SendGrid, Resend, AWS SES, or Mailgun
    // Example with SendGrid:
    // await sendEmail({
    //   to: 'support@creativeworkspace.com',
    //   from: email,
    //   subject: `Contact Form: ${name}`,
    //   text: message
    // });
    
    // Log submission for now (temporary until email service is configured)
    console.log('Contact form submission:', { name, email, message });

    // Return success response
    // Client expects: { status: 'success', message: '...' }
    return NextResponse.json({ 
      status: 'success', 
      message: 'Message received! We\'ll get back to you soon.' 
    });
    
  } catch (error) {
    // Handle any errors during processing
    console.error('Contact API error:', error);
    
    // Return error response with 500 status
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
