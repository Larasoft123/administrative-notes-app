import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ActivityItemSkeleton } from "@/components/dashboard/activity-item-skeleton"


export function UpcomingActivitiesSkeleton({ }) {

    return (

        <Card>
            <CardHeader>
                <CardTitle>Próximas Actividades</CardTitle>
                <CardDescription>Tareas y eventos pendientes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <ActivityItemSkeleton/>
                <ActivityItemSkeleton/>
                <ActivityItemSkeleton/>
                <ActivityItemSkeleton/>
                <ActivityItemSkeleton/>       
            </CardContent>
        </Card>


    )
}
