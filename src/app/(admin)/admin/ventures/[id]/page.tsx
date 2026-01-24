"use client"

import { useEffect, useState, use } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  MapPin,
  Calendar,
  User,
  DollarSign,
  CheckCircle2,
  Clock,
  FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { getPlaybookById } from "@/data/playbooks"

interface VentureDetail {
  id: string
  name: string
  location: string
  status: string
  playbookId: string
  currentStep: string | null
  fundingReceived: number
  launcher: { id: string; name: string; email: string } | null
  createdAt: string
  updatedAt: string
}

interface VentureStep {
  id: string
  stepId: string
  status: string
  artifact: {
    type: string
    title: string
    content: string
  } | null
  executedAt: string | null
  cost: number
}

interface Contribution {
  id: string
  contributorName: string
  contributorEmail: string
  amount: number
  currency: string
  message: string | null
  createdAt: string
}

export default function AdminVentureDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()

  const [venture, setVenture] = useState<VentureDetail | null>(null)
  const [steps, setSteps] = useState<VentureStep[]>([])
  const [contributions, setContributions] = useState<Contribution[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [viewingArtifact, setViewingArtifact] = useState<string | null>(null)

  useEffect(() => {
    fetchVenture()
  }, [id])

  async function fetchVenture() {
    try {
      const res = await fetch(`/api/admin/ventures/${id}`)
      if (res.ok) {
        const data = await res.json()
        setVenture(data.venture)
        setSteps(data.steps)
        setContributions(data.contributions)
      } else if (res.status === 404) {
        router.push("/admin/ventures")
      }
    } catch (error) {
      console.error("Failed to fetch venture:", error)
    } finally {
      setLoading(false)
    }
  }

  async function handleStatusChange(newStatus: string) {
    setSaving(true)
    try {
      const res = await fetch(`/api/admin/ventures/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })
      if (res.ok) {
        await fetchVenture()
      }
    } catch (error) {
      console.error("Failed to update status:", error)
    } finally {
      setSaving(false)
    }
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-CA", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
    }).format(cents / 100)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <Skeleton className="h-32 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (!venture) {
    return <div>Venture not found</div>
  }

  const playbook = getPlaybookById(venture.playbookId)
  const completedSteps = steps.filter((s) => s.status === "completed").length
  const totalSteps = playbook?.stepSequence.length || 8
  const progress = (completedSteps / totalSteps) * 100

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link
        href="/admin/ventures"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Ventures
      </Link>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-display text-3xl font-bold">{venture.name}</h1>
            <Badge
              variant={
                venture.status === "active" || venture.status === "launched"
                  ? "default"
                  : "secondary"
              }
            >
              {venture.status}
            </Badge>
          </div>
          <p className="text-muted-foreground mt-1 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {venture.location}
            {playbook && (
              <>
                <span className="mx-2">•</span>
                {playbook.name}
              </>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select
            value={venture.status}
            onValueChange={handleStatusChange}
            disabled={saving}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="launched">Launched</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Steps Completed</span>
                <span className="font-medium">
                  {completedSteps} / {totalSteps}
                </span>
              </div>
              <Progress value={progress} className="h-3" />
            </CardContent>
          </Card>

          {/* Steps */}
          <Card>
            <CardHeader>
              <CardTitle>Executed Steps ({steps.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {steps.length > 0 ? (
                <div className="space-y-3">
                  {steps.map((step) => (
                    <div key={step.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span className="font-medium capitalize">
                            {step.stepId.replace(/-/g, " ")}
                          </span>
                        </div>
                        <Badge variant="secondary">{step.cost} credits</Badge>
                      </div>
                      {step.executedAt && (
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Executed {formatDate(step.executedAt)}
                        </p>
                      )}
                      {step.artifact && (
                        <div className="mt-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setViewingArtifact(
                                viewingArtifact === step.id ? null : step.id
                              )
                            }
                          >
                            <FileText className="w-4 h-4 mr-1" />
                            {viewingArtifact === step.id ? "Hide" : "View"} Artifact
                          </Button>
                          {viewingArtifact === step.id && (
                            <div className="mt-3 p-4 bg-muted/30 rounded-lg max-h-64 overflow-y-auto">
                              <h4 className="font-medium mb-2">{step.artifact.title}</h4>
                              <div className="prose prose-sm max-w-none text-sm">
                                <pre className="whitespace-pre-wrap font-sans">
                                  {step.artifact.content.slice(0, 1000)}
                                  {step.artifact.content.length > 1000 && "..."}
                                </pre>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  No steps executed yet
                </p>
              )}
            </CardContent>
          </Card>

          {/* Contributions */}
          <Card>
            <CardHeader>
              <CardTitle>Contributions ({contributions.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {contributions.length > 0 ? (
                <div className="space-y-3">
                  {contributions.map((contribution) => (
                    <div
                      key={contribution.id}
                      className="flex items-center justify-between py-3 border-b last:border-0"
                    >
                      <div>
                        <p className="font-medium">{contribution.contributorName}</p>
                        <p className="text-sm text-muted-foreground">
                          {contribution.contributorEmail}
                        </p>
                        {contribution.message && (
                          <p className="text-sm mt-1 italic">
                            &ldquo;{contribution.message}&rdquo;
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          {formatCurrency(contribution.amount)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(contribution.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  No contributions yet
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Launcher</CardTitle>
            </CardHeader>
            <CardContent>
              {venture.launcher ? (
                <Link
                  href={`/admin/users/${venture.launcher.id}`}
                  className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">
                      {venture.launcher.name || "No name"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {venture.launcher.email}
                    </p>
                  </div>
                </Link>
              ) : (
                <p className="text-muted-foreground">Unknown launcher</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Funding</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {formatCurrency(venture.fundingReceived)}
                  </p>
                  <p className="text-sm text-muted-foreground">Total received</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Timestamps</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created</span>
                <span>{formatDate(venture.createdAt)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Updated</span>
                <span>{formatDate(venture.updatedAt)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
