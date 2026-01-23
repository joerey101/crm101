
import { prisma } from '@/lib/prisma';
import { Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

export default async function SetupPage() {
    // 1. Get the brand
    const brand = await prisma.brand.findFirst();

    if (!brand) {
        return <div className="p-10 text-red-600 font-bold">Error: No brand found. Run seed first.</div>;
    }

    const passwordHash = await bcrypt.hash('Miami128', 10);
    const sellers = [
        { email: 'joe@ventas.com', role: Role.SELLER },
        { email: 'joe2@ventas.com', role: Role.SELLER },
    ];

    const results = [];

    for (const seller of sellers) {
        try {
            const user = await prisma.user.upsert({
                where: { brandId_email: { brandId: brand.id, email: seller.email } },
                update: {
                    passwordHash,
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
            results.push(`✅ User ${user.email} ready.`);
        } catch (e) {
            results.push(`❌ Failed ${seller.email}: ${String(e)}`);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-2">User Setup Result</h1>
                <div className="space-y-2">
                    {results.map((Line, i) => (
                        <div key={i} className="p-3 bg-gray-50 rounded border text-sm font-mono text-gray-700">
                            {Line}
                        </div>
                    ))}
                </div>
                <div className="mt-8 text-center text-sm text-gray-500">
                    You can now delete this page (src/app/setup/page.tsx)
                </div>
            </div>
        </div>
    );
}
