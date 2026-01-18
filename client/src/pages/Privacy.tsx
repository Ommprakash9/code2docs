import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link href="/">
          <Button variant="ghost" className="mb-8 pl-0 hover:bg-transparent hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
        
        <h1 className="text-4xl font-display font-bold text-white mb-8">Privacy Policy</h1>
        
        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Data Collection & Usage</h2>
            <p>
              Code2Docs accesses your GitHub repositories only when you explicitly provide a URL. 
              We do not store your code permanently. The repository content is processed solely for 
              the purpose of generating documentation and is discarded after processing.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. AI Processing</h2>
            <p>
              We use OpenAI's API to analyze your code and generate documentation. Data sent to OpenAI 
              is subject to their data privacy policies. We ensure that your code is not used to train 
              public models.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Data Storage</h2>
            <p>
              We store only the generated documentation (READMEs, BRDs, TRDs, etc.) and your user account information. 
              You can request deletion of your account and associated data at any time.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
