/**
 * Database Client - Drizzle ORM with PostgreSQL
 */

import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "./schema"

// Connection string from environment
const connectionString = process.env.DATABASE_URL!

// Create postgres client
// For serverless environments, we use a connection pool
const client = postgres(connectionString, {
  prepare: false, // Required for Supabase
  ssl: "require",
})

// Create drizzle instance
export const db = drizzle(client, { schema })

// Export schema for use in queries
export * from "./schema"
