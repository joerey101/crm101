'use client';

import { addTaskAction } from '@/app/actions/activity-actions';
import { Task } from '@prisma/client';
import { useActionState, useRef, useState } from 'react';

type TaskWithUser = Task & {
    assignee: { email: string; id: string };
};

export default function TaskWidget({
    leadId,
    tasks,
}: {
    leadId: string;
    tasks: TaskWithUser[];
}) {
    const [isCreating, setIsCreating] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const [errorMessage, dispatch, isPending] = useActionState(async (prev: any, formData: FormData) => {
        const result = await addTaskAction(
            leadId,
            formData.get('title') as string,
            formData.get('dueDate') as string
        );
        if (result?.success) {
            setIsCreating(false);
        }
        return result?.error;
    }, null);

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg flex justify-between items-center">
                <h3 className="font-semibold text-gray-900">Tasks</h3>
                <button
                    onClick={() => setIsCreating(true)}
                    className="text-xs text-blue-600 hover:underline font-medium"
                >
                    + Add Task
                </button>
            </div>

            {isCreating && (
                <div className="p-4 border-b border-gray-100 bg-blue-50/50">
                    <form ref={formRef} action={dispatch} className="space-y-3">
                        <input
                            name="title"
                            placeholder="Follow up on..."
                            required
                            className="w-full text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 p-2 border"
                        />
                        <input
                            name="dueDate"
                            type="date"
                            required
                            className="w-full text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 p-2 border"
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setIsCreating(false)}
                                className="text-xs text-gray-500 hover:text-gray-700"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isPending}
                                className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 disabled:opacity-50"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <ul className="divide-y divide-gray-100">
                {tasks.map((task) => (
                    <li key={task.id} className="p-4 hover:bg-gray-50 transition-colors flex items-start gap-3">
                        <input type="checkbox" className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                        <div>
                            <p className="text-sm font-medium text-gray-900">{task.title}</p>
                            <p className="text-xs text-gray-500">
                                Due: {new Date(task.dueAt).toLocaleDateString()}
                            </p>
                        </div>
                    </li>
                ))}
                {tasks.length === 0 && !isCreating && (
                    <li className="p-4 text-center text-gray-400 text-sm">
                        No pending tasks.
                    </li>
                )}
            </ul>
        </div>
    );
}
