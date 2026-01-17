import { SiteHeader } from "@/components/site-header"
import { RegistrationForm } from "@/components/registration-form"
import { mockActivities } from "@/lib/mock-data"
import { notFound } from "next/navigation"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function RegisterPage({ params }: PageProps) {
  const { id } = await params
  const activity = mockActivities.find((a) => a.id === id)

  if (!activity) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Register for Activity</h1>
          <p className="mt-2 text-muted-foreground">Complete the form below to secure your spot</p>
        </div>
        <RegistrationForm activity={activity} />
      </main>
    </div>
  )
}
