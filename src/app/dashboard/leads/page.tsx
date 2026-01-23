import { auth } from '@/auth';
import LeadFilters from '@/components/leads/LeadFilters';
import LeadTable from '@/components/leads/LeadTable';
import NewLeadModal from '@/components/leads/NewLeadModal';
import { prisma } from '@/lib/prisma';
import { getLeads } from '@/services/leads';
import { getSources, getStages } from '@/services/options';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: 'Leads Inbox | CRM',
};

export default async function LeadsPage({
    searchParams,
}: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
        stageId?: string;
        sourceId?: string;
    }>;
}) {
    const session = await auth();
    if (!session?.user?.id) redirect('/login');

    // Fetch Brand ID for the current user
    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { brandId: true },
    });

    if (!user?.brandId) {
        return <div>User has no brand assigned.</div>;
    }

    const params = await searchParams;
    const brandId = user.brandId;
    const page = Number(params?.page) || 1;
    const query = params?.query || '';
    const stageId = params?.stageId;
    const sourceId = params?.sourceId;

    // Fetch data in parallel
    const [leadsData, stages, sources] = await Promise.all([
        getLeads(brandId, {
            page,
            limit: 10,
            query,
            stageId,
            sourceId,
        }),
        getStages(brandId),
        getSources(brandId),
    ]);

    return (
        <div className="p-6">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Leads Inbox</h1>
                <NewLeadModal stages={stages} sources={sources} />
            </div>

            <LeadFilters stages={stages} sources={sources} />

            <LeadTable leads={leadsData.leads} />

            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                <div>
                    Showing {leadsData.leads.length} of {leadsData.total} results
                </div>
                <div className="flex gap-2">
                    {/* Simple Pagination Controls (could be improved to a component) */}
                    {page > 1 && (
                        <a href={`/dashboard/leads?page=${page - 1}`} className="px-3 py-1 border rounded hover:bg-gray-50">
                            Previous
                        </a>
                    )}
                    {page < leadsData.totalPages && (
                        <a href={`/dashboard/leads?page=${page + 1}`} className="px-3 py-1 border rounded hover:bg-gray-50">
                            Next
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
