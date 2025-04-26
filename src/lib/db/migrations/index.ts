import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { db } from "../index";

// Implementation of initial transfers
export async function runMigrations() {
    console.log("Running migrations...");
    migrate(db, { migrationsFolder: "./src/lib/db/migrations" });
    console.log("Migrations completed");
}
