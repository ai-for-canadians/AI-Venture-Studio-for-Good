# Contribution Flow Skill

Builds the contributor experience - public venture pages, contribution forms, and payment processing.

## When to Use

Use this skill when:
- Building public venture pages for contributors to view
- Creating contribution/funding flow
- Integrating Stripe for contribution payments
- Building contributor dashboards

## Components to Build

### 1. Public Venture Page (`/v/[ventureId]`)

A shareable page where anyone can view venture progress and contribute:

```
/v/[ventureId]
├── Venture header (name, playbook, location)
├── Progress section (completed steps, current step)
├── Launcher profile (who's building this)
├── Step artifacts (view completed work)
├── Contribution CTA
└── Contributor wall (who has supported)
```

Key features:
- No authentication required to view
- Short, shareable URL
- Mobile-optimized
- Social meta tags for sharing

### 2. Contribution Form Component

```typescript
interface ContributionFormProps {
  ventureId: string
  ventureName: string
  availableSteps: Step[]  // Steps that need funding
}

// Form fields:
- Contributor name (optional for anonymous)
- Email (for receipt)
- Amount (preset options + custom)
- Step to fund (dropdown of unfunded steps)
- Message to launcher (optional)
```

### 3. Stripe Integration

Use Stripe Checkout for simple payment:

```typescript
// Create checkout session
const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  line_items: [{
    price_data: {
      currency: 'cad',
      product_data: {
        name: `Contribution to ${ventureName}`,
        description: `Funding: ${stepName}`,
      },
      unit_amount: amountInCents,
    },
    quantity: 1,
  }],
  mode: 'payment',
  success_url: `${baseUrl}/v/${ventureId}?contributed=true`,
  cancel_url: `${baseUrl}/v/${ventureId}`,
  metadata: {
    ventureId,
    stepId,
    contributorName,
    contributorEmail,
  },
});
```

### 4. Webhook Handler

Process successful payments:

```typescript
// POST /api/webhooks/stripe
export async function POST(req: Request) {
  const event = stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get('stripe-signature'),
    process.env.STRIPE_WEBHOOK_SECRET
  );

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Record contribution
    await recordContribution({
      ventureId: session.metadata.ventureId,
      stepId: session.metadata.stepId,
      amount: session.amount_total / 100,
      contributorName: session.metadata.contributorName,
      contributorEmail: session.metadata.contributorEmail,
    });

    // Notify launcher
    await sendEmail({
      to: launcher.email,
      template: 'contribution-received',
      data: { ... }
    });
  }
}
```

### 5. Contributor Wall Component

Display contributors on venture page:

```typescript
interface ContributorWallProps {
  contributions: Contribution[]
  totalRaised: number
  goal: number  // Total cost of remaining steps
}

// Display:
- Progress bar (raised / goal)
- Recent contributors (avatar, name, amount, message)
- "And X more supporters"
- Anonymous contributions shown as "Anonymous"
```

## Data Models

```typescript
interface Contribution {
  id: string
  ventureId: string
  stepId?: string           // Optional - general contribution vs step-specific
  contributorName: string   // "Anonymous" if not provided
  contributorEmail?: string
  amount: number
  currency: "CAD"
  message?: string
  stripePaymentId: string
  createdAt: Date
}
```

## File Structure

```
src/
├── app/
│   ├── v/[ventureId]/
│   │   └── page.tsx        # Public venture page
│   └── api/
│       └── webhooks/
│           └── stripe/
│               └── route.ts # Stripe webhook
├── components/
│   └── contributions/
│       ├── contribution-form.tsx
│       ├── contributor-wall.tsx
│       └── contribution-card.tsx
└── lib/
    └── stripe/
        ├── client.ts       # Stripe client setup
        └── checkout.ts     # Checkout session helpers
```

## Environment Variables

```env
STRIPE_SECRET_KEY=sk_...
STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## Testing

For development, use Stripe test mode:
- Test card: 4242 4242 4242 4242
- Test webhook: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`

## Security Considerations

- Validate webhook signatures
- Never expose secret keys client-side
- Sanitize contributor messages
- Rate limit contribution endpoints
- Validate amounts (min/max)
