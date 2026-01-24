'use client';

import dynamic from 'next/dynamic';

const LeadMap = dynamic(() => import('./LeadMap'), {
    ssr: false,
    loading: () => (
        <div className="h-[400px] w-full bg-gray-100 dark:bg-zinc-800 rounded-xl animate-pulse flex items-center justify-center text-gray-400">
            Loading Map...
        </div>
    )
});

export default LeadMap;
