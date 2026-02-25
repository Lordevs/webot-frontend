import { mockMeetings } from "@/data/mock-data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronRight } from "lucide-react";

const statusConfig: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  upcoming: { label: "Upcoming", color: "text-primary", bg: "bg-primary" },
  done: { label: "Done", color: "text-emerald-500", bg: "bg-emerald-500" },
  missed: { label: "Missed", color: "text-destructive", bg: "bg-destructive" },
};

export default function MeetingTimeline() {
  return (
    <Card className="shadow-none border-border/50">
      <CardHeader className="py-4 border-b flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-semibold tracking-tight">
          Today's Schedule
        </CardTitle>
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "short",
            day: "numeric",
          })}
        </span>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex items-start gap-0 overflow-x-auto custom-scrollbar">
          {mockMeetings.map((meeting, i) => (
            <div
              key={meeting.id}
              className="flex-none w-[220px] p-5 border-r border-border/30 last:border-r-0 group cursor-pointer hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`w-2 h-2 rounded-full ${statusConfig[meeting.status].bg} shadow-[0_0_8px_rgba(0,0,0,0.1)]`}
                />
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider ${statusConfig[meeting.status].color}`}>
                  {statusConfig[meeting.status].label}
                </span>
              </div>

              <p className="text-sm font-bold text-foreground">
                {meeting.time}
              </p>
              <p className="text-xs text-muted-foreground mt-1 font-medium truncate">
                {meeting.client}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="w-6 h-6 border border-background shadow-xs">
                    <AvatarFallback className="text-[8px] bg-muted font-bold text-muted-foreground">
                      {meeting.agent}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-[10px] font-semibold text-muted-foreground uppercase">
                    {meeting.type}
                  </span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/30 group-hover:text-primary transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
