import React, { useState } from 'react'
import { cn } from '../../../utils/cn'
import { Navbar, type NavbarProps } from '../Navbar/Navbar'
import { Sidebar, type SidebarProps } from '../Sidebar/Sidebar'

export interface AppShellProps {
  navbar?: NavbarProps
  sidebar?: SidebarProps
  children: React.ReactNode
  defaultSidebarCollapsed?: boolean
  className?: string
  contentClassName?: string
}

export function AppShell({
  navbar,
  sidebar,
  children,
  defaultSidebarCollapsed = false,
  className,
  contentClassName,
}: AppShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(defaultSidebarCollapsed)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  return (
    <div className={cn('flex flex-col h-screen bg-background', className)}>
      {/* Navbar */}
      {navbar && (
        <Navbar
          {...navbar}
          sticky
          onMenuToggle={(open) => setMobileSidebarOpen(open)}
        />
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar — desktop */}
        {sidebar && (
          <>
            <div className="hidden md:flex flex-shrink-0">
              <Sidebar
                {...sidebar}
                collapsed={sidebarCollapsed}
                onCollapsedChange={setSidebarCollapsed}
              />
            </div>
            {/* Sidebar — mobile overlay */}
            <div className="md:hidden">
              <Sidebar
                {...sidebar}
                overlay
                open={mobileSidebarOpen}
                onClose={() => setMobileSidebarOpen(false)}
              />
            </div>
          </>
        )}

        {/* Main content */}
        <main
          className={cn(
            'flex-1 overflow-auto bg-background',
            contentClassName
          )}
        >
          {children}
        </main>
      </div>
    </div>
  )
}
