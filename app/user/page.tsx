import { SiteHeader } from "@/components/site-header";
import { HeroSection } from "@/components/hero-section";
import { UpcomingActivities } from "@/components/upcoming-activities";
import { HowItWorks } from "@/components/how-it-works";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <HeroSection />
        <UpcomingActivities />
        <HowItWorks />
      </main>
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>MindsMoments - Making activity sign-ups simple for everyone</p>
        </div>
      </footer>
    </div>
  );
}
