import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    const passwordHash = await bcrypt.hash('admin123', 10);

    // 1. Create Default Brand
    const brand = await prisma.brand.create({
        data: {
            name: 'Retail Store Demo',
            users: {
                create: {
                    email: 'admin@crm.com',
                    passwordHash,
                    role: 'ADMIN',
                    isActive: true,
                },
            },
        },
    });

    console.log({ brand });
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
