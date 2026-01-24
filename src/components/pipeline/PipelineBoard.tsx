'use client';

import { useState } from 'react';
import {
    DndContext,
    DragOverlay,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragStartEvent,
    DragOverEvent,
    DragEndEvent,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { StageColumn } from './StageColumn';
import { LeadCard } from './LeadCard';
import { moveLeadAction } from '@/app/actions/pipeline-actions';

interface PipelineBoardProps {
    stages: any[];
}

export default function PipelineBoard({ stages: initialStages }: PipelineBoardProps) {
    const [stages, setStages] = useState(initialStages);
    const [activeLead, setActiveLead] = useState<any | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }), // Requires 5px move to prevent accidental drags
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    // Helpers
    const findStage = (id: string) => {
        return stages.find(s => s.id === id) || stages.find(s => s.leads.some((l: any) => l.id === id));
    };

    function onDragStart(event: DragStartEvent) {
        const { active } = event;
        if (active.data.current?.type === 'Lead') {
            setActiveLead(active.data.current.lead);
        }
    }

    function onDragOver(event: DragOverEvent) {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        // Find parent stages
        const activeStage = findStage(activeId as string);
        const overStage = findStage(overId as string);

        if (!activeStage || !overStage || activeStage === overStage) return;

        setStages((prev) => {
            const activeStageIndex = prev.findIndex((s) => s.id === activeStage.id);
            const overStageIndex = prev.findIndex((s) => s.id === overStage.id);

            const newStages = [...prev];
            const activeLeads = [...newStages[activeStageIndex].leads];
            const loadToMove = activeLeads.find(l => l.id === activeId);

            if (loadToMove) {
                // Remove from source
                newStages[activeStageIndex].leads = activeLeads.filter(l => l.id !== activeId);
                // Add to target
                newStages[overStageIndex].leads.push(loadToMove);
            }

            return newStages;
        });
    }

    async function onDragEnd(event: DragEndEvent) {
        setActiveLead(null);
        const { active, over } = event;

        if (!over) return;

        const activeId = active.id as string;
        const overId = over.id as string;

        const activeStage = findStage(activeId);
        const overStage = findStage(overId); // Could be a Stage ID or a Lead ID

        if (activeStage && overStage) {
            // Optimistic update is handled in dragover if moving between containers.
            // If dragging inside same container, we might need arrayMove logic, 
            // but for a simple Pipeline, usually simple push/filter is enough visually.
            // We just need to trigger the Server Action to persist the new Stage.

            // The real target Stage ID
            const targetStageId = over.data.current?.type === 'Stage' ? over.id : overStage.id;

            // Call Server Action
            await moveLeadAction(activeId, targetStageId as string);
        }
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDragEnd={onDragEnd}
        >
            <div className="flex h-full overflow-x-auto pb-4">
                {stages.map((stage) => (
                    <StageColumn key={stage.id} stage={stage} />
                ))}
            </div>

            <DragOverlay>
                {activeLead ? <LeadCard lead={activeLead} /> : null}
            </DragOverlay>
        </DndContext>
    );
}
