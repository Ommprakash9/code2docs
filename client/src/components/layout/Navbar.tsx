import { Link, useLocation } from "wouter";
import { useUser, useLogout } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { LogOut, LayoutDashboard, Code2 } from "lucide-react";

export function Navbar() {
  const { data: user } = useUser();
  const { mutate: logout } = useLogout();
  const [location] = useLocation();

  return (
    <nav className="border-b border-white/10 bg-slate-950/50 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer group">
                <div className="bg-primary/20 p-2 rounded-lg group-hover:bg-primary/30 transition-colors">
                  <Code2 className="w-6 h-6 text-primary" />
                </div>
                <span className="font-display font-bold text-xl tracking-tight text-white">
                  Code2Docs
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="hidden md:block text-sm text-slate-400">
                  Welcome, <span className="text-white">{user.name || user.email}</span>
                </span>
                
                {location !== "/dashboard" && (
                  <Link href="/dashboard">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Button>
                  </Link>
                )}

                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => logout()}
                  className="gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm">Log In</Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="bg-white text-slate-900 hover:bg-slate-200 shadow-none">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
