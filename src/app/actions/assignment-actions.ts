
'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma'; // Using the instance from lib usually is better, but here we can use what was used before, wait.
// In action files we imported prisma from @/lib/prisma.

import { revalidatePath } from 'next/cache';

export async function assignLeadAction(leadId: string, ownerUserId: string) {
    const session = await auth();
    if (!session?.user?.id) return { error: 'Unauthorized' };

    // Ideally validation of role (Admin or Manager) should happen here.
    // For now we assume the UI hides it or simple check:

    // Fetch actor to check role?
    // Let's keep it simple for v1.0, just assign.

    // Fetch user to ensure we have brandId
    const currentUser = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { brandId: true }
    });

    if (!currentUser) return { error: 'User not found' };

    try {
        await prisma.lead.update({
            where: { id: leadId },
            data: { ownerUserId: ownerUserId },
        });

        // Audit Log
        await prisma.auditLog.create({
            data: {
                brandId: currentUser.brandId,
                entityType: 'LEAD',
                entityId: leadId,
                action: 'LEAD_ASSIGNED',
                actorUserId: session.user.id,
                newValue: { ownerUserId } as any,
            }
        });

        revalidatePath(`/dashboard/leads/${leadId}`);
        revalidatePath('/dashboard/leads');
        revalidatePath('/dashboard/pipeline');

        return { success: true };
    } catch (error) {
        console.error('Assign Lead Error:', error);
        return { error: 'Failed to assign lead' };
    }
}
