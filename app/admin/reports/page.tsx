import { AdminHeader } from "@/components/admin-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockActivities } from "@/lib/mock-data"
import { FileSpreadsheet, Calendar, Users, TrendingUp, BarChart3 } from "lucide-react"

export default function ReportsPage() {
  const totalCapacity = mockActivities.reduce((sum, a) => sum + a.capacity, 0)
  const totalRegistered = mockActivities.reduce((sum, a) => sum + a.registered, 0)
  const utilizationRate = Math.round((totalRegistered / totalCapacity) * 100)

  const categoryCounts = mockActivities.reduce(
    (acc, a) => {
      acc[a.category] = (acc[a.category] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <div>
      <AdminHeader title="Reports" description="Analytics and data exports" />

      <div className="p-6 space-y-6">
        {/* Period Selector */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">Reporting period:</span>
          <Select defaultValue="this-month">
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="this-quarter">This Quarter</SelectItem>
              <SelectItem value="this-year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Activities</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockActivities.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Total scheduled</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Registrations</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalRegistered}</div>
              <p className="text-xs text-muted-foreground mt-1">Total sign-ups</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Utilization</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{utilizationRate}%</div>
              <p className="text-xs text-muted-foreground mt-1">Capacity filled</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Approval Rate</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">85%</div>
              <p className="text-xs text-muted-foreground mt-1">Caregiver approvals</p>
            </CardContent>
          </Card>
        </div>

        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Activities by Category</CardTitle>
            <CardDescription>Distribution of activities across categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(categoryCounts).map(([category, count]) => {
                const percentage = Math.round((count / mockActivities.length) * 100)
                return (
                  <div key={category} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="capitalize font-medium">{category}</span>
                      <span className="text-muted-foreground">
                        {count} activities ({percentage}%)
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-muted">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${percentage}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Export Options */}
        <Card>
          <CardHeader>
            <CardTitle>Export Reports</CardTitle>
            <CardDescription>Download data for external analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Button variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent">
                <FileSpreadsheet className="h-6 w-6" />
                <span>Registration Report</span>
                <span className="text-xs text-muted-foreground">All registrations with details</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent">
                <Calendar className="h-6 w-6" />
                <span>Activity Report</span>
                <span className="text-xs text-muted-foreground">Activities and attendance</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent">
                <Users className="h-6 w-6" />
                <span>Participant Report</span>
                <span className="text-xs text-muted-foreground">All participants data</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
