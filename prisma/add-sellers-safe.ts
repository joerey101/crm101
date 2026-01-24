
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
    console.log('Start seeding sellers...');

    // 1. Get the main brand (assuming the first one created by seed)
    const brand = await prisma.brand.findFirst();

    if (!brand) {
        console.error('No brand found! Run the main seed first.');
        process.exit(1);
    }

    console.log(`Using Brand: ${brand.name} (${brand.id})`);

    // 2. Hash password
    const passwordHash = await bcrypt.hash('Miami128', 10);

    // 3. Create Sellers
    const sellers = [
        { email: 'joe@ventas.com', role: 'SELLER' },
        { email: 'joe2@ventas.com', role: 'SELLER' },
    ];

    for (const seller of sellers) {
        // Find existing user first to avoid upsert issues depending on constraints
        const existing = await prisma.user.findFirst({
            where: {
                brandId: brand.id,
                email: seller.email
            }
        });

        if (existing) {
            console.log(`User ${seller.email} already exists. Skipping.`);
        } else {
            await prisma.user.create({
                data: {
                    brandId: brand.id,
                    email: seller.email,
                    passwordHash,
                    role: seller.role as any,
                    isActive: true,
                }
            });
            console.log(`User created: ${seller.email}`);
        }
    }

    console.log('Seeding sellers completed.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
