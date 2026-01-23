import { auth, signOut } from '@/auth';
import { getDashboardStats } from '@/services/dashboard';
import Link from 'next/link';

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
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
                        <p className="text-gray-500 mt-1">
                            Welcome back, <span className="font-semibold text-gray-800">{session.user.email}</span>
                        </p>
                        <span className="inline-flex mt-2 items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                            {user.role}
                        </span>
                    </div>
                    <div>
                        <form
                            action={async () => {
                                'use server';
                                await signOut();
                            }}
                        >
                            <button className="bg-white text-gray-600 hover:text-red-600 hover:bg-red-50 border border-gray-200 px-4 py-2 rounded-md font-medium transition-all text-sm shadow-sm">
                                Sign Out
                            </button>
                        </form>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Performance Widget */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance</h3>
                        <div className="flex items-end space-x-2">
                            <span className="text-4xl font-bold text-blue-600">{stats.performance.conversionRate}%</span>
                            <span className="text-gray-400 mb-1 font-medium">Conversion</span>
                        </div>
                        <p className="text-sm text-gray-400 mt-2">
                            {stats.performance.won} won out of {stats.performance.totalClosed} closed
                        </p>
                    </div>

                    {/* Quick Stats Placeholder */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Pipeline Velocity</h3>
                        <div className="flex items-center justify-center h-20 bg-gray-50 rounded-lg text-gray-400 text-sm">
                            Coming soon v1.1
                        </div>
                    </div>

                    {/* Quick Stats Placeholder 2 */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">SLA Compliance</h3>
                        <div className="flex items-center justify-center h-20 bg-gray-50 rounded-lg text-gray-400 text-sm">
                            Coming soon v1.1
                        </div>
                    </div>
                </div>

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
            </div>
        </div>
    );
}
