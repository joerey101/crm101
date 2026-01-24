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
        // If it starts with 549, remove the 9 to make it 54...
        // Sandbox often needs 54 + 11 + 15... or just 54 + 11... but 549 fails allowlist check usually.
        // Our successful test was 541115...
        // If the number is 54911..., we convert to 5411... 
        if (cleanPhone.startsWith('549')) {
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
