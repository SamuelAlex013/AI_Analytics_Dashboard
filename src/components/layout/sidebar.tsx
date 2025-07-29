"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { NAVIGATION_ITEMS } from "@/constants"
import { 
  LayoutDashboard, 
  Users, 
  TrendingUp, 
  Settings, 
  Menu,
  X 
} from "lucide-react"

const iconMap = {
  LayoutDashboard,
  Users,
  TrendingUp,
  Settings,
}

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <aside className={cn(
      "flex flex-col h-full bg-card border-r border-border transition-all duration-300",
      isCollapsed ? "w-12 sm:w-16" : "w-48 sm:w-64",
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-2 sm:p-4 border-b border-border">
        {!isCollapsed && (
          <h2 className="text-sm sm:text-lg font-semibold text-foreground truncate">
            <span className="hidden sm:inline">ADmyBRAND Insights</span>
            <span className="sm:hidden">ADmyBRAND</span>
          </h2>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-auto h-6 w-6 sm:h-8 sm:w-8"
        >
          {isCollapsed ? <Menu className="h-3 w-3 sm:h-4 sm:w-4" /> : <X className="h-3 w-3 sm:h-4 sm:w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 sm:p-4 space-y-1 sm:space-y-2">
        {NAVIGATION_ITEMS.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap]
          const isActive = pathname === item.href

          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start transition-all duration-200 text-xs sm:text-sm h-8 sm:h-10",
                  isCollapsed ? "px-1 sm:px-2" : "px-2 sm:px-4",
                  isActive && "bg-secondary text-secondary-foreground"
                )}
              >
                {/* Only hide navigation icons on mobile, not all icons */}
                <Icon className="h-3 w-3 sm:h-4 sm:w-4 shrink-0 hidden sm:inline-flex" />
                {!isCollapsed && (
                  <span className={cn("ml-0 sm:ml-3 truncate")}>{item.title}</span>
                )}
              </Button>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-2 sm:p-4 border-t border-border">
        {!isCollapsed && (
          <div className="text-xs text-muted-foreground">
            <span className="hidden sm:inline">Built for you</span>
            <span className="sm:hidden">Built</span>
          </div>
        )}
      </div>
    </aside>
  )
}
