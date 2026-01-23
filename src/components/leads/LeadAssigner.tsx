
'use client';

import { useState } from 'react';
import { assignLeadAction } from '@/app/actions/assignment-actions';

type UserOption = {
    id: string;
    email: string;
};

export default function LeadAssigner({
    leadId,
    currentOwnerId,
    users
}: {
    leadId: string;
    currentOwnerId?: string | null;
    users: UserOption[];
}) {
    const [isPending, setIsPending] = useState(false);
    const [selectedOwner, setSelectedOwner] = useState(currentOwnerId || '');

    const handleAssign = async (newOwnerId: string) => {
        setSelectedOwner(newOwnerId);
        setIsPending(true);

        // Optimistic UI could happen here
        const result = await assignLeadAction(leadId, newOwnerId);

        setIsPending(false);
        if (result?.error) {
            alert(result.error);
            // Revert UI if needed or just error toast
        }
    };

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Owner:</span>
            <select
                disabled={isPending}
                value={selectedOwner}
                onChange={(e) => handleAssign(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 pl-3 pr-8 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6 disabled:opacity-50"
            >
                <option value="">Unassigned</option>
                {users.map((u) => (
                    <option key={u.id} value={u.id}>
                        {u.email}
                    </option>
                ))}
            </select>
            {isPending && <span className="text-xs text-gray-400">Saving...</span>}
        </div>
    );
}
