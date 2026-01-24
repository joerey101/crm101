
import { prisma } from '@/lib/prisma';
import { createLead } from './leads';
import { createActivity } from './activities';

export async function processIncomingWhatsApp(
    senderPhone: string,
    senderName: string,
    text: string
) {
    // 1. Find existing lead by phone
    // Normalize phone? For now assume raw match or simple contains.
    // Meta sends without +, usually country code + number.

    // We need to find a brand context first.
    // LIMITATION: In v1.0 multi-tenant, incoming webhook doesn't know "which brand" unless phone number is mapped to brand.
    // For this POC, we will use the FIRST brand found in DB.
    const brand = await prisma.brand.findFirst();
    if (!brand) return; // Should not happen

    // Find lead
    let lead = await prisma.lead.findFirst({
        where: {
            brandId: brand.id,
            phone: { contains: senderPhone.replace('+', '') }
        }
    });

    if (!lead) {
        // Create new Lead
        // We need default Source and Stage
        const source = await prisma.source.findFirst({ where: { brandId: brand.id, name: 'WhatsApp Business' } });
        const stage = await prisma.stage.findFirst({ where: { brandId: brand.id, order: 1 } });

        // We need a creator user (system or admin). Let's pick the first ADMIN found.
        const admin = await prisma.user.findFirst({ where: { brandId: brand.id, role: 'ADMIN' } });

        if (source && stage && admin) {
            lead = await createLead({
                brandId: brand.id,
                fullName: senderName || 'Unknown WhatsApp User',
                phone: senderPhone,
                email: '', // No email from whatsapp
                province: 'Unknown',
                sourceId: source.id,
                stageId: stage.id,
                createdById: admin.id,
                productsOfInterest: []
            });
            console.log('✨ New Lead created via WhatsApp:', lead.id);
        }
    }

    if (lead) {
        // Log Activity
        // We need a user to attribute this activity to.
        // If the lead has an owner, maybe we attribute it to them? Or System?
        // Let's attribute to the Lead Creator or the Admin we found.
        const botUser = await prisma.user.findFirst({ where: { brandId: brand.id, role: 'ADMIN' } });

        if (botUser) {
            await createActivity({
                brandId: brand.id,
                leadId: lead.id,
                userId: botUser.id,
                type: 'WHATSAPP',
                body: `[Incoming Message]: ${text}`,
                outcome: 'Received'
            });
            console.log('💬 WhatsApp Activity logged for lead:', lead.id);
        }
    }
}
