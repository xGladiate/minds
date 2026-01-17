"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Loader2 } from "lucide-react"
import Link from "next/link"

export default function SingpassCallbackPage() {
  const [status, setStatus] = useState<"loading" | "success">("loading")

  useEffect(() => {
    // Simulate Singpass authentication callback
    const timer = setTimeout(() => {
      setStatus("success")
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-10 pb-10 text-center">
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary mb-6" />
            <h2 className="mb-2 text-xl font-bold text-foreground">Verifying with Singpass</h2>
            <p className="text-muted-foreground">Please wait while we complete your authentication...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-10 pb-10 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-foreground">Singpass Verified!</h2>
          <p className="mb-2 text-muted-foreground">Welcome back,</p>
          <p className="mb-6 text-lg font-semibold text-foreground">Mary Tan Mei Ling</p>

          <div className="rounded-lg border border-border p-4 mb-6 text-left space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">NRIC</span>
              <span className="font-medium">****567A</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Phone</span>
              <span className="font-medium">+65 ****4567</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Address</span>
              <span className="font-medium">Linked from Singpass</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Link href="/calendar">
              <Button className="w-full">Continue to Activities</Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="w-full bg-transparent">
                Go to Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
