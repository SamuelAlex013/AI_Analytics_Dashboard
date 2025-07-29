import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn, formatCurrency, formatNumber, formatPercentage } from "@/lib/utils"
import { DollarSign, Users, TrendingUp, Activity, LucideIcon } from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  DollarSign,
  Users,
  TrendingUp,
  Activity,
}

interface StatCardProps {
  title: string
  value: string | number
  change?: number | string
  changeType?: 'positive' | 'negative' | 'neutral'
  icon: string // Icon name as string
  description?: string
  className?: string
  formatType?: 'currency' | 'number' | 'percentage' | 'none'
}

export function StatCard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon,
  description,
  className,
  formatType = 'none'
}: StatCardProps) {
  const Icon = iconMap[icon] || DollarSign // Fallback to DollarSign if icon not found
  
  const formatValue = (val: string | number) => {
    if (typeof val === 'string') return val
    
    switch (formatType) {
      case 'currency':
        return formatCurrency(val)
      case 'number':
        return formatNumber(val)
      case 'percentage':
        return `${val}%`
      default:
        return val.toString()
    }
  }

  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'text-green-600 dark:text-green-400'
      case 'negative':
        return 'text-red-600 dark:text-red-400'
      default:
        return 'text-muted-foreground'
    }
  }

  return (
    <Card className={cn("transition-all duration-300 hover:shadow-md", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatValue(value)}</div>
        {change !== undefined && (
          <p className={cn("text-xs flex items-center gap-1 mt-1", getChangeColor())}>
            <span>{formatPercentage(Number(change) || 0)}</span>
            <span className="text-muted-foreground">from last month</span>
          </p>
        )}
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  )
}
