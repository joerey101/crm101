
import 'dotenv/config';
// We need to register tsconfig paths for running with tsx if it doesn't automatically
// But usually tsx does.
import { processIncomingWhatsApp } from './src/services/whatsapp';
import { prisma } from './src/lib/prisma';

async function main() {
    console.log('--- Simulating WhatsApp Incoming Message ---');

    const phone = '5491133590001';
    const name = 'Jose Rey Test';
    const text = 'Simulation Message ' + new Date().toISOString();

    console.log(`Sending: ${phone}, ${name}, ${text}`);

    try {
        await processIncomingWhatsApp(phone, name, text);
        console.log('✅ processIncomingWhatsApp executed successfully.');

        // Check if lead was created
        const lead = await prisma.lead.findFirst({
            where: { phone: { contains: phone } },
            orderBy: { createdAt: 'desc' }
        });

        if (lead) {
            console.log(`Lead Found/Created: ${lead.fullName} (${lead.id})`);

            // Check activity
            const activity = await prisma.activity.findFirst({
                where: { leadId: lead.id },
                orderBy: { createdAt: 'desc' }
            });
            if (activity) {
                console.log(`Activity Found: ${activity.body}`);
            } else {
                console.warn('⚠️ No Activity found for this lead.');
            }
        } else {
            console.error('❌ Lead NOT found after processing.');
        }

    } catch (e) {
        console.error('❌ Error during simulation:', e);
    }
}

main()
    .finally(async () => {
        await prisma.$disconnect();
    });
