"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Loader2 } from "lucide-react"
import Link from "next/link"

export default function GoogleCallbackPage() {
  const [status, setStatus] = useState<"loading" | "success">("loading")

  useEffect(() => {
    // Simulate Google authentication callback
    const timer = setTimeout(() => {
      setStatus("success")
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-10 pb-10 text-center">
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary mb-6" />
            <h2 className="mb-2 text-xl font-bold text-foreground">Signing in with Google</h2>
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
          <h2 className="mb-2 text-2xl font-bold text-foreground">Welcome!</h2>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
              <span className="text-lg font-semibold text-muted-foreground">M</span>
            </div>
            <div className="text-left">
              <p className="font-semibold text-foreground">Mary Tan</p>
              <p className="text-sm text-muted-foreground">mary.tan@gmail.com</p>
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
