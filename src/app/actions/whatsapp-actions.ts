'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { createActivity } from '@/services/activities';
import { sendWhatsAppMessage } from '@/services/whatsapp';
import { revalidatePath } from 'next/cache';

export async function sendWhatsAppAction(leadId: string, message: string) {
    const session = await auth();
    if (!session?.user?.id) {
        return { success: false, error: 'Unauthorized' };
    }

    if (!message || message.trim().length === 0) {
        return { success: false, error: 'Message cannot be empty' };
    }

    try {
        // 1. Get Lead Phone
        const lead = await prisma.lead.findUnique({
            where: { id: leadId },
            select: { id: true, phone: true, brandId: true }
        });

        if (!lead || !lead.phone) {
            return { success: false, error: 'Lead has no phone number' };
        }

        // 2. Normalize Phone (Simple)
        // Meta requires country code. We assume the lead.phone has it or we strip +
        let cleanPhone = lead.phone.replace(/\+/g, '').replace(/\D/g, '');

        // ARGENTINA SPECIFIC FIX FOR SANDBOX (and sometimes Prod)
        // Meta Sandbox for Argentina often requires the local mobile prefix '15' AFTER the area code,
        // and NO '9' before it.
        // Example: 
        //   Input (DB): 5491133590001 (+54 9 11 ...)
        //   Target:     54111533590001 (54 11 15 ...) - Verified in manual test.

        // Fix for Buenos Aires (Area Code 11) - Most common
        if (cleanPhone.startsWith('54911')) {
            cleanPhone = cleanPhone.replace('54911', '541115');
        }
        // Fallback for others if needed: just remove 9 (might fail if 15 represents strict local format)
        else if (cleanPhone.startsWith('549')) {
            cleanPhone = cleanPhone.replace('549', '54');
        }

        // 3. Send Message via Meta API
        const result = await sendWhatsAppMessage(cleanPhone, message);

        if (!result.success) {
            return { success: false, error: result.error };
        }

        // 4. Log Activity
        await createActivity({
            brandId: lead.brandId,
            leadId: lead.id,
            userId: session.user.id,
            type: 'WHATSAPP', // We might want a subtype 'OUTBOUND' later, or just distinguish by user vs bot
            body: message,
            outcome: 'Sent'
        });

        revalidatePath(`/dashboard/leads/${leadId}`);
        return { success: true };

    } catch (error) {
        console.error('Error in sendWhatsAppAction:', error);
        return { success: false, error: 'Internal Server Error' };
    }
}
