import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
export function StudentCardSkeleton() {
    return (
        <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3 sm:pb-4">
                <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="min-w-0 flex-1">
                            <Skeleton className="h-4 w-full" />
                            <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-1">
                                <Skeleton className="h-3 w-full" />
                                <Skeleton className="h-3 w-full" />
                            </div>
                        </div>
                    </div>
                    <Skeleton className="w-10 h-10" />
                </div>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                </div>
            </CardContent>
        </Card>


    )
}
