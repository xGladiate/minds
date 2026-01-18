"use client"

import { Suspense, useState } from "react"
import Link from "next/link"
import { AdminHeader } from "@/components/admin-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { mockActivities, categoryColors, type Activity } from "@/lib/mock-data"
import { Calendar, Clock, MapPin, Users, Plus, Search, MoreVertical, Edit, Copy, Trash2, Eye } from "lucide-react"

function ActivitiesContent() {
  const [activities, setActivities] = useState(mockActivities)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch = activity.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || activity.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const handleDelete = (id: string) => {
    setActivities(activities.filter((a) => a.id !== id))
  }

  return (
    <div className="p-6 space-y-6">
      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-1 gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search activities..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="wellness">Wellness</SelectItem>
              <SelectItem value="social">Social</SelectItem>
              <SelectItem value="learning">Learning</SelectItem>
              <SelectItem value="fitness">Fitness</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Link href="/admin/activities/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create Activity
          </Button>
        </Link>
      </div>

      {/* Activities List */}
      <div className="space-y-4">
        {filteredActivities.map((activity) => (
          <ActivityRow key={activity.id} activity={activity} onDelete={handleDelete} />
        ))}
        {filteredActivities.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground">No activities found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

function ActivityRow({ activity, onDelete }: { activity: Activity; onDelete: (id: string) => void }) {
  const spotsLeft = activity.capacity - activity.registered
  const isFull = spotsLeft <= 0

  return (
    <Card className="overflow-hidden">
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
                <div className="flex items-center gap-3 flex-wrap">
                  <Badge variant="outline" className={categoryColors[activity.category]}>
                    {activity.category}
                  </Badge>
                  {activity.requiresCaregiver && (
                    <Badge variant="secondary" className="text-xs">
                      Caregiver Required
                    </Badge>
                  )}
                  {isFull && <Badge variant="destructive">Full</Badge>}
                </div>
                <h3 className="text-lg font-semibold text-card-foreground">{activity.title}</h3>
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
                    {activity.registered}/{activity.capacity} registered
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link href={`/admin/activities/${activity.id}`}>
                  <Button variant="outline" size="sm" className="bg-transparent">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="h-4 w-4 mr-2" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive" onClick={() => onDelete(activity.id)}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function ActivitiesPage() {
  return (
    <div>
      <AdminHeader title="Activities" description="Manage community activities and events" />
      <Suspense fallback={null}>
        <ActivitiesContent />
      </Suspense>
    </div>
  )
}
