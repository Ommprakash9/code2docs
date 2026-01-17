import { users, projects, documents, type User, type InsertUser, type Project, type InsertProject, type Document, type InsertDocument } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>; // using 'username' to match passport-local, but mapped to email in schema if needed, or just use email field
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Projects
  getProject(id: number): Promise<Project | undefined>;
  getProjectsByUser(userId: number): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;

  // Documents
  getDocument(id: number): Promise<Document | undefined>;
  getDocumentsByProject(projectId: number): Promise<Document[]>;
  createDocument(document: InsertDocument): Promise<Document>;
  updateDocumentStatus(id: number, status: string, content?: string): Promise<Document>;
  getProjectWithDocuments(projectId: number): Promise<(Project & { documents: Document[] }) | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    // In our schema we use 'email' as the unique identifier for login
    return this.getUserByEmail(username);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getProject(id: number): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
  }

  async getProjectsByUser(userId: number): Promise<Project[]> {
    return db.select().from(projects).where(eq(projects.userId, userId)).orderBy(desc(projects.createdAt));
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const [project] = await db.insert(projects).values(insertProject).returning();
    return project;
  }

  async getDocument(id: number): Promise<Document | undefined> {
    const [doc] = await db.select().from(documents).where(eq(documents.id, id));
    return doc;
  }

  async getDocumentsByProject(projectId: number): Promise<Document[]> {
    return db.select().from(documents).where(eq(documents.projectId, projectId));
  }

  async createDocument(insertDocument: InsertDocument): Promise<Document> {
    const [doc] = await db.insert(documents).values(insertDocument).returning();
    return doc;
  }

  async updateDocumentStatus(id: number, status: string, content?: string): Promise<Document> {
    const values: Partial<InsertDocument> = { status, updatedAt: new Date() };
    if (content) values.content = content;
    
    const [doc] = await db.update(documents)
      .set(values)
      .where(eq(documents.id, id))
      .returning();
    return doc;
  }

  async getProjectWithDocuments(projectId: number): Promise<(Project & { documents: Document[] }) | undefined> {
    const project = await this.getProject(projectId);
    if (!project) return undefined;
    const docs = await this.getDocumentsByProject(projectId);
    return { ...project, documents: docs };
  }
}

export const storage = new DatabaseStorage();
