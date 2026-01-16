import Link from "next/link"
import { Sprout, Heart, Users, Target, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
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
            <Link
              href="/about"
              className="text-foreground font-medium"
            >
              About
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
            Empowering Communities to Build Their Own Future
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We believe every community has the potential to solve its own challenges.
            We provide the playbooks, tools, and AI-powered support to make it happen.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-2xl p-8 border border-border/50">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Heart className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">Our Mission</h3>
              <p className="text-muted-foreground">
                To democratize social entrepreneurship by making proven impact models
                accessible to anyone with the passion to serve their community.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 border border-border/50">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">Community First</h3>
              <p className="text-muted-foreground">
                Every playbook is designed with Canadian communities in mind—our
                healthcare system, regulations, and social context shape every recommendation.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 border border-border/50">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">AI for Good</h3>
              <p className="text-muted-foreground">
                Our AI agents handle the research, planning, and paperwork—so you
                can focus on what matters: building relationships and serving your community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-4xl font-bold text-center mb-12">
            How It Works
          </h2>

          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold mb-2">Choose a Playbook</h3>
                <p className="text-muted-foreground">
                  Browse our catalog of proven social impact ventures across food access,
                  education, healthcare, housing, and energy. Each playbook has been
                  successfully implemented in Canadian communities.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold mb-2">Tell Us About You</h3>
                <p className="text-muted-foreground">
                  Share your motivations, location, available resources, and lived experience.
                  We'll match you with playbooks that fit your situation and customize
                  our guidance to your community.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold mb-2">Execute with AI Agents</h3>
                <p className="text-muted-foreground">
                  Our AI agents research your local market, identify competitors and partners,
                  draft your business plan, create outreach materials, and more—all
                  customized for your specific location and context.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold mb-2">Launch and Grow</h3>
                <p className="text-muted-foreground">
                  Use the artifacts generated by our agents to launch your venture.
                  Share your progress page with community members who want to contribute
                  time, expertise, or funding to help you succeed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-primary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl font-bold text-primary-foreground mb-6">
            Ready to Start?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8">
            Browse our playbooks and find the one that matches your passion.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/playbooks">
              Explore Playbooks
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
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
            Back to Home
          </Link>
        </div>
      </footer>
    </main>
  )
}
