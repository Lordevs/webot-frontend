import {
  MessageSquare,
  Bot,
  Calendar,
  AlertTriangle,
  CheckCircle,
  User,
} from "lucide-react";
import React from "react";
import { useLeadActivity } from "@/hooks/use-crm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const iconMap: Record<string, React.ReactElement> = {
  message: <User className="w-4 h-4 text-white" />,
  bot: <Bot className="w-4 h-4 text-white" />,
  calendar: <Calendar className="w-4 h-4 text-white" />,
  alert: <AlertTriangle className="w-4 h-4 text-white" />,
  check: <CheckCircle className="w-4 h-4 text-white" />,
};

interface ActivityFeedProps {
  leadId: number | null;
}

export default function ActivityFeed({ leadId }: ActivityFeedProps) {
  const { data: activities, isLoading } = useLeadActivity(leadId);

  return (
    <Card className="h-[500px] gap-0 py-0 flex flex-col border-none bg-[#FCFDFF] shadow-[0_15px_50px_-15px_rgba(0,0,0,0.03)] rounded-[3rem] overflow-hidden group/activity transition-all duration-700">
      <CardHeader className="p-8 border-b border-muted/20 flex flex-row items-center justify-between shrink-0 bg-white/40 backdrop-blur-md z-10">
        <CardTitle className="text-lg font-black tracking-tight text-foreground">
          {leadId ? "Lead Activity" : "Recent Activity"}
        </CardTitle>
        <div className="flex items-center gap-2.5 px-3 py-1.5 bg-emerald-50 rounded-full ring-2 ring-emerald-500/10 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[9px] font-black text-emerald-600 uppercase tracking-[0.3em]">
            Live
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto custom-scrollbar p-3">
        {isLoading ? (
          <div className="space-y-4 p-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 w-full rounded-3xl" />
            ))}
          </div>
        ) : !leadId ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-40">
            <MessageSquare className="w-12 h-12 mb-4 text-primary" />
            <p className="text-sm font-bold uppercase tracking-widest">
              Select a lead to view activity
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {activities?.map((activity, i) => (
              <div
                key={`${activity.type}-${activity.id}-${i}`}
                className="p-5 rounded-4xl flex items-start gap-5 hover:bg-white hover:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.04)] hover:-translate-y-0.5 transition-all duration-500 animate-in fade-in slide-in-from-bottom-2 group/item"
                style={{
                  animationDelay: `${i * 60}ms`,
                  animationFillMode: "both",
                }}
              >
                <div className="w-11 h-11 rounded-[1.25rem] bg-primary flex items-center justify-center shrink-0 shadow-lg shadow-primary/30 group-hover/item:rotate-6 transition-all duration-500">
                  {iconMap[activity.type] || (
                    <MessageSquare className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-black text-foreground/80 leading-snug tracking-tight">
                    {activity.text}
                  </p>
                  <div className="flex items-center gap-3 mt-2.5">
                    <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em] bg-primary/5 px-2 py-0.5 rounded-lg">
                      {new Date(activity.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/20" />
                      <span className="text-[10px] text-muted-foreground/40 font-black uppercase tracking-widest">
                        {activity.type}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
