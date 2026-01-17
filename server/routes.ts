import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { setupAuth } from "./auth";
import { z } from "zod";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  const { hashPassword } = setupAuth(app);

  // Auth Middleware
  const isAuthenticated = (req: Request, res: Response, next: Function) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ message: "Unauthorized" });
  };

  // Auth Routes
  app.post(api.auth.register.path, async (req, res) => {
    try {
      const input = api.auth.register.input.parse(req.body);
      
      const existingUser = await storage.getUserByEmail(input.email);
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const hashedPassword = await hashPassword(input.password);
      const user = await storage.createUser({ ...input, password: hashedPassword });
      
      req.login(user, (err) => {
        if (err) return res.status(500).json({ message: "Login failed after registration" });
        res.status(201).json(user);
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post(api.auth.login.path, (req, res, next) => {
    // Custom passport authentication to match Zod schema validation response structure
    const result = api.auth.login.input.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid input" });
    }

    // Passport expects 'username' field, our schema uses 'username' but it maps to email in storage
    // If the schema expected 'email', we'd need to map it here if passport-local defaults to 'username'
    // But shared/routes.ts defines input as { username, password } to match default passport-local
    
    // @ts-ignore
    import("passport").then((passport) => {
      passport.default.authenticate("local", (err: any, user: any, info: any) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ message: "Invalid credentials" });
        req.login(user, (err) => {
          if (err) return next(err);
          res.status(200).json(user);
        });
      })(req, res, next);
    });
  });

  app.post(api.auth.logout.path, (req, res) => {
    req.logout((err) => {
      if (err) return res.status(500).json({ message: "Logout failed" });
      res.status(200).send();
    });
  });

  app.get(api.auth.me.path, isAuthenticated, (req, res) => {
    res.json(req.user);
  });

  // Project Routes
  app.get(api.projects.list.path, isAuthenticated, async (req, res) => {
    const projects = await storage.getProjectsByUser(req.user!.id);
    res.json(projects);
  });

  app.post(api.projects.create.path, isAuthenticated, async (req, res) => {
    try {
      const input = api.projects.create.input.parse(req.body);
      const project = await storage.createProject({ ...input, userId: req.user!.id });
      res.status(201).json(project);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get(api.projects.get.path, isAuthenticated, async (req, res) => {
    const project = await storage.getProjectWithDocuments(Number(req.params.id));
    if (!project) return res.status(404).json({ message: "Project not found" });
    if (project.userId !== req.user!.id) return res.status(403).json({ message: "Forbidden" });
    res.json(project);
  });

  // Document Routes
  app.get(api.documents.get.path, isAuthenticated, async (req, res) => {
    const doc = await storage.getDocument(Number(req.params.id));
    if (!doc) return res.status(404).json({ message: "Document not found" });
    
    const project = await storage.getProject(doc.projectId);
    if (!project || project.userId !== req.user!.id) return res.status(403).json({ message: "Forbidden" });
    
    res.json(doc);
  });

  app.post(api.documents.generate.path, isAuthenticated, async (req, res) => {
    const projectId = Number(req.params.id);
    const project = await storage.getProject(projectId);
    
    if (!project) return res.status(404).json({ message: "Project not found" });
    if (project.userId !== req.user!.id) return res.status(403).json({ message: "Forbidden" });

    const input = api.documents.generate.input.parse(req.body);
    
    const newDocs = [];
    for (const type of input.types) {
      const doc = await storage.createDocument({
        projectId,
        type,
        content: "Generating...",
        status: "pending",
      });
      newDocs.push(doc);

      // Trigger async generation
      generateDocument(doc.id, project.repoUrl, type).catch(err => {
        console.error(`Error generating ${type} for project ${projectId}:`, err);
        storage.updateDocumentStatus(doc.id, "failed", "Generation failed. Please try again.");
      });
    }

    res.status(202).json(newDocs);
  });

  return httpServer;
}

// Background generation logic
async function generateDocument(docId: number, repoUrl: string, type: string) {
  await storage.updateDocumentStatus(docId, "generating");

  try {
    // 1. Fetch Repo Content (Simplified: using a mock or basic fetch if possible, 
    // real GH API needs token for rate limits usually, but public repos might work)
    // For this MVP, we will simulate fetching structure or use a simpler prompt if we can't fetch.
    // Ideally we would fetch the file tree and some key files (package.json, README, etc.)
    
    // For now, let's ask OpenAI to generate a template based on the Repo URL and Name.
    // In a real production app, we would clone/fetch the repo content.
    
    const prompt = `
      You are an expert technical writer.
      Generate a professional ${type} document for the GitHub repository: ${repoUrl}.
      
      Structure the document in valid Markdown format.
      Make assumptions based on typical software patterns if specific details aren't available from just the URL.
      The document should be detailed, professional, and ready to use.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-5.1",
      messages: [
        { role: "system", content: "You are a senior software engineer and technical writer." },
        { role: "user", content: prompt },
      ],
      max_completion_tokens: 4000,
    });

    const content = completion.choices[0].message.content || "No content generated.";
    await storage.updateDocumentStatus(docId, "completed", content);

  } catch (error) {
    console.error("Generation error:", error);
    await storage.updateDocumentStatus(docId, "failed", "An error occurred during generation.");
  }
}
