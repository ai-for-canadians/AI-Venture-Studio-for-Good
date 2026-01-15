"use client"

import { useRouter, useSearchParams } from "next/navigation"
import {
  Sprout,
  BookOpen,
  Home as HomeIcon,
  Heart,
  Sun,
  LayoutGrid,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { Category } from "@/types"
import { CATEGORY_LABELS } from "@/types"

const categoryIcons: Record<Category | "all", typeof Sprout> = {
  all: LayoutGrid,
  food_access: Sprout,
  education: BookOpen,
  housing: HomeIcon,
  healthcare: Heart,
  energy: Sun,
}

const categoryColors: Record<Category | "all", string> = {
  all: "hover:bg-primary/10 hover:text-primary data-[active=true]:bg-primary data-[active=true]:text-primary-foreground",
  food_access:
    "hover:bg-emerald-100 hover:text-emerald-700 data-[active=true]:bg-emerald-600 data-[active=true]:text-white",
  education:
    "hover:bg-amber-100 hover:text-amber-700 data-[active=true]:bg-amber-600 data-[active=true]:text-white",
  housing:
    "hover:bg-sky-100 hover:text-sky-700 data-[active=true]:bg-sky-600 data-[active=true]:text-white",
  healthcare:
    "hover:bg-rose-100 hover:text-rose-700 data-[active=true]:bg-rose-600 data-[active=true]:text-white",
  energy:
    "hover:bg-orange-100 hover:text-orange-700 data-[active=true]:bg-orange-600 data-[active=true]:text-white",
}

interface CategoryFilterProps {
  className?: string
}

export function CategoryFilter({ className }: CategoryFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get("category") || "all"

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (category === "all") {
      params.delete("category")
    } else {
      params.set("category", category)
    }
    router.push(`/playbooks?${params.toString()}`)
  }

  const categories: (Category | "all")[] = [
    "all",
    "food_access",
    "education",
    "housing",
    "healthcare",
    "energy",
  ]

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {categories.map((category) => {
        const Icon = categoryIcons[category]
        const isActive = currentCategory === category
        const label = category === "all" ? "All Categories" : CATEGORY_LABELS[category]

        return (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            data-active={isActive}
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
              "border border-border bg-card",
              categoryColors[category]
            )}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        )
      })}
    </div>
  )
}
