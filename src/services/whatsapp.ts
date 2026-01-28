
import { prisma } from '@/lib/prisma';
import { createLead } from './leads';
import { createActivity } from './activities';
import { detectProvinceFromPhone } from '@/lib/argentina-geo';
import { getAssigneeForProvince } from '@/lib/lead-routing';

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
            // Geo & Routing Logic
            const detectedProvince = detectProvinceFromPhone(senderPhone);
            const assignedUserId = await getAssigneeForProvince(detectedProvince, brand.id);

            lead = await createLead({
                brandId: brand.id,
                fullName: senderName || 'Unknown WhatsApp User',
                phone: senderPhone,
                email: '',
                province: detectedProvince, // Geo
                sourceId: source.id,
                stageId: stage.id,
                createdById: admin.id,
                productsOfInterest: []
            });

            // If assigned, we must update it because createLead might not support ownerUserId in its params yet...
            // Let's check createLeadData type in leads.ts. 
            // Wait, I should check createLead signature first.
            // Assuming createLead takes minimal data. 
            // Better to perform an update immediately if createLead doesn't accept ownerUserId.
            if (assignedUserId) {
                await prisma.lead.update({
                    where: { id: lead.id },
                    data: { ownerUserId: assignedUserId }
                });
            }

            console.log('✨ New Lead created via WhatsApp:', lead.id, 'Assigned to:', assignedUserId);
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

    // Debugging (Remove after verification): Log token info safely
    console.log(`ℹ️ Using WhatsApp Token: Length=${token.length}, Ends with=${token.slice(-5)}`);

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
