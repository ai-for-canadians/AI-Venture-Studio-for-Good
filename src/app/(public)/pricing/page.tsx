import Link from "next/link"
import { Sprout, Check, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const plans = [
  {
    name: "Explorer",
    price: "Free",
    description: "Try the platform and explore playbooks",
    credits: 50,
    features: [
      "Browse all playbooks",
      "50 demo credits",
      "Basic market assessment",
      "Community support",
    ],
    cta: "Get Started Free",
    href: "/register",
    highlighted: false,
  },
  {
    name: "Builder",
    price: "$49",
    period: "one-time",
    description: "Launch your first venture",
    credits: 500,
    features: [
      "Everything in Explorer",
      "500 credits included",
      "All 8 AI agent steps",
      "Downloadable artifacts",
      "Public venture page",
      "Email support",
    ],
    cta: "Start Building",
    href: "/register",
    highlighted: true,
  },
  {
    name: "Launcher",
    price: "$149",
    period: "one-time",
    description: "Full launch support for serious builders",
    credits: 2000,
    features: [
      "Everything in Builder",
      "2,000 credits included",
      "Priority AI processing",
      "Multiple ventures",
      "Contributor page enabled",
      "Onboarding call",
      "Priority support",
    ],
    cta: "Launch Now",
    href: "/register",
    highlighted: false,
  },
]

export default function PricingPage() {
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
            <Link href="/pricing" className="text-foreground font-medium">
              Pricing
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
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Pay per step, not per month. Buy credits once and use them whenever you're ready.
            No subscriptions, no hidden fees.
          </p>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-card rounded-2xl border ${
                  plan.highlighted
                    ? "border-primary shadow-xl scale-105"
                    : "border-border/50"
                } overflow-hidden`}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-center py-2 text-sm font-medium">
                    <Sparkles className="w-4 h-4 inline mr-1" />
                    Most Popular
                  </div>
                )}

                <div className={`p-8 ${plan.highlighted ? "pt-14" : ""}`}>
                  <h3 className="font-display text-xl font-semibold mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {plan.description}
                  </p>

                  <div className="mb-6">
                    <span className="font-display text-4xl font-bold">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-muted-foreground ml-2">
                        {plan.period}
                      </span>
                    )}
                  </div>

                  <div className="mb-6 p-3 bg-secondary/50 rounded-lg text-center">
                    <span className="text-2xl font-bold text-primary">
                      {plan.credits}
                    </span>
                    <span className="text-muted-foreground ml-1">credits</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="w-full"
                    variant={plan.highlighted ? "default" : "outline"}
                    asChild
                  >
                    <Link href={plan.href}>
                      {plan.cta}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Credit pricing */}
          <div className="mt-16 text-center">
            <h3 className="font-display text-2xl font-bold mb-4">
              Need More Credits?
            </h3>
            <p className="text-muted-foreground mb-6">
              Purchase additional credits anytime at $0.10 per credit.
            </p>
            <p className="text-sm text-muted-foreground">
              Each AI agent step costs approximately 25 credits.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="bg-card rounded-xl p-6 border border-border/50">
              <h4 className="font-semibold mb-2">What are credits used for?</h4>
              <p className="text-muted-foreground text-sm">
                Credits are used to run AI agent steps. Each step (like market assessment,
                business plan, etc.) costs approximately 25 credits. Your credits never expire.
              </p>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border/50">
              <h4 className="font-semibold mb-2">Can I try before I buy?</h4>
              <p className="text-muted-foreground text-sm">
                Yes! The free Explorer plan includes 50 credits so you can run a couple
                of AI steps and see the quality of output before purchasing more.
              </p>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border/50">
              <h4 className="font-semibold mb-2">Do credits expire?</h4>
              <p className="text-muted-foreground text-sm">
                No. Once you purchase credits, they're yours to use whenever you're ready.
                We know launching a venture takes time—your credits will be waiting.
              </p>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border/50">
              <h4 className="font-semibold mb-2">What if I need help?</h4>
              <p className="text-muted-foreground text-sm">
                All plans include community support. Builder and Launcher plans also
                include email support, and Launcher includes a 30-minute onboarding call
                to help you get the most out of the platform.
              </p>
            </div>
          </div>
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
