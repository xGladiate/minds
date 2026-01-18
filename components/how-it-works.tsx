import { CheckCircle2, Send, UserCheck, Calendar } from "lucide-react"

const steps = [
  {
    icon: Calendar,
    title: "Browse Activities",
    description: "View the calendar and find activities that interest you or your loved ones.",
  },
  {
    icon: Send,
    title: "Quick Sign-up",
    description: "Enter your details once. Magic link or Singpass authentication keeps it secure.",
  },
  {
    icon: UserCheck,
    title: "Caregiver Approval",
    description: "If required, caregivers receive instant WhatsApp/SMS for one-tap approval.",
  },
  {
    icon: CheckCircle2,
    title: "Confirmation",
    description: "Receive instant confirmation and reminders before the activity.",
  },
]

export function HowItWorks() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">How It Works</h2>
          <p className="mt-2 text-muted-foreground">Simple registration in just a few steps</p>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={index} className="relative text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <step.icon className="h-6 w-6" />
                </div>
                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 text-xs font-medium text-muted-foreground">
                  Step {index + 1}
                </span>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
