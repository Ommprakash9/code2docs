import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(), // Hashed password
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  repoUrl: text("repo_url").notNull(),
  repoName: text("repo_name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull().references(() => projects.id),
  type: text("type").notNull(), // 'README', 'BRD', 'TRD', 'TEST'
  content: text("content").notNull(),
  status: text("status").notNull().default("pending"), // 'pending', 'generating', 'completed', 'failed'
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// === RELATIONS ===

export const projectsRelations = relations(projects, ({ one, many }) => ({
  user: one(users, {
    fields: [projects.userId],
    references: [users.id],
  }),
  documents: many(documents),
}));

export const documentsRelations = relations(documents, ({ one }) => ({
  project: one(projects, {
    fields: [documents.projectId],
    references: [projects.id],
  }),
}));

// === BASE SCHEMAS ===

export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertProjectSchema = createInsertSchema(projects).omit({ id: true, userId: true, createdAt: true });
export const insertDocumentSchema = createInsertSchema(documents).omit({ id: true, projectId: true, createdAt: true, updatedAt: true });

// === EXPLICIT API CONTRACT TYPES ===

export type User = typeof users.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type Document = typeof documents.$inferSelect;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type InsertDocument = z.infer<typeof insertDocumentSchema>;

// Request types
export type CreateProjectRequest = InsertProject;
export type CreateDocumentRequest = {
  projectId: number;
  type: string;
};

// Response types
export type ProjectWithDocuments = Project & { documents: Document[] };
