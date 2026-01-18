import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileCode, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

export default function Examples() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-16">
        <Link href="/">
          <Button variant="ghost" className="mb-8 pl-0 hover:bg-transparent hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <h1 className="text-4xl font-display font-bold text-white mb-4">Sample Output</h1>
        <p className="text-lg text-slate-400 mb-12">See what Code2Docs can generate for a typical project.</p>

        <Tabs defaultValue="readme" className="w-full">
          <TabsList className="bg-white/5 border border-white/10 p-1">
            <TabsTrigger value="readme">README</TabsTrigger>
            <TabsTrigger value="brd">BRD</TabsTrigger>
            <TabsTrigger value="trd">TRD</TabsTrigger>
          </TabsList>

          <TabsContent value="readme" className="mt-8">
            <Card className="bg-black/20 border-white/10 p-8 font-mono text-sm leading-relaxed text-slate-300">
              <div className="prose prose-invert max-w-none">
                <h1>Project: E-Commerce API</h1>
                <p>A robust RESTful API for managing an online store.</p>
                
                <h3>Features</h3>
                <ul>
                  <li>User Authentication (JWT)</li>
                  <li>Product Management</li>
                  <li>Order Processing</li>
                  <li>Payment Integration (Stripe)</li>
                </ul>

                <h3>Installation</h3>
                <pre className="bg-black/50 p-4 rounded-lg my-4">
                  npm install<br/>
                  npm run dev
                </pre>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="brd" className="mt-8">
            <Card className="bg-black/20 border-white/10 p-8 font-mono text-sm leading-relaxed text-slate-300">
              <div className="prose prose-invert max-w-none">
                <h1>Business Requirements Document</h1>
                
                <h3>1. Executive Summary</h3>
                <p>The goal is to build a scalable backend to support a 50% increase in mobile traffic.</p>

                <h3>2. Target Audience</h3>
                <ul>
                  <li>Mobile App Users</li>
                  <li>Admin Staff</li>
                </ul>

                <h3>3. Key Metrics</h3>
                <ul>
                  <li>API Latency &lt; 200ms</li>
                  <li>99.9% Uptime</li>
                </ul>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="trd" className="mt-8">
            <Card className="bg-black/20 border-white/10 p-8 font-mono text-sm leading-relaxed text-slate-300">
              <div className="prose prose-invert max-w-none">
                <h1>Technical Requirements Document</h1>
                
                <h3>1. System Architecture</h3>
                <p>Microservices architecture using Node.js and Docker.</p>

                <h3>2. Database Schema</h3>
                <p>PostgreSQL with the following core tables: Users, Products, Orders.</p>

                <h3>3. API Endpoints</h3>
                <ul>
                  <li>POST /api/auth/login</li>
                  <li>GET /api/products</li>
                  <li>POST /api/orders</li>
                </ul>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
