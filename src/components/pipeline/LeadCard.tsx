'use client';

// Types
type Lead = {
    id: string;
    fullName: string;
    phone: string | null;
    leadStrength: string;
    province?: string | null;
};

type Stage = {
    id: string;
    name: string;
    leads: Lead[];
};

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Link from 'next/link';

interface LeadCardProps {
    lead: Lead;
}

export function LeadCard({ lead }: LeadCardProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: lead.id,
        data: {
            type: 'Lead',
            lead,
        }
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.3 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="bg-white dark:bg-zinc-800 p-3 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700 hover:shadow-md cursor-grab active:cursor-grabbing mb-3"
        >
            <div className="flex justify-between items-start">
                <Link
                    href={`/dashboard/leads/${lead.id}`}
                    className="font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 hover:underline"
                    // Prevent drag when clicking link
                    onPointerDown={(e) => e.stopPropagation()}
                >
                    {lead.fullName}
                </Link>
                {/* Strength Badge */}
                <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded text-white ${lead.leadStrength === 'HOT' ? 'bg-red-500' :
                        lead.leadStrength === 'WARM' ? 'bg-orange-500' :
                            'bg-slate-400'
                    }`}>
                    {lead.leadStrength.charAt(0)}
                </span>
            </div>

            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2">
                <span>📞 {lead.phone || 'No phone'}</span>
            </div>

            {lead.province && (
                <div className="text-[10px] text-gray-400 dark:text-gray-500 mt-2 flex items-center">
                    📍 {lead.province}
                </div>
            )}
        </div>
    );
}
