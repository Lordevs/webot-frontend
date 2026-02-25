import {
  Users,
  MessageSquare,
  Calendar,
  Clock,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const kpis = [
  {
    label: "Leads Today",
    value: 24,
    icon: Users,
    trend: "+12%",
    trendColor: "text-emerald-500",
  },
  {
    label: "Active Chats",
    value: 18,
    icon: MessageSquare,
    trend: "+5%",
    trendColor: "text-emerald-500",
  },
  {
    label: "Meetings Today",
    value: 6,
    icon: Calendar,
    trend: "+2",
    trendColor: "text-primary",
  },
  {
    label: "Avg Response",
    value: "2m",
    icon: Clock,
    trend: "Stable",
    trendColor: "text-muted-foreground",
  },
];

export default function KPIStrip() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi) => (
        <Card key={kpi.label} className="shadow-none border-border/50">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <kpi.icon className="w-5 h-5 text-primary" />
              </div>
              <div
                className={`p-1 rounded-md bg-muted/50 flex items-center gap-1 ${kpi.trendColor}`}>
                <TrendingUp className="w-3 h-3" />
                <span className="text-[10px] font-bold">{kpi.trend}</span>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-foreground tracking-tight">
                {kpi.value}
              </h3>
              <p className="text-xs text-muted-foreground font-medium">
                {kpi.label}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
