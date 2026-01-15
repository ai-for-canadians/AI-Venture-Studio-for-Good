import { communityGroceryCoop } from "./food-access/community-grocery-coop"
import { tutoringProgram } from "./education/tutoring-program"
import { communityClinic } from "./healthcare/community-clinic"
import type { Playbook, Category } from "@/types"

export const playbooks: Playbook[] = [
  communityGroceryCoop,
  tutoringProgram,
  communityClinic,
]

export const playbooksByCategory: Record<Category, Playbook[]> = {
  food_access: playbooks.filter((p) => p.category === "food_access"),
  education: playbooks.filter((p) => p.category === "education"),
  housing: playbooks.filter((p) => p.category === "housing"),
  healthcare: playbooks.filter((p) => p.category === "healthcare"),
  energy: playbooks.filter((p) => p.category === "energy"),
}

export function getPlaybookById(id: string): Playbook | undefined {
  return playbooks.find((p) => p.id === id)
}

export function getPlaybooksByCategory(category: Category): Playbook[] {
  return playbooksByCategory[category] || []
}

export function searchPlaybooks(query: string): Playbook[] {
  const lowerQuery = query.toLowerCase()
  return playbooks.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  )
}

export { communityGroceryCoop, tutoringProgram, communityClinic }
