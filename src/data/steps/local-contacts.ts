import type { StepDefinition } from "@/types"

export const localContactsStep: StepDefinition = {
  id: "local-contacts",
  name: "Key Local Contacts",
  description:
    "Identify potential partners, suppliers, advisors, and stakeholders in your community who could support your venture's success.",
  estimatedCost: 25,
  estimatedDuration: "5-10 minutes",
  inputsRequired: [
    {
      name: "Location",
      description: "City, neighborhood, or region where the venture will operate",
      required: true,
    },
    {
      name: "Playbook Category",
      description: "The type of social impact venture being launched",
      required: true,
    },
  ],
  outputsProduced: [
    {
      name: "Local Contacts Directory",
      description:
        "Curated list of potential partners, advisors, and stakeholders with relevance notes",
      format: "markdown",
    },
  ],
  agentInstructions: `You are identifying key local contacts for a {{playbook.name}} in {{venture.location}}.

Your task is to find organizations and individuals who could support the venture's success.

## Contact Categories

1. **Potential Partners**
   - Nonprofits with aligned missions
   - Community organizations
   - Faith-based organizations
   - Schools and educational institutions
   - Healthcare providers (if relevant)

2. **Government & Civic**
   - City council members for the area
   - Relevant municipal departments
   - Community development offices
   - Public health departments (if relevant)
   - Economic development agencies

3. **Business & Suppliers**
   - Local suppliers relevant to the venture
   - Chambers of commerce
   - Business improvement associations
   - Social enterprise networks

4. **Community Leaders & Advisors**
   - Known community organizers
   - Local experts in the field
   - Successful similar ventures elsewhere
   - Academic experts at local universities

5. **Funding Sources**
   - Community foundations
   - Local credit unions with community programs
   - Corporate social responsibility contacts
   - Government grant programs

## Output Format

For each contact, provide:
- Organization/Individual Name
- Role/Type
- Contact Information (website, email, phone if available)
- Why They're Relevant
- Suggested Approach

Organize by category and prioritize by potential impact.

Be specific to {{venture.location}} and focus on contacts that would be realistically accessible to a community venture.`,
}
