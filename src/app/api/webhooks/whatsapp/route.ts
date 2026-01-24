
import { NextRequest, NextResponse } from 'next/server';

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || 'crm_retail_verify_token';

// 1. Verification Endpoint (Meta calls this to verify ownership)
export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const mode = searchParams.get('hub.mode');
    const token = searchParams.get('hub.verify_token');
    const challenge = searchParams.get('hub.challenge');

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('WEBHOOK_VERIFIED');
            return new NextResponse(challenge, { status: 200 });
        } else {
            return new NextResponse('Forbidden', { status: 403 });
        }
    }

    return new NextResponse('Bad Request', { status: 400 });
}

// 2. Event Listener (Meta sends messages here)
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        console.log('Webhook Body:', JSON.stringify(body, null, 2));

        // Check if this is a WhatsApp status update or message
        const entry = body.entry?.[0];
        const changes = entry?.changes?.[0];
        const value = changes?.value;

        if (value?.messages) {
            const message = value.messages[0];
            const senderPhone = message.from; // e.g., "54911..."
            const text = message.text?.body;
            const name = value.contacts?.[0]?.profile?.name;

            console.log('📩 WhatsApp Recibido:', { senderPhone, name, text });

            if (senderPhone && text) {
                const { processIncomingWhatsApp } = await import('@/services/whatsapp');
                await processIncomingWhatsApp(senderPhone, name || 'Unknown', text);
            }
        }

        return new NextResponse('EVENT_RECEIVED', { status: 200 });
    } catch (error) {
        console.error('Error processing webhook:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
