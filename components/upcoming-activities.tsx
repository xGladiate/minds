import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { mockActivities, categoryColors } from "@/lib/mock-data"
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react"

export function UpcomingActivities() {
  const upcomingActivities = mockActivities.slice(0, 3)

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Upcoming Activities</h2>
            <p className="mt-2 text-muted-foreground">Join our community programs and stay active</p>
          </div>
          <Link href="/calendar" className="hidden md:block">
            <Button variant="ghost" className="gap-2">
              View all
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {upcomingActivities.map((activity) => (
            <Card key={activity.id} className="overflow-hidden transition-shadow hover:shadow-lg">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <Badge variant="outline" className={categoryColors[activity.category]}>
                    {activity.category}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {activity.registered}/{activity.capacity} spots
                  </span>
                </div>
                <h3 className="mt-3 text-xl font-semibold text-card-foreground">{activity.title}</h3>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(activity.date).toLocaleDateString("en-SG", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{activity.time}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{activity.location}</span>
                </div>
                <p className="pt-2 text-muted-foreground line-clamp-2">{activity.description}</p>
              </CardContent>
              <CardFooter className="pt-0">
                <Link href={`/register/${activity.id}`} className="w-full">
                  <Button className="w-full" disabled={activity.registered >= activity.capacity}>
                    {activity.registered >= activity.capacity ? "Full" : "Register Now"}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/calendar">
            <Button variant="outline" className="gap-2 bg-transparent">
              View all activities
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
