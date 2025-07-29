// Dashboard Analytics Types
export interface MetricCard {
  title: string
  value: string | number
  change: number
  changeType: 'positive' | 'negative' | 'neutral'
  icon: string // Icon name as string
  description?: string
}

export interface ChartDataPoint {
  name: string
  value: number
  date?: string
  category?: string
}

export interface UserData {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive' | 'pending'
  lastActive: Date | string
  revenue: number
  orders: number
}

export interface SalesData {
  id: string
  date: Date | string
  amount: number
  customer: string
  product: string
  status: 'completed' | 'pending' | 'cancelled'
  channel: 'online' | 'mobile' | 'store'
}

// Chart Configuration Types
export interface ChartConfig {
  title: string
  description?: string
  type: 'line' | 'bar' | 'pie' | 'area' | 'donut'
  data: ChartDataPoint[]
  colors?: string[]
  height?: number
}

// API Response Types
export interface AnalyticsResponse {
  metrics: {
    revenue: MetricCard
    users: MetricCard
    conversions: MetricCard
    growth: MetricCard
  }
  charts: {
    revenue: ChartConfig
    users: ChartConfig
    conversions: ChartConfig
  }
  users: UserData[]
  sales: SalesData[]
}
