
import { prisma } from '@/lib/prisma';
import { getLeads } from './leads';

export async function getDashboardStats(brandId: string, userId: string) {
    // 1. Recent Leads (Global or User's? Usually global for visibility in v1, or just assigned?)
    // PRD says "Recent Leads". Let's show global for now or just user's?
    // "Manager (Supervisor) ... Lectura de leads entrantes"
    // "Seller (Vendedor) ... Gestión de leads asignados"
    // Let's fetch the most recent leads created in the brand.
    const recentLeads = await prisma.lead.findMany({
        where: { brandId },
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
            stage: true,
            owner: { select: { email: true, id: true } }
        }
    });

    // 2. My Tasks (Due soon)
    const myTasks = await prisma.task.findMany({
        where: {
            brandId,
            assignedToUserId: userId,
            status: 'OPEN'
        },
        take: 5,
        orderBy: { dueAt: 'asc' },
        include: {
            lead: { select: { fullName: true, id: true } }
        }
    });

    // 3. Performance (Simple Conversion Rate)
    // Count WON vs (WON + LOST)
    // We look for stages that are closed.
    const closedWonCount = await prisma.lead.count({
        where: {
            brandId,
            stage: { isWon: true }
        }
    });

    const closedLostCount = await prisma.lead.count({
        where: {
            brandId,
            stage: { isClosed: true, isWon: false }
        }
    });

    const totalClosed = closedWonCount + closedLostCount;
    const conversionRate = totalClosed > 0
        ? Math.round((closedWonCount / totalClosed) * 100)
        : 0;

    // 4. Total Active Leads (Not closed)
    const totalActiveLeads = await prisma.lead.count({
        where: {
            brandId,
            stage: { isClosed: false }
        }
    });

    // 5. Funnel (Leads by Stage)
    // We want all stages, even empty ones.
    const stages = await prisma.stage.findMany({
        where: { brandId },
        orderBy: { order: 'asc' },
        include: {
            _count: {
                select: { leads: true }
            }
        }
    });

    const funnel = stages.map((s, index) => {
        // Simple color rotation or logic
        const colors = ['#3b82f6', '#8b5cf6', '#eab308', '#22c55e', '#ef4444'];
        return {
            stageName: s.name,
            count: s._count.leads,
            color: colors[index % colors.length]
        };
    });

    return {
        recentLeads,
        myTasks,
        performance: {
            conversionRate,
            totalClosed,
            won: closedWonCount
        },
        overview: {
            totalActive: totalActiveLeads,
            totalLeads: await prisma.lead.count({ where: { brandId } })
        },
        funnel
    };
}
