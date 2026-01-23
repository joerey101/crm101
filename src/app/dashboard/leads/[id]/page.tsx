import { auth } from '@/auth';
import ActivityTimeline from '@/components/leads/ActivityTimeline';
import LeadHeader from '@/components/leads/LeadHeader';
import TaskWidget from '@/components/leads/TaskWidget';
import { getLeadActivities, getLeadTasks } from '@/services/activities';
import { getLeadById } from '@/services/leads';
import { redirect } from 'next/navigation';

export const metadata = {
    title: 'Lead Details | CRM',
};

export default async function LeadDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const session = await auth();
    if (!session?.user?.id) redirect('/login');

    const { id } = await params;

    // Parallel data fetching for performance
    const [lead, activities, tasks] = await Promise.all([
        getLeadById(id),
        getLeadActivities(id),
        getLeadTasks(id),
    ]);

    if (!lead) {
        return <div className="p-8">Lead not found.</div>;
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <LeadHeader lead={lead} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content: Timeline */}
                <div className="lg:col-span-2">
                    <ActivityTimeline leadId={lead.id} activities={activities as any} />
                </div>

                {/* Sidebar: Tasks & Info */}
                <div className="space-y-6">
                    <TaskWidget leadId={lead.id} tasks={tasks as any} />

                    {/* Additional Widgets could go here: Products, Files, etc. */}
                </div>
            </div>
        </div>
    );
}

