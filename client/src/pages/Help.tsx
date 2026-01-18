import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, HelpCircle, FileText, Lock, Download } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Help() {
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

        <div className="flex items-center gap-4 mb-8">
          <div className="bg-primary/10 p-3 rounded-xl">
            <HelpCircle className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-display font-bold text-white">Help Center</h1>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem value="item-1" className="border-white/10 px-4 rounded-lg bg-white/5">
            <AccordionTrigger className="text-white hover:no-underline">How does Code2Docs work?</AccordionTrigger>
            <AccordionContent className="text-slate-400">
              Code2Docs scans your public GitHub repository, analyzes the file structure and content, 
              and uses advanced AI to understand the logic. It then drafts professional documentation 
              types like READMEs and Technical Specs based on this analysis.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border-white/10 px-4 rounded-lg bg-white/5">
            <AccordionTrigger className="text-white hover:no-underline">Is my GitHub code stored?</AccordionTrigger>
            <AccordionContent className="text-slate-400">
              No. We only fetch your code temporarily to process it. Once the documentation is generated, 
              the code context is discarded. We only store the final generated documents.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border-white/10 px-4 rounded-lg bg-white/5">
            <AccordionTrigger className="text-white hover:no-underline">What documents can I generate?</AccordionTrigger>
            <AccordionContent className="text-slate-400">
              Currently, you can generate:
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>README.md (General overview)</li>
                <li>BRD (Business Requirements Document)</li>
                <li>TRD (Technical Requirements Document)</li>
                <li>Test Strategy (QA and Testing plans)</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border-white/10 px-4 rounded-lg bg-white/5">
            <AccordionTrigger className="text-white hover:no-underline">Can I export documents?</AccordionTrigger>
            <AccordionContent className="text-slate-400">
              Yes! You can copy the markdown directly to your clipboard or download the documents as 
              PDF files for easy sharing.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
