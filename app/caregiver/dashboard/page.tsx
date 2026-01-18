"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockActivities, categoryColors } from "@/lib/mock-data"
import { Calendar, Clock, MapPin, CheckCircle2, XCircle, AlertCircle, ArrowLeft, User } from "lucide-react"

interface CaregiverRegistration {
  id: string
  participantName: string
  activity: (typeof mockActivities)[0]
  status: "pending" | "approved" | "declined"
  requestedAt: string
  respondedAt?: string
}

const mockCaregiverRegistrations: CaregiverRegistration[] = [
  {
    id: "cr1",
    participantName: "Mary Tan",
    activity: mockActivities[1], // Art Therapy Workshop
    status: "pending",
    requestedAt: "2026-01-16T14:20:00",
  },
  {
    id: "cr2",
    participantName: "Mary Tan",
    activity: mockActivities[0], // Morning Tai Chi
    status: "approved",
    requestedAt: "2026-01-14T10:30:00",
    respondedAt: "2026-01-14T11:45:00",
  },
  {
    id: "cr3",
    participantName: "Mary Tan",
    activity: mockActivities[3], // Social Tea Session
    status: "declined",
    requestedAt: "2026-01-10T09:15:00",
    respondedAt: "2026-01-10T12:00:00",
  },
]

export default function CaregiverDashboardPage() {
  const [registrations, setRegistrations] = useState(mockCaregiverRegistrations)

  const pendingRegistrations = registrations.filter((r) => r.status === "pending")
  const processedRegistrations = registrations.filter((r) => r.status !== "pending")

  const handleApprove = (id: string) => {
    setRegistrations(
      registrations.map((r) =>
        r.id === id ? { ...r, status: "approved" as const, respondedAt: new Date().toISOString() } : r,
      ),
    )
  }

  const handleDecline = (id: string) => {
    setRegistrations(
      registrations.map((r) =>
        r.id === id ? { ...r, status: "declined" as const, respondedAt: new Date().toISOString() } : r,
      ),
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            <AlertCircle className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        )
      case "declined":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <XCircle className="h-3 w-3 mr-1" />
            Declined
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-primary-foreground">C</span>
              </div>
              <span className="text-xl font-semibold tracking-tight">CommunityHub</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
              <User className="h-4 w-4 text-muted-foreground" />
            </div>
            <span className="text-sm font-medium">John Tan (Caregiver)</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Caregiver Dashboard</h1>
          <p className="mt-2 text-muted-foreground">Manage activity registrations for your dependents</p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Pending Approvals</CardDescription>
              <CardTitle className="text-3xl text-amber-600">{pendingRegistrations.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Approved This Month</CardDescription>
              <CardTitle className="text-3xl text-green-600">
                {registrations.filter((r) => r.status === "approved").length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Declined This Month</CardDescription>
              <CardTitle className="text-3xl text-red-600">
                {registrations.filter((r) => r.status === "declined").length}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList>
            <TabsTrigger value="pending" className="gap-2">
              Pending
              {pendingRegistrations.length > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                  {pendingRegistrations.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {pendingRegistrations.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-green-500 mb-4" />
                  <h3 className="text-lg font-semibold text-foreground">All caught up!</h3>
                  <p className="text-muted-foreground">No pending approvals at the moment.</p>
                </CardContent>
              </Card>
            ) : (
              pendingRegistrations.map((registration) => (
                <Card key={registration.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col lg:flex-row">
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                              <span className="text-sm font-semibold text-primary">
                                {registration.participantName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                            </div>
                            <div>
                              <p className="font-semibold text-foreground">{registration.participantName}</p>
                              <p className="text-sm text-muted-foreground">
                                Requested{" "}
                                {new Date(registration.requestedAt).toLocaleDateString("en-SG", {
                                  day: "numeric",
                                  month: "short",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                            </div>
                          </div>
                          {getStatusBadge(registration.status)}
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={categoryColors[registration.activity.category]}>
                              {registration.activity.category}
                            </Badge>
                            <h3 className="font-semibold text-foreground">{registration.activity.title}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground">{registration.activity.description}</p>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="h-4 w-4" />
                              {new Date(registration.activity.date).toLocaleDateString("en-SG", {
                                weekday: "short",
                                day: "numeric",
                                month: "short",
                              })}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Clock className="h-4 w-4" />
                              {registration.activity.time}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <MapPin className="h-4 w-4" />
                              {registration.activity.location}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex lg:flex-col gap-2 p-4 lg:p-6 border-t lg:border-t-0 lg:border-l border-border bg-muted/30 lg:min-w-[180px] justify-center">
                        <Button className="flex-1 lg:flex-none" onClick={() => handleApprove(registration.id)}>
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1 lg:flex-none bg-transparent"
                          onClick={() => handleDecline(registration.id)}
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Decline
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            {processedRegistrations.map((registration) => (
              <Card key={registration.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <span className="text-sm font-semibold text-primary">
                          {registration.participantName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{registration.participantName}</p>
                        <p className="text-sm text-muted-foreground">
                          Responded{" "}
                          {registration.respondedAt &&
                            new Date(registration.respondedAt).toLocaleDateString("en-SG", {
                              day: "numeric",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                        </p>
                      </div>
                    </div>
                    {getStatusBadge(registration.status)}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={categoryColors[registration.activity.category]}>
                        {registration.activity.category}
                      </Badge>
                      <h3 className="font-medium text-foreground">{registration.activity.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        {new Date(registration.activity.date).toLocaleDateString("en-SG", {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                        })}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        {registration.activity.time}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
