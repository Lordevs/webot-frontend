import {
  MessageSquare,
  Bot,
  Calendar,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { mockActivities } from "@/data/mock-data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const iconMap: Record<string, React.ReactNode> = {
  message: <MessageSquare className="w-3.5 h-3.5 text-primary" />,
  bot: <Bot className="w-3.5 h-3.5 text-emerald-500" />,
  calendar: <Calendar className="w-3.5 h-3.5 text-orange-500" />,
  alert: <AlertTriangle className="w-3.5 h-3.5 text-destructive" />,
  check: <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />,
};

const bgMap: Record<string, string> = {
  message: "bg-primary/10",
  bot: "bg-emerald-500/10",
  calendar: "bg-orange-500/10",
  alert: "bg-destructive/10",
  check: "bg-emerald-500/10",
};

export default function ActivityFeed() {
  return (
    <Card className="h-full flex flex-col shadow-none border-border/50 overflow-hidden">
      <CardHeader className="py-4 border-b flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-semibold tracking-tight">
          Activity Feed
        </CardTitle>
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            Live
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto custom-scrollbar p-0">
        <div className="divide-y divide-border/30">
          {mockActivities.map((activity, i) => (
            <div
              key={activity.id}
              className="p-4 flex items-start gap-4 hover:bg-muted/30 transition-colors animate-in fade-in slide-in-from-right-2"
              style={{
                animationDelay: `${i * 50}ms`,
                animationFillMode: "both",
              }}>
              <div
                className={`w-9 h-9 rounded-xl ${bgMap[activity.type] || "bg-muted"} flex items-center justify-center shrink-0 border border-white/5 shadow-sm`}>
                {iconMap[activity.type] || (
                  <MessageSquare className="w-3.5 h-3.5" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground leading-snug">
                  {activity.text}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                    {activity.time}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                  <span className="text-[10px] text-muted-foreground/70 capitalize">
                    {activity.type}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
