
// whatsapp-actions.ts
// Server Action for sending messages with Argentina Fix

'use server';

// Import your service
import { sendWhatsAppMessage } from './service';

export async function sendMessageAction(phone: string, message: string) {
    // 1. Validate Input
    if (!phone || !message) return { success: false, error: 'Invalid Input' };

    // 2. Normalize Phone Number
    let cleanPhone = phone.replace(/\+/g, '').replace(/\D/g, '');

    // --- ARGENTINA SANDBOX FIX ---
    // Meta Sandbox often rejects '+54 9 11...' and requires '54 11 15...'
    // This logic handles the common case for Buenos Aires mobiles.

    // Case 1: Buenos Aires (11) with '9' prefix -> Convert to '54 11 15'
    if (cleanPhone.startsWith('54911')) {
        cleanPhone = cleanPhone.replace('54911', '541115');
    }
    // Case 2: Other Argentina regions with '9' -> Remove '9' (Generic fix)
    else if (cleanPhone.startsWith('549')) {
        cleanPhone = cleanPhone.replace('549', '54');
    }
    // -----------------------------

    // 3. Send
    return await sendWhatsAppMessage(cleanPhone, message);
}
