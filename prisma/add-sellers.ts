import 'dotenv/config';
import { PrismaClient, Role } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

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
        { email: 'joe@ventas.com', role: Role.SELLER },
        { email: 'joe2@ventas.com', role: Role.SELLER },
    ];

    for (const seller of sellers) {
        const user = await prisma.user.upsert({
            where: { brandId_email: { brandId: brand.id, email: seller.email } },
            update: {
                passwordHash, // Update password just in case
                role: seller.role,
            },
            create: {
                brandId: brand.id,
                email: seller.email,
                passwordHash,
                role: seller.role,
                isActive: true,
            },
        });
        console.log(`User upserted: ${user.email} (Role: ${user.role})`);
    }

    console.log('Seeding sellers completed.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
