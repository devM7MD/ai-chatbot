import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// Users table :)
export const users = sqliteTable("users", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    username: text("username").notNull().unique(),
    email: text("email").notNull().unique(),
    passwordHash: text("password_hash").notNull(),
    createdAt: text("created_at").notNull().default(new Date().toISOString()),
});

// Users sessions table :)
export const conversations = sqliteTable("conversations", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    userId: integer("user_id")
        .notNull()
        .references(() => users.id),
    title: text("title").notNull(),
    createdAt: text("created_at").notNull().default(new Date().toISOString()),
});

// Chat messages table :)
export const messages = sqliteTable("messages", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    conversationId: integer("conversation_id")
        .notNull()
        .references(() => conversations.id),
    content: text("content").notNull(),
    role: text("role", { enum: ["user", "assistant"] }).notNull(),
    createdAt: text("created_at").notNull().default(new Date().toISOString()),
});
