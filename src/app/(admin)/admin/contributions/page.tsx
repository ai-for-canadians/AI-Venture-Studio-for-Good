"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  Search,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Calendar,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
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

interface Contribution {
  id: string
  ventureId: string
  ventureName: string
  stepId: string | null
  contributorName: string
  contributorEmail: string
  amount: number
  currency: string
  message: string | null
  stripePaymentId: string | null
  createdAt: string
}

interface ContributionsResponse {
  data: Contribution[]
  total: number
  page: number
  pageSize: number
  totalPages: number
  totalRevenue: number
}

export default function AdminContributionsPage() {
  const [data, setData] = useState<ContributionsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  useEffect(() => {
    fetchContributions()
  }, [page])

  async function fetchContributions() {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: "20",
      })
      if (startDate) params.set("startDate", startDate)
      if (endDate) params.set("endDate", endDate)

      const res = await fetch(`/api/admin/contributions?${params}`)
      if (res.ok) {
        const json = await res.json()
        setData(json)
      }
    } catch (error) {
      console.error("Failed to fetch contributions:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1)
    fetchContributions()
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-CA", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatCurrency = (cents: number, currency = "CAD") => {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency,
    }).format(cents / 100)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold">Contributions</h1>
        <p className="text-muted-foreground mt-1">
          Track all platform contributions and revenue
        </p>
      </div>

      {/* Revenue summary */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center">
              <DollarSign className="w-7 h-7 text-green-600" />
            </div>
            <div>
              <p className="text-3xl font-bold">
                {formatCurrency(data?.totalRevenue || 0)}
              </p>
              <p className="text-muted-foreground">Total Revenue (All Time)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <form onSubmit={handleFilter} className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-auto"
                placeholder="Start date"
              />
              <span className="text-muted-foreground">to</span>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-auto"
                placeholder="End date"
              />
            </div>
            <Button type="submit">Filter</Button>
            {(startDate || endDate) && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setStartDate("")
                  setEndDate("")
                  setPage(1)
                  setTimeout(fetchContributions, 0)
                }}
              >
                Clear
              </Button>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contributor</TableHead>
                <TableHead>Venture</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                  </TableRow>
                ))
              ) : data?.data && data.data.length > 0 ? (
                data.data.map((contribution) => (
                  <TableRow key={contribution.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{contribution.contributorName}</p>
                        <p className="text-sm text-muted-foreground">
                          {contribution.contributorEmail}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/admin/ventures/${contribution.ventureId}`}
                        className="hover:underline"
                      >
                        {contribution.ventureName}
                      </Link>
                      {contribution.stepId && (
                        <Badge variant="outline" className="ml-2 text-xs">
                          Step: {contribution.stepId.replace(/-/g, " ")}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatCurrency(contribution.amount, contribution.currency)}
                    </TableCell>
                    <TableCell className="max-w-[200px]">
                      {contribution.message ? (
                        <p className="truncate text-sm italic">
                          &ldquo;{contribution.message}&rdquo;
                        </p>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>{formatDate(contribution.createdAt)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No contributions found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      {data && data.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {((page - 1) * 20) + 1} to {Math.min(page * 20, data.total)} of {data.total} contributions
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm">
              Page {page} of {data.totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => p + 1)}
              disabled={page === data.totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
