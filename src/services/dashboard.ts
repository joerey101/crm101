
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

    return {
        recentLeads,
        myTasks,
        performance: {
            conversionRate,
            totalClosed,
            won: closedWonCount
        }
    };
}
