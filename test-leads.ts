
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const leads = await prisma.lead.findMany({
        take: 5,
        select: { id: true, fullName: true, phone: true }
    });
    console.log('Leads:', JSON.stringify(leads, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
