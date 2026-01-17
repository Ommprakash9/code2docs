import { useEffect, useState } from "react";
import { useRoute, useLocation } from "wouter";
import { useProject } from "@/hooks/use-projects";
import { useGenerateDocuments, useDocument } from "@/hooks/use-documents";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, FileCode, Play, CheckCircle2, AlertCircle, Clock, Copy } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ProjectDetail() {
  const [match, params] = useRoute("/project/:id");
  const projectId = parseInt(params?.id || "0");
  const { data: project, isLoading: isProjectLoading, refetch } = useProject(projectId);
  const generate = useGenerateDocuments();
  const [activeTab, setActiveTab] = useState<string>("README");
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  if (!projectId) {
    setLocation("/dashboard");
    return null;
  }

  const activeDoc = project?.documents?.find(d => d.type === activeTab);
  
  // Use poller for the active document if it's processing
  const { data: polledDoc } = useDocument(activeDoc?.id || 0);

  const displayDoc = polledDoc || activeDoc;

  const handleGenerate = async () => {
    try {
      await generate.mutateAsync({ projectId });
      toast({ title: "Generation started", description: "AI is analyzing your repository..." });
      refetch(); // Refresh to get the new pending documents
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const copyToClipboard = () => {
    if (displayDoc?.content) {
      navigator.clipboard.writeText(displayDoc.content);
      toast({ title: "Copied!", description: "Content copied to clipboard." });
    }
  };

  const docTypes = ["README", "BRD", "TRD", "TEST"];

  if (isProjectLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!project) return <div>Project not found</div>;

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col h-[calc(100vh-64px)]">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-white flex items-center gap-3">
              {project.repoName}
              <span className="text-sm font-normal text-slate-500 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                {project.repoUrl}
              </span>
            </h1>
          </div>
          <Button 
            onClick={handleGenerate} 
            disabled={generate.isPending} 
            className="shadow-lg shadow-primary/20"
          >
            {generate.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            Generate All Docs
          </Button>
        </div>

        <div className="flex flex-1 gap-6 overflow-hidden">
          {/* Sidebar Tabs */}
          <div className="w-64 flex-shrink-0 space-y-2">
            {docTypes.map((type) => {
              const doc = project.documents.find(d => d.type === type);
              const status = doc?.status || "missing";
              
              return (
                <button
                  key={type}
                  onClick={() => setActiveTab(type)}
                  className={cn(
                    "w-full flex items-center justify-between p-3 rounded-lg text-sm font-medium transition-all border border-transparent",
                    activeTab === type 
                      ? "bg-primary/10 text-primary border-primary/20" 
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <FileCode className="w-4 h-4" />
                    {type}
                  </div>
                  {status === "completed" && <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />}
                  {(status === "pending" || status === "generating") && <Loader2 className="w-3.5 h-3.5 animate-spin text-yellow-500" />}
                  {status === "failed" && <AlertCircle className="w-3.5 h-3.5 text-red-500" />}
                </button>
              );
            })}
          </div>

          {/* Content Area */}
          <Card className="flex-1 flex flex-col overflow-hidden bg-black/20 border-white/10">
            {displayDoc ? (
              <>
                <div className="border-b border-white/10 p-4 flex justify-between items-center bg-white/5">
                  <div className="flex items-center gap-2">
                    <h2 className="font-semibold text-white">{displayDoc.type}</h2>
                    <span className={cn(
                      "text-xs px-2 py-0.5 rounded-full border uppercase",
                      displayDoc.status === "completed" ? "bg-green-500/10 text-green-400 border-green-500/20" :
                      displayDoc.status === "failed" ? "bg-red-500/10 text-red-400 border-red-500/20" :
                      "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                    )}>
                      {displayDoc.status}
                    </span>
                  </div>
                  {displayDoc.status === "completed" && (
                    <Button variant="ghost" size="sm" onClick={copyToClipboard} className="h-8">
                      <Copy className="w-3.5 h-3.5 mr-2" />
                      Copy
                    </Button>
                  )}
                </div>
                
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                  {(displayDoc.status === "generating" || displayDoc.status === "pending") ? (
                    <div className="h-full flex flex-col items-center justify-center text-center">
                      <div className="relative">
                        <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-6"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Clock className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      <h3 className="text-xl font-medium text-white mb-2">Generating Documentation...</h3>
                      <p className="text-slate-400 max-w-sm">
                        Our AI is analyzing your code structure to write a comprehensive {displayDoc.type}. This might take a minute.
                      </p>
                    </div>
                  ) : displayDoc.status === "failed" ? (
                    <div className="h-full flex flex-col items-center justify-center text-center">
                      <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                      <h3 className="text-lg font-medium text-white">Generation Failed</h3>
                      <p className="text-slate-400 mt-2">Please try again later.</p>
                    </div>
                  ) : (
                    <article className="prose prose-invert max-w-none">
                      <ReactMarkdown>{displayDoc.content}</ReactMarkdown>
                    </article>
                  )}
                </div>
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <FileCode className="w-16 h-16 text-slate-600 mb-6" />
                <h3 className="text-xl font-medium text-white mb-2">No Document Generated</h3>
                <p className="text-slate-400 max-w-sm mb-6">
                  Click "Generate All Docs" to create this document based on your repository content.
                </p>
                <Button onClick={handleGenerate} variant="secondary">
                  Start Generation
                </Button>
              </div>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
}
