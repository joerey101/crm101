'use server';

import { auth } from '@/auth';
import { createActivity, createTask } from '@/services/activities';
import { revalidatePath } from 'next/cache';

export async function addNoteAction(leadId: string, content: string) {
    const session = await auth();
    if (!session?.user?.id) return { error: 'Unauthorized' };

    // Fetch user to ensure we have brandId
    const { prisma } = await import('@/lib/prisma');
    const user = await prisma.user.findFirst({
        where: { email: session.user.email as string },
        select: { id: true, brandId: true }
    });

    if (!user) return { error: 'User not found' };

    if (!content.trim()) return { error: 'Content is required' };

    try {
        await createActivity({
            leadId,
            userId: user.id,
            brandId: user.brandId,
            type: 'NOTE',
            body: content,
        });

        revalidatePath(`/dashboard/leads/${leadId}`);
        return { success: true };
    } catch (error) {
        console.error('Add Note Error:', error);
        return { error: 'Failed to add note' };
    }
}

export async function addTaskAction(leadId: string, title: string, dueDateStr: string) {
    const session = await auth();
    if (!session?.user?.id) return { error: 'Unauthorized' };

    // Fetch user to ensure we have brandId
    const { prisma } = await import('@/lib/prisma');
    const user = await prisma.user.findFirst({
        where: { email: session.user.email as string },
        select: { id: true, brandId: true }
    });

    if (!user) return { error: 'User not found' };

    if (!title.trim()) return { error: 'Title is required' };
    if (!dueDateStr) return { error: 'Due date is required' };

    try {
        await createTask({
            leadId,
            assignedToUserId: user.id,
            title,
            dueAt: new Date(dueDateStr),
            brandId: user.brandId,
        });

        revalidatePath(`/dashboard/leads/${leadId}`);
        return { success: true };
    } catch (error) {
        console.error('Add Task Error:', error);
        return { error: 'Failed to add task' };
    }
}
