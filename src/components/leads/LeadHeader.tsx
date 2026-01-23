import { Lead, Stage } from '@prisma/client';

export default function LeadHeader({ lead }: { lead: Lead & { stage: Stage } }) {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{lead.fullName}</h1>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        {lead.email && <span>✉️ {lead.email}</span>}
                        {lead.phone && <span>📞 {lead.phone}</span>}
                        <span>📍 {lead.province}</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <span className="inline-flex items-center rounded-md bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                        {lead.stage.name}
                    </span>
                    {/* Placeholder for Edit/Delete actions in future */}
                </div>
            </div>

            {lead.leadStrength && (
                <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Lead Strength:</span>
                    <span className="text-xs font-medium text-blue-600">{lead.leadStrength.replace('_', ' ')}</span>
                </div>
            )}
        </div>
    );
}
