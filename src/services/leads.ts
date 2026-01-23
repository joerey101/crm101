import { prisma } from '@/lib/prisma';
import { LeadStrength, Prisma } from '@prisma/client';

export type GetLeadsParams = {
    page?: number;
    limit?: number;
    query?: string;
    stageId?: string;
    sourceId?: string;
    ownerId?: string;
};

export async function getLeads(brandId: string, params: GetLeadsParams) {
    const page = params.page || 1;
    const limit = params.limit || 10;
    const skip = (page - 1) * limit;

    const where: Prisma.LeadWhereInput = {
        brandId,
        // Search
        ...(params.query && {
            OR: [
                { fullName: { contains: params.query, mode: 'insensitive' } },
                { email: { contains: params.query, mode: 'insensitive' } },
                { phone: { contains: params.query, mode: 'insensitive' } },
            ],
        }),
        // Filters
        ...(params.stageId && { stageId: params.stageId }),
        ...(params.sourceId && { sourceId: params.sourceId }),
        ...(params.ownerId && { ownerUserId: params.ownerId }),
    };

    const [leads, total] = await Promise.all([
        prisma.lead.findMany({
            where,
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
            include: {
                stage: true,
                source: true,
                owner: { select: { email: true, id: true } },
            },
        }),
        prisma.lead.count({ where }),
    ]);

    return { leads, total, totalPages: Math.ceil(total / limit) };
}

export type CreateLeadData = {
    fullName: string;
    phone?: string;
    email?: string;
    province: string;
    sourceId: string;
    productsOfInterest?: string[]; // stored as json
    stageId: string; // usually 'New'
    createdById: string;
    brandId: string;
};

export async function createLead(data: CreateLeadData) {
    // 1. Calculate Lead Strength
    let strength: LeadStrength = 'EMAIL_ONLY';
    if (data.phone && data.email) strength = 'BOTH';
    else if (data.phone) strength = 'PHONE_ONLY';

    // 2. SLA: 24h from now
    const firstResponseDueAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    return await prisma.lead.create({
        data: {
            brandId: data.brandId,
            fullName: data.fullName,
            phone: data.phone,
            email: data.email,
            province: data.province,
            sourceId: data.sourceId,
            stageId: data.stageId,
            createdByUserId: data.createdById,
            leadStrength: strength,
            productsOfInterest: data.productsOfInterest,
            firstResponseDueAt,
        },
    });
}

export async function getLeadsGroupedByStage(brandId: string) {
    const stages = await prisma.stage.findMany({
        where: { brandId },
        orderBy: { order: 'asc' },
        include: {
            leads: {
                where: { brandId },
                orderBy: { createdAt: 'desc' },
                include: {
                    owner: { select: { email: true, id: true } },
                    source: true,
                },
            },
        },
    });

    return stages;
}

export async function getLeadById(leadId: string) {
    return await prisma.lead.findUnique({
        where: { id: leadId },
        include: {
            stage: true,
            source: true,
            owner: { select: { email: true, id: true, role: true } },
        },
    });
}
