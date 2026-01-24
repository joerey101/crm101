
import { prisma } from '@/lib/prisma';

// Team Email Constants (Must match Seed)
const EMAILS = {
    ADMIN: 'joerey@gmail.com', // You
    AMBA1: 'amba1@crm.com',
    AMBA2: 'amba2@crm.com',
    NOA: 'noa@crm.com',
    PATAGONIA: 'patagonia@crm.com',
};

// Region Definitions
const REGIONS: Record<string, string[]> = {
    PATAGONIA: ['Neuquén', 'Río Negro', 'Chubut', 'Santa Cruz', 'Tierra del Fuego', 'La Pampa', 'Mendoza'], // Added Mendoza to South logic? Or North? User said "Neuquen y Rio Negro como limite". Let's put Mendoza in North/Center if logic dictates, but traditionally Cuyo. User said "Norte... tomando La Pampa para arriba". Wait.
    // User said: "1 para Norte ... tomando a la pampa para arriba".
    // User said: "1 de sur Que comprenda NEuquen y Rinegro como limite natural".
    // Let's interpret: 
    // South = Neuquén, Río Negro, Chubut, Santa Cruz, Tierra del Fuego.
    // North/Rest = Everything else except BsAs.
    // AMBA = Capital (CABA) + BSAS. (Mapped as 'Buenos Aires' in our system).

    AMBA: ['Buenos Aires', 'Capital Federal', 'CABA'],

    // Default to NOA for everything else not in South or AMBA
};

const SOUTH_PROVINCES = new Set([
    'Neuquén', 'Río Negro', 'Chubut', 'Santa Cruz', 'Tierra del Fuego', 'Antártida'
]);

const AMBA_PROVINCES = new Set([
    'Buenos Aires', 'Ciudad Autónoma de Buenos Aires', 'Capital Federal'
]);

export async function getAssigneeForProvince(province: string, brandId: string): Promise<string | null> {
    // 1. Determine Region
    let targetEmail: string | null = null;
    let region = 'NOA'; // Default ("Norte para arriba de la pampa")

    if (SOUTH_PROVINCES.has(province)) {
        region = 'PATAGONIA';
        targetEmail = EMAILS.PATAGONIA;
    } else if (AMBA_PROVINCES.has(province)) {
        region = 'AMBA';
        // Round Robin logic handled below
    } else {
        // Rest of the country (Córdoba, Santa Fe, Mendoza, Salta, etc.)
        targetEmail = EMAILS.NOA;
    }

    // 2. Fetch User ID based on Email
    // If it's AMBA, we need round robin among [ADMIN, AMBA1, AMBA2]
    if (region === 'AMBA') {
        return await getRoundRobinAmbaUser(brandId);
    }

    // If specific email determined
    if (targetEmail) {
        const user = await prisma.user.findFirst({
            where: { email: targetEmail, brandId },
            select: { id: true }
        });
        return user?.id || null; // Fallback to null (unassigned) if user not found
    }

    return null;
}

// Helper for Round Robin (Simplest implementation: Random or Last Assigned?)
// True Round Robin requires storing "Last Assigned Index". 
// For simplicity in V1 without extra DB state, we can use Random Distribution among the 3.
// Or we can check who has the LEAST leads today?
// Let's go with Random for now to keep it stateless and fast.
async function getRoundRobinAmbaUser(brandId: string): Promise<string | null> {
    const candidates = [EMAILS.ADMIN, EMAILS.AMBA1, EMAILS.AMBA2];
    const randomEmail = candidates[Math.floor(Math.random() * candidates.length)];

    const user = await prisma.user.findFirst({
        where: { email: randomEmail, brandId },
        select: { id: true }
    });

    return user?.id || null;
}
