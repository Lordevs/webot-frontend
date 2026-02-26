import { Users, MessageSquare, Calendar, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const kpis = [
  {
    label: "Leads Today",
    value: 24,
    icon: Users,
    trendColor: "text-emerald-500",
  },
  {
    label: "Active Chats",
    value: 18,
    icon: MessageSquare,

    trendColor: "text-emerald-500",
  },
  {
    label: "Meetings Today",
    value: 6,
    icon: Calendar,
    trendColor: "text-primary",
  },
  {
    label: "Avg Response",
    value: "2m",
    icon: Clock,
    trendColor: "text-muted-foreground",
  },
];

export default function KPIStrip() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi) => (
        <Card
          key={kpi.label}
          className="relative gap-0 py-0 overflow-hidden border-none bg-[#FCFDFF] group transition-all duration-500 hover:-translate-y-1 rounded-[2.5rem] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-primary/20">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-primary/10 transition-colors" />
          <CardContent className="p-7">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-[1.75rem] bg-primary flex items-center justify-center shrink-0 shadow-xl shadow-primary/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <kpi.icon className="w-7 h-7 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-black text-primary/40 uppercase tracking-[0.25em] mb-1.5">
                  {kpi.label}
                </p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-4xl font-black text-foreground tracking-tighter leading-none">
                    {kpi.value}
                  </h3>
                </div>
              </div>
            </div>
            {/* Advanced progress line */}
            <div className="mt-8 h-1 w-full bg-secondary/50 rounded-full overflow-hidden">
              <div className="h-full w-2/3 bg-linear-to-r from-primary to-primary/60 rounded-full group-hover:px-full transition-all duration-1000 ease-out" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
