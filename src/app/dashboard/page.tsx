import { auth, signOut } from '@/auth';

export default async function DashboardPage() {
    const session = await auth();

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow p-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                        <p className="text-gray-600 mt-2">
                            Welcome back, <span className="font-semibold">{session?.user?.email}</span>
                        </p>
                        {/* @ts-ignore: role is not yet in default session type, but exists in DB */}
                        <p className="text-xs text-gray-400">Role: {session?.user?.role || 'USER'}</p>
                    </div>
                    <div>
                        <form
                            action={async () => {
                                'use server';
                                await signOut();
                            }}
                        >
                            <button className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-md font-medium transition-colors">
                                Sign Out
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="font-semibold text-gray-700">Recent Leads</h3>
                        <p className="text-sm text-gray-500 mt-2">No leads found.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="font-semibold text-gray-700">My Tasks</h3>
                        <p className="text-sm text-gray-500 mt-2">No tasks due.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="font-semibold text-gray-700">Performance</h3>
                        <p className="text-sm text-gray-500 mt-2">--% Conversion</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
