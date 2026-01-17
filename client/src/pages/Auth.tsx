import { useState } from "react";
import { useLogin, useRegister } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Loader2, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AuthPage({ mode = "login" }: { mode?: "login" | "register" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const loginMutation = useLogin();
  const registerMutation = useRegister();
  
  const isLogin = mode === "login";
  const isLoading = loginMutation.isPending || registerMutation.isPending;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await loginMutation.mutateAsync({ username: email, password });
        toast({ title: "Welcome back!", description: "Successfully logged in." });
      } else {
        await registerMutation.mutateAsync({ email, password, name });
        toast({ title: "Account created", description: "Please log in with your new account." });
        setLocation("/login");
        return;
      }
      setLocation("/dashboard");
    } catch (error: any) {
      toast({ 
        title: "Error", 
        description: error.message, 
        variant: "destructive" 
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 to-slate-950">
      <div className="absolute top-8 left-8">
        <Button variant="ghost" onClick={() => setLocation("/")} className="gap-2">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <Card className="border-white/10 shadow-2xl bg-black/40 backdrop-blur-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              {isLogin ? "Welcome back" : "Create an account"}
            </CardTitle>
            <CardDescription className="text-center">
              {isLogin 
                ? "Enter your email to sign in to your account" 
                : "Enter your email below to create your account"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Name</label>
                  <Input 
                    placeholder="John Doe" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              )}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Email</label>
                <Input 
                  type="email" 
                  placeholder="m@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Password</label>
                <Input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 mt-6"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLogin ? "Sign In" : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-slate-400">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
              </span>
              <button 
                onClick={() => setLocation(isLogin ? "/register" : "/login")}
                className="text-primary hover:underline font-medium"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
