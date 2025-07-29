"use client"

import { useAnalytics } from "@/hooks/use-analytics"
import { DataTable } from "@/components/tables/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { SalesData } from "@/types/analytics"
import { formatCurrency, formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, RefreshCw } from "lucide-react"

const salesColumns: ColumnDef<SalesData>[] = [
  {
    accessorKey: "id",
    header: "Order ID",
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = row.getValue("date") as Date | string
      return formatDate(date)
    },
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "product",
    header: "Product",
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      return formatCurrency(amount)
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      const variant = status === "completed" ? "default" : status === "pending" ? "secondary" : "destructive"
      return <Badge variant={variant}>{status}</Badge>
    },
  },
  {
    accessorKey: "channel",
    header: "Channel",
    cell: ({ row }) => {
      const channel = row.getValue("channel") as string
      return <Badge variant="outline">{channel}</Badge>
    },
  },
]

export default function SalesPage() {
  const { data, loading, error, refetch } = useAnalytics()

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
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

  const totalSales = data.sales.reduce((sum, sale) => sum + sale.amount, 0)
  const completedSales = data.sales.filter(sale => sale.status === 'completed').length
  const pendingSales = data.sales.filter(sale => sale.status === 'pending').length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sales</h1>
          <p className="text-muted-foreground">
            Track and analyze your sales performance and revenue
          </p>
        </div>
        <Button onClick={refetch} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh Data
        </Button>
      </div>

      {/* Sales Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-card rounded-lg border p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Total Revenue</h3>
          <p className="text-2xl font-bold">{formatCurrency(totalSales)}</p>
        </div>
        <div className="bg-card rounded-lg border p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Completed Orders</h3>
          <p className="text-2xl font-bold">{completedSales}</p>
        </div>
        <div className="bg-card rounded-lg border p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Pending Orders</h3>
          <p className="text-2xl font-bold">{pendingSales}</p>
        </div>
      </div>

      <DataTable
        columns={salesColumns}
        data={data.sales}
        title="Sales Transactions"
        description="Complete history of sales and orders"
        searchKey="customer"
        searchPlaceholder="Search customers..."
      />
    </div>
  )
}
