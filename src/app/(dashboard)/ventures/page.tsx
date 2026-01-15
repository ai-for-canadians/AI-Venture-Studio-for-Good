"use client"

import Link from "next/link"
import {
  Sprout,
  BookOpen,
  Home as HomeIcon,
  Heart,
  Sun,
  Plus,
  Rocket,
  ArrowRight,
  Calendar,
  MapPin,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useDemo } from "@/lib/demo"
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

export default function VenturesPage() {
  const { ventures } = useDemo()

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">My Ventures</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track your social impact ventures
          </p>
        </div>
        <Button asChild>
          <Link href="/playbooks">
            <Plus className="w-4 h-4 mr-2" />
            Start New Venture
          </Link>
        </Button>
      </div>

      {/* Ventures list */}
      {ventures.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Rocket className="w-8 h-8 text-primary" />
            </div>
            <h2 className="font-display text-xl font-semibold mb-2">
              No ventures yet
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Start your first social impact venture by choosing a playbook that
              matches your interests and community needs.
            </p>
            <Button asChild>
              <Link href="/playbooks">
                Browse Playbooks
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {ventures.map((venture) => {
            const playbook = getPlaybookById(venture.playbookId)
            const Icon = playbook ? categoryIcons[playbook.category] : Rocket
            const color = playbook
              ? categoryColors[playbook.category]
              : "bg-primary/10 text-primary"
            const progress =
              playbook && playbook.stepSequence.length > 0
                ? (venture.completedSteps.length / playbook.stepSequence.length) * 100
                : 0

            return (
              <Link key={venture.id} href={`/ventures/${venture.id}`}>
                <Card className="h-full hover:shadow-lg transition-all cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-6">
                      <div
                        className={`w-14 h-14 rounded-xl ${color} flex items-center justify-center transition-transform group-hover:scale-110`}
                      >
                        <Icon className="w-7 h-7" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-display text-lg font-semibold truncate group-hover:text-primary transition-colors">
                            {venture.name}
                          </h3>
                          <Badge
                            variant={
                              venture.status === "active"
                                ? "default"
                                : venture.status === "launched"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {venture.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {playbook?.name || "Custom Venture"}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {venture.location}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {new Date(venture.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Step Progress
                        </span>
                        <span className="font-medium">
                          {venture.completedSteps.length}/
                          {playbook?.stepSequence.length || 8} completed
                        </span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>

                    <div className="mt-4 flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      View & Execute Steps
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
