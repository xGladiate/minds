import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Clock, Shield, Zap } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground">
            <Zap className="h-4 w-4 text-primary" />
            Frictionless sign-ups for community activities
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl text-balance">
            Activity Sign-ups
            <span className="text-primary"> Made Simple</span>
          </h1>
          <p className="mb-10 text-lg text-muted-foreground md:text-xl leading-relaxed max-w-2xl mx-auto text-pretty">
            Register for community programs in seconds. No complex forms, no lengthy processes. Just one tap for you or
            your loved ones.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/calendar">
              <Button size="lg" className="gap-2 px-8">
                Browse Activities
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="gap-2 px-8 bg-transparent">
                Quick Sign-up
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature highlights */}
        <div className="mt-20 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-card-foreground">Ultra-fast Sign-up</h3>
            <p className="text-sm text-muted-foreground">
              Returning users auto-filled. No accounts needed with magic link authentication.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20">
              <Shield className="h-6 w-6 text-accent" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-card-foreground">One-Tap Approval</h3>
            <p className="text-sm text-muted-foreground">
              Caregivers receive instant notifications. Approve or decline with a single tap.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-chart-3/20">
              <Calendar className="h-6 w-6 text-chart-3" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-card-foreground">Smart Calendar</h3>
            <p className="text-sm text-muted-foreground">
              See only relevant activities. Automatic conflict detection and reminders.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
