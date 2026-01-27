
'use client';

import { useState } from 'react';
import { deleteLeadAction } from '@/app/actions/lead-actions';
import { useRouter } from 'next/navigation';

export default function DeleteLeadButton({ leadId, leadName }: { leadId: string, leadName: string }) {
    const [isConfirming, setIsConfirming] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        setIsDeleting(true);
        const result = await deleteLeadAction(leadId);
        if (result.success) {
            router.push('/dashboard/leads');
        } else {
            alert('Error deleting lead: ' + result.error);
            setIsDeleting(false);
            setIsConfirming(false);
        }
    };

    if (isConfirming) {
        return (
            <div className="flex items-center gap-2 animate-fade-in">
                <span className="text-xs text-red-600 font-medium">¿Seguro?</span>
                <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-md transition-colors disabled:opacity-50"
                >
                    {isDeleting ? 'Borrando...' : 'Sí, Borrar'}
                </button>
                <button
                    onClick={() => setIsConfirming(false)}
                    disabled={isDeleting}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-md transition-colors disabled:opacity-50"
                >
                    No
                </button>
            </div>
        );
    }

    return (
        <button
            onClick={() => setIsConfirming(true)}
            className="p-1.5 text-gray-400 hover:text-red-500 rounded-md hover:bg-red-50 transition-all"
            title="Borrar Lead"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.221v.917m4.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
        </button>
    );
}
