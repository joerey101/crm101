
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false }
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('Seeding sellers only...');

    const brand = await prisma.brand.findFirst();
    if (!brand) return console.error('No brand found');

    const passwordHash = await bcrypt.hash('Miami128', 10);

    const sellers = [
        { email: 'joe@ventas.com', role: 'SELLER' },
        { email: 'joe2@ventas.com', role: 'SELLER' }
    ];

    for (const s of sellers) {
        try {
            await prisma.user.create({
                data: {
                    brandId: brand.id,
                    email: s.email,
                    passwordHash,
                    role: s.role as any,
                    isActive: true
                }
            });
            console.log('Created:', s.email);
        } catch (e) {
            console.log('Already exists or failed:', s.email);
        }
    }
    console.log('Done.');
}

main().then(() => prisma.$disconnect()).catch(console.error);
