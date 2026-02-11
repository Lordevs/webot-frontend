import { Suspense } from "react";
import DashboardOverview from "@/components/platform/dashboard/dashboard-overview";

export default function Dashboard() {
  return (
    <Suspense fallback={
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-muted-foreground font-medium">Loading dashboard...</p>
        </div>
      </div>
    }>
      <DashboardOverview />
    </Suspense>
  );
}
