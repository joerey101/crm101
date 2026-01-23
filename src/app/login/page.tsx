'use client';

import { useActionState } from 'react';
import { authenticate } from '@/app/actions/auth-actions';

export default function LoginPage() {
    const [errorMessage, dispatch, isPending] = useActionState(
        authenticate,
        undefined,
    );

    return (
        <div className="flex h-screen w-full items-center justify-center bg-gray-50">
            <form action={dispatch} className="flex flex-col gap-4 rounded-lg bg-white p-8 shadow-sm w-96 border">
                <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Log in to CRM</h1>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-gray-900"
                        type="email"
                        name="email"
                        placeholder="admin@crm.com"
                        required
                        defaultValue="admin@crm.com"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-gray-900"
                        type="password"
                        name="password"
                        placeholder="admin123"
                        required
                        defaultValue="admin123"
                        minLength={6}
                    />
                </div>
                <div aria-live="polite" aria-atomic="true">
                    {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
                </div>
                <button
                    className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-500 disabled:opacity-50 mt-4 font-medium"
                    aria-disabled={isPending}
                    disabled={isPending}
                >
                    {isPending ? 'Logging in...' : 'Log in'}
                </button>
            </form>
        </div>
    );
}
