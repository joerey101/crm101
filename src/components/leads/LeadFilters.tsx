'use client';

import { Stage, Source } from '@prisma/client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function LeadFilters({
    stages,
    sources,
}: {
    stages: Stage[];
    sources: Source[];
}) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    const handleFilterChange = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="flex flex-wrap gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-100 mb-4">
            <div className="flex-1 min-w-[200px]">
                <input
                    type="text"
                    placeholder="Search leads..."
                    className="w-full rounded-md border border-gray-300 p-2 text-sm"
                    onChange={(e) => handleSearch(e.target.value)}
                    defaultValue={searchParams.get('query')?.toString()}
                />
            </div>
            <select
                className="rounded-md border border-gray-300 p-2 text-sm text-gray-700"
                onChange={(e) => handleFilterChange('stageId', e.target.value)}
                defaultValue={searchParams.get('stageId')?.toString()}
            >
                <option value="">All Stages</option>
                {stages.map((s) => (
                    <option key={s.id} value={s.id}>
                        {s.name}
                    </option>
                ))}
            </select>
            <select
                className="rounded-md border border-gray-300 p-2 text-sm text-gray-700"
                onChange={(e) => handleFilterChange('sourceId', e.target.value)}
                defaultValue={searchParams.get('sourceId')?.toString()}
            >
                <option value="">All Sources</option>
                {sources.map((s) => (
                    <option key={s.id} value={s.id}>
                        {s.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
