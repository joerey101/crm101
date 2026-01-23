import { auth } from '@/auth';
import PipelineBoard from '@/components/pipeline/PipelineBoard';
import { prisma } from '@/lib/prisma';
import { getLeadsGroupedByStage } from '@/services/leads';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: 'Pipeline | CRM',
};

export default async function PipelinePage() {
    const session = await auth();
    if (!session?.user?.id) redirect('/login');

    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { brandId: true },
    });

    if (!user?.brandId) {
        return <div>User has no brand assigned.</div>;
    }

    const stagesWithLeads = await getLeadsGroupedByStage(user.brandId);

    return (
        <div className="h-full flex flex-col">
            <div className="p-6 pb-0">
                <h1 className="text-2xl font-bold text-gray-900">Pipeline</h1>
                <p className="text-sm text-gray-500 mt-1">Manage your opportunities</p>
            </div>

            <div className="flex-1 min-h-0">
                <PipelineBoard stages={stagesWithLeads} />
            </div>
        </div>
    );
}
