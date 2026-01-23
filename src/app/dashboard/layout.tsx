import { auth } from '@/auth';
import Sidebar from '@/components/layout/Sidebar';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();
    if (!session?.user) redirect('/login');

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar - Fixed width */}
            <Sidebar userEmail={session.user.email || ''} />

            {/* Main Content - Offset by sidebar width on desktop */}
            <main className="flex-1 md:ml-64 min-h-screen bg-gray-50">
                {children}
            </main>
        </div>
    );
}
