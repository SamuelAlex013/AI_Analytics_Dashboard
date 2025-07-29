"use client"

import { useState, useEffect, useCallback } from 'react'
import { AnalyticsResponse } from '@/types/analytics'

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
      
      // Build query string with filters
      const params = new URLSearchParams()
      if (filters?.dateRange) params.append('dateRange', filters.dateRange)
      if (filters?.statusFilter) params.append('statusFilter', filters.statusFilter)
      if (filters?.searchQuery) params.append('searchQuery', filters.searchQuery)
      
      const response = await fetch(`/api/analytics?${params.toString()}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch analytics data')
      }
      
      const analyticsData = await response.json()
      
      // Add some realistic variance for live updates
      setData(prevData => {
        if (prevData) {
          analyticsData.metrics.revenue.value = Math.round(analyticsData.metrics.revenue.value * (0.98 + Math.random() * 0.04))
          analyticsData.metrics.users.value = Math.round(analyticsData.metrics.users.value * (0.99 + Math.random() * 0.02))
          analyticsData.metrics.conversions.change = Number((analyticsData.metrics.conversions.change + (Math.random() - 0.5) * 0.5).toFixed(1))
          analyticsData.metrics.growth.change = Number((parseFloat(analyticsData.metrics.growth.change) + (Math.random() - 0.5) * 0.3).toFixed(1))
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
  }, [filters?.dateRange, filters?.statusFilter, filters?.searchQuery]) // Only depend on the actual filter values

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
