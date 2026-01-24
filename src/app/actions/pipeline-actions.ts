'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function moveLeadAction(leadId: string, newStageId: string) {
    if (!leadId || !newStageId) {
        return { success: false, error: 'Invalid Parameters' };
    }

    try {
        await prisma.lead.update({
            where: { id: leadId },
            data: { stageId: newStageId, lastActivityAt: new Date() }
        });

        // Revalidate the pipeline page to show new state
        revalidatePath('/dashboard/pipeline');
        return { success: true };
    } catch (error) {
        console.error('Error moving lead:', error);
        return { success: false, error: 'Database Error' };
    }
}
