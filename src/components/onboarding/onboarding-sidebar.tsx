"use client";

import { Check, LucideIcon } from "lucide-react";
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
import { LogoutButton } from "@/components/platform/common/logout-button";
import { UserProfileCard } from "@/components/platform/common/user-profile-card";

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
        <LogoutButton className="mb-4" />
        <UserProfileCard />
      </div>
    </Sidebar>
  );
}
