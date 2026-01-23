'use server';

import { auth } from '@/auth';
import { createActivity, createTask } from '@/services/activities';
import { revalidatePath } from 'next/cache';

export async function addNoteAction(leadId: string, content: string) {
    const session = await auth();
    if (!session?.user?.id) return { error: 'Unauthorized' };

    if (!content.trim()) return { error: 'Content is required' };

    try {
        await createActivity({
            leadId,
            userId: session.user.id,
            brandId: (session.user as any).brandId,
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

    if (!title.trim()) return { error: 'Title is required' };
    if (!dueDateStr) return { error: 'Due date is required' };

    try {
        await createTask({
            leadId,
            assignedToUserId: session.user.id,
            title,
            dueAt: new Date(dueDateStr),
            brandId: (session.user as any).brandId,
        });

        revalidatePath(`/dashboard/leads/${leadId}`);
        return { success: true };
    } catch (error) {
        console.error('Add Task Error:', error);
        return { error: 'Failed to add task' };
    }
}
