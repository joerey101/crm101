'use client';

import { addNoteAction } from '@/app/actions/activity-actions';
import { Activity } from '@prisma/client';
import { useActionState, useRef } from 'react';

type ActivityWithUser = Activity & {
    creator: { email: string; id: string };
};

export default function ActivityTimeline({
    leadId,
    activities,
}: {
    leadId: string;
    activities: ActivityWithUser[];
}) {
    const formRef = useRef<HTMLFormElement>(null);
    const [errorMessage, dispatch, isPending] = useActionState(async (prev: any, formData: FormData) => {
        const result = await addNoteAction(leadId, formData.get('content') as string);
        if (result?.success) {
            formRef.current?.reset();
        }
        return result?.error;
    }, null);

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                <h3 className="font-semibold text-gray-900">Activity & Notes</h3>
            </div>

            {/* Add Note Input */}
            <div className="p-4 border-b border-gray-100">
                <form ref={formRef} action={dispatch}>
                    <textarea
                        name="content"
                        rows={3}
                        placeholder="Log a call, note, or meeting..."
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
                        required
                    />
                    <div className="mt-2 flex justify-end">
                        <button
                            disabled={isPending}
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 disabled:opacity-50"
                        >
                            {isPending ? 'Saving...' : 'Log Activity'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Timeline List */}
            <div className="flow-root p-6">
                <ul role="list" className="-mb-8">
                    {activities.map((activity, activityIdx) => (
                        <li key={activity.id}>
                            <div className="relative pb-8">
                                {activityIdx !== activities.length - 1 ? (
                                    <span
                                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                        aria-hidden="true"
                                    />
                                ) : null}
                                <div className="relative flex space-x-3">
                                    <div>
                                        <span className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center ring-8 ring-white">
                                            <span className="text-xs font-bold text-blue-600">
                                                {activity.type === 'NOTE' ? '📝' : '⚡️'}
                                            </span>
                                        </span>
                                    </div>
                                    <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                        <div>
                                            <p className="text-sm text-gray-500">
                                                {activity.body}{' '}
                                                <span className="font-medium text-gray-900">
                                                    by {activity.creator.email}
                                                </span>
                                            </p>
                                        </div>
                                        <div className="whitespace-nowrap text-right text-sm text-gray-500">
                                            <time dateTime={activity.createdAt.toString()}>
                                                {new Date(activity.createdAt).toLocaleDateString()}
                                            </time>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                    {activities.length === 0 && (
                        <li className="text-center text-gray-400 text-sm py-4">No activities logged yet.</li>
                    )}
                </ul>
            </div>
        </div>
    );
}
