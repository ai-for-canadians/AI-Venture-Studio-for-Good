"use client"

import { useEffect, useState } from "react"
import {
  Sprout,
  BookOpen,
  Home as HomeIcon,
  Heart,
  Sun,
  TrendingUp,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { CATEGORY_LABELS } from "@/types"
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

interface PlaybookStat {
  id: string
  name: string
  category: Category
  ventureCount: number
  activeVentures: number
  launchedVentures: number
  totalContributions: number
}

interface CategoryStat {
  playbookCount: number
  ventureCount: number
  contributions: number
}

interface PlaybookStatsResponse {
  playbooks: PlaybookStat[]
  categories: Record<string, CategoryStat>
  totals: {
    totalPlaybooks: number
    totalVentures: number
    totalContributions: number
  }
}

export default function AdminPlaybooksPage() {
  const [data, setData] = useState<PlaybookStatsResponse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/admin/playbooks/stats")
        if (res.ok) {
          const json = await res.json()
          setData(json)
        }
      } catch (error) {
        console.error("Failed to fetch playbook stats:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
    }).format(cents / 100)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold">Playbook Analytics</h1>
          <p className="text-muted-foreground mt-1">View playbook usage statistics</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <Skeleton className="h-16 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold">Playbook Analytics</h1>
        <p className="text-muted-foreground mt-1">
          View playbook usage statistics (read-only)
        </p>
      </div>

      {/* Category breakdown */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {(Object.keys(categoryIcons) as Category[]).map((category) => {
          const Icon = categoryIcons[category]
          const color = categoryColors[category]
          const stats = data?.categories[category]

          return (
            <Card key={category}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{CATEGORY_LABELS[category]}</p>
                    <p className="text-xs text-muted-foreground">
                      {stats?.playbookCount || 0} playbooks
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Ventures</p>
                    <p className="font-semibold">{stats?.ventureCount || 0}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Funding</p>
                    <p className="font-semibold">
                      {formatCurrency(stats?.contributions || 0)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Summary stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{data?.totals.totalPlaybooks || 0}</p>
                <p className="text-sm text-muted-foreground">Total Playbooks</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{data?.totals.totalVentures || 0}</p>
                <p className="text-sm text-muted-foreground">Ventures Created</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <Sprout className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {formatCurrency(data?.totals.totalContributions || 0)}
                </p>
                <p className="text-sm text-muted-foreground">Total Contributions</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Playbook table */}
      <Card>
        <CardHeader>
          <CardTitle>All Playbooks</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Playbook</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Ventures</TableHead>
                <TableHead className="text-right">Active</TableHead>
                <TableHead className="text-right">Launched</TableHead>
                <TableHead className="text-right">Contributions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.playbooks && data.playbooks.length > 0 ? (
                data.playbooks.map((playbook) => {
                  const Icon = categoryIcons[playbook.category]
                  const color = categoryColors[playbook.category]

                  return (
                    <TableRow key={playbook.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="font-medium">{playbook.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {CATEGORY_LABELS[playbook.category]}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {playbook.ventureCount}
                      </TableCell>
                      <TableCell className="text-right">
                        {playbook.activeVentures}
                      </TableCell>
                      <TableCell className="text-right">
                        {playbook.launchedVentures}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(playbook.totalContributions)}
                      </TableCell>
                    </TableRow>
                  )
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No playbook data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
