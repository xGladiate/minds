"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockActivities, categoryColors, type Activity } from "@/lib/mock-data"
import { Clock, MapPin, Users, ChevronLeft, ChevronRight, Filter } from "lucide-react"
import Link from "next/link"

const categories = ["all", "wellness", "social", "learning", "fitness"] as const

export function ActivityCalendar() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list")

  const filteredActivities =
    selectedCategory === "all" ? mockActivities : mockActivities.filter((a) => a.category === selectedCategory)

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-border p-1">
          <Button
            variant={viewMode === "list" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="text-sm"
          >
            List
          </Button>
          <Button
            variant={viewMode === "calendar" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setViewMode("calendar")}
            className="text-sm"
          >
            Calendar
          </Button>
        </div>
      </div>

      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">January 2026</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Activity List */}
      {viewMode === "list" ? (
        <div className="space-y-4">
          {filteredActivities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
          {filteredActivities.length === 0 && (
            <div className="py-12 text-center text-muted-foreground">No activities found for this category.</div>
          )}
        </div>
      ) : (
        <CalendarView activities={filteredActivities} />
      )}
    </div>
  )
}

function ActivityCard({ activity }: { activity: Activity }) {
  const spotsLeft = activity.capacity - activity.registered
  const isFull = spotsLeft <= 0

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          {/* Date column */}
          <div className="flex md:flex-col items-center justify-center gap-2 md:gap-0 bg-muted/50 px-6 py-4 md:py-6 md:min-w-[100px]">
            <span className="text-sm font-medium text-muted-foreground">
              {new Date(activity.date).toLocaleDateString("en-SG", { weekday: "short" })}
            </span>
            <span className="text-2xl font-bold text-foreground">{new Date(activity.date).getDate()}</span>
            <span className="text-sm text-muted-foreground">
              {new Date(activity.date).toLocaleDateString("en-SG", { month: "short" })}
            </span>
          </div>

          {/* Content */}
          <div className="flex-1 p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className={categoryColors[activity.category]}>
                    {activity.category}
                  </Badge>
                  {activity.requiresCaregiver && (
                    <Badge variant="secondary" className="text-xs">
                      Caregiver Required
                    </Badge>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-card-foreground">{activity.title}</h3>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    {activity.time}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    {activity.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="h-4 w-4" />
                    {spotsLeft} spots left
                  </span>
                </div>
              </div>

              <div className="flex md:flex-col items-center gap-3">
                <Link href={`/register/${activity.id}`} className="w-full md:w-auto">
                  <Button className="w-full" disabled={isFull}>
                    {isFull ? "Full" : "Register"}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function CalendarView({ activities }: { activities: Activity[] }) {
  const daysInMonth = 31
  const firstDayOfWeek = 3 // Wednesday for Jan 2026
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const getActivitiesForDay = (day: number) => {
    return activities.filter((a) => new Date(a.date).getDate() === day)
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border">
      {/* Week day headers */}
      <div className="grid grid-cols-7 border-b border-border bg-muted/50">
        {weekDays.map((day) => (
          <div key={day} className="py-3 text-center text-sm font-medium text-muted-foreground">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7">
        {/* Empty cells for days before the 1st */}
        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} className="min-h-[100px] border-b border-r border-border bg-muted/20 p-2" />
        ))}

        {/* Days of the month */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1
          const dayActivities = getActivitiesForDay(day)
          const isToday = day === 17 // Current day

          return (
            <div
              key={day}
              className={`min-h-[100px] border-b border-r border-border p-2 ${isToday ? "bg-primary/5" : ""}`}
            >
              <span
                className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-sm ${
                  isToday ? "bg-primary text-primary-foreground font-semibold" : "text-foreground"
                }`}
              >
                {day}
              </span>
              <div className="mt-1 space-y-1">
                {dayActivities.slice(0, 2).map((activity) => (
                  <Link key={activity.id} href={`/register/${activity.id}`}>
                    <div
                      className={`truncate rounded px-1.5 py-0.5 text-xs cursor-pointer hover:opacity-80 ${categoryColors[activity.category]}`}
                    >
                      {activity.title}
                    </div>
                  </Link>
                ))}
                {dayActivities.length > 2 && (
                  <span className="text-xs text-muted-foreground">+{dayActivities.length - 2} more</span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
