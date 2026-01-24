
// whatsapp-service.ts
// Reusable service to interact with Meta Graph API

const WHATSAPP_API_URL = 'https://graph.facebook.com/v22.0';

export async function sendWhatsAppMessage(to: string, body: string) {
    const token = process.env.WHATSAPP_ACCESS_TOKEN;
    const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;

    if (!token || !phoneId) {
        console.error('Missing WhatsApp Configuration');
        return { success: false, error: 'Missing Configuration' };
    }

    try {
        const response = await fetch(`${WHATSAPP_API_URL}/${phoneId}/messages`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                messaging_product: 'whatsapp',
                to: to,
                type: 'text',
                text: { body: body },
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Meta API Error:', JSON.stringify(data, null, 2));
            return { success: false, error: data.error?.message || 'Failed to send' };
        }

        return { success: true, data };
    } catch (error) {
        console.error('Network/Server Error:', error);
        return { success: false, error: 'Network Error' };
    }
}
