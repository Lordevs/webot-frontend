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

const Index = () => {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  return (
    <div className="min-h-screen bg-background p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-foreground tracking-tight">
            WEBOT
          </h1>
          <p className="text-xs text-muted-foreground">
            Dashboard Control Center
          </p>
        </div>
        <QuickControls />
      </div>

      {/* Status Bar */}
      <StatusBar />

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
      {selectedLead && (
        <>
          <div
            className="fixed inset-0 bg-foreground/10 backdrop-blur-sm z-40"
            onClick={() => setSelectedLead(null)}
          />
          <LeadDetailPanel
            lead={selectedLead}
            onClose={() => setSelectedLead(null)}
          />
        </>
      )}
    </div>
  );
};

export default Index;
