
// whatsapp-webhook-route.ts
// Next.js App Router Route Handler (src/app/api/webhooks/whatsapp/route.ts)

import { NextRequest, NextResponse } from 'next/server';

const VERIFY_TOKEN = process.env.WEBHOOK_VERIFY_TOKEN || 'my-secure-token';

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const mode = searchParams.get('hub.mode');
    const token = searchParams.get('hub.verify_token');
    const challenge = searchParams.get('hub.challenge');

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        return new NextResponse(challenge, { status: 200 });
    } else {
        return new NextResponse('Forbidden', { status: 403 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Check if it's a WhatsApp status update or message
        if (body.object === 'whatsapp_business_account') {
            const entry = body.entry?.[0];
            const changes = entry?.changes?.[0];
            const value = changes?.value;

            if (value?.messages && value.messages.length > 0) {
                const message = value.messages[0];
                const from = message.from; // Sender phone number
                const text = message.text?.body; // Message body

                console.log(`📩 New Message from ${from}: ${text}`);

                // TODO: Insert your logic here (Save to DB, trigger bot, etc.)
                // Example: await saveMessageToDB(from, text);
            }
        }

        return new NextResponse('EVENT_RECEIVED', { status: 200 });
    } catch (error) {
        console.error('Webhook Error:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
