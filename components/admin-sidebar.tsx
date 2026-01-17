"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, Users, LayoutDashboard, Settings, LogOut, Plus, ClipboardList, BarChart3 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const sidebarItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/activities", label: "Activities", icon: Calendar },
  { href: "/admin/registrations", label: "Registrations", icon: ClipboardList },
  { href: "/admin/participants", label: "Participants", icon: Users },
  { href: "/admin/reports", label: "Reports", icon: BarChart3 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-sidebar">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
              <span className="text-lg font-bold text-sidebar-primary-foreground">C</span>
            </div>
            <span className="text-lg font-semibold text-sidebar-foreground">Admin</span>
          </Link>
        </div>

        {/* Quick Action */}
        <div className="p-4">
          <Link href="/admin/activities/new">
            <Button className="w-full gap-2">
              <Plus className="h-4 w-4" />
              Create Activity
            </Button>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sidebar-accent">
              <span className="text-sm font-medium text-sidebar-accent-foreground">SA</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">Staff Admin</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">admin@communityhub.sg</p>
            </div>
          </div>
          <Link href="/">
            <Button variant="ghost" size="sm" className="w-full justify-start text-sidebar-foreground/70">
              <LogOut className="h-4 w-4 mr-2" />
              Back to Site
            </Button>
          </Link>
        </div>
      </div>
    </aside>
  )
}
