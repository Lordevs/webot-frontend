import { Suspense } from "react";
import { OnboardingContainer } from "@/components/onboarding/onboarding-container";

export default function OnboardingPage() {
  return (
    <div className="min-h-screen">
      <Suspense fallback={
        <div className="flex h-screen w-full items-center justify-center bg-background">
          <div className="text-center space-y-4">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm text-muted-foreground font-medium">Loading onboarding...</p>
          </div>
        </div>
      }>
        <OnboardingContainer />
      </Suspense>
    </div>
  );
}
