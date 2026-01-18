import { SiteHeader } from "@/components/site-header"
import { ActivityCalendar } from "@/components/activity-calendar"

export default function CalendarPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Activity Calendar</h1>
          <p className="mt-2 text-muted-foreground">Browse and register for upcoming community activities</p>
        </div>
        <ActivityCalendar />
      </main>
    </div>
  )
}
