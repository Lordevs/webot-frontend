"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { SIDEBAR_ITEMS, BOTTOM_NAV_ITEMS } from "@/lib/sidebar-items";
import { ROUTES } from "@/constants/routes";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import apiCaller from "@/lib/api/api-caller";
import { API_ROUTES } from "@/constants/api-routes";
import { clearAuthCookies } from "@/lib/cookies";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

interface SidebarChild {
  title: string;
  href: string;
  icon?: React.ElementType;
  isComingSoon?: boolean;
}

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ElementType;
  isComingSoon?: boolean;
  children?: SidebarChild[];
}

interface UserProfile {
  id: string;
  email: string;
}

const SidebarItemWithChildren = ({
  item,
  pathname,
  setMobileOpen,
}: {
  item: SidebarItem;
  pathname: string;
  setMobileOpen: (open: boolean) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isActiveParent = item.children?.some(
    (child: SidebarChild) => pathname === child.href,
  );

  // Auto-open if child is active
  if (isActiveParent && !isOpen) setIsOpen(true);

  return (
    <div className="mb-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-200 group hover:bg-muted hover:text-foreground",
          isActiveParent
            ? "text-foreground bg-muted/50"
            : "text-muted-foreground",
        )}>
        <item.icon
          className={cn(
            "w-5 h-5 shrink-0 transition-transform group-hover:scale-110",
            isActiveParent ? "text-primary" : "text-muted-foreground/60",
          )}
        />
        <span className="flex-1 text-left">{item.title}</span>
        <ChevronDown
          className={cn(
            "w-4 h-4 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden">
            <div className="pl-4 pt-1 space-y-1">
              {item.children?.map((child: SidebarChild) => {
                const isChildActive = pathname === child.href;
                return (
                  <Link
                    key={child.href}
                    href={child.isComingSoon ? "#" : child.href}
                    onClick={(e) => {
                      if (child.isComingSoon) e.preventDefault();
                      setMobileOpen(false);
                    }}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 border-l-2 ml-4",
                      isChildActive
                        ? "border-primary text-primary bg-primary/5"
                        : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50",
                      child.isComingSoon && "opacity-50 cursor-not-allowed",
                    )}>
                    {child.icon && (
                      <child.icon
                        className={cn(
                          "w-4 h-4 shrink-0 transition-transform group-hover:scale-110",
                          isChildActive
                            ? "text-primary"
                            : "text-muted-foreground/60",
                        )}
                      />
                    )}
                    <span className="flex-1">{child.title}</span>
                    {child.isComingSoon && (
                      <span className="text-[8px] font-black uppercase tracking-tighter px-1.5 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20">
                        Soon
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await apiCaller<UserProfile>(API_ROUTES.AUTH.PROFILE_ME, "GET");
        setProfile(res.data);
      } catch (error) {
        console.error("Sidebar: Failed to fetch profile:", error);
      } finally {
        setProfileLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    clearAuthCookies();
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
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="text-primary-foreground font-bold italic">W</span>
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

          {SIDEBAR_ITEMS.map((item: SidebarItem) => {
            if (item.children) {
              return (
                <SidebarItemWithChildren
                  key={item.title}
                  item={item}
                  pathname={pathname}
                  setMobileOpen={setMobileOpen}
                />
              );
            }

            const isActive = pathname === item.href && !item.isComingSoon;
            const isDisabled = item.isComingSoon;
            return (
              <Link
                key={item.href}
                href={isDisabled ? "#" : item.href}
                onClick={(e) => {
                  if (isDisabled) e.preventDefault();
                  setMobileOpen(false);
                }}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-200 group mb-1",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-xl shadow-primary/20 scale-[1.02]"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  isDisabled && "opacity-40 cursor-not-allowed",
                )}>
                <item.icon
                  className={cn(
                    "w-5 h-5 shrink-0 transition-transform group-hover:scale-110",
                    isActive ? "text-white" : "text-muted-foreground/60",
                  )}
                />
                <span className="flex-1">{item.title}</span>
                {item.isComingSoon && (
                  <span className="text-[8px] font-black uppercase tracking-tighter px-1.5 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20">
                    Soon
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Area */}
        <div className="p-4 border-t border-border/50 space-y-6">
          <div className="space-y-1">
            {BOTTOM_NAV_ITEMS.map((item) => {
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

            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full mt-2 flex items-center justify-start gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-destructive hover:bg-destructive/10 transition-all duration-200 h-auto">
              <LogOut className="w-4 h-4 shrink-0" />
              <span>Logout</span>
            </Button>

            {/* User Profile */}
            <div className="flex items-center gap-3 p-3 mt-4 rounded-2xl bg-muted/30 border border-border/50">
              {profileLoading ? (
                <>
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <div className="flex flex-col gap-1.5 flex-1">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-2 w-16" />
                  </div>
                </>
              ) : (
                <>
                  <div className="w-10 h-10 rounded-full bg-linear-to-tr from-primary to-emerald-500 p-0.5 shadow-md">
                    <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden border-2 border-background">
                      <Image
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile?.email || "guest"}`}
                        alt="Avatar"
                        width={40}
                        height={40}
                        unoptimized
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-black text-foreground truncate">
                      {profile?.email?.split("@")[0] || "User"}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider truncate">
                      {profile?.email || "Guest User"}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
