import "dotenv/config"
import type { Config } from "drizzle-kit"

// Load from .env.local
import { config } from "dotenv"
config({ path: ".env.local" })

export default {
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config
