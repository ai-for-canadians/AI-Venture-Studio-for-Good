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
// New categories
import { communityComposting } from "./environment/community-composting"
import { toolLibrary } from "./environment/tool-library"
import { microLendingCircle } from "./economic-empowerment/micro-lending-circle"
import { workerCooperative } from "./economic-empowerment/worker-cooperative"
import { childcareCooperative } from "./childcare-family/childcare-cooperative"
import { seniorCompanionProgram } from "./seniors/senior-companion-program"
import { bikeCooperative } from "./transportation/bike-cooperative"
import { volunteerDriverNetwork } from "./transportation/volunteer-driver-network"
import { digitalLiteracyProgram } from "./digital-inclusion/digital-literacy-program"
import { deviceLendingLibrary } from "./digital-inclusion/device-lending-library"
import { communityMakerspace } from "./arts-culture/community-makerspace"
import { reentrySupportProgram } from "./social-services/reentry-support-program"
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
  // Environment
  communityComposting,
  toolLibrary,
  // Economic Empowerment
  microLendingCircle,
  workerCooperative,
  // Childcare & Family
  childcareCooperative,
  // Seniors
  seniorCompanionProgram,
  // Transportation
  bikeCooperative,
  volunteerDriverNetwork,
  // Digital Inclusion
  digitalLiteracyProgram,
  deviceLendingLibrary,
  // Arts & Culture
  communityMakerspace,
  // Social Services
  reentrySupportProgram,
]

export const playbooksByCategory: Record<Category, Playbook[]> = {
  food_access: playbooks.filter((p) => p.category === "food_access"),
  education: playbooks.filter((p) => p.category === "education"),
  housing: playbooks.filter((p) => p.category === "housing"),
  healthcare: playbooks.filter((p) => p.category === "healthcare"),
  energy: playbooks.filter((p) => p.category === "energy"),
  environment: playbooks.filter((p) => p.category === "environment"),
  economic_empowerment: playbooks.filter((p) => p.category === "economic_empowerment"),
  childcare_family: playbooks.filter((p) => p.category === "childcare_family"),
  seniors: playbooks.filter((p) => p.category === "seniors"),
  transportation: playbooks.filter((p) => p.category === "transportation"),
  digital_inclusion: playbooks.filter((p) => p.category === "digital_inclusion"),
  arts_culture: playbooks.filter((p) => p.category === "arts_culture"),
  social_services: playbooks.filter((p) => p.category === "social_services"),
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
  // Environment
  communityComposting,
  toolLibrary,
  // Economic Empowerment
  microLendingCircle,
  workerCooperative,
  // Childcare & Family
  childcareCooperative,
  // Seniors
  seniorCompanionProgram,
  // Transportation
  bikeCooperative,
  volunteerDriverNetwork,
  // Digital Inclusion
  digitalLiteracyProgram,
  deviceLendingLibrary,
  // Arts & Culture
  communityMakerspace,
  // Social Services
  reentrySupportProgram,
}
