import { Lead, Stage, Source } from '@prisma/client';
import Link from 'next/link';

type LeadWithRelations = Lead & {
    stage: Stage;
    source: Source;
    owner: { email: string; id: string } | null;
};

export default function LeadTable({ leads }: { leads: LeadWithRelations[] }) {
    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
                <thead className="bg-gray-50 text-left font-semibold text-gray-900">
                    <tr>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Source</th>
                        <th className="px-4 py-2">Owner</th>
                        <th className="px-4 py-2">Contact</th>
                        <th className="px-4 py-2">Created</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {leads.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                                No leads found.
                            </td>
                        </tr>
                    ) : (
                        leads.map((lead) => (
                            <tr key={lead.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 font-medium text-gray-900">
                                    <Link href={`/dashboard/leads/${lead.id}`} className="hover:text-blue-600 hover:underline">
                                        {lead.fullName}
                                    </Link>
                                    <div className="text-xs text-gray-400">{lead.province}</div>
                                </td>
                                <td className="px-4 py-2">
                                    <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                        {lead.stage.name}
                                    </span>
                                </td>
                                <td className="px-4 py-2 text-gray-500">{lead.source.name}</td>
                                <td className="px-4 py-2 text-gray-500">
                                    {lead.owner?.email || <span className="text-orange-400 italic">Unassigned</span>}
                                </td>
                                <td className="px-4 py-2 text-gray-500">
                                    <div className="flex flex-col">
                                        {lead.phone && <span>📞 {lead.phone}</span>}
                                        {lead.email && <span>✉️ {lead.email}</span>}
                                    </div>
                                </td>
                                <td className="px-4 py-2 text-gray-500">
                                    {new Date(lead.createdAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
