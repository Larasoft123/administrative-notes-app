
import { Skeleton } from "@/components/ui/skeleton"




export function ActivityItemSkeleton({ }) {

    return (


        <div className="flex items-center space-x-3 p-3 rounded-lg bg-neutral-200 dark:bg-gray-800">
            <Skeleton className="w-3 h-3 rounded-full" />
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate"></p>
                <Skeleton />
                <Skeleton />
            </div>
                <Skeleton className="px-4 py-2"/>
          
        </div>



    )
}
