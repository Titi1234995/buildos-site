import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, company, message } = body;

    if (!email || !name) {
      return NextResponse.json({ error: 'Name and email required' }, { status: 400 });
    }

    // TODO: Send to HubSpot CRM + Slack notification
    console.log('Contact form:', { name, email, company, message });

    return NextResponse.json({ success: true, message: 'Thanks! We will be in touch.' });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
