import { db } from "..";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import Database from "better-sqlite3";

// Assign database tables
const usersTable = sqliteTable("users", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    username: text("username").notNull().unique(),
    email: text("email").notNull().unique(),
    passwordHash: text("password_hash").notNull(),
    createdAt: text("created_at").notNull().default(new Date().toISOString()),
});

const conversationsTable = sqliteTable("conversations", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    userId: integer("user_id").notNull(),
    title: text("title").notNull(),
    createdAt: text("created_at").notNull().default(new Date().toISOString()),
});

const messagesTable = sqliteTable("messages", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    conversationId: integer("conversation_id").notNull(),
    content: text("content").notNull(),
    role: text("role", { enum: ["user", "assistant"] }).notNull(),
    createdAt: text("created_at").notNull().default(new Date().toISOString()),
});

// Create prepare database task
export async function setupDatabase() {
    console.log("بدء إعداد قاعدة البيانات...");

    try {
        // Creating Database file if is not exists
        const sqlite = new Database(process.env.DATABASE_URL || "./sqlite.db");
        const db = drizzle(sqlite);

        // Logging...
        console.log("إنشاء جداول قاعدة البيانات...");

        // Users table
        sqlite.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
    `);

        // Chat table
        sqlite.exec(`
    CREATE TABLE IF NOT EXISTS conversations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
    )
    `);

        // Messages table
        sqlite.exec(`
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        conversation_id INTEGER NOT NULL,
        content TEXT NOT NULL,
        role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (conversation_id) REFERENCES conversations (id)
    )
    `);

        console.log("تم إنشاء جداول قاعدة البيانات بنجاح!");

        return true;
    } catch (error) {
        console.error("خطأ في إعداد قاعدة البيانات:", error);
        return false;
    }
}
