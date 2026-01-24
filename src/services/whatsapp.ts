
import { prisma } from '@/lib/prisma';
import { createLead } from './leads';
import { createActivity } from './activities';

export async function processIncomingWhatsApp(
    senderPhone: string,
    senderName: string,
    text: string
) {
    console.log('🔄 Processing WhatsApp:', { senderPhone, senderName, text });

    // 1. Find existing lead by phone
    // We need to find a brand context first.
    const brand = await prisma.brand.findFirst();
    if (!brand) {
        console.error('❌ processIncomingWhatsApp: No Brand found in DB.');
        return;
    }

    // Find lead
    // Robust matching: Try to match the last 7 digits to handle +549 vs 11 differences
    const cleanPhone = senderPhone.replace(/\D/g, '');
    const phoneSuffix = cleanPhone.length > 7 ? cleanPhone.slice(-7) : cleanPhone;

    let lead = await prisma.lead.findFirst({
        where: {
            brandId: brand.id,
            phone: { contains: phoneSuffix }
        }
    });

    if (!lead) {
        // 2. Ensure Source exists (Auto-create/Healing)
        let source = await prisma.source.findFirst({ where: { brandId: brand.id, name: 'WhatsApp Business' } });
        if (!source) {
            console.log('⚠️ Source "WhatsApp Business" not found. Creating it...');
            source = await prisma.source.create({
                data: { brandId: brand.id, name: 'WhatsApp Business' }
            });
        }

        // 3. Ensure Stage exists (Fallback)
        let stage = await prisma.stage.findFirst({ where: { brandId: brand.id, order: 1 } });
        if (!stage) {
            console.warn('⚠️ Stage order 1 not found. Falling back to ANY stage.');
            stage = await prisma.stage.findFirst({ where: { brandId: brand.id } });
        }

        // 4. Ensure Creator exists (Fallback)
        let admin = await prisma.user.findFirst({ where: { brandId: brand.id, role: 'ADMIN' } });
        if (!admin) {
            console.warn('⚠️ Admin user not found. Falling back to ANY user for attribution.');
            admin = await prisma.user.findFirst({ where: { brandId: brand.id } });
        }

        if (source && stage && admin) {
            lead = await createLead({
                brandId: brand.id,
                fullName: senderName || 'Unknown WhatsApp User',
                phone: senderPhone,
                email: '', // Optional
                province: 'Unknown',
                sourceId: source.id,
                stageId: stage.id,
                createdById: admin.id,
                productsOfInterest: []
            });
            console.log('✨ New Lead created via WhatsApp:', lead.id);
        } else {
            console.error('❌ processIncomingWhatsApp: CRITICAL FAILURE. Could not resolve dependencies despite fallbacks.', {
                hasSource: !!source,
                hasStage: !!stage,
                hasAdmin: !!admin,
                brandId: brand.id
            });
            return;
        }
    } else {
        console.log('✅ Found existing lead:', lead.id);
    }

    if (lead) {
        // Log Activity
        // Attribute to the Lead Creator or fallback to any Admin/User found
        let botUser = await prisma.user.findFirst({ where: { brandId: brand.id, role: 'ADMIN' } });
        if (!botUser) {
            botUser = await prisma.user.findFirst({ where: { brandId: brand.id } });
        }

        if (botUser) {
            const messageBody = text ? text : '[Non-text message received]';
            await createActivity({
                brandId: brand.id,
                leadId: lead.id,
                userId: botUser.id,
                type: 'WHATSAPP',
                body: messageBody,
                outcome: 'Received'
            });
            console.log('💬 WhatsApp Activity logged for lead:', lead.id);
        }
    }
}

export async function sendWhatsAppMessage(to: string, text: string) {
    const token = process.env.WHATSAPP_ACCESS_TOKEN;
    const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;

    if (!token || !phoneId) {
        console.error('❌ Missing WhatsApp configuration (TOKEN or PHONE_ID)');
        return { success: false, error: 'Configuration Error' };
    }

    try {
        const response = await fetch(`https://graph.facebook.com/v22.0/${phoneId}/messages`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messaging_product: 'whatsapp',
                recipient_type: 'individual',
                to: to,
                type: 'text',
                text: { body: text }
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('❌ Meta API Error:', JSON.stringify(data, null, 2));
            return { success: false, error: data.error?.message || 'Meta API Error' };
        }

        console.log('✅ WhatsApp message sent:', data);
        return { success: true, data };
    } catch (error) {
        console.error('❌ Network Error sending WhatsApp:', error);
        return { success: false, error: 'Network Error' };
    }
}
