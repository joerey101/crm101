import { auth, signOut } from '@/auth';
import { getDashboardStats } from '@/services/dashboard';
import Link from 'next/link';
import StatsGrid from '@/components/dashboard/StatsGrid';
import LeadMapWrapper from '@/components/dashboard/LeadMapWrapper';

export default async function DashboardPage() {
    const session = await auth();

    // In a real app we'd handle the "no session" case better than just crashing
    // middleware should handle this, but for types safety:
    if (!session?.user?.email || !session.user.id) {
        // Should ideally redirect, but middleware does it.
        return null;
    }

    // Hardcoded brandId for now until we have full multi-tenant context
    // In v1.0, we assume user belongs to a brand. 
    // We need to fetch the user's brandId from DB or add it to session.
    // For now, let's assume we can get it or query it.
    // Wait, getDashboardStats needs brandId.
    // The session might not have brandId yet basically.
    // Let's fallback to querying the user details if needed, 
    // BUT looking at `src/auth.ts` (implied), we usually put brandId in session.
    // Let's assume user has `id` which is linked to `Brand`.
    // For this step, I'll pass a known ID or fetch the user to get brandId.
    // To be safe and fast: fetch user to get brandId.

    // Actually, looking at `auth.config.ts`, `session.user` usually has extra fields if we customized `jwt` callback.
    // If not, we must fetch the user.
    // Let's assume we need to fetch user to be safe.
    // Wait, I can't import `prisma` in client component? This is a server component (`async function`).
    // So I can query prisma here.

    const { prisma } = await import('@/lib/prisma');
    const user = await prisma.user.findFirst({
        where: { email: session.user.email },
        select: { id: true, brandId: true, role: true }
    });

    if (!user) return <div>User not found</div>;

    const stats = await getDashboardStats(user.brandId, user.id);

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <StatsGrid stats={stats} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Leads */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="font-semibold text-gray-800">Recent Leads</h3>
                            <Link href="/dashboard/leads" className="text-sm text-blue-600 hover:text-blue-800 font-medium">View All</Link>
                        </div>
                        <div className="divide-y divide-gray-50">
                            {stats.recentLeads.length === 0 ? (
                                <div className="p-8 text-center text-gray-400 text-sm">No recent leads found.</div>
                            ) : (
                                stats.recentLeads.map(lead => (
                                    <div key={lead.id} className="p-4 hover:bg-gray-50 transition-colors flex justify-between items-center bg-white">
                                        <div>
                                            <p className="font-medium text-gray-900">{lead.fullName}</p>
                                            <p className="text-xs text-gray-500 mt-0.5">{lead.province} • {lead.stage.name}</p>
                                        </div>
                                        <div className="text-xs text-gray-400">
                                            {new Date(lead.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* My Tasks */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="font-semibold text-gray-800">My Tasks</h3>
                            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium cursor-not-allowed opacity-50">View All</button>
                        </div>
                        <div className="divide-y divide-gray-50">
                            {stats.myTasks.length === 0 ? (
                                <div className="p-8 text-center text-gray-400 text-sm">You have no pending tasks.</div>
                            ) : (
                                stats.myTasks.map(task => (
                                    <div key={task.id} className="p-4 hover:bg-gray-50 transition-colors flex justify-between items-center bg-white">
                                        <div>
                                            <p className="font-medium text-gray-900">{task.title}</p>
                                            <p className="text-xs text-gray-500 mt-0.5">
                                                For: <span className="font-medium">{task.lead.fullName}</span>
                                            </p>
                                        </div>
                                        <div className={`text-xs px-2 py-1 rounded-full font-medium ${task.priority === 'HIGH' ? 'bg-red-50 text-red-600' :
                                            task.priority === 'MEDIUM' ? 'bg-yellow-50 text-yellow-600' : 'bg-green-50 text-green-600'
                                            }`}>
                                            {new Date(task.dueAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Geo-Location Module */}
                <div className="mt-8">
                    <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <span>🌍</span> Live Lead Map
                    </h3>
                    <LeadMapWrapper leads={stats.recentLeads} />
                </div>
            </div>
        </div>
    );
}
