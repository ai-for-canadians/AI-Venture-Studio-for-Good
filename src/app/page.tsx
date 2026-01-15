import Link from "next/link"
import {
  Sprout,
  BookOpen,
  Home as HomeIcon,
  Heart,
  Sun,
  ArrowRight,
  Sparkles,
  Users,
  Target,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const categories = [
  {
    name: "Food Access",
    description: "Community groceries, food co-ops, urban farms",
    icon: Sprout,
    color: "bg-emerald-100 text-emerald-700",
    accent: "group-hover:bg-emerald-500",
  },
  {
    name: "Education",
    description: "Tutoring programs, skills training, after-school",
    icon: BookOpen,
    color: "bg-amber-100 text-amber-700",
    accent: "group-hover:bg-amber-500",
  },
  {
    name: "Housing",
    description: "Affordable housing co-ops, community land trusts",
    icon: HomeIcon,
    color: "bg-sky-100 text-sky-700",
    accent: "group-hover:bg-sky-500",
  },
  {
    name: "Healthcare",
    description: "Community clinics, mental health, preventive care",
    icon: Heart,
    color: "bg-rose-100 text-rose-700",
    accent: "group-hover:bg-rose-500",
  },
  {
    name: "Energy",
    description: "Community solar, efficiency programs, renewables",
    icon: Sun,
    color: "bg-orange-100 text-orange-700",
    accent: "group-hover:bg-orange-500",
  },
]

const steps = [
  {
    number: "01",
    title: "Choose a Playbook",
    description:
      "Browse our catalog of proven social impact ventures. Each playbook includes step-by-step guidance, cost estimates, and success stories.",
    icon: Target,
  },
  {
    number: "02",
    title: "Tell Us Your Story",
    description:
      "Share your motivations, location, and resources. We'll customize the playbook to fit your community's unique needs.",
    icon: Users,
  },
  {
    number: "03",
    title: "Let AI Agents Build It",
    description:
      "Our AI agents research your local market, draft your business plan, create outreach materials, and more—all tailored to your region.",
    icon: Sparkles,
  },
]

export default function Home() {
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
              className="text-muted-foreground hover:text-foreground transition-colors animated-underline"
            >
              Playbooks
            </Link>
            <Link
              href="/about"
              className="text-muted-foreground hover:text-foreground transition-colors animated-underline"
            >
              About
            </Link>
            <Link
              href="/stories"
              className="text-muted-foreground hover:text-foreground transition-colors animated-underline"
            >
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

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center gradient-mesh noise-overlay overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 blob-shape animate-float" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[hsl(var(--gold))]/10 blob-shape-2 animate-float" style={{ animationDelay: "-3s" }} />
        <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-[hsl(var(--sage))]/20 blob-shape animate-float" style={{ animationDelay: "-1.5s" }} />

        <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-20">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">AI-Powered Social Impact</span>
            </div>

            {/* Main heading */}
            <h1 className="animate-fade-in-up stagger-1 font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-balance mb-6">
              Launch a{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-primary">Social Impact</span>
                <svg
                  className="absolute -bottom-2 left-0 w-full h-4 text-primary/30"
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,8 Q50,0 100,8 T200,8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    className="animate-draw-line"
                  />
                </svg>
              </span>{" "}
              Venture in Your Community
            </h1>

            {/* Subheading */}
            <p className="animate-fade-in-up stagger-2 text-xl md:text-2xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
              Pick a proven playbook. Tell us your motivation.{" "}
              <span className="text-foreground font-medium">
                Let AI agents build it in your community.
              </span>
            </p>

            {/* CTA Buttons */}
            <div className="animate-fade-in-up stagger-3 flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8 py-6 group" asChild>
                <Link href="/playbooks">
                  Explore Playbooks
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6"
                asChild
              >
                <Link href="/about">How It Works</Link>
              </Button>
            </div>

            {/* Social proof */}
            <div className="animate-fade-in-up stagger-4 mt-16 flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-secondary border-2 border-background flex items-center justify-center text-xs font-medium text-muted-foreground"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Join <span className="text-foreground font-semibold">200+</span>{" "}
                community builders already launching ventures
              </p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center pt-2">
            <div className="w-1 h-2 bg-muted-foreground/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 md:py-32 bg-secondary/30 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg width="100%" height="100%">
            <pattern
              id="grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="30" cy="30" r="1" fill="currentColor" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Section header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Simple Process
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground">
              From idea to impact in three straightforward steps
            </p>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, index) => (
              <div key={step.number} className="relative group">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/20 to-transparent" />
                )}

                <div className="relative bg-card rounded-2xl p-8 shadow-sm border border-border/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  {/* Step number */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display font-bold text-lg shadow-lg">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 mt-4 group-hover:bg-primary/20 transition-colors">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>

                  <h3 className="font-display text-xl font-semibold mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
            <div>
              <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Impact Areas
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
                Choose Your Cause
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl">
                Our playbooks cover five key areas of social impact. Find the
                one that matches your passion.
              </p>
            </div>
            <Button variant="outline" className="self-start md:self-auto" asChild>
              <Link href="/playbooks">
                View All Playbooks
                <ChevronRight className="ml-1 w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Category cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/playbooks?category=${category.name.toLowerCase().replace(" ", "_")}`}
                className="group relative bg-card rounded-2xl p-6 border border-border/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-primary/30 overflow-hidden"
              >
                {/* Hover background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative">
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl ${category.color} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}
                  >
                    <category.icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-display text-lg font-semibold mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>

                  {/* Arrow indicator */}
                  <div className="mt-4 flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore
                    <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[hsl(var(--forest))]" />
        <div className="absolute inset-0 noise-overlay opacity-10" />

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-white/5 blob-shape" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/5 blob-shape-2" />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
            Your community is waiting. Start with a proven playbook and let our
            AI agents help you build something meaningful.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-6 bg-white text-primary hover:bg-white/90"
              asChild
            >
              <Link href="/register">
                Start Your Venture
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-white/30 text-primary-foreground hover:bg-white/10"
              asChild
            >
              <Link href="/playbooks">Browse Playbooks</Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-8 text-primary-foreground/60">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
              <span>Pay per step, not subscription</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
              <span>Community-focused support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <Sprout className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-display text-xl font-semibold">
                  Venture Studio for Good
                </span>
              </Link>
              <p className="text-muted-foreground max-w-md">
                Empowering community builders to launch proven social impact
                ventures with AI-powered guidance and support.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-display font-semibold mb-4">Platform</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/playbooks"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Playbooks
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/stories"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Success Stories
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-semibold mb-4">Company</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} AI Venture Studio for Good. All
              rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Made with care for community builders everywhere.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
