import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"







export function SubjectCardSkeleton() {


    return (
        <Card className="border border-gray-200 dark:border-gray-700">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <Skeleton className="w-14 h-6 rounded-full" />
                    <BookOpen className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex flex-wrap gap-1 mt-2">


                    


                </div>
            </CardHeader>

            <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>


                    </div>
                    <div>

                     

                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
