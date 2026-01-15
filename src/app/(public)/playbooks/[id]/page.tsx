import { notFound } from "next/navigation"
import Link from "next/link"
import {
  Sprout,
  BookOpen,
  Home as HomeIcon,
  Heart,
  Sun,
  Clock,
  DollarSign,
  ArrowRight,
  CheckCircle2,
  Users,
  MapPin,
  Briefcase,
  ArrowLeft,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { getPlaybookById, playbooks } from "@/data/playbooks"
import { getStepsForPlaybook } from "@/data/steps"
import type { Category } from "@/types"

const categoryIcons: Record<Category, typeof Sprout> = {
  food_access: Sprout,
  education: BookOpen,
  housing: HomeIcon,
  healthcare: Heart,
  energy: Sun,
}

const categoryColors: Record<Category, { bg: string; text: string }> = {
  food_access: { bg: "bg-emerald-100", text: "text-emerald-700" },
  education: { bg: "bg-amber-100", text: "text-amber-700" },
  housing: { bg: "bg-sky-100", text: "text-sky-700" },
  healthcare: { bg: "bg-rose-100", text: "text-rose-700" },
  energy: { bg: "bg-orange-100", text: "text-orange-700" },
}

interface PlaybookPageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return playbooks.map((playbook) => ({
    id: playbook.id,
  }))
}

export async function generateMetadata({ params }: PlaybookPageProps) {
  const { id } = await params
  const playbook = getPlaybookById(id)

  if (!playbook) {
    return { title: "Playbook Not Found" }
  }

  return {
    title: `${playbook.name} | AI Venture Studio for Good`,
    description: playbook.description.split("\n")[0],
  }
}

export default async function PlaybookPage({ params }: PlaybookPageProps) {
  const { id } = await params
  const playbook = getPlaybookById(id)

  if (!playbook) {
    notFound()
  }

  const steps = getStepsForPlaybook(playbook.stepSequence)
  const Icon = categoryIcons[playbook.category]
  const colors = categoryColors[playbook.category]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: playbook.startupCostRange.currency,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const totalStepCost = steps.reduce((sum, step) => sum + step.estimatedCost, 0)

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Sprout className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-semibold tracking-tight">
              Venture Studio
            </span>
          </Link>
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

      {/* Back link */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <Link
          href="/playbooks"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Playbooks
        </Link>
      </div>

      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main info */}
          <div className="lg:col-span-2">
            <div className="flex items-start gap-4 mb-6">
              <div
                className={`w-16 h-16 rounded-2xl ${colors.bg} ${colors.text} flex items-center justify-center`}
              >
                <Icon className="w-8 h-8" />
              </div>
              <div>
                <Badge variant="secondary" className="mb-2">
                  {playbook.category.replace("_", " ")}
                </Badge>
                <h1 className="font-display text-3xl md:text-4xl font-bold">
                  {playbook.name}
                </h1>
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-lg max-w-none text-muted-foreground">
              {playbook.description.split("\n\n").map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {/* Problem & Impact */}
            <div className="grid md:grid-cols-2 gap-6 mt-10">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-destructive/10 text-destructive flex items-center justify-center">
                      !
                    </span>
                    Problem Addressed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {playbook.problemAddressed}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4" />
                    </span>
                    Expected Impact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {playbook.expectedImpact}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6 space-y-6">
                {/* Quick stats */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Startup Cost
                      </p>
                      <p className="font-semibold">
                        {formatCurrency(playbook.startupCostRange.min)} -{" "}
                        {formatCurrency(playbook.startupCostRange.max)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Time to Launch
                      </p>
                      <p className="font-semibold">
                        {playbook.timelineMonths.min}-
                        {playbook.timelineMonths.max} months
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        AI Agent Steps
                      </p>
                      <p className="font-semibold">
                        {steps.length} steps (${totalStepCost} total)
                      </p>
                    </div>
                  </div>
                </div>

                <hr />

                {/* CTA */}
                <div className="space-y-3">
                  <Button className="w-full" size="lg" asChild>
                    <Link href={`/ventures/new?playbook=${playbook.id}`}>
                      Start This Venture
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    Sign in or create a free account to launch this playbook
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </header>

      {/* Steps Section */}
      <section className="bg-secondary/30 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10">
            <h2 className="font-display text-2xl font-bold mb-2">
              AI Agent Steps
            </h2>
            <p className="text-muted-foreground">
              Our AI agents will guide you through these {steps.length} steps to
              launch your venture.
            </p>
          </div>

          <div className="space-y-4">
            {steps.map((step, index) => (
              <Card key={step.id} className="overflow-hidden">
                <div className="flex items-stretch">
                  {/* Step number */}
                  <div className="w-16 md:w-20 bg-primary/5 flex flex-col items-center justify-center border-r border-border">
                    <span className="font-display text-2xl font-bold text-primary">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                  </div>

                  {/* Step content */}
                  <div className="flex-1 p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h3 className="font-display text-lg font-semibold mb-1">
                          {step.name}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {step.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {step.estimatedDuration}
                        </span>
                        <Badge variant="outline">${step.estimatedCost}</Badge>
                      </div>
                    </div>

                    {/* Outputs */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {step.outputsProduced.map((output) => (
                        <span
                          key={output.name}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-primary/5 text-primary text-xs rounded"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          {output.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Required Expertise */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-2xl font-bold mb-8">
            Required Expertise
          </h2>
          <div className="flex flex-wrap gap-3">
            {playbook.requiredExpertise.map((skill) => (
              <Badge key={skill} variant="secondary" className="text-sm py-2 px-4">
                {skill}
              </Badge>
            ))}
          </div>
          <p className="text-muted-foreground text-sm mt-4">
            Don&apos;t have all these skills? Our AI agents and community resources
            can help fill the gaps.
          </p>
        </div>
      </section>

      {/* Success Stories */}
      {playbook.successStories.length > 0 && (
        <section className="py-16 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-display text-2xl font-bold mb-8">
              Success Stories
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {playbook.successStories.map((story, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span className="font-semibold">{story.location}</span>
                      <span className="text-muted-foreground text-sm">
                        ({story.year})
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {story.outcomes}
                    </p>
                    {story.link && (
                      <a
                        href={story.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-primary text-sm mt-4 hover:underline"
                      >
                        Learn more
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Ready to Launch a {playbook.name}?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8">
            Create a free account and start building your social impact venture
            today.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-primary hover:bg-white/90"
            asChild
          >
            <Link href={`/ventures/new?playbook=${playbook.id}`}>
              Get Started Free
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Sprout className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-display font-semibold">
                Venture Studio for Good
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} AI Venture Studio for Good
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
