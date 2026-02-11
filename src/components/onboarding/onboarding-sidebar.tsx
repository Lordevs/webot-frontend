"use client";

import { Check, LucideIcon, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { useProfile } from "@/contexts/profile-context";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

interface Step {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

interface OnboardingSidebarProps {
  steps: Step[];
  currentStep: number;
}

export function OnboardingSidebar({
  steps,
  currentStep,
}: OnboardingSidebarProps) {
  const router = useRouter();

  const { profile, loading: profileLoading } = useProfile();

  const handleLogout = () => {
    router.push(ROUTES.AUTH.LOGIN);
  };
  return (
    <Sidebar
      variant="inset"
      className="border-r border-border/50 bg-card/30 backdrop-blur-xl">
      <SidebarHeader className="h-16 flex items-center px-6 border-b border-border/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <Calendar className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-linear-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
            Webot
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {steps.map((step) => {
                const isCompleted = step.id < currentStep;
                const isActive = step.id === currentStep;

                return (
                  <SidebarMenuItem key={step.id}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={cn(
                        "h-auto py-4 px-4 transition-all duration-300 rounded-2xl",
                        isActive
                          ? "bg-primary/5 border border-primary/20 shadow-sm"
                          : "hover:bg-muted/50 border border-transparent",
                      )}>
                      <div className="flex items-start gap-4 w-full">
                        <div
                          className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500",
                            isCompleted
                              ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                              : isActive
                                ? "bg-primary text-white shadow-lg shadow-primary/20"
                                : "bg-muted text-muted-foreground",
                          )}>
                          {isCompleted ? (
                            <Check className="w-5 h-5 stroke-[3px]" />
                          ) : (
                            <step.icon
                              className={cn(
                                "w-5 h-5",
                                isActive ? "animate-pulse" : "",
                              )}
                            />
                          )}
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span
                            className={cn(
                              "text-sm font-bold tracking-tight",
                              isActive
                                ? "text-foreground"
                                : "text-muted-foreground",
                            )}>
                            {step.title}
                          </span>
                          <span className="text-xs text-muted-foreground/60 leading-tight">
                            {step.description}
                          </span>
                        </div>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <div className="mt-auto p-6 border-t border-border/10">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full mb-4 flex items-center justify-start gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-destructive hover:bg-destructive/10 transition-all duration-200 h-auto">
          <LogOut className="w-4 h-4 shrink-0" />
          <span>Logout</span>
        </Button>
        <div className="flex items-center flex-row p-3 rounded-2xl bg-muted/30 border border-border/50">
          {profileLoading ? (
            <>
              <Skeleton className="w-8 h-8 rounded-full" />
              <div className="flex flex-col gap-1.5 ml-3">
                <Skeleton className="h-2 w-16" />
                <Skeleton className="h-1.5 w-12" />
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-full bg-linear-to-tr from-primary to-emerald-500 p-0.5 shadow-md">
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden border-2 border-background">
                  <Image
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile?.email || "guest"}`}
                    alt="Avatar"
                    width={32}
                    height={32}
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
                  Onboarding Mode
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Sidebar>
  );
}
