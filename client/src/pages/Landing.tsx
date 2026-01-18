import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FileText, Github, Zap, BookOpen, Clock, Download, Share2, Layers, CheckCircle } from "lucide-react";
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
              <Link href="/examples">
                <Button size="lg" variant="outline" className="rounded-full px-8 gap-2">
                  <BookOpen className="w-5 h-5" />
                  View Sample Docs
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Waste Time Section */}
      <section className="py-24 relative bg-slate-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Why Waste Time When AI Can Do It Better?</h2>
            <p className="text-slate-400 text-lg">Powered by advanced AI and built for modern development teams</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={<Github className="w-6 h-6 text-white" />}
              title="Instant GitHub Integration"
              description="Simply paste any public GitHub repository URL and we handle the rest."
              delay={0.1}
            />
            <FeatureCard 
              icon={<Zap className="w-6 h-6 text-violet-400" />}
              title="AI-Powered Magic"
              description="Advanced AI analyzes your entire codebase and generates professional documentation."
              delay={0.2}
            />
            <FeatureCard 
              icon={<Clock className="w-6 h-6 text-blue-400" />}
              title="5-Minute Generation"
              description="From zero to comprehensive documentation in under 5 minutes."
              delay={0.3}
            />
            <FeatureCard 
              icon={<Download className="w-6 h-6 text-green-400" />}
              title="Export Anywhere"
              description="Download documentation as PDF or Markdown, ready for any workflow."
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* Document Types Section */}
      <section className="py-24 relative bg-slate-900/50 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Four Document Types. One Simple Process.</h2>
            <p className="text-slate-400 text-lg">Professional documentation that follows industry standards</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <DocTypeCard 
              badge="README"
              title="README Document"
              description="Professional README with installation, usage, and contribution guidelines."
              bullets={["Project Overview", "Installation Guide", "Usage Examples", "API Reference", "Contribution Guidelines"]}
            />
            <DocTypeCard 
              badge="BRD"
              title="Business Requirements"
              description="Complete business analysis with user stories, objectives, and success metrics."
              bullets={["Executive Summary", "Project Scope", "User Personas", "Success Criteria", "Implementation Timeline"]}
            />
            <DocTypeCard 
              badge="TRD"
              title="Technical Requirements"
              description="Detailed technical architecture, APIs, and implementation specifications."
              bullets={["System Architecture", "Technology Stack", "API Documentation", "Integration Points", "Database Design"]}
            />
            <DocTypeCard 
              badge="TEST"
              title="Test Strategy"
              description="Comprehensive testing framework with scenarios for every aspect of your project."
              bullets={["Test Strategy", "Unit Test Plans", "Integration Tests", "E2E Scenarios", "Security & Performance"]}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-1">
              <h3 className="text-white font-bold text-lg mb-4">Code2Docs</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Automating technical documentation for modern engineering teams.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><Link href="/register" className="hover:text-white transition-colors">Get Started</Link></li>
                <li><Link href="/examples" className="hover:text-white transition-colors">Examples</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><a href="mailto:support@code2docs.com" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 text-center text-slate-600 text-sm">
            <p>© {new Date().getFullYear()} Code2Docs. Built for developers.</p>
          </div>
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
      className="glass-card p-8 rounded-2xl hover:bg-white/5 transition-colors border border-white/5"
    >
      <div className="bg-white/5 w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-white/10">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-white mb-3 font-display">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

function DocTypeCard({ badge, title, description, bullets }: { badge: string, title: string, description: string, bullets: string[] }) {
  return (
    <div className="bg-slate-200 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="flex justify-between items-start mb-6">
        <span className="bg-gradient-to-r from-blue-600 to-violet-600 text-white text-xs font-bold px-3 py-1 rounded-full">
          {badge}
        </span>
        <FileText className="w-6 h-6 text-slate-400" />
      </div>
      
      <h3 className="text-2xl font-bold text-slate-900 mb-3 font-display">{title}</h3>
      <p className="text-slate-600 mb-6">{description}</p>
      
      <ul className="space-y-2">
        {bullets.map((bullet, i) => (
          <li key={i} className="flex items-center text-sm text-slate-600">
            <CheckCircle className="w-4 h-4 text-violet-500 mr-2 flex-shrink-0" />
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  );
}
