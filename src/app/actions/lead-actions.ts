'use server';

import { auth } from '@/auth';
import { createLead } from '@/services/leads';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const CreateLeadSchema = z.object({
    fullName: z.string().min(1, 'Name is required'),
    phone: z.string().optional(),
    email: z.string().email('Invalid email').optional().or(z.literal('')),
    province: z.string().min(1, 'Province is required'),
    sourceId: z.string().min(1, 'Source is required'),
    stageId: z.string().min(1, 'Stage is required'),
    productsOfInterest: z.string().optional(), // Comma separated string from form
});

export async function createLeadAction(prevState: any, formData: FormData) {
    const session = await auth();
    if (!session?.user?.id || !session.user.email) {
        return { error: 'Unauthorized' };
    }

    // Fetch full user to get brandId (since session might be stale or minimal)
    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { brandId: true },
    });

    if (!user?.brandId) return { error: 'User has no brand' };

    const validatedFields = CreateLeadSchema.safeParse({
        fullName: formData.get('fullName'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        province: formData.get('province'),
        sourceId: formData.get('sourceId'),
        stageId: formData.get('stageId'),
        productsOfInterest: formData.get('productsOfInterest'),
    });

    if (!validatedFields.success) {
        return { error: validatedFields.error.flatten().fieldErrors };
    }

    const { data } = validatedFields;

    // Custom validation: Phone OR Email required
    if (!data.phone && !data.email) {
        return { error: 'Either Phone or Email is required.' };
    }

    try {
        const products = data.productsOfInterest
            ? data.productsOfInterest.split(',').map(s => s.trim())
            : [];

        await createLead({
            brandId: user.brandId,
            createdById: session.user.id,
            fullName: data.fullName,
            phone: data.phone || undefined,
            email: data.email || undefined,
            province: data.province,
            sourceId: data.sourceId,
            stageId: data.stageId,
            productsOfInterest: products,
        });

        revalidatePath('/dashboard/leads');
        return { success: true };
    } catch (error) {
        console.error('Create Lead Error:', error);
        return { error: 'Failed to create lead.' };
    }
}

export async function updateLeadStageAction(leadId: string, stageId: string) {
    const session = await auth();
    if (!session?.user?.id) return { error: 'Unauthorized' };

    try {
        await prisma.lead.update({
            where: { id: leadId },
            data: { stageId },
        });

        revalidatePath('/dashboard/pipeline');
        revalidatePath('/dashboard/leads');
        return { success: true };
    } catch (error) {
        console.error('Update Lead Stage Error:', error);
        return { error: 'Failed to update stage' };
    }
}

export async function deleteLeadAction(leadId: string) {
    const session = await auth();
    if (!session?.user?.id) return { error: 'Unauthorized' };

    try {
        const { deleteLead } = await import('@/services/leads');
        await deleteLead(leadId);

        revalidatePath('/dashboard/leads');
        revalidatePath('/dashboard/pipeline');
        return { success: true };
    } catch (error) {
        console.error('Delete Lead Error:', error);
        return { error: 'Failed to delete lead' };
    }
}
