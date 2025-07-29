"use client"

import { useState, useEffect } from "react"
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
  const [isCollapsed, setIsCollapsed] = useState(true) // Start collapsed by default
  const pathname = usePathname()

  return (
    <aside className={cn(
      "flex flex-col h-full bg-card border-r border-border transition-all duration-300",
      isCollapsed ? "w-12 lg:w-14" : "w-48 lg:w-56",
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-1 sm:p-2 border-b border-border">
        {!isCollapsed && (
          <h2 className="text-xs sm:text-sm font-semibold text-foreground truncate">
            ADmyBRAND
          </h2>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-auto h-6 w-6 sm:h-7 sm:w-7 shrink-0"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <Menu className="h-3 w-3 sm:h-4 sm:w-4" /> : <X className="h-3 w-3 sm:h-4 sm:w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-1 sm:p-2 space-y-1">
        {NAVIGATION_ITEMS.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap]
          const isActive = pathname === item.href

          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full transition-all duration-200 text-xs h-8 sm:h-9",
                  isCollapsed ? "px-0 justify-center" : "px-2 sm:px-3 justify-start",
                  isActive && "bg-secondary text-secondary-foreground"
                )}
                title={isCollapsed ? item.title : undefined}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {!isCollapsed && (
                  <span className="ml-2 truncate text-xs sm:text-sm">{item.title}</span>
                )}
              </Button>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-1 sm:p-2 border-t border-border">
        {!isCollapsed && (
          <div className="text-xs text-muted-foreground text-center">
            <span>ADmyBRAND</span>
          </div>
        )}
      </div>
    </aside>
  )
}
