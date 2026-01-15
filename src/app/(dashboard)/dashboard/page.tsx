"use client"

import Link from "next/link"
import {
  Sprout,
  BookOpen,
  Home as HomeIcon,
  Heart,
  Sun,
  ArrowRight,
  Plus,
  Rocket,
  Sparkles,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useDemo } from "@/lib/demo"
import { getRecommendedPlaybooks, matchPlaybooksToUser } from "@/lib/demo/playbook-matcher"
import { getPlaybookById } from "@/data/playbooks"
import type { Category } from "@/types"

const categoryIcons: Record<Category, typeof Sprout> = {
  food_access: Sprout,
  education: BookOpen,
  housing: HomeIcon,
  healthcare: Heart,
  energy: Sun,
}

const categoryColors: Record<Category, string> = {
  food_access: "bg-emerald-100 text-emerald-700",
  education: "bg-amber-100 text-amber-700",
  housing: "bg-sky-100 text-sky-700",
  healthcare: "bg-rose-100 text-rose-700",
  energy: "bg-orange-100 text-orange-700",
}

export default function DashboardPage() {
  const { user, ventures } = useDemo()

  // Get matched playbooks based on user profile
  const matchedPlaybooks = user ? matchPlaybooksToUser(user) : []
  const recommendedPlaybooks = matchedPlaybooks.slice(0, 3)

  // Calculate stats
  const activeVentures = ventures.filter((v) => v.status === "active" || v.status === "draft")
  const totalStepsCompleted = ventures.reduce(
    (sum, v) => sum + v.completedSteps.length,
    0
  )

  return (
    <div className="space-y-8">
      {/* Welcome section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">
            Welcome back, {user?.name?.split(" ")[0] || "there"}!
          </h1>
          <p className="text-muted-foreground mt-1">
            {ventures.length === 0
              ? "Ready to launch your first venture?"
              : `You have ${activeVentures.length} active venture${activeVentures.length !== 1 ? "s" : ""}`}
          </p>
        </div>
        <Button asChild>
          <Link href="/playbooks">
            <Plus className="w-4 h-4 mr-2" />
            Start New Venture
          </Link>
        </Button>
      </div>

      {/* Stats cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Rocket className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{ventures.length}</p>
                <p className="text-sm text-muted-foreground">Total Ventures</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalStepsCompleted}</p>
                <p className="text-sm text-muted-foreground">Steps Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{user?.credits || 0}</p>
                <p className="text-sm text-muted-foreground">Credits Available</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active ventures */}
      {ventures.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl font-semibold">Your Ventures</h2>
            <Link
              href="/ventures"
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ventures.slice(0, 3).map((venture) => {
              const playbook = getPlaybookById(venture.playbookId)
              const Icon = playbook ? categoryIcons[playbook.category] : Rocket
              const color = playbook ? categoryColors[playbook.category] : "bg-primary/10 text-primary"
              const progress =
                playbook && playbook.stepSequence.length > 0
                  ? (venture.completedSteps.length / playbook.stepSequence.length) * 100
                  : 0

              return (
                <Link key={venture.id} href={`/ventures/${venture.id}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div
                          className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold truncate">{venture.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {venture.location}
                          </p>
                        </div>
                        <Badge
                          variant={
                            venture.status === "active" ? "default" : "secondary"
                          }
                        >
                          {venture.status}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">
                            {venture.completedSteps.length}/
                            {playbook?.stepSequence.length || 8} steps
                          </span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* Recommended playbooks */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-display text-xl font-semibold">
              Recommended for You
            </h2>
            <p className="text-sm text-muted-foreground">
              Based on your interests and motivations
            </p>
          </div>
          <Link
            href="/playbooks"
            className="text-sm text-primary hover:underline flex items-center gap-1"
          >
            Browse all
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {recommendedPlaybooks.map(({ playbook, score, reasons }) => {
            const Icon = categoryIcons[playbook.category]
            const color = categoryColors[playbook.category]

            return (
              <Card
                key={playbook.id}
                className="group hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center transition-transform group-hover:scale-110`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <Badge variant="outline" className="mb-1">
                        {score}% match
                      </Badge>
                    </div>
                  </div>

                  <h3 className="font-display font-semibold mb-2 group-hover:text-primary transition-colors">
                    {playbook.name}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {playbook.description.split("\n")[0]}
                  </p>

                  {reasons.length > 0 && (
                    <div className="space-y-1 mb-4">
                      {reasons.slice(0, 2).map((reason, i) => (
                        <p key={i} className="text-xs text-primary flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          {reason}
                        </p>
                      ))}
                    </div>
                  )}

                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href={`/playbooks/${playbook.id}`}>
                      View Playbook
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Quick actions */}
      {user?.impactInterests?.length === 0 && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Complete your profile</h3>
              <p className="text-sm text-muted-foreground">
                Add your interests to get better playbook recommendations
              </p>
            </div>
            <Button asChild>
              <Link href="/profile">
                Update Profile
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
