import Link from "next/link"
import { Sprout, MapPin, Calendar, ArrowRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const stories = [
  {
    title: "Parkdale Community Grocery Co-op",
    location: "Toronto, ON",
    year: 2023,
    category: "Food Access",
    description:
      "Starting with just 50 members, this neighborhood grocery co-op now serves 2,000 families with affordable, culturally relevant food options in one of Toronto's most diverse neighborhoods.",
    impact: ["2,000 member families", "15% below retail prices", "12 local jobs created"],
    quote: "The playbook gave us the confidence to start. The AI agents handled the market research we couldn't afford to hire out.",
    quotePerson: "Maria Santos, Founding Member",
  },
  {
    title: "Northern Lights Community Solar",
    location: "Thunder Bay, ON",
    year: 2022,
    category: "Energy",
    description:
      "This Indigenous-led community solar project brought renewable energy and lower bills to 200 households, while creating training opportunities for local youth in solar installation.",
    impact: ["200 households powered", "30% energy cost reduction", "15 youth trained"],
    quote: "Our community had been talking about solar for years. The step-by-step approach made it actually happen.",
    quotePerson: "Chief David Kakegamic",
  },
  {
    title: "East Van Skills Bootcamp",
    location: "Vancouver, BC",
    year: 2022,
    category: "Education",
    description:
      "A 12-week coding bootcamp specifically designed for newcomers to Canada, combining technical training with job placement support and mentorship from local tech companies.",
    impact: ["85% job placement rate", "45 graduates in first cohort", "Average $58K starting salary"],
    quote: "The business plan agent created projections that convinced three tech companies to sponsor us before we even started.",
    quotePerson: "Priya Sharma, Program Director",
  },
  {
    title: "Verdun Housing Co-operative",
    location: "Montreal, QC",
    year: 2021,
    category: "Housing",
    description:
      "A community land trust model that preserved 40 units of affordable housing in a rapidly gentrifying neighborhood, keeping long-term residents in their homes.",
    impact: ["40 affordable units preserved", "Rents 40% below market", "Zero displacement"],
    quote: "The local contacts research found us grants and advisors we never knew existed in our own city.",
    quotePerson: "Jean-Pierre Dubois, Board Chair",
  },
]

export default function StoriesPage() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Sprout className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-semibold tracking-tight">
              Venture Studio
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/playbooks"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Playbooks
            </Link>
            <Link href="/stories" className="text-foreground font-medium">
              Success Stories
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 gradient-mesh">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
            Stories of Impact
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real communities. Real ventures. Real change. See how community builders
            across Canada are using our playbooks to create lasting impact.
          </p>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {stories.map((story) => (
              <div
                key={story.title}
                className="bg-card rounded-2xl border border-border/50 overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Header */}
                <div className="p-6 border-b border-border/50">
                  <Badge variant="secondary" className="mb-3">
                    {story.category}
                  </Badge>
                  <h3 className="font-display text-2xl font-bold mb-2">
                    {story.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {story.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {story.year}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6">
                  <p className="text-muted-foreground mb-6">{story.description}</p>

                  {/* Impact metrics */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {story.impact.map((metric) => (
                      <span
                        key={metric}
                        className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                      >
                        {metric}
                      </span>
                    ))}
                  </div>

                  {/* Quote */}
                  <div className="bg-secondary/50 rounded-xl p-4">
                    <Quote className="w-5 h-5 text-primary mb-2" />
                    <p className="text-sm italic mb-2">&ldquo;{story.quote}&rdquo;</p>
                    <p className="text-xs text-muted-foreground">
                      — {story.quotePerson}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-primary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl font-bold text-primary-foreground mb-6">
            Write Your Own Story
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8">
            Join the growing community of builders making a difference.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/playbooks">
              Find Your Playbook
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} AI Venture Studio for Good
          </p>
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Back to Home
          </Link>
        </div>
      </footer>
    </main>
  )
}
