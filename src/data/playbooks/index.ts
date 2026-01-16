import { communityGroceryCoop } from "./food-access/community-grocery-coop"
import { foodRescueNetwork } from "./food-access/food-rescue-network"
import { communityKitchen } from "./food-access/community-kitchen"
import { tutoringProgram } from "./education/tutoring-program"
import { skillsBootcamp } from "./education/skills-bootcamp"
import { literacyProgram } from "./education/literacy-program"
import { communityClinic } from "./healthcare/community-clinic"
import { mentalHealthPeerSupport } from "./healthcare/mental-health-peer-support"
import { mobileHealthClinic } from "./healthcare/mobile-health-clinic"
import { affordableHousingCoop } from "./housing/affordable-housing-coop"
import { homeRepairProgram } from "./housing/home-repair-program"
import { communitySolar } from "./energy/community-solar"
import { energyEfficiencyProgram } from "./energy/energy-efficiency-program"
import type { Playbook, Category } from "@/types"

export const playbooks: Playbook[] = [
  // Food Access
  communityGroceryCoop,
  foodRescueNetwork,
  communityKitchen,
  // Education
  tutoringProgram,
  skillsBootcamp,
  literacyProgram,
  // Healthcare
  communityClinic,
  mentalHealthPeerSupport,
  mobileHealthClinic,
  // Housing
  affordableHousingCoop,
  homeRepairProgram,
  // Energy
  communitySolar,
  energyEfficiencyProgram,
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

export {
  // Food Access
  communityGroceryCoop,
  foodRescueNetwork,
  communityKitchen,
  // Education
  tutoringProgram,
  skillsBootcamp,
  literacyProgram,
  // Healthcare
  communityClinic,
  mentalHealthPeerSupport,
  mobileHealthClinic,
  // Housing
  affordableHousingCoop,
  homeRepairProgram,
  // Energy
  communitySolar,
  energyEfficiencyProgram,
}
