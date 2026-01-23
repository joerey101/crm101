'use client';

import { createLeadAction } from '@/app/actions/lead-actions';
import { Stage, Source } from '@prisma/client';
import { useActionState, useState } from 'react';

export default function NewLeadModal({
    stages,
    sources,
}: {
    stages: Stage[];
    sources: Source[];
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [errorMessage, dispatch, isPending] = useActionState(async (prev: any, formData: FormData) => {
        const result = await createLeadAction(prev, formData);
        if (result?.success) {
            setIsOpen(false);
            return null;
        }
        return result?.error;
    }, null);

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 shadow-sm"
            >
                + New Lead
            </button>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg rounded-lg bg-white shadow-xl">
                <div className="flex items-center justify-between border-b px-6 py-4">
                    <h2 className="text-lg font-semibold text-gray-900">Create New Lead</h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-gray-400 hover:text-gray-500"
                    >
                        ✕
                    </button>
                </div>

                <form action={dispatch} className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                name="fullName"
                                required
                                className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-gray-900"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Province</label>
                            <input
                                name="province"
                                required
                                className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-gray-900"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                            <input
                                name="phone"
                                className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-gray-900"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                name="email"
                                type="email"
                                className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-gray-900"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Source</label>
                            <select
                                name="sourceId"
                                required
                                className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-gray-900"
                            >
                                {sources.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Initial Stage</label>
                            <select
                                name="stageId"
                                required
                                className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-gray-900"
                            >
                                {stages.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Products (comma separated)</label>
                        <input
                            name="productsOfInterest"
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-gray-900"
                            placeholder="e.g. Mates Imperiales, Bombillas, Termos"
                        />
                    </div>

                    {errorMessage && (
                        <div className="bg-red-50 p-2 rounded text-red-600 text-sm">
                            {typeof errorMessage === 'string' ? errorMessage : 'Validation error'}
                        </div>
                    )}

                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-50"
                            disabled={isPending}
                        >
                            {isPending ? 'Saving...' : 'Save Lead'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
