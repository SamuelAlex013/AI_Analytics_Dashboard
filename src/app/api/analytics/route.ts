import { NextRequest, NextResponse } from 'next/server'
import { generateAnalyticsData } from '@/lib/mock-data'

export async function GET(request: NextRequest) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    
    // Get filters from query parameters
    const { searchParams } = new URL(request.url)
    const dateRange = searchParams.get('dateRange') || '7d'
    const statusFilter = searchParams.get('statusFilter') || 'all'
    const searchQuery = searchParams.get('searchQuery') || ''
    
    const data = generateAnalyticsData({
      dateRange,
      statusFilter,
      searchQuery
    })
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Analytics API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    )
  }
}
