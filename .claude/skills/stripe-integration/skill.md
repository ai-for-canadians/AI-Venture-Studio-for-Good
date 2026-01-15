# Stripe Integration Skill

Set up Stripe payments for step execution and contributions.

## Usage

```
/stripe-integration [--products] [--checkout] [--webhooks] [--portal]
```

## What This Skill Does

1. **Configure Stripe Client**
   - Create `src/lib/stripe/client.ts`
   - Server-side Stripe instance
   - Client-side Stripe.js setup

2. **Create Products & Prices**
   - Step execution credits ($25-$50 per step)
   - Credit bundles (Starter: $29, Pro: $99)
   - Contribution amounts (min $10)

3. **Implement Checkout Flows**
   - Pay-per-step checkout
   - Buy credits checkout
   - Contribution checkout with step attribution

4. **Set Up Webhooks**
   - Payment success handling
   - Credit allocation
   - Contribution recording
   - Email notifications

5. **Customer Portal**
   - View payment history
   - Manage subscriptions (future)
   - Download receipts

## API Routes

```typescript
// POST /api/checkout/step
// Create checkout session for step execution
{
  ventureId: string,
  stepId: string,
  returnUrl: string
}

// POST /api/checkout/credits
// Create checkout session for credit purchase
{
  bundle: 'starter' | 'pro',
  returnUrl: string
}

// POST /api/checkout/contribution
// Create checkout session for contribution
{
  ventureId: string,
  stepId?: string,
  amount: number,
  contributorName: string,
  returnUrl: string
}

// POST /api/webhooks/stripe
// Handle Stripe webhook events
```

## Webhook Events

- `checkout.session.completed` - Process successful payment
- `payment_intent.succeeded` - Record payment
- `payment_intent.payment_failed` - Handle failures

## Environment Variables

```bash
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## Security

- Verify webhook signatures
- Use idempotency keys
- Store payment IDs for reconciliation
- Never expose secret keys client-side
