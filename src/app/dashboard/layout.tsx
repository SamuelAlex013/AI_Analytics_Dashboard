import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        {/* Sidebar - Reduced width on mobile */}
        <Sidebar className="w-48 sm:w-64" />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          
          {/* Page Content */}
          <main className="flex-1 overflow-x-auto overflow-y-auto p-3 sm:p-6">
            <div className="min-w-0">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
