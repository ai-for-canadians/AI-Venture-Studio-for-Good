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
