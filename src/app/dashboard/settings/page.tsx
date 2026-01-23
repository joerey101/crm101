
import { auth } from '@/auth';

export default async function SettingsPage() {
    const session = await auth();

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Settings</h1>
                    <p className="text-gray-600 mb-6">
                        Manage your account and application preferences.
                    </p>

                    <div className="bg-yellow-50 border border-yellow-100 rounded-md p-4 text-sm text-yellow-800">
                        <span className="font-semibold">Note:</span> Full settings configuration will be available in v1.1.
                    </div>

                    <div className="mt-8 space-y-6">
                        <div className="border-b border-gray-100 pb-6">
                            <h3 className="text-lg font-medium text-gray-900">Profile Information</h3>
                            <div className="mt-4 grid grid-cols-1 gap-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <div className="mt-1 text-gray-900">{session?.user?.email}</div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Role</label>
                                    <div className="mt-1 text-gray-900">{/* Role would go here */}</div>
                                </div>
                            </div>
                        </div>

                        <div className="border-b border-gray-100 pb-6">
                            <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
                            <p className="text-sm text-gray-500 mt-1">Configure how you receive alerts.</p>
                            <button className="mt-4 text-gray-400 cursor-not-allowed text-sm">Configure notifications (Coming Soon)</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
