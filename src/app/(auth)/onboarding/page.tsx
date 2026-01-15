"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  Sprout,
  BookOpen,
  Home as HomeIcon,
  Heart,
  Sun,
  ArrowRight,
  ArrowLeft,
  MapPin,
  Sparkles,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useDemo } from "@/lib/demo"
import type { Category } from "@/types"
import { CATEGORY_LABELS } from "@/types"

const categoryOptions: { id: Category; icon: typeof Sprout; color: string }[] = [
  { id: "food_access", icon: Sprout, color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  { id: "education", icon: BookOpen, color: "bg-amber-100 text-amber-700 border-amber-200" },
  { id: "housing", icon: HomeIcon, color: "bg-sky-100 text-sky-700 border-sky-200" },
  { id: "healthcare", icon: Heart, color: "bg-rose-100 text-rose-700 border-rose-200" },
  { id: "energy", icon: Sun, color: "bg-orange-100 text-orange-700 border-orange-200" },
]

const expertiseOptions = [
  "Community organizing",
  "Business management",
  "Marketing",
  "Finance/Accounting",
  "Nonprofit experience",
  "Teaching/Education",
  "Healthcare",
  "Technology",
  "Legal",
  "Fundraising",
  "Volunteer management",
  "Event planning",
]

const budgetOptions = [
  { label: "Under $10K", min: 0, max: 10000 },
  { label: "$10K - $50K", min: 10000, max: 50000 },
  { label: "$50K - $100K", min: 50000, max: 100000 },
  { label: "$100K - $250K", min: 100000, max: 250000 },
  { label: "$250K+", min: 250000, max: 1000000 },
]

export default function OnboardingPage() {
  const router = useRouter()
  const { user, completeOnboarding } = useDemo()
  const [step, setStep] = useState(1)
  const totalSteps = 4

  // Form state
  const [location, setLocation] = useState("")
  const [motivations, setMotivations] = useState("")
  const [impactInterests, setImpactInterests] = useState<Category[]>([])
  const [livedExperience, setLivedExperience] = useState("")
  const [expertise, setExpertise] = useState<string[]>([])
  const [budgetRange, setBudgetRange] = useState<{ min: number; max: number } | null>(null)

  const toggleCategory = (category: Category) => {
    setImpactInterests((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    )
  }

  const toggleExpertise = (skill: string) => {
    setExpertise((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    )
  }

  const handleComplete = () => {
    completeOnboarding({
      location,
      motivations,
      impactInterests,
      livedExperience,
      expertise,
      budgetRange: budgetRange
        ? { ...budgetRange, currency: "CAD" }
        : undefined,
    })
    router.push("/dashboard")
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return location.length > 0
      case 2:
        return motivations.length > 0 && impactInterests.length > 0
      case 3:
        return true // Optional step
      case 4:
        return true // Optional step
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen gradient-mesh">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Sprout className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-semibold">Venture Studio</span>
          </Link>
          <div className="text-sm text-muted-foreground">
            Step {step} of {totalSteps}
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="max-w-3xl mx-auto px-6 pt-8">
        <Progress value={(step / totalSteps) * 100} className="h-2" />
      </div>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-12">
        {/* Step 1: Location */}
        {step === 1 && (
          <div className="space-y-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h1 className="font-display text-3xl font-bold mb-2">
                Where are you located?
              </h1>
              <p className="text-muted-foreground">
                We&apos;ll customize playbooks and research for your community
              </p>
            </div>

            <Card>
              <CardContent className="p-6">
                <label htmlFor="location" className="text-sm font-medium block mb-2">
                  City or Region
                </label>
                <Input
                  id="location"
                  placeholder="e.g., Toronto, ON or Vancouver, BC"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="text-lg"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  This helps our AI agents research your local market
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 2: Motivations & Interests */}
        {step === 2 && (
          <div className="space-y-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h1 className="font-display text-3xl font-bold mb-2">
                What drives you?
              </h1>
              <p className="text-muted-foreground">
                Help us understand your motivations and interests
              </p>
            </div>

            <Card>
              <CardContent className="p-6 space-y-6">
                <div>
                  <label htmlFor="motivations" className="text-sm font-medium block mb-2">
                    Why do you want to start a social impact venture?
                  </label>
                  <textarea
                    id="motivations"
                    rows={4}
                    placeholder="Share your story... Maybe you grew up in a food desert, or you've seen how lack of education holds people back, or you want to address housing challenges in your community..."
                    value={motivations}
                    onChange={(e) => setMotivations(e.target.value)}
                    className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium block mb-3">
                    Which impact areas interest you? (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {categoryOptions.map(({ id, icon: Icon, color }) => (
                      <button
                        key={id}
                        onClick={() => toggleCategory(id)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          impactInterests.includes(id)
                            ? `${color} border-current`
                            : "border-border hover:border-muted-foreground/50"
                        }`}
                      >
                        <Icon className="w-6 h-6 mx-auto mb-2" />
                        <span className="text-sm font-medium">
                          {CATEGORY_LABELS[id]}
                        </span>
                        {impactInterests.includes(id) && (
                          <Check className="w-4 h-4 mx-auto mt-1" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 3: Experience & Expertise */}
        {step === 3 && (
          <div className="space-y-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h1 className="font-display text-3xl font-bold mb-2">
                What do you bring?
              </h1>
              <p className="text-muted-foreground">
                Tell us about your experience and skills (optional)
              </p>
            </div>

            <Card>
              <CardContent className="p-6 space-y-6">
                <div>
                  <label htmlFor="livedExperience" className="text-sm font-medium block mb-2">
                    Lived Experience
                  </label>
                  <textarea
                    id="livedExperience"
                    rows={3}
                    placeholder="Have you personally experienced the problem you want to solve? Share if you're comfortable..."
                    value={livedExperience}
                    onChange={(e) => setLivedExperience(e.target.value)}
                    className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium block mb-3">
                    Skills & Expertise (Select all that apply)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {expertiseOptions.map((skill) => (
                      <button
                        key={skill}
                        onClick={() => toggleExpertise(skill)}
                        className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                          expertise.includes(skill)
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                        }`}
                      >
                        {skill}
                        {expertise.includes(skill) && (
                          <Check className="w-3 h-3 inline ml-1" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 4: Budget */}
        {step === 4 && (
          <div className="space-y-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h1 className="font-display text-3xl font-bold mb-2">
                What&apos;s your budget?
              </h1>
              <p className="text-muted-foreground">
                This helps us recommend appropriate playbooks (optional)
              </p>
            </div>

            <Card>
              <CardContent className="p-6">
                <label className="text-sm font-medium block mb-3">
                  Available startup capital
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {budgetOptions.map((option) => (
                    <button
                      key={option.label}
                      onClick={() =>
                        setBudgetRange(
                          budgetRange?.min === option.min
                            ? null
                            : { min: option.min, max: option.max }
                        )
                      }
                      className={`p-4 rounded-xl border-2 transition-all ${
                        budgetRange?.min === option.min
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-muted-foreground/50"
                      }`}
                    >
                      <span className="font-medium">{option.label}</span>
                      {budgetRange?.min === option.min && (
                        <Check className="w-4 h-4 mx-auto mt-1 text-primary" />
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  Don&apos;t worry if you&apos;re not sure yet. Contributors can help fund your venture.
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => setStep((s) => s - 1)}
            disabled={step === 1}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          {step < totalSteps ? (
            <Button onClick={() => setStep((s) => s + 1)} disabled={!canProceed()}>
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleComplete}>
              Complete Setup
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>

        {/* Skip option for optional steps */}
        {(step === 3 || step === 4) && (
          <p className="text-center text-sm text-muted-foreground mt-4">
            <button
              onClick={() => (step === 4 ? handleComplete() : setStep((s) => s + 1))}
              className="hover:underline"
            >
              Skip this step
            </button>
          </p>
        )}
      </main>
    </div>
  )
}
