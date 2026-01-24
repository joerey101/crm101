
// Basic mapping of Argentina Area Codes (DDN) to Provinces
// Source: Common knowledge / CNC
// This is a "Best Effort" implementation.

const PROVINCE_MAP: Record<string, string> = {
    '11': 'Buenos Aires', // AMBA
    '220': 'Buenos Aires', // Merlo
    '221': 'Buenos Aires', // La Plata
    '223': 'Buenos Aires', // Mar del Plata
    '232': 'Buenos Aires', // Luján/Pergamino...
    '291': 'Buenos Aires', // Bahía Blanca
    '249': 'Buenos Aires', // Tandil

    '351': 'Córdoba', // Córdoba Capital
    '354': 'Córdoba', // Villa Carlos Paz
    '358': 'Córdoba', // Río Cuarto

    '341': 'Santa Fe', // Rosario
    '342': 'Santa Fe', // Santa Fe Capital

    '261': 'Mendoza', // Gran Mendoza
    '260': 'Mendoza', // San Rafael

    '381': 'Tucumán',
    '387': 'Salta',
    '388': 'Jujuy',

    '379': 'Corrientes',
    '376': 'Misiones',
    '362': 'Chaco',
    '370': 'Formosa',

    '343': 'Entre Ríos', // Paraná

    '264': 'San Juan',
    '266': 'San Luis',
    '380': 'La Rioja',
    '383': 'Catamarca',
    '385': 'Santiago del Estero',

    '299': 'Neuquén', // Confluencia / Cipolletti (RN)
    '294': 'Río Negro', // Bariloche
    '292': 'Río Negro', // Viedma

    '280': 'Chubut', // Puerto Madryn / Trelew
    '297': 'Chubut', // Comodoro Rivadavia

    '296': 'Tierra del Fuego', // Río Grande / Ushuaia
    '290': 'Santa Cruz', // Río Gallegos
};

export function detectProvinceFromPhone(phone: string): string {
    // 1. Clean the phone: remove non-digits
    let clean = phone.replace(/\D/g, '');

    // 2. Remove common prefixes if present to isolate DDN
    // Most inputs will include 549 or 15 or just the number
    // Strip 54 (Country)
    if (clean.startsWith('54')) clean = clean.slice(2);
    // Strip 9 (Mobile prefix if after 54, but currently at start)
    if (clean.startsWith('9')) clean = clean.slice(1);
    // Strip 0 (Trunk prefix if typed like 011...)
    if (clean.startsWith('0')) clean = clean.slice(1);
    // Strip 15 (Local prefix if typed at start, rare but possible: 15 3359...)
    // Wait, 15 is strictly local. If someone types 154444... it means they are in the same area code. We can't know.
    // But usually in forms people put area code.

    // 3. Try to match valid DDNs (2 to 4 digits)
    // We check 2, 3, and 4 digit prefixes against our map.
    // 4 digits (e.g. 2966)
    if (clean.length >= 4) {
        const p4 = clean.slice(0, 4);
        if (PROVINCE_MAP[p4]) return PROVINCE_MAP[p4];
    }
    // 3 digits (e.g. 223, 351, 280)
    if (clean.length >= 3) {
        const p3 = clean.slice(0, 3);
        if (PROVINCE_MAP[p3]) return PROVINCE_MAP[p3];
    }
    // 2 digits (e.g. 11)
    if (clean.length >= 2) {
        const p2 = clean.slice(0, 2);
        if (PROVINCE_MAP[p2]) return PROVINCE_MAP[p2];
    }

    // Default Fallback
    return 'Buenos Aires'; // Statistical probability or unknown
}
