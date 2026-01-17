"use client"

import { useState, use } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { mockActivities, categoryColors } from "@/lib/mock-data"
import { Calendar, Clock, MapPin, CheckCircle2, XCircle, Loader2, Shield, MessageSquare } from "lucide-react"

interface PageProps {
  params: Promise<{ token: string }>
}

export default function CaregiverApprovalPage({ params }: PageProps) {
  const { token } = use(params)
  const [status, setStatus] = useState<"pending" | "approved" | "declined">("pending")
  const [isLoading, setIsLoading] = useState(false)
  const [showDeclineReason, setShowDeclineReason] = useState(false)
  const [declineReason, setDeclineReason] = useState("")

  // Mock data - in production this would be fetched based on token
  const registration = {
    participantName: "Mary Tan",
    participantPhone: "+65 9123 4567",
    caregiverName: "John Tan",
    activity: mockActivities[1], // Art Therapy Workshop
    registeredAt: "2026-01-16T14:20:00",
  }

  const handleApprove = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    setStatus("approved")
  }

  const handleDecline = async () => {
    if (!showDeclineReason) {
      setShowDeclineReason(true)
      return
    }
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    setStatus("declined")
  }

  if (status === "approved") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-10 pb-10 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="mb-2 text-2xl font-bold text-foreground">Registration Approved!</h2>
            <p className="mb-4 text-muted-foreground">
              {registration.participantName} has been registered for {registration.activity.title}.
            </p>
            <Alert className="text-left">
              <AlertDescription>
                <strong>{registration.participantName}</strong> will receive a confirmation message with all the
                activity details shortly.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (status === "declined") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-10 pb-10 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
              <XCircle className="h-10 w-10 text-destructive" />
            </div>
            <h2 className="mb-2 text-2xl font-bold text-foreground">Registration Declined</h2>
            <p className="mb-4 text-muted-foreground">
              The registration for {registration.participantName} has been declined.
            </p>
            <Alert className="text-left">
              <AlertDescription>
                <strong>{registration.participantName}</strong> will be notified about this decision.
                {declineReason && (
                  <>
                    <br />
                    <br />
                    <strong>Reason:</strong> {declineReason}
                  </>
                )}
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-primary">
            <span className="text-2xl font-bold text-primary-foreground">C</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Caregiver Approval Required</h1>
          <p className="mt-2 text-muted-foreground">Please review and approve this activity registration</p>
        </div>

        {/* Participant Info */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <span className="text-lg font-semibold text-primary">
                  {registration.participantName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div>
                <CardTitle className="text-lg">{registration.participantName}</CardTitle>
                <CardDescription>is requesting to join an activity</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Activity Details */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <Badge variant="outline" className={categoryColors[registration.activity.category]}>
                {registration.activity.category}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                <Shield className="h-3 w-3 mr-1" />
                Caregiver Required
              </Badge>
            </div>
            <CardTitle className="mt-3">{registration.activity.title}</CardTitle>
            <CardDescription>{registration.activity.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>
                {new Date(registration.activity.date).toLocaleDateString("en-SG", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{registration.activity.time}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{registration.activity.location}</span>
            </div>
          </CardContent>
        </Card>

        {/* Decline Reason (if declining) */}
        {showDeclineReason && (
          <Card className="border-destructive/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Reason for declining (optional)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="reason" className="sr-only">
                  Reason
                </Label>
                <Textarea
                  id="reason"
                  placeholder="E.g., Schedule conflict, health concerns, etc."
                  value={declineReason}
                  onChange={(e) => setDeclineReason(e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          {!showDeclineReason && (
            <Button onClick={handleApprove} className="w-full h-14 text-lg" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  Approve Registration
                </>
              )}
            </Button>
          )}

          <Button
            onClick={handleDecline}
            variant={showDeclineReason ? "destructive" : "outline"}
            className={`w-full h-14 text-lg ${!showDeclineReason ? "bg-transparent" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : showDeclineReason ? (
              <>
                <XCircle className="mr-2 h-5 w-5" />
                Confirm Decline
              </>
            ) : (
              <>
                <XCircle className="mr-2 h-5 w-5" />
                Decline Registration
              </>
            )}
          </Button>

          {showDeclineReason && (
            <Button variant="ghost" className="w-full" onClick={() => setShowDeclineReason(false)} disabled={isLoading}>
              Cancel
            </Button>
          )}
        </div>

        <p className="text-center text-xs text-muted-foreground">
          This link was sent to {registration.caregiverName} as the registered caregiver.
          <br />
          Request received on{" "}
          {new Date(registration.registeredAt).toLocaleDateString("en-SG", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  )
}
