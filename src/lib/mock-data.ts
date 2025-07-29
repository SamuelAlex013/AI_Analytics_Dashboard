import { ChartDataPoint, UserData, SalesData, AnalyticsResponse } from "@/types/analytics"

// Generate mock chart data with date range support
export function generateChartData(count: number = 12, dateRange: string = '7d'): ChartDataPoint[] {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ]
  
  // Adjust data points based on date range
  let dataPoints = count
  let multiplier = 1
  
  switch (dateRange) {
    case '1d':
      dataPoints = 24 // Hours
      multiplier = 0.1
      break
    case '7d':
      dataPoints = 7 // Days
      multiplier = 0.8
      break
    case '30d':
      dataPoints = 30 // Days
      multiplier = 1
      break
    case '90d':
      dataPoints = 12 // Weeks
      multiplier = 1.2
      break
    case '1y':
      dataPoints = 12 // Months
      multiplier = 1.5
      break
  }
  
  return Array.from({ length: dataPoints }, (_, index) => ({
    name: dateRange === '1d' ? `${index}:00` : 
          dateRange === '7d' || dateRange === '30d' ? `Day ${index + 1}` :
          months[index % 12],
    value: Math.floor((Math.random() * 5000 + 1000) * multiplier),
    date: new Date(2024, index, 1).toISOString(),
  }))
}

// Generate pie chart data
export function generatePieData(): ChartDataPoint[] {
  return [
    { name: 'Desktop', value: 45, category: 'platform' },
    { name: 'Mobile', value: 35, category: 'platform' },
    { name: 'Tablet', value: 20, category: 'platform' },
  ]
}

// Generate mock user data with filtering
export function generateUsers(count: number = 50, statusFilter: string = 'all', searchQuery: string = ''): UserData[] {
  const names = [
    'John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson', 'David Brown',
    'Emily Davis', 'Chris Miller', 'Amanda Garcia', 'Daniel Martinez', 'Lisa Anderson',
    'Robert Taylor', 'Jennifer White', 'William Harris', 'Elizabeth Clark', 'James Lewis',
    'Maria Rodriguez', 'Michael Lee', 'Linda Walker', 'Christopher Hall', 'Patricia Young'
  ]
  
  const companies = ['acme', 'techstart', 'digital', 'creative', 'marketing', 'brand', 'growth', 'data', 'ai', 'future']
  const domains = ['gmail.com', 'yahoo.com', 'company.com', 'business.net', 'startup.io']
  const roles = ['Admin', 'User', 'Manager', 'Developer', 'Designer', 'Analyst', 'Director']
  const statuses: ('active' | 'inactive' | 'pending')[] = ['active', 'inactive', 'pending']
  
  let users = Array.from({ length: count }, (_, i) => {
    const name = names[i % names.length]
    const company = companies[i % companies.length]
    const email = `${name.toLowerCase().replace(' ', '.')}@${company}.${domains[i % domains.length]}`
    const status = statuses[i % statuses.length]
    
    return {
      id: `user-${i + 1}`,
      name,
      email,
      role: roles[i % roles.length],
      status,
      lastActive: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      revenue: Math.floor(Math.random() * 10000) + 500,
      orders: Math.floor(Math.random() * 50) + 1,
    }
  })
  
  // Apply status filter
  if (statusFilter !== 'all') {
    users = users.filter(user => user.status === statusFilter)
  }
  
  // Apply search filter
  if (searchQuery) {
    const query = searchQuery.toLowerCase()
    users = users.filter(user => 
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.role.toLowerCase().includes(query)
    )
  }
  
  return users
}

// Generate mock sales data
export function generateSales(count: number = 100): SalesData[] {
  const customers = [
    'Acme Corp', 'TechStart Inc', 'Digital Agency', 'Creative Studio', 'Marketing Plus',
    'Brand Solutions', 'Growth Hackers', 'Data Insights', 'AI Solutions', 'Future Tech'
  ]
  
  const products = [
    'Analytics Pro', 'Dashboard Premium', 'Insights Basic', 'Enterprise Suite',
    'Starter Pack', 'Growth Plan', 'Business Analytics', 'Custom Reports'
  ]
  
  const statuses: ('completed' | 'pending' | 'cancelled')[] = ['completed', 'pending', 'cancelled']
  const channels: ('online' | 'mobile' | 'store')[] = ['online', 'mobile', 'store']
  
  return Array.from({ length: count }, (_, i) => ({
    id: `sale-${i + 1}`,
    date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
    amount: Math.floor(Math.random() * 5000) + 100,
    customer: customers[i % customers.length],
    product: products[i % products.length],
    status: statuses[i % statuses.length],
    channel: channels[i % channels.length],
  }))
}

// Generate complete analytics response with filters
export function generateAnalyticsData(filters?: {
  dateRange?: string
  statusFilter?: string
  searchQuery?: string
}): AnalyticsResponse {
  const { dateRange = '7d', statusFilter = 'all', searchQuery = '' } = filters || {}
  
  const revenueData = generateChartData(12, dateRange)
  const usersData = generateChartData(12, dateRange)
  const conversionsData = generateChartData(12, dateRange)
  
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.value, 0)
  const totalUsers = usersData.reduce((sum, item) => sum + item.value, 0)
  const avgConversion = conversionsData.reduce((sum, item) => sum + item.value, 0) / conversionsData.length
  
  // Add realistic variance based on date range
  const dateMultiplier = {
    '1d': 0.1,
    '7d': 1,
    '30d': 4,
    '90d': 12,
    '1y': 48
  }[dateRange] || 1
  
  // Generate random but realistic changes
  const revenueChange = (Math.random() * 20 - 5) // -5% to +15%
  const usersChange = (Math.random() * 15 - 2) // -2% to +13%
  const conversionChange = (Math.random() * 6 - 3) // -3% to +3%
  const growthChange = (Math.random() * 10 - 2) // -2% to +8%
  
  // Helper function to format date range description
  const formatDateRangeDescription = (range: string): string => {
    switch (range) {
      case '1d': return '24 hours'
      case '7d': return '7 days'
      case '30d': return '30 days'
      case '90d': return '3 months'
      case '1y': return '1 year'
      default: return range
    }
  }
  
  return {
    metrics: {
      revenue: {
        title: 'Total Revenue',
        value: Math.round(totalRevenue * dateMultiplier),
        change: Number(revenueChange.toFixed(1)),
        changeType: revenueChange >= 0 ? 'positive' : 'negative',
        icon: 'DollarSign',
        description: 'Monthly recurring revenue'
      },
      users: {
        title: 'Active Users',
        value: Math.round(totalUsers * dateMultiplier),
        change: Number(usersChange.toFixed(1)),
        changeType: usersChange >= 0 ? 'positive' : 'negative',
        icon: 'Users',
        description: 'Unique monthly active users'
      },
      conversions: {
        title: 'Conversion Rate',
        value: Number((avgConversion / 100).toFixed(4)),
        change: Number(conversionChange.toFixed(1)),
        changeType: conversionChange >= 0 ? 'positive' : 'negative',
        icon: 'TrendingUp',
        description: 'Average conversion percentage'
      },
      growth: {
        title: 'Growth Rate',
        value: Number((15.3 + growthChange).toFixed(1)),
        change: Number(growthChange.toFixed(1)),
        changeType: growthChange >= 0 ? 'positive' : 'negative',
        icon: 'Activity',
        description: 'Month over month growth'
      }
    },
    charts: {
      revenue: {
        title: 'Revenue Trend',
        description: `Revenue data for ${formatDateRangeDescription(dateRange)}`,
        type: 'line',
        data: revenueData,
        height: 300
      },
      users: {
        title: 'User Growth',
        description: `User registrations for ${formatDateRangeDescription(dateRange)}`,
        type: 'bar',
        data: usersData,
        height: 300
      },
      conversions: {
        title: 'Traffic Sources',
        description: 'Breakdown of traffic by platform',
        type: 'pie',
        data: generatePieData(),
        height: 300
      }
    },
    users: generateUsers(100, statusFilter, searchQuery),
    sales: generateSales()
  }
}
