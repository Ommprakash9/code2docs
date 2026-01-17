import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FileText, Github, Zap, BookOpen } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-xs font-medium text-slate-300 uppercase tracking-wider">AI-Powered Documentation</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-8">
              From <span className="gradient-text bg-gradient-to-r from-blue-400 to-violet-400">Code</span> to <span className="gradient-text bg-gradient-to-r from-violet-400 to-fuchsia-400">Clarity</span>
              <br /> in Seconds.
            </h1>
            
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
              Stop writing documentation manually. Connect your GitHub repository and let our AI generate comprehensive READMES, technical specs, and test strategies instantly.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="rounded-full px-8 bg-white text-slate-900 hover:bg-slate-200">
                  Start Generating Free
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="rounded-full px-8 gap-2">
                  <Github className="w-5 h-5" />
                  View Sample Docs
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 relative bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Zap className="w-6 h-6 text-yellow-400" />}
              title="Instant Generation"
              description="Turn complex codebases into readable documentation in under 60 seconds."
              delay={0.1}
            />
            <FeatureCard 
              icon={<FileText className="w-6 h-6 text-blue-400" />}
              title="Comprehensive Docs"
              description="Get BRDs, TRDs, Test Strategies, and READMEs generated automatically."
              delay={0.2}
            />
            <FeatureCard 
              icon={<BookOpen className="w-6 h-6 text-green-400" />}
              title="Always Up-to-Date"
              description="Regenerate documentation with a single click whenever your code changes."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Code2Docs. Built for developers.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      viewport={{ once: true }}
      className="glass-card p-8 rounded-2xl hover:bg-white/10 transition-colors"
    >
      <div className="bg-white/5 w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-white/10">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3 font-display">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{description}</p>
    </motion.div>
  );
}
