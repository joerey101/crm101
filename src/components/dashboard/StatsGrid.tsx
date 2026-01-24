'use client';

interface FunnelData {
    stageName: string;
    count: number;
    color: string;
}

interface StatsGridProps {
    stats: {
        performance: { conversionRate: number; won: number; totalClosed: number };
        overview: { totalActive: number; totalLeads: number };
        funnel: FunnelData[];
    };
}

export default function StatsGrid({ stats }: StatsGridProps) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Leads Card */}
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Leads</p>
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                                {stats.overview.totalActive}
                            </h3>
                        </div>
                        <span className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
                            📊
                        </span>
                    </div>
                    <div className="mt-4 text-xs text-gray-400">
                        {stats.overview.totalLeads} all time
                    </div>
                </div>

                {/* Conversion Card */}
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Conversion Rate</p>
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                                {stats.performance.conversionRate}%
                            </h3>
                        </div>
                        <span className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-600 dark:text-green-400">
                            📈
                        </span>
                    </div>
                    <div className="mt-4 text-xs text-gray-400">
                        {stats.performance.won} won / {stats.performance.totalClosed} closed
                    </div>
                </div>

                {/* Sales/Won Card */}
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Deals Won</p>
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                                {stats.performance.won}
                            </h3>
                        </div>
                        <span className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-600 dark:text-purple-400">
                            🏆
                        </span>
                    </div>
                    <div className="mt-4 text-xs text-green-500 font-medium">
                        Keep it up!
                    </div>
                </div>
            </div>

            {/* Funnel Bar Chart (CSS) */}
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Sales Funnel</h3>
                <div className="space-y-4">
                    {stats.funnel.map((stage) => {
                        // Calculate percentage relative to total active leads for visualization scale
                        const percentage = stats.overview.totalActive > 0
                            ? Math.round((stage.count / stats.overview.totalActive) * 100)
                            : 0;

                        // Ensure bar is at least visible if count > 0
                        const width = stage.count > 0 ? Math.max(percentage, 5) : 0;

                        return (
                            <div key={stage.stageName} className="group">
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="font-medium text-gray-700 dark:text-gray-300">{stage.stageName}</span>
                                    <span className="text-gray-500 dark:text-gray-500">{stage.count} leads</span>
                                </div>
                                <div className="w-full bg-gray-100 dark:bg-zinc-800 rounded-full h-2.5 overflow-hidden">
                                    <div
                                        className="h-2.5 rounded-full transition-all duration-500 ease-out bg-blue-500"
                                        style={{ width: `${width}%` }}
                                    ></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
