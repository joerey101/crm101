import { prisma } from '@/lib/prisma';
import { unstable_cache as cache } from 'next/cache';

export const getStages = cache(async (brandId: string) => {
    return await prisma.stage.findMany({
        where: { brandId },
        orderBy: { order: 'asc' },
    });
});

export const getSources = cache(async (brandId: string) => {
    return await prisma.source.findMany({
        where: { brandId },
        orderBy: { name: 'asc' },
    });
});

export const getUsers = cache(async (brandId: string) => {
    return await prisma.user.findMany({
        where: { brandId, isActive: true },
        select: { id: true, email: true, role: true },
        orderBy: { email: 'asc' },
    });
});
