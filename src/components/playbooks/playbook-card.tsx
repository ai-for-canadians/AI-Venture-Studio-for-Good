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
} from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Playbook, Category } from "@/types"

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

interface PlaybookCardProps {
  playbook: Playbook
}

export function PlaybookCard({ playbook }: PlaybookCardProps) {
  const Icon = categoryIcons[playbook.category]
  const colorClass = categoryColors[playbook.category]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: playbook.startupCostRange.currency,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <Link href={`/playbooks/${playbook.id}`} className="group block">
      <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/30 overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between gap-4">
            <div
              className={`w-12 h-12 rounded-xl ${colorClass} flex items-center justify-center transition-transform group-hover:scale-110`}
            >
              <Icon className="w-6 h-6" />
            </div>
            <Badge variant="secondary" className="text-xs">
              {playbook.stepSequence.length} steps
            </Badge>
          </div>

          <div className="mt-4">
            <h3 className="font-display text-xl font-semibold group-hover:text-primary transition-colors">
              {playbook.name}
            </h3>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-sm line-clamp-3">
            {playbook.description.split("\n")[0]}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <DollarSign className="w-4 h-4 text-primary" />
              <span>
                {formatCurrency(playbook.startupCostRange.min)} -{" "}
                {formatCurrency(playbook.startupCostRange.max)}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4 text-primary" />
              <span>
                {playbook.timelineMonths.min}-{playbook.timelineMonths.max} months
              </span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {playbook.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-secondary text-secondary-foreground text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
            {playbook.tags.length > 3 && (
              <span className="px-2 py-0.5 text-muted-foreground text-xs">
                +{playbook.tags.length - 3} more
              </span>
            )}
          </div>

          {/* CTA */}
          <div className="pt-4 flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            View Playbook
            <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
