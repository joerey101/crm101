'use client';

import { addNoteAction } from '@/app/actions/activity-actions';
import { sendWhatsAppAction } from '@/app/actions/whatsapp-actions';
import { Activity } from '@prisma/client';
import { useActionState, useRef, useState } from 'react';

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
    const [activeTab, setActiveTab] = useState<'NOTE' | 'WHATSAPP'>('NOTE');
    const formRef = useRef<HTMLFormElement>(null);

    const [errorMessage, dispatch, isPending] = useActionState(async (prev: string | null | undefined, formData: FormData) => {
        const content = formData.get('content') as string;
        // The type comes from the state passed via hidden input or just logic here if we trusted state, 
        // but hidden input is safer for form data consistency.
        const type = formData.get('type') as string;

        let result;
        if (type === 'WHATSAPP') {
            result = await sendWhatsAppAction(leadId, content);
        } else {
            result = await addNoteAction(leadId, content);
        }

        if (result?.success) {
            formRef.current?.reset();
            // Optional: Switch back to Note after sending? Or keep in WA mode? Keeping is better for conversation.
        }
        return result?.error;
    }, null);

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                <div className="flex space-x-4">
                    <button
                        type="button"
                        onClick={() => setActiveTab('NOTE')}
                        className={`text-sm font-medium pb-2 border-b-2 transition-colors ${activeTab === 'NOTE'
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Internal Note
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('WHATSAPP')}
                        className={`text-sm font-medium pb-2 border-b-2 transition-colors ${activeTab === 'WHATSAPP'
                            ? 'border-[#25D366] text-[#25D366]'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        WhatsApp Reply
                    </button>
                </div>
            </div>

            {/* Add Note/Message Input */}
            <div className="p-4 border-b border-gray-100">
                <form ref={formRef} action={dispatch}>
                    <input type="hidden" name="type" value={activeTab} />
                    <textarea
                        name="content"
                        rows={3}
                        placeholder={activeTab === 'WHATSAPP' ? "Type a WhatsApp message..." : "Log a call, note, or meeting..."}
                        className={`w-full rounded-md shadow-sm sm:text-sm p-3 border text-gray-900 focus:ring-opacity-50 ${activeTab === 'WHATSAPP'
                            ? 'border-green-300 focus:border-[#25D366] focus:ring-[#25D366]'
                            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                            }`}
                        required
                    />
                    {errorMessage && (
                        <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
                    )}
                    <div className="mt-2 flex justify-end">
                        <button
                            disabled={isPending}
                            type="submit"
                            className={`px-4 py-2 text-white text-sm font-medium rounded-md disabled:opacity-50 transition-colors ${activeTab === 'WHATSAPP'
                                ? 'bg-[#25D366] hover:bg-[#20bd5a]'
                                : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                        >
                            {isPending
                                ? 'Sending...'
                                : activeTab === 'WHATSAPP'
                                    ? 'Send WhatsApp'
                                    : 'Log Activity'
                            }
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
                                        <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${activity.type === 'WHATSAPP' ? 'bg-[#25D366]' : 'bg-blue-100'}`}>
                                            <span className={`text-xs font-bold ${activity.type === 'WHATSAPP' ? 'text-white' : 'text-blue-600'}`}>
                                                {activity.type === 'NOTE' ? '📝' : activity.type === 'WHATSAPP' ? '💬' : '⚡️'}
                                            </span>
                                        </span>
                                    </div>
                                    <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                        {activity.type === 'WHATSAPP' ? (
                                            <div className="w-full">
                                                <div className="relative max-w-xl rounded-2xl rounded-tl-none bg-white border border-gray-200 shadow-sm p-4">
                                                    <p className="text-[18px] leading-relaxed text-gray-900">
                                                        {activity.body}
                                                    </p>
                                                    <div className="mt-2 flex items-center justify-end gap-2 text-xs text-gray-500">
                                                        <span>
                                                            {new Date(activity.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </span>
                                                        <span>•</span>
                                                        <span className="font-medium text-[#25D366]">
                                                            via WhatsApp Business
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="w-full">
                                                <p className="text-sm text-gray-500">
                                                    {activity.body}{' '}
                                                    <span className="font-medium text-gray-900">
                                                        by {activity.creator.email}
                                                    </span>
                                                </p>
                                                <div className="whitespace-nowrap text-right text-sm text-gray-500 mt-1">
                                                    <time dateTime={activity.createdAt.toString()}>
                                                        {new Date(activity.createdAt).toLocaleDateString()}
                                                    </time>
                                                </div>
                                            </div>
                                        )}
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
