import { playbooks } from "@/data/playbooks"
import type { Playbook, Category, LauncherProfile } from "@/types"

interface MatchScore {
  playbook: Playbook
  score: number
  reasons: string[]
}

export function matchPlaybooksToUser(user: Partial<LauncherProfile>): MatchScore[] {
  const scores: MatchScore[] = playbooks.map((playbook) => {
    let score = 0
    const reasons: string[] = []

    // Match by impact interests (highest weight)
    if (user.impactInterests?.includes(playbook.category)) {
      score += 50
      reasons.push(`Matches your interest in ${playbook.category.replace("_", " ")}`)
    }

    // Match by budget
    if (user.budgetRange) {
      const userMax = user.budgetRange.max
      const playbookMin = playbook.startupCostRange.min
      if (userMax >= playbookMin) {
        score += 20
        reasons.push("Within your budget range")
      }
    }

    // Match by expertise
    if (user.expertise && user.expertise.length > 0) {
      const matchingSkills = user.expertise.filter((skill) =>
        playbook.requiredExpertise.some(
          (req) =>
            req.toLowerCase().includes(skill.toLowerCase()) ||
            skill.toLowerCase().includes(req.toLowerCase())
        )
      )
      if (matchingSkills.length > 0) {
        score += 15 * matchingSkills.length
        reasons.push(`Your skills match: ${matchingSkills.join(", ")}`)
      }
    }

    // Match by motivations keywords
    if (user.motivations) {
      const motivationLower = user.motivations.toLowerCase()
      const keywordMatches = playbook.tags.filter((tag) =>
        motivationLower.includes(tag.toLowerCase())
      )
      if (keywordMatches.length > 0) {
        score += 10 * keywordMatches.length
        reasons.push("Aligns with your motivations")
      }

      // Check for specific problem keywords
      if (
        motivationLower.includes("food") &&
        playbook.category === "food_access"
      ) {
        score += 25
        reasons.push("Addresses food-related motivations")
      }
      if (
        (motivationLower.includes("education") ||
          motivationLower.includes("learn") ||
          motivationLower.includes("teach")) &&
        playbook.category === "education"
      ) {
        score += 25
        reasons.push("Addresses education-related motivations")
      }
      if (
        (motivationLower.includes("health") ||
          motivationLower.includes("medical") ||
          motivationLower.includes("care")) &&
        playbook.category === "healthcare"
      ) {
        score += 25
        reasons.push("Addresses healthcare-related motivations")
      }
      if (
        (motivationLower.includes("house") ||
          motivationLower.includes("home") ||
          motivationLower.includes("rent")) &&
        playbook.category === "housing"
      ) {
        score += 25
        reasons.push("Addresses housing-related motivations")
      }
      if (
        (motivationLower.includes("energy") ||
          motivationLower.includes("solar") ||
          motivationLower.includes("climate")) &&
        playbook.category === "energy"
      ) {
        score += 25
        reasons.push("Addresses energy/climate motivations")
      }
    }

    // Lived experience boost
    if (user.livedExperience) {
      const expLower = user.livedExperience.toLowerCase()
      if (
        expLower.includes(playbook.category.replace("_", " ")) ||
        playbook.tags.some((tag) => expLower.includes(tag.toLowerCase()))
      ) {
        score += 20
        reasons.push("Connects to your lived experience")
      }
    }

    return { playbook, score, reasons }
  })

  // Sort by score descending
  return scores.sort((a, b) => b.score - a.score)
}

export function getRecommendedPlaybooks(
  user: Partial<LauncherProfile>,
  limit: number = 3
): Playbook[] {
  const matches = matchPlaybooksToUser(user)
  return matches.slice(0, limit).map((m) => m.playbook)
}

export function getMatchReasonsForPlaybook(
  user: Partial<LauncherProfile>,
  playbookId: string
): string[] {
  const matches = matchPlaybooksToUser(user)
  const match = matches.find((m) => m.playbook.id === playbookId)
  return match?.reasons || []
}
