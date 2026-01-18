"use client"

import { Suspense, useState } from "react"
import { AdminHeader } from "@/components/admin-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockActivities, mockRegistrations } from "@/lib/mock-data"
import { Search, Download, CheckCircle2, XCircle, AlertCircle, Clock } from "lucide-react"

function RegistrationsContent() {
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const enrichedRegistrations = mockRegistrations.map((reg) => ({
    ...reg,
    activity: mockActivities.find((a) => a.id === reg.activityId),
  }))

  const filteredRegistrations = enrichedRegistrations.filter((reg) => {
    const matchesSearch = reg.userName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || reg.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string, caregiverApproval?: string) => {
    if (caregiverApproval === "pending") {
      return (
        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
          <AlertCircle className="h-3 w-3 mr-1" />
          Awaiting Approval
        </Badge>
      )
    }

    switch (status) {
      case "confirmed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Confirmed
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case "declined":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <XCircle className="h-3 w-3 mr-1" />
            Declined
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            Cancelled
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-1 gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="declined">Declined</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Registrations Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Participant</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Registered</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRegistrations.map((reg) => (
                <TableRow key={reg.id}>
                  <TableCell className="font-medium">{reg.userName}</TableCell>
                  <TableCell>{reg.activity?.title || "Unknown"}</TableCell>
                  <TableCell>
                    {reg.activity &&
                      new Date(reg.activity.date).toLocaleDateString("en-SG", {
                        day: "numeric",
                        month: "short",
                      })}
                  </TableCell>
                  <TableCell>{getStatusBadge(reg.status, reg.caregiverApproval)}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(reg.registeredAt).toLocaleDateString("en-SG", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredRegistrations.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">No registrations found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default function RegistrationsPage() {
  return (
    <div>
      <AdminHeader title="Registrations" description="View and manage activity registrations" />
      <Suspense fallback={null}>
        <RegistrationsContent />
      </Suspense>
    </div>
  )
}
