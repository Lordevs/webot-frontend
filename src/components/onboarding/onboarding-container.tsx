"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MessageCircle,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { OnboardingSidebar } from "./onboarding-sidebar";
import { WhatsAppStep } from "./whatsapp-step";
import { CalendarStep } from "./calendar-step";

const steps = [
  {
    id: 1,
    title: "WhatsApp Bot",
    icon: MessageCircle,
    description: "Activate your AI assistant",
  },
  {
    id: 2,
    title: "Calendar Sync",
    icon: Calendar,
    description: "Link your availability",
  },
];

export function OnboardingContainer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [whatsappConnected, setWhatsappConnected] = useState(false);
  const [calendarConnected, setCalendarConnected] = useState(false);

  useEffect(() => {
    const status = searchParams.get("status");
    const provider = searchParams.get("provider");

    if (status === "success" && provider === "google" && !calendarConnected) {
      setCalendarConnected(true);
      setCurrentStep(2);
    }
  }, [searchParams, calendarConnected]);

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push("/dashboard");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background overflow-hidden">
        <OnboardingSidebar steps={steps} currentStep={currentStep} />

        <SidebarInset className="flex flex-col bg-muted/20">
          <header className="h-16 border-b border-border/50 px-8 flex items-center justify-between bg-card/50 backdrop-blur-md shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/50">
                Onboarding
              </span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
              <span className="text-sm font-bold text-foreground">
                {steps[currentStep - 1].title}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {steps.map((s) => (
                  <div
                    key={s.id}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      s.id === currentStep
                        ? "w-8 bg-primary"
                        : s.id < currentStep
                          ? "w-4 bg-emerald-500"
                          : "w-4 bg-muted"
                    }`}
                  />
                ))}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs font-bold text-muted-foreground">
                Get Help?
              </Button>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto relative py-12 px-8 lg:px-16">
            <div className="max-w-4xl mx-auto h-full flex flex-col">
              <div className="flex-1 relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.02, y: -10 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full">
                    {currentStep === 1 && (
                      <WhatsAppStep
                        connected={whatsappConnected}
                        onConnect={() => {
                          setWhatsappConnected(true);
                          // Auto-advance after a short delay so user can see success state
                          setTimeout(handleNext, 1500);
                        }}
                      />
                    )}
                    {currentStep === 2 && (
                      <CalendarStep
                        connected={calendarConnected}
                        onConnect={() => {
                          setCalendarConnected(true);
                          // Auto-advance/Complete after a short delay
                          setTimeout(handleNext, 1500);
                        }}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-16 pt-8 border-t border-border/50 flex items-center justify-between shrink-0">
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className="h-12 px-6 gap-2 text-muted-foreground hover:text-foreground font-bold">
                  <ArrowLeft className="w-4 h-4" />
                  Previous Step
                </Button>

                <div className="flex items-center gap-3">
                  <p className="text-xs font-medium text-muted-foreground mr-2">
                    {currentStep === 2
                      ? "Final step"
                      : "Next: " + steps[currentStep]?.title}
                  </p>
                  <Button
                    onClick={handleNext}
                    disabled={
                      (currentStep === 1 && !whatsappConnected) ||
                      (currentStep === 2 && !calendarConnected)
                    }
                    className="h-12 px-8 gap-2 font-bold shadow-lg shadow-primary/20 rounded-xl group">
                    {currentStep === 2 ? "Complete Setup" : "Continue"}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
