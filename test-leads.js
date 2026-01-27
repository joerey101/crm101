
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false }
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    const leads = await prisma.lead.findMany({
        take: 5,
        select: { id: true, fullName: true, phone: true }
    });
    console.log('Leads:', JSON.stringify(leads, null, 2));
}

main().catch(console.error).finally(() => {
    prisma.$disconnect();
    pool.end();
});
