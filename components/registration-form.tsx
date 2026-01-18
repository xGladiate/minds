"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { type Activity, categoryColors } from "@/lib/mock-data"
import { Calendar, Clock, MapPin, Users, CheckCircle2, Loader2, Sparkles } from "lucide-react"

interface RegistrationFormProps {
  activity: Activity
}

export function RegistrationForm({ activity }: RegistrationFormProps) {
  const [step, setStep] = useState<"form" | "review" | "success">("form")
  const [isLoading, setIsLoading] = useState(false)
  const [isReturningUser, setIsReturningUser] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    nric: "",
    requiresWheelchair: false,
    requiresTransport: false,
    specialRequirements: "",
    caregiverName: "",
    caregiverPhone: "",
    caregiverEmail: "",
  })

  // Simulate auto-fill for returning users
  const handleEmailBlur = () => {
    if (formData.email === "mary.tan@email.com") {
      setIsReturningUser(true)
      setFormData({
        ...formData,
        name: "Mary Tan",
        phone: "+65 9123 4567",
        nric: "S1234567A",
        caregiverName: "John Tan",
        caregiverPhone: "+65 9876 5432",
        caregiverEmail: "john.tan@email.com",
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step === "form") {
      setStep("review")
      return
    }

    setIsLoading(true)
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    setStep("success")
  }

  const spotsLeft = activity.capacity - activity.registered

  if (step === "success") {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-10 pb-10 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-foreground">Registration Submitted!</h2>
          {activity.requiresCaregiver ? (
            <>
              <p className="mb-6 text-muted-foreground">
                We&apos;ve sent a WhatsApp message to your caregiver ({formData.caregiverName}) for approval.
              </p>
              <Alert className="text-left mb-6">
                <AlertDescription>
                  <strong>What happens next?</strong>
                  <br />
                  Your caregiver will receive a one-tap approval request. Once approved, you&apos;ll receive a
                  confirmation message.
                </AlertDescription>
              </Alert>
            </>
          ) : (
            <p className="mb-6 text-muted-foreground">
              You&apos;ll receive a confirmation email shortly with all the details.
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline" className="bg-transparent" onClick={() => (window.location.href = "/calendar")}>
              Browse More Activities
            </Button>
            <Button onClick={() => (window.location.href = "/")}>Back to Home</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Activity Summary */}
      <Card className="lg:col-span-1 h-fit lg:sticky lg:top-24">
        <CardHeader>
          <Badge variant="outline" className={`w-fit ${categoryColors[activity.category]}`}>
            {activity.category}
          </Badge>
          <CardTitle className="mt-3">{activity.title}</CardTitle>
          <CardDescription>{activity.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>
              {new Date(activity.date).toLocaleDateString("en-SG", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{activity.time}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{activity.location}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className={spotsLeft <= 3 ? "text-destructive font-medium" : ""}>{spotsLeft} spots remaining</span>
          </div>
          {activity.requiresCaregiver && (
            <Alert>
              <AlertDescription className="text-sm">
                This activity requires caregiver approval. Your caregiver will receive a notification to approve your
                registration.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Registration Form */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{step === "form" ? "Registration Details" : "Review & Confirm"}</CardTitle>
              <CardDescription>
                {step === "form" ? "Fill in your details to register" : "Please review your information"}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className={step === "form" ? "text-primary font-medium" : ""}>1. Details</span>
              <span>→</span>
              <span className={step === "review" ? "text-primary font-medium" : ""}>2. Review</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isReturningUser && step === "form" && (
            <Alert className="mb-6 border-primary/20 bg-primary/5">
              <Sparkles className="h-4 w-4 text-primary" />
              <AlertDescription className="text-primary">
                Welcome back! We&apos;ve auto-filled your details from your previous registration.
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === "form" ? (
              <>
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="font-medium text-foreground">Personal Information</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        onBlur={handleEmailBlur}
                        required
                      />
                      <p className="text-xs text-muted-foreground">Try: mary.tan@email.com to see auto-fill</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+65 9123 4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nric">NRIC (last 4 characters)</Label>
                      <Input
                        id="nric"
                        placeholder="567A"
                        value={formData.nric}
                        onChange={(e) => setFormData({ ...formData, nric: e.target.value })}
                        maxLength={9}
                      />
                    </div>
                  </div>
                </div>

                {/* Special Requirements */}
                <div className="space-y-4">
                  <h3 className="font-medium text-foreground">Additional Requirements</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="wheelchair"
                        checked={formData.requiresWheelchair}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, requiresWheelchair: checked as boolean })
                        }
                      />
                      <Label htmlFor="wheelchair" className="font-normal">
                        Wheelchair accessibility required
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="transport"
                        checked={formData.requiresTransport}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, requiresTransport: checked as boolean })
                        }
                      />
                      <Label htmlFor="transport" className="font-normal">
                        Transport assistance needed
                      </Label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="special">Other Requirements</Label>
                    <Textarea
                      id="special"
                      placeholder="Any dietary requirements, mobility aids, etc."
                      value={formData.specialRequirements}
                      onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                      rows={3}
                    />
                  </div>
                </div>

                {/* Caregiver Information */}
                {activity.requiresCaregiver && (
                  <div className="space-y-4">
                    <h3 className="font-medium text-foreground">Caregiver Information</h3>
                    <p className="text-sm text-muted-foreground">
                      Your caregiver will receive a WhatsApp/SMS message to approve this registration.
                    </p>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="caregiverName">Caregiver Name *</Label>
                        <Input
                          id="caregiverName"
                          placeholder="Caregiver's full name"
                          value={formData.caregiverName}
                          onChange={(e) => setFormData({ ...formData, caregiverName: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="caregiverPhone">Caregiver Phone *</Label>
                        <Input
                          id="caregiverPhone"
                          type="tel"
                          placeholder="+65 9876 5432"
                          value={formData.caregiverPhone}
                          onChange={(e) => setFormData({ ...formData, caregiverPhone: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="caregiverEmail">Caregiver Email</Label>
                        <Input
                          id="caregiverEmail"
                          type="email"
                          placeholder="caregiver@email.com"
                          value={formData.caregiverEmail}
                          onChange={(e) => setFormData({ ...formData, caregiverEmail: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* Review Step */
              <div className="space-y-6">
                <div className="rounded-lg border border-border p-4 space-y-3">
                  <h4 className="font-medium">Personal Information</h4>
                  <div className="grid gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Name</span>
                      <span className="font-medium">{formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email</span>
                      <span className="font-medium">{formData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Phone</span>
                      <span className="font-medium">{formData.phone}</span>
                    </div>
                    {formData.nric && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">NRIC</span>
                        <span className="font-medium">****{formData.nric.slice(-4)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {(formData.requiresWheelchair || formData.requiresTransport || formData.specialRequirements) && (
                  <div className="rounded-lg border border-border p-4 space-y-3">
                    <h4 className="font-medium">Additional Requirements</h4>
                    <div className="space-y-2 text-sm">
                      {formData.requiresWheelchair && <p>• Wheelchair accessibility required</p>}
                      {formData.requiresTransport && <p>• Transport assistance needed</p>}
                      {formData.specialRequirements && <p>• {formData.specialRequirements}</p>}
                    </div>
                  </div>
                )}

                {activity.requiresCaregiver && formData.caregiverName && (
                  <div className="rounded-lg border border-border p-4 space-y-3">
                    <h4 className="font-medium">Caregiver Details</h4>
                    <div className="grid gap-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Name</span>
                        <span className="font-medium">{formData.caregiverName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Phone</span>
                        <span className="font-medium">{formData.caregiverPhone}</span>
                      </div>
                    </div>
                    <Alert className="mt-3">
                      <AlertDescription className="text-sm">
                        A WhatsApp message will be sent to {formData.caregiverName} for approval.
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-3 pt-4">
              {step === "review" && (
                <Button type="button" variant="outline" className="bg-transparent" onClick={() => setStep("form")}>
                  Back to Edit
                </Button>
              )}
              <Button type="submit" className="flex-1" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : step === "form" ? (
                  "Continue to Review"
                ) : (
                  "Confirm Registration"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
