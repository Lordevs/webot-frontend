"use client";

import { Check, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: number;
  title: string;
  icon: LucideIcon;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex justify-between relative px-2">
      {steps.map((step) => {
        const isCompleted = step.id < currentStep;
        const isActive = step.id === currentStep;

        return (
          <div key={step.id} className="flex flex-col items-center gap-2 group">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 relative z-10",
                isCompleted
                  ? "bg-primary text-white shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]"
                  : isActive
                    ? "bg-background border-2 border-primary text-primary ring-4 ring-primary/10 shadow-lg"
                    : "bg-muted text-muted-foreground border border-transparent",
              )}>
              {isCompleted ? (
                <Check className="w-5 h-5 stroke-[3px]" />
              ) : (
                <step.icon
                  className={cn("w-5 h-5", isActive ? "animate-pulse" : "")}
                />
              )}
            </div>
            <span
              className={cn(
                "text-xs font-bold uppercase tracking-wider hidden sm:block transition-colors duration-300",
                isActive ? "text-foreground" : "text-muted-foreground/60",
              )}>
              {step.title}
            </span>
          </div>
        );
      })}
    </div>
  );
}
