import { Suspense } from "react"
import Link from "next/link"
import { Sprout, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PlaybookGrid, CategoryFilter } from "@/components/playbooks"
import { playbooks, getPlaybooksByCategory } from "@/data/playbooks"
import type { Category } from "@/types"

interface PlaybooksPageProps {
  searchParams: Promise<{ category?: string; q?: string }>
}

export const metadata = {
  title: "Browse Playbooks | AI Venture Studio for Good",
  description:
    "Explore proven social impact venture playbooks across food access, education, housing, healthcare, and energy.",
}

async function PlaybooksList({
  category,
  search,
}: {
  category?: string
  search?: string
}) {
  let filteredPlaybooks = playbooks

  // Filter by category
  if (category && category !== "all") {
    filteredPlaybooks = getPlaybooksByCategory(category as Category)
  }

  // Filter by search
  if (search) {
    const lowerSearch = search.toLowerCase()
    filteredPlaybooks = filteredPlaybooks.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerSearch) ||
        p.description.toLowerCase().includes(lowerSearch) ||
        p.tags.some((tag) => tag.toLowerCase().includes(lowerSearch))
    )
  }

  return <PlaybookGrid playbooks={filteredPlaybooks} />
}

export default async function PlaybooksPage({ searchParams }: PlaybooksPageProps) {
  const params = await searchParams
  const category = params.category
  const search = params.q

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
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/playbooks"
              className="text-foreground font-medium transition-colors"
            >
              Playbooks
            </Link>
            <Link
              href="/about"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href="/stories"
              className="text-muted-foreground hover:text-foreground transition-colors"
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

      {/* Header */}
      <header className="bg-secondary/30 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Explore Playbooks
            </h1>
            <p className="text-lg text-muted-foreground">
              Browse our catalog of proven social impact ventures. Each playbook
              provides step-by-step guidance to launch in your community.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Filters */}
        <div className="mb-10">
          <h2 className="text-sm font-medium text-muted-foreground mb-4">
            Filter by category
          </h2>
          <Suspense fallback={<div className="h-10" />}>
            <CategoryFilter />
          </Suspense>
        </div>

        {/* Results info */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-muted-foreground">
            {category && category !== "all" ? (
              <>
                Showing playbooks in{" "}
                <span className="text-foreground font-medium capitalize">
                  {category.replace("_", " ")}
                </span>
              </>
            ) : (
              <>Showing all playbooks</>
            )}
          </p>
        </div>

        {/* Playbooks Grid */}
        <Suspense
          fallback={
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-80 rounded-xl bg-muted animate-pulse"
                />
              ))}
            </div>
          }
        >
          <PlaybooksList category={category} search={search} />
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="py-12 bg-card border-t border-border mt-16">
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
