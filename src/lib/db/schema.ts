/**
 * Database Schema - Drizzle ORM
 *
 * Defines the database tables for AI Venture Studio for Good
 */

import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  integer,
  jsonb,
  boolean,
  decimal,
  unique,
} from "drizzle-orm/pg-core"

// ============================================================================
// Users Table
// ============================================================================

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: timestamp("email_verified", { mode: "date" }),
  password: varchar("password", { length: 255 }), // Hashed password
  name: varchar("name", { length: 255 }),
  image: varchar("image", { length: 500 }),

  // Profile fields from onboarding
  location: varchar("location", { length: 255 }),
  motivations: text("motivations"),
  impactInterests: text("impact_interests").array(), // Categories: food_access, education, etc.
  livedExperience: text("lived_experience"),
  expertise: text("expertise").array(),
  budgetRange: jsonb("budget_range").$type<{
    min: number
    max: number
    currency: "CAD" | "USD"
  }>(),
  timeCommitment: varchar("time_commitment", { length: 50 }),

  // Platform fields
  credits: integer("credits").default(100),
  membershipTier: varchar("membership_tier", { length: 50 }).default("free"),
  onboardingCompleted: boolean("onboarding_completed").default(false),

  // Timestamps
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow(),
})

// ============================================================================
// NextAuth.js Tables (for session management)
// ============================================================================

export const accounts = pgTable("accounts", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  type: varchar("type", { length: 255 }).notNull(),
  provider: varchar("provider", { length: 255 }).notNull(),
  providerAccountId: varchar("provider_account_id", { length: 255 }).notNull(),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: integer("expires_at"),
  token_type: varchar("token_type", { length: 255 }),
  scope: varchar("scope", { length: 255 }),
  id_token: text("id_token"),
  session_state: varchar("session_state", { length: 255 }),
})

export const sessions = pgTable("sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionToken: varchar("session_token", { length: 255 }).notNull().unique(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})

export const verificationTokens = pgTable("verification_tokens", {
  identifier: varchar("identifier", { length: 255 }).notNull(),
  token: varchar("token", { length: 255 }).notNull().unique(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})

// ============================================================================
// Ventures Table
// ============================================================================

export const ventures = pgTable("ventures", {
  id: uuid("id").primaryKey().defaultRandom(),
  playbookId: varchar("playbook_id", { length: 255 }).notNull(),
  launcherId: uuid("launcher_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  status: varchar("status", { length: 50 }).default("draft"), // draft, active, launched, paused
  currentStep: varchar("current_step", { length: 255 }),
  fundingReceived: integer("funding_received").default(0),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow(),
})

// ============================================================================
// Venture Steps Table (completed steps with artifacts)
// ============================================================================

export const ventureSteps = pgTable("venture_steps", {
  id: uuid("id").primaryKey().defaultRandom(),
  ventureId: uuid("venture_id")
    .notNull()
    .references(() => ventures.id, { onDelete: "cascade" }),
  stepId: varchar("step_id", { length: 255 }).notNull(),
  status: varchar("status", { length: 50 }).default("pending"), // pending, in_progress, completed, failed
  artifact: jsonb("artifact").$type<{
    type: "markdown" | "json" | "html"
    title: string
    content: string
    generatedAt: string
  }>(),
  executedAt: timestamp("executed_at", { mode: "date" }),
  cost: integer("cost"),
})

// ============================================================================
// Contributions Table
// ============================================================================

export const contributions = pgTable("contributions", {
  id: uuid("id").primaryKey().defaultRandom(),
  ventureId: uuid("venture_id")
    .notNull()
    .references(() => ventures.id, { onDelete: "cascade" }),
  stepId: varchar("step_id", { length: 255 }),
  contributorName: varchar("contributor_name", { length: 255 }).notNull(),
  contributorEmail: varchar("contributor_email", { length: 255 }),
  amount: integer("amount").notNull(), // In cents
  currency: varchar("currency", { length: 3 }).default("CAD"),
  message: text("message"),
  stripePaymentId: varchar("stripe_payment_id", { length: 255 }),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
})

// ============================================================================
// Cooperative Ownership Model
// ============================================================================

// Venture Members: tracks who is part of each venture cooperative
export const ventureMembers = pgTable(
  "venture_members",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    ventureId: uuid("venture_id")
      .notNull()
      .references(() => ventures.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    role: varchar("role", { length: 50 }).default("member"), // founder, admin, member
    ownershipPercentage: decimal("ownership_percentage", {
      precision: 5,
      scale: 2,
    }).default("0.00"),
    status: varchar("status", { length: 50 }).default("pending"), // pending, active, left, removed
    invitedBy: uuid("invited_by").references(() => users.id),
    invitedAt: timestamp("invited_at", { mode: "date" }).defaultNow(),
    joinedAt: timestamp("joined_at", { mode: "date" }),
    leftAt: timestamp("left_at", { mode: "date" }),
  },
  (table) => [unique().on(table.ventureId, table.userId)]
)

// Tasks: work items that earn ownership (sweat equity)
export const ventureTasks = pgTable("venture_tasks", {
  id: uuid("id").primaryKey().defaultRandom(),
  ventureId: uuid("venture_id")
    .notNull()
    .references(() => ventures.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  ownershipValue: decimal("ownership_value", {
    precision: 5,
    scale: 2,
  }).notNull(), // ownership % earned on completion
  assignedTo: uuid("assigned_to").references(() => users.id),
  status: varchar("status", { length: 50 }).default("open"), // open, assigned, in_progress, completed, verified, cancelled
  priority: varchar("priority", { length: 20 }).default("medium"), // low, medium, high, urgent
  dueDate: timestamp("due_date", { mode: "date" }),
  completedAt: timestamp("completed_at", { mode: "date" }),
  verifiedBy: uuid("verified_by").references(() => users.id),
  verifiedAt: timestamp("verified_at", { mode: "date" }),
  createdBy: uuid("created_by")
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow(),
})

// Ownership Ledger: immutable audit trail of all ownership changes
export const ownershipLedger = pgTable("ownership_ledger", {
  id: uuid("id").primaryKey().defaultRandom(),
  ventureId: uuid("venture_id")
    .notNull()
    .references(() => ventures.id, { onDelete: "cascade" }),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  changeAmount: decimal("change_amount", { precision: 5, scale: 2 }).notNull(), // positive or negative
  newBalance: decimal("new_balance", { precision: 5, scale: 2 }).notNull(), // ownership after this change
  changeType: varchar("change_type", { length: 50 }).notNull(), // task_completion, financial_contribution, adjustment, forfeit, transfer_in, transfer_out
  referenceType: varchar("reference_type", { length: 50 }), // task, contribution, proposal, manual
  referenceId: uuid("reference_id"),
  notes: text("notes"),
  createdBy: uuid("created_by").references(() => users.id),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
})

// Proposals: governance decisions that need voting
export const proposals = pgTable("proposals", {
  id: uuid("id").primaryKey().defaultRandom(),
  ventureId: uuid("venture_id")
    .notNull()
    .references(() => ventures.id, { onDelete: "cascade" }),
  proposerId: uuid("proposer_id")
    .notNull()
    .references(() => users.id),
  proposalType: varchar("proposal_type", { length: 50 }).notNull(), // major, minor
  category: varchar("category", { length: 50 }).notNull(), // member_invite, member_remove, ownership_adjustment, budget, strategy, transfer_approval
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  metadata: jsonb("metadata"), // stores context like invited user email, transfer details, etc.
  status: varchar("status", { length: 50 }).default("open"), // open, passed, failed, expired, cancelled
  votingThreshold: decimal("voting_threshold", { precision: 5, scale: 2 }), // required percentage to pass
  votesFor: decimal("votes_for", { precision: 5, scale: 2 }).default("0"),
  votesAgainst: decimal("votes_against", { precision: 5, scale: 2 }).default(
    "0"
  ),
  votesAbstain: decimal("votes_abstain", { precision: 5, scale: 2 }).default(
    "0"
  ),
  votingEndsAt: timestamp("voting_ends_at", { mode: "date" }),
  resolvedAt: timestamp("resolved_at", { mode: "date" }),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
})

// Votes: individual member votes on proposals
export const votes = pgTable(
  "votes",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    proposalId: uuid("proposal_id")
      .notNull()
      .references(() => proposals.id, { onDelete: "cascade" }),
    voterId: uuid("voter_id")
      .notNull()
      .references(() => users.id),
    vote: varchar("vote", { length: 10 }).notNull(), // yes, no, abstain
    weight: decimal("weight", { precision: 5, scale: 2 }).notNull(), // voter's ownership at time of vote
    comment: text("comment"),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
  },
  (table) => [unique().on(table.proposalId, table.voterId)]
)

// Member Invitations: pending invites before user accepts
export const memberInvitations = pgTable("member_invitations", {
  id: uuid("id").primaryKey().defaultRandom(),
  ventureId: uuid("venture_id")
    .notNull()
    .references(() => ventures.id, { onDelete: "cascade" }),
  email: varchar("email", { length: 255 }).notNull(),
  invitedBy: uuid("invited_by")
    .notNull()
    .references(() => users.id),
  role: varchar("role", { length: 50 }).default("member"),
  initialOwnership: decimal("initial_ownership", {
    precision: 5,
    scale: 2,
  }).default("0.00"),
  token: varchar("token", { length: 255 }).notNull().unique(),
  status: varchar("status", { length: 50 }).default("pending"), // pending, accepted, expired, revoked
  message: text("message"),
  expiresAt: timestamp("expires_at", { mode: "date" }).notNull(),
  acceptedAt: timestamp("accepted_at", { mode: "date" }),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
})

// Activity Feed: tracks actions for collaboration awareness
export const ventureActivity = pgTable("venture_activity", {
  id: uuid("id").primaryKey().defaultRandom(),
  ventureId: uuid("venture_id")
    .notNull()
    .references(() => ventures.id, { onDelete: "cascade" }),
  userId: uuid("user_id").references(() => users.id), // null for system events
  activityType: varchar("activity_type", { length: 50 }).notNull(), // member_joined, task_completed, vote_cast, step_executed, etc.
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
})

// Comments: discussions on tasks and steps
export const comments = pgTable("comments", {
  id: uuid("id").primaryKey().defaultRandom(),
  ventureId: uuid("venture_id")
    .notNull()
    .references(() => ventures.id, { onDelete: "cascade" }),
  parentType: varchar("parent_type", { length: 50 }).notNull(), // task, step, proposal
  parentId: uuid("parent_id").notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  content: text("content").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow(),
})

// ============================================================================
// Type Exports
// ============================================================================

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert

export type Venture = typeof ventures.$inferSelect
export type NewVenture = typeof ventures.$inferInsert

export type VentureStep = typeof ventureSteps.$inferSelect
export type NewVentureStep = typeof ventureSteps.$inferInsert

export type Contribution = typeof contributions.$inferSelect
export type NewContribution = typeof contributions.$inferInsert

// Cooperative model types
export type VentureMember = typeof ventureMembers.$inferSelect
export type NewVentureMember = typeof ventureMembers.$inferInsert

export type VentureTask = typeof ventureTasks.$inferSelect
export type NewVentureTask = typeof ventureTasks.$inferInsert

export type OwnershipLedgerEntry = typeof ownershipLedger.$inferSelect
export type NewOwnershipLedgerEntry = typeof ownershipLedger.$inferInsert

export type Proposal = typeof proposals.$inferSelect
export type NewProposal = typeof proposals.$inferInsert

export type Vote = typeof votes.$inferSelect
export type NewVote = typeof votes.$inferInsert

export type MemberInvitation = typeof memberInvitations.$inferSelect
export type NewMemberInvitation = typeof memberInvitations.$inferInsert

export type VentureActivityEntry = typeof ventureActivity.$inferSelect
export type NewVentureActivityEntry = typeof ventureActivity.$inferInsert

export type Comment = typeof comments.$inferSelect
export type NewComment = typeof comments.$inferInsert
