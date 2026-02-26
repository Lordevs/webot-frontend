import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Appointment } from "@/hooks/use-crm";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { useAppointments } from "@/hooks/use-crm";
import { Skeleton } from "@/components/ui/skeleton";

const statusConfig: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  CONFIRMED: {
    label: "Confirmed",
    color: "text-emerald-500",
    bg: "bg-emerald-500",
  },
  PENDING: { label: "Pending", color: "text-primary", bg: "bg-secondary" },
  CANCELLED: {
    label: "Cancelled",
    color: "text-destructive",
    bg: "bg-destructive",
  },
};

export default function MeetingTimeline() {
  const { data: appointments, isLoading } = useAppointments();

  if (isLoading) {
    return (
      <Card className="border-none py-0 gap-0 bg-[#FCFDFF] shadow-[0_15px_50px_-15px_rgba(0,0,0,0.03)] rounded-[3rem] overflow-hidden">
        <CardHeader className="p-8 px-10 border-b border-muted/20">
          <Skeleton className="h-8 w-40" />
        </CardHeader>
        <CardContent className="p-8">
          <div className="flex gap-4 overflow-x-hidden">
            {[1, 2, 3].map((i) => (
              <Skeleton
                key={i}
                className="h-[200px] w-[260px] rounded-[2.5rem] shrink-0"
              />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-none py-0 gap-0 bg-[#FCFDFF] shadow-[0_15px_50px_-15px_rgba(0,0,0,0.03)] rounded-[3rem] overflow-hidden group/timeline transition-all duration-700">
      <CardHeader className="p-8 px-10 border-b border-muted/20 flex flex-row items-center justify-between shrink-0 bg-white/40 backdrop-blur-md z-10">
        <CardTitle className="text-xl font-black tracking-tight text-foreground">
          Schedule Objective
        </CardTitle>
        <div className="px-4 py-2 bg-primary/5 rounded-2xl ring-1 ring-primary/10">
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-stretch gap-3 overflow-x-auto custom-scrollbar p-2 pb-6">
          {appointments?.length === 0 ? (
            <div className="w-full h-32 flex flex-col items-center justify-center text-muted-foreground/40 italic">
              <CalendarIcon className="w-8 h-8 mb-2 opacity-20" />
              <p className="text-sm font-bold uppercase tracking-widest">
                No meetings scheduled
              </p>
            </div>
          ) : (
            appointments?.map((meeting: Appointment) => (
              <div
                key={meeting.id}
                className="flex-none w-[260px] p-7 rounded-[2.5rem] bg-white border border-muted/10 hover:border-primary/20 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.05)] transition-all duration-500 cursor-pointer group/item relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-primary/10 group-hover/item:bg-primary transition-colors duration-500" />
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className={`text-[9px] font-black uppercase tracking-[0.25em] ${statusConfig[meeting.status]?.color || "text-primary"}`}
                  >
                    {statusConfig[meeting.status]?.label || meeting.status}
                  </span>
                </div>

                <div className="space-y-2">
                  <p className="text-2xl font-black text-foreground tracking-tighter tabular-nums leading-none">
                    {new Date(meeting.start_time).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p className="text-sm font-black text-foreground/40 tracking-tight line-clamp-1">
                    {meeting.customer_name || "Guest User"}
                  </p>
                </div>

                <div className="mt-10 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-10 h-10 rounded-2xl border-4 border-white shadow-lg ring-1 ring-black/5 transition-transform group-hover/item:scale-110">
                      <AvatarFallback className="text-[10px] bg-primary/5 text-primary font-black uppercase">
                        {meeting.service_name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-[9px] font-black text-muted-foreground/40 uppercase tracking-[0.2em] bg-secondary/50 px-2 py-1 rounded-lg">
                      {meeting.service_name}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-[-4px] transition-all duration-500 shadow-lg shadow-primary/20">
                    <ChevronRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
