"use client"

import { useState, use } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  Sprout,
  BookOpen,
  Home as HomeIcon,
  Heart,
  Sun,
  ArrowLeft,
  Play,
  CheckCircle2,
  Lock,
  Clock,
  Loader2,
  FileText,
  Download,
  Share2,
  CreditCard,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useDemo } from "@/lib/demo"
import { getPlaybookById } from "@/data/playbooks"
import { getStepsForPlaybook, getStepById } from "@/data/steps"
import type { Category, StepStatus } from "@/types"

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

export default function VentureDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const { user, getVenture, executeStep } = useDemo()
  const [executingStep, setExecutingStep] = useState<string | null>(null)
  const [viewingArtifact, setViewingArtifact] = useState<string | null>(null)

  const venture = getVenture(id)

  if (!venture) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold mb-2">Venture not found</h1>
        <p className="text-muted-foreground mb-4">
          This venture doesn&apos;t exist or you don&apos;t have access.
        </p>
        <Button asChild>
          <Link href="/ventures">Back to Ventures</Link>
        </Button>
      </div>
    )
  }

  const playbook = getPlaybookById(venture.playbookId)
  const steps = playbook ? getStepsForPlaybook(playbook.stepSequence) : []
  const Icon = playbook ? categoryIcons[playbook.category] : Sprout
  const colors = playbook
    ? categoryColors[playbook.category]
    : { bg: "bg-primary/10", text: "text-primary" }

  const completedStepIds = venture.completedSteps.map((s) => s.stepId)
  const progress =
    steps.length > 0 ? (completedStepIds.length / steps.length) * 100 : 0

  const getStepStatus = (stepId: string, index: number): StepStatus => {
    if (completedStepIds.includes(stepId)) return "completed"
    if (executingStep === stepId) return "in_progress"
    // First step is always available, others need previous step completed
    if (index === 0 || completedStepIds.includes(steps[index - 1]?.id)) {
      return "available"
    }
    return "locked"
  }

  const handleExecuteStep = async (stepId: string) => {
    if (!user || user.credits < 25) {
      alert("Not enough credits! You need 25 credits to execute a step.")
      return
    }

    setExecutingStep(stepId)
    try {
      await executeStep(venture.id, stepId)
      setViewingArtifact(stepId)
    } catch (error) {
      console.error("Step execution failed:", error)
    } finally {
      setExecutingStep(null)
    }
  }

  const getArtifact = (stepId: string) => {
    return venture.completedSteps.find((s) => s.stepId === stepId)?.artifact
  }

  return (
    <div className="space-y-8">
      {/* Back link */}
      <Link
        href="/ventures"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Ventures
      </Link>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
        <div className="flex-1">
          <div className="flex items-start gap-4 mb-4">
            <div
              className={`w-16 h-16 rounded-2xl ${colors.bg} ${colors.text} flex items-center justify-center`}
            >
              <Icon className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="font-display text-3xl font-bold">{venture.name}</h1>
                <Badge
                  variant={venture.status === "active" ? "default" : "secondary"}
                >
                  {venture.status}
                </Badge>
              </div>
              <p className="text-muted-foreground">
                {playbook?.name} • {venture.location}
              </p>
            </div>
          </div>

          {/* Progress */}
          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Overall Progress</span>
              <span className="font-medium">
                {completedStepIds.length}/{steps.length} steps completed
              </span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>
        </div>

        {/* Action card */}
        <Card className="lg:w-80">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Your Credits</p>
                <p className="font-semibold">{user?.credits || 0} available</p>
              </div>
            </div>
            <hr />
            <div className="space-y-2">
              <Button className="w-full" variant="outline" asChild>
                <Link href={`/ventures/${venture.id}/share`}>
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Venture
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Steps */}
      <div>
        <h2 className="font-display text-xl font-semibold mb-4">
          AI Agent Steps
        </h2>
        <div className="space-y-4">
          {steps.map((step, index) => {
            const status = getStepStatus(step.id, index)
            const artifact = getArtifact(step.id)
            const isViewing = viewingArtifact === step.id

            return (
              <Card
                key={step.id}
                className={`overflow-hidden transition-all ${
                  status === "locked" ? "opacity-60" : ""
                } ${isViewing ? "ring-2 ring-primary" : ""}`}
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Step number */}
                  <div
                    className={`w-full lg:w-20 py-4 lg:py-0 flex items-center justify-center border-b lg:border-b-0 lg:border-r ${
                      status === "completed"
                        ? "bg-primary text-primary-foreground"
                        : status === "in_progress"
                        ? "bg-primary/20"
                        : "bg-muted/50"
                    }`}
                  >
                    {status === "completed" ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : status === "in_progress" ? (
                      <Loader2 className="w-6 h-6 animate-spin text-primary" />
                    ) : status === "locked" ? (
                      <Lock className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <span className="font-display text-xl font-bold">
                        {(index + 1).toString().padStart(2, "0")}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div>
                        <h3 className="font-display text-lg font-semibold mb-1">
                          {step.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {step.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {step.estimatedDuration}
                          </span>
                          <span className="flex items-center gap-1">
                            <CreditCard className="w-3 h-3" />
                            {step.estimatedCost} credits
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {status === "completed" && artifact && (
                          <Button
                            variant={isViewing ? "default" : "outline"}
                            size="sm"
                            onClick={() =>
                              setViewingArtifact(isViewing ? null : step.id)
                            }
                          >
                            <FileText className="w-4 h-4 mr-1" />
                            {isViewing ? "Hide" : "View"} Report
                          </Button>
                        )}
                        {status === "available" && (
                          <Button
                            size="sm"
                            onClick={() => handleExecuteStep(step.id)}
                            disabled={executingStep !== null}
                          >
                            <Play className="w-4 h-4 mr-1" />
                            Execute Step
                          </Button>
                        )}
                        {status === "in_progress" && (
                          <Button size="sm" disabled>
                            <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                            Executing...
                          </Button>
                        )}
                        {status === "locked" && (
                          <Badge variant="secondary">
                            <Lock className="w-3 h-3 mr-1" />
                            Locked
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Artifact viewer */}
                    {isViewing && artifact && (
                      <div className="mt-6 pt-6 border-t">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-semibold">{artifact.title}</h4>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                        </div>
                        <div className="prose prose-sm max-w-none bg-muted/30 rounded-lg p-6 max-h-96 overflow-y-auto">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: artifact.content
                                .replace(/^# /gm, "<h1>")
                                .replace(/^## /gm, "<h2>")
                                .replace(/^### /gm, "<h3>")
                                .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                                .replace(/\*(.*?)\*/g, "<em>$1</em>")
                                .replace(/^- /gm, "• ")
                                .replace(/\n/g, "<br>"),
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
