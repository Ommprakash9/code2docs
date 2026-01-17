import { useState } from "react";
import { useProjects, useCreateProject } from "@/hooks/use-projects";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus, Github, Loader2, FileText, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const { data: projects, isLoading } = useProjects();
  const createProject = useCreateProject();
  const [repoUrl, setRepoUrl] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!repoUrl) return;

    try {
      setIsCreating(true);
      // Extract repo name from URL roughly
      const parts = repoUrl.split('/');
      const repoName = parts[parts.length - 1] || "Untitled Repo";
      
      const newProject = await createProject.mutateAsync({
        repoUrl,
        repoName,
        description: "Imported from GitHub",
      });
      
      setRepoUrl("");
      setIsCreating(false);
      toast({ title: "Project created", description: "Redirecting to project details..." });
      setLocation(`/project/${newProject.id}`);
    } catch (error: any) {
      setIsCreating(false);
      toast({ 
        title: "Failed to create project", 
        description: error.message, 
        variant: "destructive" 
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-white">Dashboard</h1>
            <p className="text-slate-400 mt-1">Manage your documentation projects</p>
          </div>
          
          <form onSubmit={handleCreate} className="flex w-full md:w-auto gap-2">
            <Input 
              placeholder="https://github.com/username/repo" 
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              className="w-full md:w-80"
            />
            <Button type="submit" disabled={isCreating}>
              {isCreating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
              Import
            </Button>
          </form>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : projects?.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10 border-dashed">
            <Github className="w-12 h-12 mx-auto text-slate-500 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No projects yet</h3>
            <p className="text-slate-400 max-w-md mx-auto mb-6">
              Enter a GitHub repository URL above to generate your first set of documentation.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects?.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="hover:bg-white/5 transition-colors cursor-pointer group h-full" onClick={() => setLocation(`/project/${project.id}`)}>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-start">
                      <span className="truncate pr-4">{project.repoName}</span>
                      <Github className="w-5 h-5 text-slate-500" />
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {project.description || project.repoUrl}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center text-sm text-slate-400">
                        <FileText className="w-4 h-4 mr-2 text-primary" />
                        <span>Docs available</span>
                      </div>
                      <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform p-0 hover:bg-transparent">
                        <ArrowRight className="w-5 h-5 text-white" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
