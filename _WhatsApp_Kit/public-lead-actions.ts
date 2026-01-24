'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { detectProvinceFromPhone } from './argentina-geo'; // Relative import for portability

// Response type
export type PublicLeadResult = {
    success: boolean;
    error?: string;
    redirectUrl?: string;
};

export async function createPublicLeadAction(prevState: any, formData: FormData): Promise<PublicLeadResult> {
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const interest = formData.get('interest') as string || 'General';

    if (!name || !phone) {
        return { success: false, error: 'Nombre y teléfono son obligatorios.' };
    }

    try {
        // 1. Get Default Brand (First one)
        const brand = await prisma.brand.findFirst();
        if (!brand) return { success: false, error: 'System configuration error (No Brand).' };

        // 2. Get Initial Stage (Lowest Order)
        const stage = await prisma.stage.findFirst({
            where: { brandId: brand.id },
            orderBy: { order: 'asc' }
        });
        if (!stage) return { success: false, error: 'System configuration error (No Stage).' };

        // 3. Get or Create "Web" Source
        let source = await prisma.source.findFirst({
            where: { brandId: brand.id, name: 'Web' }
        });

        if (!source) {
            // Fallback: Use any source or create one if strictly needed
            source = await prisma.source.findFirst({ where: { brandId: brand.id } });
        }

        if (!source) return { success: false, error: 'System configuration error (No Source).' };

        // 4. Create Lead
        // We set createdByUserId to a system user or the first Admin found to satisfy the constraint.
        const adminUser = await prisma.user.findFirst({
            where: { brandId: brand.id, role: 'ADMIN' }
        });

        if (!adminUser) return { success: false, error: 'System configuration error (No Admin).' };

        const newLead = await prisma.lead.create({
            data: {
                brandId: brand.id,
                fullName: name,
                phone: phone,
                province: detectProvinceFromPhone(phone), // Auto-detect from Area Code
                productsOfInterest: [interest],
                stageId: stage.id,
                sourceId: source.id,
                leadStrength: 'PHONE_ONLY',
                firstResponseDueAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24h SLA
                createdByUserId: adminUser.id, // Attributed to Admin as "System"
            }
        });

        // 5. Generate WhatsApp URL
        // Redirect user to WhatsApp Click-to-Chat with the Business Number
        const businessPhone = process.env.NEXT_PUBLIC_BUSINESS_PHONE || '5491133590001';

        const message = `Hola, soy ${name}. Dejé mis datos por ${interest}.`;
        const encodedMessage = encodeURIComponent(message);

        const waUrl = `https://wa.me/${businessPhone}?text=${encodedMessage}`;

        return { success: true, redirectUrl: waUrl };

    } catch (error) {
        console.error('Error creating public lead:', error);
        return { success: false, error: 'Ocurrió un error al procesar tu solicitud.' };
    }
}
