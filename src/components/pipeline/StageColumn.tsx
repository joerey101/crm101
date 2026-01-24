'use client';

import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { LeadCard } from './LeadCard';

interface StageColumnProps {
    stage: {
        id: string;
        name: string;
        leads: any[];
    };
}

export function StageColumn({ stage }: StageColumnProps) {
    const { setNodeRef } = useDroppable({
        id: stage.id,
        data: {
            type: 'Stage',
            stage,
        },
    });

    return (
        <div className="w-80 flex-shrink-0 flex flex-col h-full bg-gray-50 dark:bg-zinc-900/50 border-r border-gray-200 dark:border-zinc-800 last:border-r-0">
            {/* Header */}
            <div className="p-4 border-b border-gray-100 dark:border-zinc-800 flex justify-between items-center sticky top-0 bg-gray-50 dark:bg-zinc-900 z-10">
                <h3 className="font-semibold text-sm text-gray-700 dark:text-gray-300">
                    {stage.name}
                </h3>
                <span className="bg-gray-200 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 text-xs px-2 py-1 rounded-full">
                    {stage.leads.length}
                </span>
            </div>

            {/* Droppable Area */}
            <div
                ref={setNodeRef}
                className="flex-1 p-3 overflow-y-auto no-scrollbar"
            >
                <SortableContext items={stage.leads.map(l => l.id)} strategy={verticalListSortingStrategy}>
                    {stage.leads.map((lead) => (
                        <LeadCard key={lead.id} lead={lead} />
                    ))}
                </SortableContext>

                {stage.leads.length === 0 && (
                    <div className="h-24 rounded-lg border-2 border-dashed border-gray-200 dark:border-zinc-800 flex items-center justify-center text-xs text-gray-400">
                        Empty
                    </div>
                )}
            </div>
        </div>
    );
}
