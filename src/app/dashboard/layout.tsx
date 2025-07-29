import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        {/* Sidebar - Hidden on mobile, minimal on desktop */}
        <Sidebar className="hidden md:block" />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          
          {/* Page Content - Full width on mobile, adjusted for minimal sidebar on desktop */}
          <main className="flex-1 overflow-x-auto overflow-y-auto p-2 sm:p-4 lg:p-6">
            <div className="min-w-0 max-w-full">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
