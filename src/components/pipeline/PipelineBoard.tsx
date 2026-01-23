'use client';

import { Lead, Stage, Source } from '@prisma/client';
import { updateLeadStageAction } from '@/app/actions/lead-actions';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

type LeadWithRelations = Lead & {
    source: Source;
    owner: { email: string; id: string } | null;
};

type StageWithLeads = Stage & {
    leads: LeadWithRelations[];
};

export default function PipelineBoard({ stages }: { stages: StageWithLeads[] }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleDragStart = (e: React.DragEvent, leadId: string) => {
        e.dataTransfer.setData('leadId', leadId);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent, stageId: string) => {
        e.preventDefault();
        const leadId = e.dataTransfer.getData('leadId');
        if (!leadId) return;

        // Optimistic / Transition update
        // In a real DnD app we'd update local state immediately
        // Here we just trigger the server action
        startTransition(async () => {
            await updateLeadStageAction(leadId, stageId);
            router.refresh();
        });
    };

    return (
        <div className="flex h-[calc(100vh-8rem)] overflow-x-auto gap-4 p-4 pb-8">
            {stages.map((stage) => (
                <div
                    key={stage.id}
                    className="flex-shrink-0 w-80 flex flex-col bg-gray-100 rounded-lg max-h-full"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, stage.id)}
                >
                    {/* Column Header */}
                    <div className="p-3 font-semibold text-gray-700 flex justify-between items-center sticky top-0 bg-gray-100 rounded-t-lg z-10 border-b border-gray-200">
                        <span>{stage.name}</span>
                        <span className="bg-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                            {stage.leads.length}
                        </span>
                    </div>

                    {/* Cards Container */}
                    <div className="flex-1 overflow-y-auto p-2 space-y-3">
                        {stage.leads.map((lead) => (
                            <div
                                key={lead.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, lead.id)}
                                className={`
                  bg-white p-3 rounded shadow-sm border border-gray-200 cursor-move hover:shadow-md transition-shadow
                  ${isPending ? 'opacity-50' : 'opacity-100'}
                `}
                            >
                                <div className="font-medium text-gray-900">{lead.fullName}</div>
                                <div className="text-xs text-blue-600 font-medium mt-1">
                                    {lead.leadStrength.replace('_', ' ')}
                                </div>

                                <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
                                    <span>{lead.source.name}</span>
                                    <span>{new Date(lead.createdAt).toLocaleDateString()}</span>
                                </div>

                                {lead.owner && (
                                    <div className="mt-2 pt-2 border-t border-gray-100 text-xs text-gray-400">
                                        {lead.owner.email}
                                    </div>
                                )}
                            </div>
                        ))}
                        {stage.leads.length === 0 && (
                            <div className="text-center py-4 text-xs text-gray-400 border-2 border-dashed border-gray-200 rounded">
                                Drop items here
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
