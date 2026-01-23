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
    const passwordHash = await bcrypt.hash('admin123', 10);

    // 0. Clean up
    await prisma.activity.deleteMany();
    await prisma.task.deleteMany();
    await prisma.lead.deleteMany();
    await prisma.user.deleteMany();
    await prisma.stage.deleteMany();
    await prisma.source.deleteMany();
    await prisma.brand.deleteMany();

    // 1. Create Brand
    const brand = await prisma.brand.create({
        data: {
            name: 'Distribuidora Mates & Deco',
            users: {
                create: {
                    email: 'admin@distrimates.com',
                    passwordHash,
                    role: 'ADMIN',
                    isActive: true,
                },
            },
            stages: {
                create: [
                    { name: 'Solicitud Mayorista', order: 1 },
                    { name: 'Catálogo Enviado', order: 2 },
                    { name: 'Cotización', order: 3 },
                    { name: 'Negociación', order: 4 },
                    { name: 'Cierre (Ganado)', order: 5, isWon: true, isClosed: true },
                    { name: 'Rechazado (Perdido)', order: 6, isWon: false, isClosed: true },
                ],
            },
            sources: {
                create: [
                    { name: 'Instagram' },
                    { name: 'Facebook Ads' },
                    { name: 'Google Ads' },
                    { name: 'WhatsApp Business' },
                    { name: 'Referido' },
                ],
            },
        },
        include: {
            users: true,
            stages: true,
            sources: true,
        }
    });

    const adminUser = brand.users[0];
    const stageNuevo = brand.stages.find(s => s.name === 'Solicitud Mayorista');
    const stageCatalogo = brand.stages.find(s => s.name === 'Catálogo Enviado');
    const sourceInsta = brand.sources.find(s => s.name === 'Instagram');
    const sourceGoogle = brand.sources.find(s => s.name === 'Google Ads');

    if (adminUser && stageNuevo && stageCatalogo && sourceInsta && sourceGoogle) {
        // Create some dummy leads
        await prisma.lead.create({
            data: {
                brandId: brand.id,
                fullName: 'Bazar San Telmo',
                phone: '1155551234',
                email: 'compras@bazarsantelmo.com.ar',
                province: 'CABA',
                sourceId: sourceInsta.id,
                stageId: stageNuevo.id,
                createdByUserId: adminUser.id,
                leadStrength: 'BOTH',
                productsOfInterest: ['Mates Imperiales', 'Bombillas Pico de Loro'],
                firstResponseDueAt: new Date(),
            }
        });

        await prisma.lead.create({
            data: {
                brandId: brand.id,
                fullName: 'Regalería La Plata',
                phone: '2215559876',
                email: 'info@regaleria-lp.com',
                province: 'Buenos Aires',
                sourceId: sourceGoogle.id,
                stageId: stageCatalogo.id,
                createdByUserId: adminUser.id,
                leadStrength: 'EMAIL_ONLY',
                productsOfInterest: ['Termos Media Manija', 'Set Matero Completo'],
                firstResponseDueAt: new Date(),
            }
        });
    }

    console.log('Seed successful: ', brand.name);
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
