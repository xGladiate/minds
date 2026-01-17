import { AdminHeader } from "@/components/admin-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockActivities, mockRegistrations, categoryColors } from "@/lib/mock-data"
import { Calendar, Users, Clock, TrendingUp, AlertCircle, CheckCircle2, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const pendingApprovals = mockRegistrations.filter((r) => r.caregiverApproval === "pending").length
  const todayActivities = mockActivities.filter(
    (a) => new Date(a.date).toDateString() === new Date("2026-01-17").toDateString(),
  ).length
  const totalRegistrations = mockRegistrations.length
  const upcomingActivities = mockActivities.slice(0, 4)

  return (
    <div>
      <AdminHeader title="Dashboard" description="Overview of activity registrations and management" />

      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Activities</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockActivities.length}</div>
              <p className="text-xs text-muted-foreground mt-1">+2 from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Registrations</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalRegistrations}</div>
              <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Approvals</CardTitle>
              <Clock className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-600">{pendingApprovals}</div>
              <p className="text-xs text-muted-foreground mt-1">Awaiting caregiver response</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Today&apos;s Activities</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{todayActivities}</div>
              <p className="text-xs text-muted-foreground mt-1">Activities scheduled today</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Pending Approvals */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Pending Caregiver Approvals</CardTitle>
                <CardDescription>Registrations awaiting approval</CardDescription>
              </div>
              <Link href="/admin/registrations">
                <Button variant="ghost" size="sm">
                  View all
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockRegistrations
                .filter((r) => r.caregiverApproval === "pending")
                .map((reg) => {
                  const activity = mockActivities.find((a) => a.id === reg.activityId)
                  return (
                    <div key={reg.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                          <AlertCircle className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{reg.userName}</p>
                          <p className="text-sm text-muted-foreground">{activity?.title}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        Pending
                      </Badge>
                    </div>
                  )
                })}
              {pendingApprovals === 0 && (
                <div className="text-center py-6">
                  <CheckCircle2 className="mx-auto h-8 w-8 text-green-500 mb-2" />
                  <p className="text-muted-foreground">No pending approvals</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Activities */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Upcoming Activities</CardTitle>
                <CardDescription>Next scheduled activities</CardDescription>
              </div>
              <Link href="/admin/activities">
                <Button variant="ghost" size="sm">
                  View all
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${categoryColors[activity.category].split(" ")[0]}`}
                    >
                      <Calendar className={`h-5 w-5 ${categoryColors[activity.category].split(" ")[1]}`} />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(activity.date).toLocaleDateString("en-SG", {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                        })}{" "}
                        • {activity.time}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {activity.registered}/{activity.capacity}
                    </p>
                    <p className="text-xs text-muted-foreground">registered</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks for managing activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Link href="/admin/activities/new">
                <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2 bg-transparent">
                  <Calendar className="h-6 w-6" />
                  <span>Create Activity</span>
                </Button>
              </Link>
              <Link href="/admin/registrations">
                <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2 bg-transparent">
                  <Users className="h-6 w-6" />
                  <span>View Registrations</span>
                </Button>
              </Link>
              <Link href="/admin/reports">
                <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2 bg-transparent">
                  <TrendingUp className="h-6 w-6" />
                  <span>Generate Report</span>
                </Button>
              </Link>
              <Link href="/admin/activities">
                <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2 bg-transparent">
                  <Clock className="h-6 w-6" />
                  <span>Manage Schedule</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
