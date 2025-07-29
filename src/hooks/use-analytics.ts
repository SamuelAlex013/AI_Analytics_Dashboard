"use client"

import { useState, useEffect, useCallback } from 'react'
import { AnalyticsResponse } from '@/types/analytics'
import { generateAnalyticsData } from '@/lib/mock-data'

interface AnalyticsFilters {
  dateRange?: string
  statusFilter?: string
  searchQuery?: string
}

export function useAnalytics(filters?: AnalyticsFilters) {
  const [data, setData] = useState<AnalyticsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Simulate API delay for realistic feel
      await new Promise(resolve => setTimeout(resolve, 300))
      
      // Generate mock data directly (for static export)
      const analyticsData = generateAnalyticsData({
        dateRange: filters?.dateRange || '7d',
        statusFilter: filters?.statusFilter || 'all',
        searchQuery: filters?.searchQuery || ''
      })
      
      // Add some realistic variance for live updates
      setData(prevData => {
        if (prevData) {
          const newData = { ...analyticsData }
          newData.metrics.revenue.value = Math.round(Number(analyticsData.metrics.revenue.value) * (0.98 + Math.random() * 0.04))
          newData.metrics.users.value = Math.round(Number(analyticsData.metrics.users.value) * (0.99 + Math.random() * 0.02))
          newData.metrics.conversions.change = Number((analyticsData.metrics.conversions.change + (Math.random() - 0.5) * 0.5).toFixed(1))
          newData.metrics.growth.change = Number((Number(analyticsData.metrics.growth.change) + (Math.random() - 0.5) * 0.3).toFixed(1))
          return newData
        }
        return analyticsData
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [filters])

  useEffect(() => {
    fetchAnalytics()
  }, [fetchAnalytics]) // fetchAnalytics is memoized with useCallback, so this is safe

  const refetch = async () => {
    await fetchAnalytics()
  }

  return { data, loading, error, refetch }
}

export function useRealTimeUpdates(intervalMs: number = 30000) {
  const [lastUpdate, setLastUpdate] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date())
    }, intervalMs)

    return () => clearInterval(interval)
  }, [intervalMs])

  return lastUpdate
}
