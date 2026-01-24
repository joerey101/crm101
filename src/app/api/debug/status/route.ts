
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const brandCount = await prisma.brand.count();
        const brands = await prisma.brand.findMany({ include: { users: true, sources: true } });
        const leads = await prisma.lead.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            include: { activities: { orderBy: { createdAt: 'desc' }, take: 3 } }
        });

        return NextResponse.json({
            status: 'ok',
            database_check: {
                brandCount,
                brands: brands.map(b => ({
                    id: b.id,
                    name: b.name,
                    userCount: b.users.length,
                    sources: b.sources.map(s => s.name)
                })),
                recentLeads: leads
            }
        });
    } catch (error: any) {
        return NextResponse.json({
            status: 'error',
            message: error.message,
            stack: error.stack
        }, { status: 500 });
    }
}
