import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  description: string
  descriptionIcon: LucideIcon
  trend?: "up" | "down" | "neutral"
}

export function StatCard({
  title,
  value,
  icon: Icon,
  description,
  descriptionIcon: DescIcon,
  trend = "neutral",
}: StatCardProps) {
  const trendColors = {
    up: "text-green-600",
    down: "text-red-600",
    neutral: "text-blue-600",
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className={`flex items-center text-xs ${trendColors[trend]}`}>
          <DescIcon className="h-3 w-3 mr-1" />
          {description}
        </div>
      </CardContent>
    </Card>
  )
}
