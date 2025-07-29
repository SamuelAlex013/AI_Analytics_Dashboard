"use client"

import { useEffect, useState } from "react"
import { useAnalytics } from "@/hooks/use-analytics"
import { StatCard } from "@/components/cards/stat-card"
import { AnalyticsLineChart } from "@/components/charts/line-chart"
import { AnalyticsBarChart } from "@/components/charts/bar-chart"
import { AnalyticsPieChart } from "@/components/charts/pie-chart"
import { DataTable } from "@/components/tables/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { UserData } from "@/types/analytics"
import { formatCurrency, formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { 
  ArrowUpDown, 
  RefreshCw, 
  Download, 
  Filter, 
  CalendarIcon, 
  Play, 
  Pause, 
  FileText, 
  Table, 
  Clock,
  Settings,
  Bell,
  Maximize2,
  Minimize2,
  Share2,
  Bookmark,
  BookmarkCheck,
  Eye,
  EyeOff,
  Zap,
  TrendingUp
} from "lucide-react"
import { cn } from "@/lib/utils"

const userColumns: ColumnDef<UserData>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      const variant = status === "active" ? "default" : status === "pending" ? "secondary" : "destructive"
      return <Badge variant={variant}>{status}</Badge>
    },
  },
  {
    accessorKey: "revenue",
    header: "Revenue",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("revenue"))
      return formatCurrency(amount)
    },
  },
  {
    accessorKey: "lastActive",
    header: "Last Active",
    cell: ({ row }) => {
      const date = row.getValue("lastActive") as Date | string
      return formatDate(date)
    },
  },
]

// Loading skeleton components
const StatCardSkeleton = () => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <div className="h-4 bg-muted animate-pulse rounded w-24"></div>
      <div className="h-4 w-4 bg-muted animate-pulse rounded"></div>
    </CardHeader>
    <CardContent>
      <div className="h-8 bg-muted animate-pulse rounded w-32 mb-2"></div>
      <div className="h-3 bg-muted animate-pulse rounded w-20"></div>
    </CardContent>
  </Card>
)

const ChartSkeleton = () => (
  <Card>
    <CardHeader>
      <div className="h-5 bg-muted animate-pulse rounded w-40 mb-2"></div>
      <div className="h-4 bg-muted animate-pulse rounded w-60"></div>
    </CardHeader>
    <CardContent>
      <div className="h-64 bg-muted animate-pulse rounded"></div>
    </CardContent>
  </Card>
)

const TableSkeleton = () => (
  <Card>
    <CardHeader>
      <div className="h-5 bg-muted animate-pulse rounded w-32 mb-2"></div>
      <div className="h-4 bg-muted animate-pulse rounded w-48"></div>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex space-x-4">
            <div className="h-4 bg-muted animate-pulse rounded flex-1"></div>
            <div className="h-4 bg-muted animate-pulse rounded w-20"></div>
            <div className="h-4 bg-muted animate-pulse rounded w-16"></div>
            <div className="h-4 bg-muted animate-pulse rounded w-24"></div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
)

export default function OverviewPage() {
  // Real-time updates state
  const [isRealTimeEnabled, setIsRealTimeEnabled] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
  
  // Export state
  const [isExporting, setIsExporting] = useState<string>("")
  
  // Filter state
  const [dateRange, setDateRange] = useState("7d")
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Enhanced header states
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [notificationCount, setNotificationCount] = useState(3)
  const [showNotifications, setShowNotifications] = useState(false)
  const [isDashboardVisible, setIsDashboardVisible] = useState(true)
  const [autoRefreshInterval, setAutoRefreshInterval] = useState("10s")
  
  // Use analytics hook with filters
  const { data, loading, error, refetch } = useAnalytics({
    dateRange,
    statusFilter,
    searchQuery
  })
  
  // Real-time updates effect with more realistic intervals
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    
    if (isRealTimeEnabled) {
      // More frequent updates for better testing - every 10 seconds
      interval = setInterval(() => {
        refetch()
        setLastUpdate(new Date())
      }, 10000) // 10 seconds for easier testing
    }
    
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRealTimeEnabled, refetch])

  // Export functions
  const exportToPDF = async () => {
    setIsExporting("pdf")
    
    try {
      // Dynamic import for client-side only
      const jsPDF = (await import('jspdf')).default
      
      // Create PDF document
      const pdf = new jsPDF()
      
      // Add title
      pdf.setFontSize(20)
      pdf.text('ADmyBRAND Analytics Report', 20, 30)
      
      // Add generation date
      pdf.setFontSize(12)
      pdf.text(`Generated: ${new Date().toLocaleString()}`, 20, 45)
      
      // Add filters info
      pdf.text(`Date Range: ${dateRange}`, 20, 60)
      pdf.text(`Status Filter: ${statusFilter}`, 20, 70)
      
      // Add metrics data
      pdf.setFontSize(14)
      pdf.text('Key Metrics:', 20, 90)
      
      pdf.setFontSize(11)
      let yPosition = 105
      
      if (data?.metrics) {
        pdf.text(`• Revenue: ${data.metrics.revenue.value} (${data.metrics.revenue.change > 0 ? '+' : ''}${data.metrics.revenue.change}%)`, 25, yPosition)
        yPosition += 15
        pdf.text(`• Users: ${data.metrics.users.value} (${data.metrics.users.change > 0 ? '+' : ''}${data.metrics.users.change}%)`, 25, yPosition)
        yPosition += 15
        pdf.text(`• Conversions: ${data.metrics.conversions.value} (${data.metrics.conversions.change > 0 ? '+' : ''}${data.metrics.conversions.change}%)`, 25, yPosition)
        yPosition += 15
        pdf.text(`• Growth: ${data.metrics.growth.value} (${data.metrics.growth.change > 0 ? '+' : ''}${data.metrics.growth.change}%)`, 25, yPosition)
      }
      
      // Add user data table
      if (data?.users && data.users.length > 0) {
        yPosition += 30
        pdf.setFontSize(14)
        pdf.text('Recent Users:', 20, yPosition)
        
        yPosition += 20
        pdf.setFontSize(10)
        
        // Table headers
        pdf.text('Name', 20, yPosition)
        pdf.text('Email', 70, yPosition)
        pdf.text('Status', 130, yPosition)
        pdf.text('Revenue', 160, yPosition)
        
        yPosition += 10
        
        // Filter users based on current filters
        const filteredUsers = data.users.filter(user => {
          const matchesSearch = searchQuery === "" || 
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
          const matchesStatus = statusFilter === "all" || user.status === statusFilter
          return matchesSearch && matchesStatus
        })
        
        filteredUsers.slice(0, 25).forEach((user, index) => {
          if (yPosition > 250) { // Add new page if needed
            pdf.addPage()
            yPosition = 30
          }
          
          pdf.text(user.name, 20, yPosition)
          pdf.text(user.email, 70, yPosition)
          pdf.text(user.status, 130, yPosition)
          pdf.text(`$${user.revenue}`, 160, yPosition)
          yPosition += 12
        })
      }
      
      // Save the PDF
      pdf.save(`analytics-report-${Date.now()}.pdf`)
      
    } catch (error) {
      console.error('PDF generation failed:', error)
      // Fallback to text file if PDF fails
      const content = `
ADmyBRAND Analytics Report
Generated: ${new Date().toLocaleString()}

Metrics:
- Revenue: ${data?.metrics.revenue.value}
- Users: ${data?.metrics.users.value}
- Conversions: ${data?.metrics.conversions.value}
- Growth: ${data?.metrics.growth.value}

Date Range: ${dateRange}
Status Filter: ${statusFilter}
      `.trim()
      
      const blob = new Blob([content], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `analytics-report-${Date.now()}.txt`
      a.click()
      URL.revokeObjectURL(url)
    }
    
    setIsExporting("")
  }

  const exportToCSV = async () => {
    setIsExporting("csv")
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    if (data?.users) {
      // Filter users based on current filters
      const filteredUsers = data.users.filter(user => {
        const matchesSearch = searchQuery === "" || 
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesStatus = statusFilter === "all" || user.status === statusFilter
        return matchesSearch && matchesStatus
      })
      
      const csvContent = [
        ['Name', 'Email', 'Role', 'Status', 'Revenue', 'Last Active'].join(','),
        ...filteredUsers.map(user => [
          user.name,
          user.email,
          user.role,
          user.status,
          user.revenue,
          typeof user.lastActive === 'string' ? user.lastActive : user.lastActive.toISOString()
        ].join(','))
      ].join('\n')
      
      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `user-data-${Date.now()}.csv`
      a.click()
      URL.revokeObjectURL(url)
    }
    
    setIsExporting("")
  }

  // Enhanced header helper functions
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    // In a real app, this would save to user preferences
    localStorage.setItem('dashboardBookmarked', JSON.stringify(!isBookmarked))
  }

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'ADmyBRAND Analytics Dashboard',
          text: 'Check out these analytics insights!',
          url: window.location.href
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Dashboard link copied to clipboard!')
    }
  }

  const handleToggleVisibility = () => {
    setIsDashboardVisible(!isDashboardVisible)
  }

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications)
    if (notificationCount > 0) {
      // Mark notifications as read
      setTimeout(() => setNotificationCount(0), 2000)
    }
  }

  const changeRefreshInterval = (interval: string) => {
    setAutoRefreshInterval(interval)
    // In a real app, this would update the refresh interval
    localStorage.setItem('dashboardRefreshInterval', interval)
  }

  // Show loading skeletons
  if (loading) {
    return (
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between">
          <div>
            <div className="h-8 bg-muted animate-pulse rounded w-64 mb-2"></div>
            <div className="h-4 bg-muted animate-pulse rounded w-96"></div>
          </div>
          <div className="h-10 bg-muted animate-pulse rounded w-32"></div>
        </div>

        {/* Metrics Cards Skeletons */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>

        {/* Charts Skeletons */}
        <div className="grid gap-6 md:grid-cols-2">
          <ChartSkeleton />
          <ChartSkeleton />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-1">
            <ChartSkeleton />
          </div>
          <div className="md:col-span-2">
            <TableSkeleton />
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-lg font-semibold text-destructive">Error Loading Data</h2>
        <p className="text-muted-foreground mt-2">{error}</p>
        <Button onClick={refetch} className="mt-4">
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="space-y-6">
      {/* Enhanced Header with Real-time Controls */}
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                Dashboard Overview
                {isBookmarked && (
                  <BookmarkCheck className="h-6 w-6 text-yellow-500" />
                )}
              </h1>
              <p className="text-muted-foreground">
                Welcome to ADmyBRAND Insights - Your AI-powered analytics dashboard
              </p>
            </div>
            
            {/* Performance Indicator */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-green-50 dark:bg-green-950 rounded-full">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-700 dark:text-green-300">
                Performance: +12.5%
              </span>
            </div>
          </div>

          {/* Enhanced Control Panel */}
          <div className="flex items-center gap-2">
            {/* Notification Bell */}
            <div className="relative">
              <Button
                onClick={handleNotificationClick}
                variant="ghost"
                size="sm"
                className="transition-all duration-200 hover:scale-105"
              >
                <Bell className="h-4 w-4" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </Button>
              
              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-background border rounded-lg shadow-lg z-50 animate-in slide-in-from-top-2 duration-200">
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">Recent Notifications</h3>
                    <div className="space-y-2">
                      <div className="text-sm p-2 bg-muted rounded">
                        <span className="font-medium">Revenue Alert:</span> Daily target exceeded by 15%
                      </div>
                      <div className="text-sm p-2 bg-muted rounded">
                        <span className="font-medium">User Growth:</span> 25 new signups today
                      </div>
                      <div className="text-sm p-2 bg-muted rounded">
                        <span className="font-medium">System:</span> Data refresh completed
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Auto Refresh Interval Selector */}
            <div className="hidden md:flex items-center gap-1">
              <Zap className="h-3 w-3 text-muted-foreground" />
              <select
                value={autoRefreshInterval}
                onChange={(e) => changeRefreshInterval(e.target.value)}
                className="text-xs border rounded px-2 py-1 bg-background"
              >
                <option value="5s">5s</option>
                <option value="10s">10s</option>
                <option value="30s">30s</option>
                <option value="1m">1m</option>
                <option value="off">Off</option>
              </select>
            </div>

            {/* Visibility Toggle */}
            <Button
              onClick={handleToggleVisibility}
              variant="ghost"
              size="sm"
              className="transition-all duration-200 hover:scale-105"
              title="Toggle dashboard visibility"
            >
              {isDashboardVisible ? (
                <Eye className="h-4 w-4" />
              ) : (
                <EyeOff className="h-4 w-4" />
              )}
            </Button>

            {/* Bookmark Toggle */}
            <Button
              onClick={handleBookmark}
              variant="ghost"
              size="sm"
              className="transition-all duration-200 hover:scale-105"
              title="Bookmark dashboard"
            >
              {isBookmarked ? (
                <BookmarkCheck className="h-4 w-4 text-yellow-500" />
              ) : (
                <Bookmark className="h-4 w-4" />
              )}
            </Button>

            {/* Share Button */}
            <Button
              onClick={handleShare}
              variant="ghost"
              size="sm"
              className="transition-all duration-200 hover:scale-105"
              title="Share dashboard"
            >
              <Share2 className="h-4 w-4" />
            </Button>

            {/* Fullscreen Toggle */}
            <Button
              onClick={handleFullscreen}
              variant="ghost"
              size="sm"
              className="transition-all duration-200 hover:scale-105"
              title="Toggle fullscreen"
            >
              {isFullscreen ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </Button>

            {/* Settings */}
            <Button
              variant="ghost"
              size="sm"
              className="transition-all duration-200 hover:scale-105"
              title="Dashboard settings"
            >
              <Settings className="h-4 w-4" />
            </Button>

            <Separator orientation="vertical" className="h-6" />

            {/* Real-time Toggle */}
            <Button
              onClick={() => setIsRealTimeEnabled(!isRealTimeEnabled)}
              variant={isRealTimeEnabled ? "default" : "outline"}
              size="sm"
              className="transition-all duration-200"
            >
              {isRealTimeEnabled ? (
                <>
                  <Pause className="mr-2 h-4 w-4" />
                  Live ({autoRefreshInterval})
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Enable Live
                </>
              )}
            </Button>

            {/* Manual Refresh */}
            <Button onClick={refetch} variant="outline" size="sm">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Enhanced Real-time Status and Last Update */}
        {isRealTimeEnabled && (
          <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-medium text-green-700 dark:text-green-300">Live updates enabled</span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>Last updated: {lastUpdate.toLocaleTimeString()}</span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center gap-2 text-muted-foreground">
                <Zap className="h-3 w-3" />
                <span>Refresh rate: {autoRefreshInterval}</span>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs text-green-600 dark:text-green-400">
              <TrendingUp className="h-3 w-3" />
              <span>Real-time data streaming</span>
            </div>
          </div>
        )}

        {/* Filters and Export Controls */}
        <Card className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Label className="text-sm font-medium">Filters:</Label>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="date-range" className="text-xs text-muted-foreground">Date Range:</Label>
                  <select
                    id="date-range"
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="text-sm border rounded px-2 py-1 bg-background"
                  >
                    <option value="1d">Last 24 hours</option>
                    <option value="7d">Last 7 days</option>
                    <option value="30d">Last 30 days</option>
                    <option value="90d">Last 3 months</option>
                    <option value="1y">Last year</option>
                  </select>
                </div>
                
                <div className="flex items-center gap-2">
                  <Label htmlFor="status-filter" className="text-xs text-muted-foreground">Status:</Label>
                  <select
                    id="status-filter"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="text-sm border rounded px-2 py-1 bg-background"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48 h-8 text-sm"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                onClick={exportToPDF}
                disabled={isExporting === "pdf"}
                variant="outline"
                size="sm"
                className="transition-all duration-200 hover:scale-105"
              >
                {isExporting === "pdf" ? (
                  <>
                    <RefreshCw className="mr-2 h-3 w-3 animate-spin" />
                    Exporting...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-3 w-3" />
                    Export PDF
                  </>
                )}
              </Button>
              <Button
                onClick={exportToCSV}
                disabled={isExporting === "csv"}
                variant="outline"
                size="sm"
                className="transition-all duration-200 hover:scale-105"
              >
                {isExporting === "csv" ? (
                  <>
                    <RefreshCw className="mr-2 h-3 w-3 animate-spin" />
                    Exporting...
                  </>
                ) : (
                  <>
                    <Table className="mr-2 h-3 w-3" />
                    Export CSV
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Dashboard Content - Conditionally Visible */}
      {isDashboardVisible ? (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
          {/* Enhanced Metrics Cards with Real-time Animations */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="relative">
          {isRealTimeEnabled && (
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full animate-pulse z-10"></div>
          )}
          <StatCard
            title={data.metrics.revenue.title}
            value={data.metrics.revenue.value}
            change={data.metrics.revenue.change}
            changeType={data.metrics.revenue.changeType}
            icon={data.metrics.revenue.icon}
            description={data.metrics.revenue.description}
            formatType="currency"
            className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
          />
        </div>
        <div className="relative">
          {isRealTimeEnabled && (
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full animate-pulse z-10"></div>
          )}
          <StatCard
            title={data.metrics.users.title}
            value={data.metrics.users.value}
            change={data.metrics.users.change}
            changeType={data.metrics.users.changeType}
            icon={data.metrics.users.icon}
            description={data.metrics.users.description}
            formatType="number"
            className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
          />
        </div>
        <div className="relative">
          {isRealTimeEnabled && (
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full animate-pulse z-10"></div>
          )}
          <StatCard
            title={data.metrics.conversions.title}
            value={typeof data.metrics.conversions.value === 'number' 
              ? Number((data.metrics.conversions.value * 100).toFixed(2))
              : data.metrics.conversions.value}
            change={data.metrics.conversions.change}
            changeType={data.metrics.conversions.changeType}
            icon={data.metrics.conversions.icon}
            description={data.metrics.conversions.description}
            formatType="percentage"
            className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
          />
        </div>
        <div className="relative">
          {isRealTimeEnabled && (
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full animate-pulse z-10"></div>
          )}
          <StatCard
            title={data.metrics.growth.title}
            value={data.metrics.growth.value}
            change={data.metrics.growth.change}
            changeType={data.metrics.growth.changeType}
            icon={data.metrics.growth.icon}
            description={data.metrics.growth.description}
            formatType="percentage"
            className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
          />
        </div>
      </div>

      {/* Enhanced Charts with Real-time Indicators */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="relative">
          {isRealTimeEnabled && (
            <div className="absolute top-4 right-4 flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs z-10">
              <div className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse"></div>
              Live
            </div>
          )}
          <div className="transition-all duration-300 hover:shadow-lg">
            <AnalyticsLineChart
              title={data.charts.revenue.title}
              description={data.charts.revenue.description}
              data={data.charts.revenue.data}
              dataKey="value"
            />
          </div>
        </div>
        <div className="relative">
          {isRealTimeEnabled && (
            <div className="absolute top-4 right-4 flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs z-10">
              <div className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse"></div>
              Live
            </div>
          )}
          <div className="transition-all duration-300 hover:shadow-lg">
            <AnalyticsBarChart
              title={data.charts.users.title}
              description={data.charts.users.description}
              data={data.charts.users.data}
              dataKey="value"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1 relative">
          {isRealTimeEnabled && (
            <div className="absolute top-4 right-4 flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs z-10">
              <div className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse"></div>
              Live
            </div>
          )}
          <div className="transition-all duration-300 hover:shadow-lg">
            <AnalyticsPieChart
              title={data.charts.conversions.title}
              description={data.charts.conversions.description}
              data={data.charts.conversions.data}
              dataKey="value"
              variant="donut"
            />
          </div>
        </div>
        <div className="md:col-span-2 relative">
          {isRealTimeEnabled && (
            <div className="absolute top-4 right-4 flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs z-10">
              <div className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse"></div>
              Live
            </div>
          )}
          <div className="transition-all duration-300 hover:shadow-lg">
            <DataTable
              columns={userColumns}
              data={data.users.filter(user => {
                const matchesSearch = searchQuery === "" || 
                  user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  user.email.toLowerCase().includes(searchQuery.toLowerCase())
                const matchesStatus = statusFilter === "all" || user.status === statusFilter
                return matchesSearch && matchesStatus
              })}
              title="Recent Users"
              description={`Latest user registrations and activity${statusFilter !== "all" ? ` (${statusFilter})` : ""}`}
              searchKey="name"
              searchPlaceholder="Search users..."
            />
          </div>
        </div>
        </div>

        {/* Additional Analytics Row - Bottom Section */}
        <div className="grid gap-6 md:grid-cols-4">
          {/* Quick Stats Card */}
          <Card className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Conversion Rate</span>
                <span className="font-semibold text-green-600">+2.5%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Avg. Session</span>
                <span className="font-semibold">4m 32s</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Bounce Rate</span>
                <span className="font-semibold text-red-600">-1.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Page Views</span>
                <span className="font-semibold">12,847</span>
              </div>
            </CardContent>
          </Card>

          {/* Top Channels */}
          <Card className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Share2 className="h-4 w-4 text-blue-600" />
                Top Channels
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Organic Search</span>
                  </div>
                  <span className="text-sm font-medium">45.2%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Direct Traffic</span>
                  </div>
                  <span className="text-sm font-medium">23.8%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm">Social Media</span>
                  </div>
                  <span className="text-sm font-medium">18.4%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm">Email Campaign</span>
                  </div>
                  <span className="text-sm font-medium">12.6%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="h-4 w-4 text-indigo-600" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="font-medium">New user registered</p>
                    <p className="text-xs text-muted-foreground">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="font-medium">Campaign launched</p>
                    <p className="text-xs text-muted-foreground">15 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="font-medium">Report generated</p>
                    <p className="text-xs text-muted-foreground">1 hour ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="font-medium">Data sync completed</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-600" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">API Status</span>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-green-600">Online</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Database</span>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-green-600">Healthy</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">CDN</span>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-green-600">Fast</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Uptime</span>
                  <span className="text-sm font-medium">99.9%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Response Time</span>
                  <span className="text-sm font-medium">142ms</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        </div>
      ) : (
        <div className="text-center py-12 space-y-4">
          <EyeOff className="h-16 w-16 text-muted-foreground mx-auto" />
          <div>
            <h3 className="text-lg font-semibold">Dashboard Hidden</h3>
            <p className="text-muted-foreground">
              Click the eye icon in the header to show the dashboard content
            </p>
          </div>
          <Button
            onClick={handleToggleVisibility}
            variant="outline"
          >
            <Eye className="mr-2 h-4 w-4" />
            Show Dashboard
          </Button>
        </div>
      )}
    </div>
  )
}