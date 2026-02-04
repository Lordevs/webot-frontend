"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Calendar,
  Settings2,
  LogOut,
  HelpCircle,
  CreditCard,
  User,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { SIDEBAR_ITEMS } from "@/lib/sidebar-items";
import { ROUTES } from "@/constants/routes";

const bottomNavItems = [
  { title: "Billing", href: "#", icon: CreditCard }, // Placeholder as it's not in ROUTES yet
  {
    title: "Settings",
    href: ROUTES.PLATFORM.CALENDAR_SETTINGS,
    icon: Settings2,
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    // In a real app, clear cookies/session here
    router.push(ROUTES.AUTH.LOGIN);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="bg-background/80 backdrop-blur-md shadow-lg">
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </Button>
      </div>

      {/* Backdrop for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-card border-r border-border flex flex-col transition-transform duration-300 transform lg:translate-x-0 lg:static lg:inset-auto",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}>
        {/* Logo */}
        <div className="h-20 border-b border-border/50 flex items-center px-6 gap-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-foreground">
            Webot
          </span>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
          <div className="mb-6">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 px-3">
              Core Protocol
            </span>
          </div>
          {SIDEBAR_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-200 group",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-xl shadow-primary/20 scale-[1.02]"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}>
                <item.icon
                  className={cn(
                    "w-5 h-5 shrink-0 transition-transform group-hover:scale-110",
                    isActive ? "text-white" : "text-muted-foreground/60",
                  )}
                />
                <span className="flex-1">{item.title}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Area */}
        <div className="p-4 border-t border-border/50 space-y-6">
          <div className="space-y-1">
            {bottomNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}>
                  <item.icon className="w-4 h-4 shrink-0" />
                  <span>{item.title}</span>
                </Link>
              );
            })}

            <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-200">
              <HelpCircle className="w-4 h-4 shrink-0" />
              <span>Support</span>
            </button>

            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full mt-2 flex items-center justify-start gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-destructive hover:bg-destructive/10 transition-all duration-200 h-auto">
              <LogOut className="w-4 h-4 shrink-0" />
              <span>Logout</span>
            </Button>

            {/* User Profile */}
            <div className="flex items-center gap-3 p-3 mt-4 rounded-2xl bg-muted/30 border border-border/50">
              <div className="w-10 h-10 rounded-full bg-linear-to-tr from-primary to-emerald-500 p-0.5 shadow-md">
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden border-2 border-background">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-black text-foreground truncate">
                  John Doe
                </span>
                <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider truncate">
                  Enterprise
                </span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(var(--primary-rgb), 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(var(--primary-rgb), 0.2);
        }
      `}</style>
    </>
  );
};

export default Sidebar;
