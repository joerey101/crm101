import { prisma } from '@/lib/prisma';
import { ActivityType } from '@prisma/client';

export type ActivityIncludeUser = {
    user: {
        email: string;
        id: string;
    };
};

export async function getLeadActivities(leadId: string) {
    // Prisma relation is named 'creator', not 'user'
    const activities = await prisma.activity.findMany({
        where: { leadId },
        orderBy: { createdAt: 'desc' },
        include: {
            creator: { select: { email: true, id: true } },
        },
    });

    // Map to frontend-friendly structure if needed, or keeping it but client component needs update
    // For simplicity, let's map 'creator' to 'user' property on the client or adjust the type there.
    // Here we just return what Prisma gives us, but we'll adjust the UI to expect 'creator'.
    return activities;
}

export async function getLeadTasks(leadId: string) {
    // Relation is 'assignee', not 'assignedToUser'
    return await prisma.task.findMany({
        where: { leadId },
        orderBy: { dueAt: 'asc' }, // Schema uses 'dueAt' not 'dueDate'
        include: {
            assignee: { select: { email: true, id: true } },
        },
    });
}

export async function createActivity(data: {
    leadId: string;
    userId: string; // This maps to createdByUserId
    brandId: string;
    type: ActivityType;
    body: string; // Schema uses 'body' not 'description' or 'title'
    outcome?: string;
}) {
    return await prisma.activity.create({
        data: {
            brandId: data.brandId,
            leadId: data.leadId,
            createdByUserId: data.userId,
            type: data.type,
            body: data.body, // 'Note' title is implicit or part of body
            outcome: data.outcome,
        },
    });
}

export async function createTask(data: {
    leadId: string;
    brandId: string;
    assignedToUserId: string;
    title: string; // Does Task have a title? NO. 
    // Schema has: assigneToUserId, dueAt, status, priority, createdAt.
    // Wait, the schema in `prisma/schema.prisma` lines 165-181 DOES NOT have a 'title' or 'description' field for Task.
    // It only has relations, date, status.
    // This is a flaw in the provided schema vs plan. 
    // FIX: We need to use 'leadId' or maybe we missed a field?
    // Checking schema again: 
    // model Task { ... id, brandId, leadId, assignedToUserId, dueAt, status, priority ... }
    // It seems Task is very minimal. We can't store a "Title" right now.
    // WORKAROUND: We will temporarily store the title/description in the 'Lead' or just ignore it? 
    // No, that's bad. 
    // Let's check if I can modify the schema on the fly? No, I should stick to existing schema if possible.
    // BUT, without a title/description, a Task is useless.
    // "Follow up tomorrow" -> This is the description.
    // I must add `title` (or `description`) to the Task model.

    // Actually, looking at the schema file provided in view_file output:
    // lines 165-181 of schema.prisma indeed show NO title/description for Task.
    // This is a missing requirement in the schema. I must update the schema.

    dueAt: Date;
}) {
    // Placeholder to allow compilation until schema is fixed
    // We will assume I fix the schema in next step.
    return await prisma.task.create({
        data: {
            brandId: data.brandId,
            leadId: data.leadId,
            assignedToUserId: data.assignedToUserId,
            dueAt: data.dueAt,
            title: data.title
        },
    });
}
