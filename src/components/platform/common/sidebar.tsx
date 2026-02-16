"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { SIDEBAR_ITEMS, BOTTOM_NAV_ITEMS } from "@/lib/sidebar-items";
import { motion, AnimatePresence } from "framer-motion";
import { LogoutButton } from "./logout-button";
import { UserProfileCard } from "./user-profile-card";

interface SidebarChild {
  title: string;
  href: string;
  icon?: React.ElementType;
  isComingSoon?: boolean;
  isExternal?: boolean;
}

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ElementType;
  isComingSoon?: boolean;
  isExternal?: boolean;
  children?: SidebarChild[];
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
  const [isOpen, setIsOpen] = useState(() => {
    return item.children?.some((child) => pathname === child.href);
  });

  return (
    <div className="space-y-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-200 group",
          isOpen ? "text-foreground bg-muted/50" : "text-muted-foreground hover:bg-muted hover:text-foreground",
        )}>
        <item.icon className="w-5 h-5 shrink-0 text-muted-foreground/60 group-hover:scale-110 transition-transform" />
        <span className="flex-1 text-left">{item.title}</span>
        <ChevronDown
          className={cn(
            "w-4 h-4 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden">
            <div className="pl-12 pr-4 py-1 space-y-1">
              {item.children?.map((child) => {
                const isChildActive = pathname === child.href;
                return (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200",
                      isChildActive
                        ? "text-primary bg-primary/5"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}>
                    {child.icon && <child.icon className="w-4 h-4" />}
                    <span>{child.title}</span>
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
  const [mobileOpen, setMobileOpen] = useState(false);

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
            const isExternal = item.isExternal;
            return (
              <Link
                key={item.href}
                href={isDisabled ? "#" : item.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                onClick={(e) => {
                  if (isDisabled) e.preventDefault();
                  if (!isExternal) setMobileOpen(false);
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
              const isExternal = (item as SidebarItem).isExternal;

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
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

            <LogoutButton className="mt-2 text-accent" />
            <UserProfileCard className="mt-4" />
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
