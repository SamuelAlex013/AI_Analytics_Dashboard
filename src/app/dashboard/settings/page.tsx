"use client"

import { useState } from "react"
import { useAnalytics } from "@/hooks/use-analytics"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { 
  Bell, 
  Download, 
  Mail, 
  Shield, 
  User, 
  Loader2, 
  Copy, 
  Check, 
  CheckCircle, 
  AlertCircle,
  FileText,
  Table,
  FileJson,
  Calendar,
  Users,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Settings,
  RefreshCw,
  Eye,
  EyeOff,
  Edit,
  Save
} from "lucide-react"

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isRegenerating, setIsRegenerating] = useState(false)
  const [isExporting, setIsExporting] = useState("")
  const [apiKeyCopied, setApiKeyCopied] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [weeklyReports, setWeeklyReports] = useState(true)
  const [realTimeAlerts, setRealTimeAlerts] = useState(false)
  const [dataRetention, setDataRetention] = useState(true)
  const [anonymousAnalytics, setAnonymousAnalytics] = useState(false)
  const [exportDateRange, setExportDateRange] = useState("30d")
  const [exportStatus, setExportStatus] = useState("all")

  // Section expansion states
  const [profileExpanded, setProfileExpanded] = useState(true)
  const [notificationsExpanded, setNotificationsExpanded] = useState(true)
  const [dataPrivacyExpanded, setDataPrivacyExpanded] = useState(true)
  const [apiExpanded, setApiExpanded] = useState(true)
  const [isEditingProfile, setIsEditingProfile] = useState(false)

  // Data hook
  const { data } = useAnalytics({
    dateRange: exportDateRange
  })

  const handleSave = async () => {
    setIsSaving(true)
    setSaveSuccess(false)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Save to localStorage for persistence
      const settingsData = {
        emailNotifications,
        weeklyReports,
        realTimeAlerts,
        dataRetention,
        anonymousAnalytics,
        savedAt: new Date().toISOString()
      }
      
      localStorage.setItem('analyticsSettings', JSON.stringify(settingsData))
      setSaveSuccess(true)
      
      // Hide success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000)
      
    } catch (error) {
      console.error('Failed to save settings:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleRegenerate = async () => {
    setIsRegenerating(true)
    // Simulate API key regeneration
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsRegenerating(false)
  }

  const handleExport = async (type: string) => {
    if (!data) {
      alert('No data available for export')
      return
    }

    setIsExporting(type)
    
    try {
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      if (type === 'csv') {
        // Generate CSV
        const csvHeaders = "Date,Revenue,Users,Conversions\n"
        const revenueData = data.charts.revenue.data
        const csvData = revenueData.map((item: any) => 
          `${item.name},${item.value},${data.charts.users.data.find((u: any) => u.name === item.name)?.value || 0},${data.charts.conversions.data.find((c: any) => c.name === item.name)?.value || 0}`
        ).join('\n')
        
        const csvContent = csvHeaders + csvData
        const blob = new Blob([csvContent], { type: 'text/csv' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `analytics-data-${exportDateRange}-${exportStatus}.csv`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
        
      } else if (type === 'json') {
        // Generate JSON
        const jsonData = {
          metadata: {
            exportDate: new Date().toISOString(),
            dateRange: exportDateRange,
            statusFilter: exportStatus,
            totalRecords: data.charts.revenue.data.length
          },
          analytics: data,
          summary: {
            totalRevenue: data.metrics.revenue.value,
            totalUsers: data.metrics.users.value,
            avgConversions: data.metrics.conversions.value,
            growth: data.metrics.growth.value
          }
        }
        
        const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `analytics-data-${exportDateRange}-${exportStatus}.json`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
        
      } else if (type === 'pdf') {
        const { jsPDF } = await import('jspdf')
        const doc = new jsPDF()
        
        // Title
        doc.setFontSize(20)
        doc.text('Analytics Report', 20, 30)
        
        // Metadata
        doc.setFontSize(12)
        doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 50)
        doc.text(`Date Range: ${exportDateRange}`, 20, 60)
        doc.text(`Status Filter: ${exportStatus}`, 20, 70)
        
        // Summary
        doc.setFontSize(16)
        doc.text('Summary', 20, 90)
        doc.setFontSize(12)
        
        const totalRevenue = data.metrics.revenue.value
        const totalUsers = data.metrics.users.value
        const totalConversions = data.metrics.conversions.value
        const growthRate = data.metrics.growth.value
        
        doc.text(`Total Revenue: ${typeof totalRevenue === 'number' ? `$${totalRevenue.toLocaleString()}` : totalRevenue}`, 20, 110)
        doc.text(`Total Users: ${typeof totalUsers === 'number' ? totalUsers.toLocaleString() : totalUsers}`, 20, 120)
        doc.text(`Total Conversions: ${typeof totalConversions === 'number' ? totalConversions.toLocaleString() : totalConversions}`, 20, 130)
        doc.text(`Growth Rate: ${growthRate}%`, 20, 140)
        
        // Data table header
        doc.setFontSize(16)
        doc.text('Chart Data', 20, 160)
        doc.setFontSize(10)
        
        let yPos = 180
        doc.text('Period', 20, yPos)
        doc.text('Revenue', 80, yPos)
        doc.text('Users', 140, yPos)
        doc.text('Conversions', 180, yPos)
        
        // Data rows
        data.charts.revenue.data.slice(0, 20).forEach((item: any, index: number) => {
          yPos += 10
          if (yPos > 270) {
            doc.addPage()
            yPos = 30
          }
          
          const userData = data.charts.users.data[index]
          const conversionData = data.charts.conversions.data[index]
          
          doc.text(item.name || `Period ${index + 1}`, 20, yPos)
          doc.text(item.value.toString(), 80, yPos)
          doc.text(userData?.value?.toString() || '0', 140, yPos)
          doc.text(conversionData?.value?.toString() || '0', 180, yPos)
        })
        
        doc.save(`analytics-report-${exportDateRange}-${exportStatus}.pdf`)
        
      } else if (type === 'metrics') {
        // Export only key metrics
        const metricsData = {
          summary: {
            totalRevenue: data.metrics.revenue.value,
            totalUsers: data.metrics.users.value,
            totalConversions: data.metrics.conversions.value,
            growthRate: data.metrics.growth.value,
            exportDate: new Date().toISOString(),
            dateRange: exportDateRange,
            statusFilter: exportStatus
          }
        }
        
        const blob = new Blob([JSON.stringify(metricsData, null, 2)], { type: 'application/json' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `analytics-metrics-${exportDateRange}-${exportStatus}.json`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
        
      } else if (type === 'users') {
        // Export user data (simulated)
        const userData = {
          users: Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            email: `user${i + 1}@example.com`,
            name: `User ${i + 1}`,
            status: ['active', 'pending', 'inactive'][Math.floor(Math.random() * 3)],
            lastLogin: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
            totalSessions: Math.floor(Math.random() * 100) + 1
          })).filter(user => exportStatus === 'all' || user.status === exportStatus),
          metadata: {
            exportDate: new Date().toISOString(),
            statusFilter: exportStatus,
            totalUsers: 50
          }
        }
        
        const blob = new Blob([JSON.stringify(userData, null, 2)], { type: 'application/json' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `user-data-${exportStatus}.json`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
      }
      
    } catch (error) {
      console.error('Export failed:', error)
      alert('Export failed. Please try again.')
    } finally {
      setIsExporting("")
    }
  }

  const copyApiKey = () => {
    navigator.clipboard.writeText("ak_live_1234567890abcdef")
    setApiKeyCopied(true)
    setTimeout(() => setApiKeyCopied(false), 2000)
  }

  // Refresh settings from localStorage
  const refreshSettings = () => {
    setIsLoading(true)
    setTimeout(() => {
      const saved = localStorage.getItem('analyticsSettings')
      if (saved) {
        const settings = JSON.parse(saved)
        setEmailNotifications(settings.emailNotifications ?? true)
        setWeeklyReports(settings.weeklyReports ?? true)
        setRealTimeAlerts(settings.realTimeAlerts ?? false)
        setDataRetention(settings.dataRetention ?? true)
        setAnonymousAnalytics(settings.anonymousAnalytics ?? false)
      }
      setIsLoading(false)
    }, 1000)
  }

  // Toggle all sections
  const toggleAllSections = () => {
    const allExpanded = profileExpanded && notificationsExpanded && dataPrivacyExpanded && apiExpanded
    setProfileExpanded(!allExpanded)
    setNotificationsExpanded(!allExpanded)
    setDataPrivacyExpanded(!allExpanded)
    setApiExpanded(!allExpanded)
  }

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-2">
            Manage your account settings and preferences
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Settings className="h-4 w-4" />
            <span>Last synced: {new Date().toLocaleTimeString()}</span>
          </div>
          <Button
            onClick={refreshSettings}
            disabled={isLoading}
            variant="outline"
            size="sm"
            className="transition-all duration-200 hover:scale-105"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            Refresh
          </Button>
          <Button
            onClick={toggleAllSections}
            variant="outline"
            size="sm"
            className="transition-all duration-200 hover:scale-105"
          >
            {profileExpanded && notificationsExpanded && dataPrivacyExpanded && apiExpanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-2" />
                Collapse All
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-2" />
                Expand All
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Profile Settings */}
        <Card className="animate-in slide-in-from-left-4 duration-700 delay-150 hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
          <CardHeader 
            className="hover:bg-muted/50 transition-colors duration-200 rounded-t-lg cursor-pointer"
            onClick={() => setProfileExpanded(!profileExpanded)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary transition-transform duration-200 hover:scale-110" />
                <div>
                  <CardTitle className="flex items-center gap-2">
                    Profile Settings
                    {saveSuccess && (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    )}
                  </CardTitle>
                  <CardDescription>
                    Update your personal information and preferences
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsEditingProfile(!isEditingProfile)
                  }}
                  className="transition-all duration-200 hover:scale-105"
                >
                  {isEditingProfile ? (
                    <Save className="h-4 w-4" />
                  ) : (
                    <Edit className="h-4 w-4" />
                  )}
                </Button>
                <ChevronDown 
                  className={`h-4 w-4 transition-transform duration-200 ${profileExpanded ? 'rotate-180' : ''}`} 
                />
              </div>
            </div>
          </CardHeader>
          {profileExpanded && (
            <CardContent className="space-y-4 animate-in slide-in-from-top-2 duration-300">
              <div className="grid gap-2 group">
                <Label htmlFor="name" className="transition-colors duration-200 group-hover:text-primary">Full Name</Label>
                <Input 
                  id="name" 
                  placeholder="Your full name" 
                  defaultValue="John Doe" 
                  disabled={!isEditingProfile}
                  className="transition-all duration-200 focus:scale-[1.02] hover:border-primary/50"
                />
              </div>
              <div className="grid gap-2 group">
                <Label htmlFor="email" className="transition-colors duration-200 group-hover:text-primary">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="your.email@company.com" 
                  defaultValue="john@admybrand.com" 
                  disabled={!isEditingProfile}
                  className="transition-all duration-200 focus:scale-[1.02] hover:border-primary/50"
                />
              </div>
              <div className="grid gap-2 group">
                <Label htmlFor="company" className="transition-colors duration-200 group-hover:text-primary">Company</Label>
                <Input 
                  id="company" 
                  placeholder="Company name" 
                  defaultValue="ADmyBRAND" 
                  disabled={!isEditingProfile}
                  className="transition-all duration-200 focus:scale-[1.02] hover:border-primary/50"
                />
              </div>
              <Button 
                onClick={handleSave}
                disabled={isSaving || !isEditingProfile}
                className={`transition-all duration-200 hover:scale-105 hover:shadow-md ${
                  saveSuccess ? 'bg-green-600 hover:bg-green-700' : ''
                }`}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : saveSuccess ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Saved Successfully!
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
              {saveSuccess && (
                <div className="flex items-center gap-2 text-sm text-green-600 mt-2 animate-in slide-in-from-left-2 duration-300">
                  <CheckCircle className="h-4 w-4" />
                  <span>Your settings have been saved successfully</span>
                </div>
              )}
            </CardContent>
          )}
        </Card>

        {/* Notification Settings */}
        <Card className="animate-in slide-in-from-right-4 duration-700 delay-300 hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
          <CardHeader 
            className="hover:bg-muted/50 transition-colors duration-200 rounded-t-lg cursor-pointer"
            onClick={() => setNotificationsExpanded(!notificationsExpanded)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary transition-transform duration-200 hover:scale-110" />
                <div>
                  <CardTitle className="flex items-center gap-2">
                    Notifications
                    <span className="inline-flex items-center rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                      {(emailNotifications ? 1 : 0) + (weeklyReports ? 1 : 0) + (realTimeAlerts ? 1 : 0)} Active
                    </span>
                  </CardTitle>
                  <CardDescription>
                    Configure how you receive updates and alerts
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    // Toggle all notifications
                    const allOn = emailNotifications && weeklyReports && realTimeAlerts
                    setEmailNotifications(!allOn)
                    setWeeklyReports(!allOn)
                    setRealTimeAlerts(!allOn)
                  }}
                  className="transition-all duration-200 hover:scale-105"
                  title="Toggle all notifications"
                >
                  {emailNotifications && weeklyReports && realTimeAlerts ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
                <ChevronDown 
                  className={`h-4 w-4 transition-transform duration-200 ${notificationsExpanded ? 'rotate-180' : ''}`} 
                />
              </div>
            </div>
          </CardHeader>
          {notificationsExpanded && (
            <CardContent className="space-y-6 animate-in slide-in-from-top-2 duration-300">
              <div className="flex items-center justify-between group hover:bg-muted/30 p-2 rounded-lg transition-colors duration-200">
                <div className="space-y-0.5">
                  <Label className="text-base font-medium transition-colors duration-200 group-hover:text-primary">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive email updates about your analytics
                  </p>
                </div>
                <Switch 
                  checked={emailNotifications} 
                  onCheckedChange={setEmailNotifications}
                  className="transition-all duration-200 hover:scale-110"
                />
              </div>
              <Separator className="transition-all duration-300 hover:bg-primary/20" />
              <div className="flex items-center justify-between group hover:bg-muted/30 p-2 rounded-lg transition-colors duration-200">
                <div className="space-y-0.5">
                  <Label className="text-base font-medium transition-colors duration-200 group-hover:text-primary">Weekly Reports</Label>
                  <p className="text-sm text-muted-foreground">
                    Get weekly performance summaries
                  </p>
                </div>
                <Switch 
                  checked={weeklyReports} 
                  onCheckedChange={setWeeklyReports}
                  className="transition-all duration-200 hover:scale-110"
                />
              </div>
              <Separator className="transition-all duration-300 hover:bg-primary/20" />
              <div className="flex items-center justify-between group hover:bg-muted/30 p-2 rounded-lg transition-colors duration-200">
                <div className="space-y-0.5">
                  <Label className="text-base font-medium transition-colors duration-200 group-hover:text-primary">Real-time Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive alerts for significant changes
                  </p>
                </div>
                <Switch 
                  checked={realTimeAlerts} 
                  onCheckedChange={setRealTimeAlerts}
                  className="transition-all duration-200 hover:scale-110"
                />
              </div>
            </CardContent>
          )}
        </Card>

        {/* Data & Privacy */}
        <Card className="animate-in slide-in-from-left-4 duration-700 delay-450 hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
          <CardHeader 
            className="hover:bg-muted/50 transition-colors duration-200 rounded-t-lg cursor-pointer"
            onClick={() => setDataPrivacyExpanded(!dataPrivacyExpanded)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary transition-transform duration-200 hover:scale-110" />
                <div>
                  <CardTitle className="flex items-center gap-2">
                    Data & Privacy
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                      Secure
                    </span>
                  </CardTitle>
                  <CardDescription>
                    Manage your data retention and privacy settings
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    // Quick privacy toggle
                    setAnonymousAnalytics(!anonymousAnalytics)
                  }}
                  className="transition-all duration-200 hover:scale-105"
                  title="Toggle anonymous analytics"
                >
                  <Shield className="h-4 w-4" />
                </Button>
                <ChevronDown 
                  className={`h-4 w-4 transition-transform duration-200 ${dataPrivacyExpanded ? 'rotate-180' : ''}`} 
                />
              </div>
            </div>
          </CardHeader>
          {dataPrivacyExpanded && (
            <CardContent className="space-y-6 animate-in slide-in-from-top-2 duration-300">
              <div className="flex items-center justify-between group hover:bg-muted/30 p-2 rounded-lg transition-colors duration-200">
                <div className="space-y-0.5">
                  <Label className="text-base font-medium transition-colors duration-200 group-hover:text-primary">Data Retention</Label>
                  <p className="text-sm text-muted-foreground">
                    Keep analytics data for 12 months
                  </p>
                </div>
                <Switch 
                  checked={dataRetention} 
                  onCheckedChange={setDataRetention}
                  className="transition-all duration-200 hover:scale-110"
                />
              </div>
              <Separator className="transition-all duration-300 hover:bg-primary/20" />
              <div className="flex items-center justify-between group hover:bg-muted/30 p-2 rounded-lg transition-colors duration-200">
                <div className="space-y-0.5">
                  <Label className="text-base font-medium transition-colors duration-200 group-hover:text-primary">Anonymous Analytics</Label>
                  <p className="text-sm text-muted-foreground">
                    Share anonymized usage data to improve the platform
                  </p>
                </div>
                <Switch 
                  checked={anonymousAnalytics} 
                  onCheckedChange={setAnonymousAnalytics}
                  className="transition-all duration-200 hover:scale-110"
                />
              </div>
              <Separator className="transition-all duration-300 hover:bg-primary/20" />
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium">Export Analytics Data</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Download your analytics data in various formats. Configure the export parameters below.
                  </p>
                </div>
                
                {/* Export Configuration */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg bg-muted/30">
                  <div className="space-y-2">
                    <Label htmlFor="export-date-range" className="text-sm font-medium">Date Range</Label>
                    <select
                      id="export-date-range"
                      value={exportDateRange}
                      onChange={(e) => setExportDateRange(e.target.value)}
                      className="w-full text-sm border rounded px-3 py-2 bg-background hover:border-primary/50 transition-colors duration-200"
                    >
                      <option value="1d">Last 24 hours</option>
                      <option value="7d">Last 7 days</option>
                      <option value="30d">Last 30 days</option>
                      <option value="90d">Last 3 months</option>
                      <option value="1y">Last year</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="export-status" className="text-sm font-medium">User Status Filter</Label>
                    <select
                      id="export-status"
                      value={exportStatus}
                      onChange={(e) => setExportStatus(e.target.value)}
                      className="w-full text-sm border rounded px-3 py-2 bg-background hover:border-primary/50 transition-colors duration-200"
                    >
                      <option value="all">All Users</option>
                      <option value="active">Active Only</option>
                      <option value="pending">Pending Only</option>
                      <option value="inactive">Inactive Only</option>
                    </select>
                  </div>
                </div>
                
                {/* Export Options */}
                <div className="space-y-4">
                  <Label className="text-base font-medium">Complete Data Exports</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <Button 
                      variant="outline"
                      onClick={() => handleExport('csv')}
                      disabled={isExporting === 'csv'}
                      className="transition-all duration-200 hover:scale-105 hover:shadow-md flex items-center justify-start p-4 h-auto"
                    >
                      <div className="flex flex-col items-start">
                        <div className="flex items-center">
                          {isExporting === 'csv' ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Table className="mr-2 h-4 w-4 transition-transform duration-200 hover:scale-110" />
                          )}
                          <span className="font-medium">CSV Export</span>
                        </div>
                        <span className="text-sm text-muted-foreground mt-1">Spreadsheet format</span>
                      </div>
                    </Button>
                    
                    <Button 
                      variant="outline"
                      onClick={() => handleExport('json')}
                      disabled={isExporting === 'json'}
                      className="transition-all duration-200 hover:scale-105 hover:shadow-md flex items-center justify-start p-4 h-auto"
                    >
                      <div className="flex flex-col items-start">
                        <div className="flex items-center">
                          {isExporting === 'json' ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <FileJson className="mr-2 h-4 w-4 transition-transform duration-200 hover:scale-110" />
                          )}
                          <span className="font-medium">JSON Export</span>
                        </div>
                        <span className="text-sm text-muted-foreground mt-1">Structured data</span>
                      </div>
                    </Button>
                    
                    <Button 
                      variant="outline"
                      onClick={() => handleExport('pdf')}
                      disabled={isExporting === 'pdf'}
                      className="transition-all duration-200 hover:scale-105 hover:shadow-md flex items-center justify-start p-4 h-auto"
                    >
                      <div className="flex flex-col items-start">
                        <div className="flex items-center">
                          {isExporting === 'pdf' ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <FileText className="mr-2 h-4 w-4 transition-transform duration-200 hover:scale-110" />
                          )}
                          <span className="font-medium">PDF Report</span>
                        </div>
                        <span className="text-sm text-muted-foreground mt-1">Complete report</span>
                      </div>
                    </Button>
                  </div>
                </div>
                
                {/* Specialized Export Options */}
                <div className="space-y-4">
                  <Label className="text-base font-medium">Specialized Exports</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Button 
                      variant="outline"
                      onClick={() => handleExport('metrics')}
                      disabled={isExporting === 'metrics'}
                      className="transition-all duration-200 hover:scale-105 hover:shadow-md flex items-center justify-start p-4 h-auto"
                    >
                      <div className="flex flex-col items-start">
                        <div className="flex items-center">
                          {isExporting === 'metrics' ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <TrendingUp className="mr-2 h-4 w-4 transition-transform duration-200 hover:scale-110" />
                          )}
                          <span className="font-medium">Metrics Only</span>
                        </div>
                        <span className="text-sm text-muted-foreground mt-1">Key performance indicators</span>
                      </div>
                    </Button>
                    
                    <Button 
                      variant="outline"
                      onClick={() => handleExport('users')}
                      disabled={isExporting === 'users'}
                      className="transition-all duration-200 hover:scale-105 hover:shadow-md flex items-center justify-start p-4 h-auto"
                    >
                      <div className="flex flex-col items-start">
                        <div className="flex items-center">
                          {isExporting === 'users' ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Users className="mr-2 h-4 w-4 transition-transform duration-200 hover:scale-110" />
                          )}
                          <span className="font-medium">Users Only</span>
                        </div>
                        <span className="text-sm text-muted-foreground mt-1">User data and sessions</span>
                      </div>
                    </Button>
                  </div>
                </div>
                
                {/* Export Status */}
                {isExporting && (
                  <div className="flex items-center gap-2 text-sm text-blue-600 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg animate-in slide-in-from-left-2 duration-300">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <div>
                      <span className="font-medium">Preparing {isExporting.toUpperCase()} export...</span>
                      <p className="text-xs text-blue-600 mt-1">
                        Data range: {exportDateRange} • Status filter: {exportStatus}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          )}
        </Card>

        {/* API Settings */}
        <Card className="animate-in slide-in-from-right-4 duration-700 delay-600 hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
          <CardHeader 
            className="hover:bg-muted/50 transition-colors duration-200 rounded-t-lg cursor-pointer"
            onClick={() => setApiExpanded(!apiExpanded)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary transition-transform duration-200 hover:scale-110" />
                <div>
                  <CardTitle className="flex items-center gap-2">
                    API & Integrations
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      2 Connected
                    </span>
                  </CardTitle>
                  <CardDescription>
                    Connect external services and manage API access
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    // Quick API status check
                    alert('API Status: All integrations are running normally')
                  }}
                  className="transition-all duration-200 hover:scale-105"
                  title="Check API status"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <ChevronDown 
                  className={`h-4 w-4 transition-transform duration-200 ${apiExpanded ? 'rotate-180' : ''}`} 
                />
              </div>
            </div>
          </CardHeader>
          {apiExpanded && (
            <CardContent className="space-y-6 animate-in slide-in-from-top-2 duration-300">
              <div className="p-4 border rounded-lg bg-muted/30 group hover:bg-muted/50 transition-colors duration-200">
                <Label className="text-base font-medium transition-colors duration-200 group-hover:text-primary">API Key</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Use this key to authenticate API requests
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <code className="flex-1 p-2 bg-background rounded text-sm font-mono border transition-all duration-200 hover:border-primary/50">
                    ak_live_1234567890abcdef
                  </code>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={copyApiKey}
                    className="transition-all duration-200 hover:scale-105 hover:shadow-md"
                  >
                    {apiKeyCopied ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  className="mt-3 transition-all duration-200 hover:scale-105 hover:shadow-md"
                  onClick={handleRegenerate}
                  disabled={isRegenerating}
                >
                  {isRegenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Regenerating...
                    </>
                  ) : (
                    "Regenerate Key"
                  )}
                </Button>
              </div>
              
              <Separator className="transition-all duration-300 hover:bg-primary/20" />
              
              <div className="space-y-4">
                <Label className="text-base font-medium">Connected Services</Label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/30 group hover:bg-muted/50 transition-colors duration-200">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <Mail className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium transition-colors duration-200 group-hover:text-primary">Slack Integration</p>
                        <p className="text-sm text-muted-foreground">Connected to #analytics channel</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="transition-all duration-200 hover:scale-105 hover:shadow-md"
                    >
                      Configure
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/30 group hover:bg-muted/50 transition-colors duration-200">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                        <Download className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium transition-colors duration-200 group-hover:text-primary">Webhook Endpoint</p>
                        <p className="text-sm text-muted-foreground">Real-time data updates</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="transition-all duration-200 hover:scale-105 hover:shadow-md"
                    >
                      Test
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/30 group hover:bg-muted/50 transition-colors duration-200">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                        <AlertCircle className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-muted-foreground">Zapier Integration</p>
                        <p className="text-sm text-muted-foreground">Not connected</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="transition-all duration-200 hover:scale-105 hover:shadow-md"
                    >
                      Connect
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}
