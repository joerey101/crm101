require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    try {
        console.log('Starting manual seed...');
        const passwordHash = await bcrypt.hash('admin123', 10);

        // 0. Clean up
        console.log('Cleaning up...');
        await prisma.activity.deleteMany();
        await prisma.task.deleteMany();
        await prisma.lead.deleteMany();
        await prisma.user.deleteMany();
        await prisma.stage.deleteMany();
        await prisma.source.deleteMany();
        await prisma.brand.deleteMany();

        // 1. Create Brand
        console.log('Creating brand and admin...');
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

        console.log('Seed successful: ', brand.name);
    } catch (e) {
        console.error('Seed error:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
