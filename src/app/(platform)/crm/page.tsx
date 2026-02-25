"use client";

import { useState } from "react";
import { Lead } from "@/types/crm";
import StatusBar from "@/components/platform/crm/status-bar";
import KPIStrip from "@/components/platform/crm/kpi-strip";
import LeadsTable from "@/components/platform/crm/leads-table";
import ActivityFeed from "@/components/platform/crm/activity-feed";
import MeetingTimeline from "@/components/platform/crm/meeting-timeline";
import LeadDetailPanel from "@/components/platform/crm/lead-detail-panel";
import QuickControls from "@/components/platform/crm/quick-controls";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const Index = () => {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  return (
    <div className="min-h-screen bg-background p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-primary-foreground font-bold italic">
                W
              </span>
            </div>
            <span className="text-2xl font-black tracking-tighter text-foreground">
              Webot
            </span>
          </div>
        </div>
        <QuickControls />
      </div>

      <StatusBar />
      {/* Status Bar */}

      {/* KPI Strip */}
      <KPIStrip />

      {/* Main Content: Leads + Activity */}
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-8">
          <LeadsTable onSelectLead={setSelectedLead} />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <ActivityFeed />
        </div>
      </div>

      {/* Meeting Timeline */}
      <MeetingTimeline />

      {/* Slide-out Panel */}
      <Sheet
        open={!!selectedLead}
        onOpenChange={(open) => !open && setSelectedLead(null)}>
        <SheetContent
          side="right"
          showCloseButton={false}
          className="p-0 w-[460px] sm:max-w-[460px] border-l border-border">
          <SheetHeader className="sr-only">
            <SheetTitle>Lead Details</SheetTitle>
          </SheetHeader>
          {selectedLead && (
            <LeadDetailPanel
              lead={selectedLead}
              onClose={() => setSelectedLead(null)}
            />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Index;
