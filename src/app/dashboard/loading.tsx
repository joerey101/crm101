
export default function DashboardLoading() {
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header Skeleton */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex justify-between items-center mb-8 animate-pulse">
                    <div className="space-y-3">
                        <div className="h-8 bg-gray-200 rounded w-48"></div>
                        <div className="h-4 bg-gray-200 rounded w-64"></div>
                    </div>
                    <div className="h-10 bg-gray-200 rounded w-24"></div>
                </div>

                {/* Widgets Grid Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-pulse">
                            <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
                            <div className="h-10 bg-gray-200 rounded w-24"></div>
                            <div className="h-4 bg-gray-200 rounded w-40 mt-3"></div>
                        </div>
                    ))}
                </div>

                {/* Main Content Grid Skeleton */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {[1, 2].map((i) => (
                        <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                <div className="h-6 bg-gray-200 rounded w-32"></div>
                                <div className="h-4 bg-gray-200 rounded w-16"></div>
                            </div>
                            <div className="space-y-4 p-4">
                                {[1, 2, 3, 4].map((j) => (
                                    <div key={j} className="h-16 bg-gray-50 rounded mx-2"></div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
