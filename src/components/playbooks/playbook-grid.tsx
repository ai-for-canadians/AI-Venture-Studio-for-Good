import { PlaybookCard } from "./playbook-card"
import type { Playbook } from "@/types"

interface PlaybookGridProps {
  playbooks: Playbook[]
}

export function PlaybookGrid({ playbooks }: PlaybookGridProps) {
  if (playbooks.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground text-lg">
          No playbooks found for this category.
        </p>
        <p className="text-muted-foreground text-sm mt-2">
          Try selecting a different category or check back later.
        </p>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {playbooks.map((playbook) => (
        <PlaybookCard key={playbook.id} playbook={playbook} />
      ))}
    </div>
  )
}
