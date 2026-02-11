"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { 
  Calendar as CalendarIcon, 
  List, 
  ExternalLink,
  Clock,
  Video,
  Sparkles,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  CalendarProvider,
  CalendarHeader,
  CalendarBody,
  CalendarDatePagination,
  CalendarDate,
  CalendarMonthPicker,
  CalendarYearPicker,
  CalendarItem,
  Feature,
} from "@/components/kibo-ui/calendar";

interface BackendMeeting {
  id: number;
  summary: string;
  start_time: string;
  end_time: string;
  meet_link?: string;
  status: "pending" | "confirmed" | "cancelled" | "failed";
}

interface SchedulePreviewProps {
  meetings: BackendMeeting[];
  variants?: Variants;
}

const statusColors = {
  confirmed: "#10b981", // emerald
  pending: "#f59e0b",   // amber
  cancelled: "#ef4444", // red
  failed: "#71717a",    // zinc
};

export function SchedulePreview({ meetings, variants }: SchedulePreviewProps) {
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar");
  const [searchQuery, setSearchQuery] = useState("");

  const calendarFeatures = useMemo((): Feature[] => {
    return meetings.map(m => ({
      id: m.id.toString(),
      name: m.summary,
      startAt: new Date(m.start_time),
      endAt: new Date(m.end_time),
      status: { 
        id: m.status, 
        name: m.status.charAt(0).toUpperCase() + m.status.slice(1), 
        color: statusColors[m.status] || "#6366f1"
      }
    }));
  }, [meetings]);

  const filteredMeetings = useMemo(() => {
    return meetings.filter(meeting => {
      const matchesSearch = meeting.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    }).sort((a,b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime());
  }, [meetings, searchQuery]);

  const currentYear = new Date().getFullYear();

  return (
    <motion.div variants={variants} className="lg:col-span-2">
      <Card className="border-border/40 bg-card/60 backdrop-blur-md shadow-2xl rounded-4xl overflow-hidden flex flex-col h-full">
        <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0 p-8 shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <CalendarIcon className="w-5 h-5 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold">Smart Schedule</CardTitle>
            </div>
            <CardDescription className="font-medium">
              Real-time synchronization with your Google ecosystem.
            </CardDescription>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">         
            <div className="flex items-center bg-muted/30 p-1 rounded-xl border border-border/50">
                <Button
                variant={viewMode === "calendar" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("calendar")}
                className={cn(
                    "h-8 rounded-[0.6rem] px-3 font-semibold transition-all",
                    viewMode === "calendar" ? "shadow-sm" : "text-muted-foreground"
                )}
                >
                <CalendarIcon className="w-3.5 h-3.5 mr-1.5" />
                Calendar
                </Button>
                <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={cn(
                    "h-8 rounded-[0.6rem] px-3 font-semibold transition-all",
                    viewMode === "list" ? "shadow-sm" : "text-muted-foreground"
                )}
                >
                <List className="w-3.5 h-3.5 mr-1.5" />
                List
                </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-8 pt-0 flex-1 flex flex-col min-h-0">
          <AnimatePresence mode="wait">
            {viewMode === "calendar" ? (
              <motion.div
                key="calendar"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="flex-1 flex flex-col min-h-[400px] rounded-3xl border border-border/50 bg-background/40 overflow-hidden"
              >
                <CalendarProvider className="flex-1 flex flex-col min-h-0">
                  <div className="flex items-center justify-between p-4 border-b border-border/50 bg-muted/10">
                    <CalendarDate>
                      <CalendarDatePagination />
                    </CalendarDate>
                    <div className="flex items-center gap-2">
                       <CalendarMonthPicker className="h-8 text-xs font-bold" />
                       <CalendarYearPicker 
                        start={currentYear - 2} 
                        end={currentYear + 7} 
                        className="h-8 text-xs font-bold" 
                       />
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col min-h-0 p-4">
                    <CalendarHeader className="mb-2" />
                    <CalendarBody features={calendarFeatures}>
                      {({ feature }) => (
                        <CalendarItem
                          feature={feature}
                          className="text-[10px] p-1.5 rounded-lg mb-1 font-bold whitespace-nowrap overflow-hidden text-ellipsis shadow-sm"
                        />
                      )}
                    </CalendarBody>
                  </div>
                </CalendarProvider>
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                
                <div className="flex items-center gap-2 flex-1 md:flex-initial">
                    <div className="relative flex-1 md:w-64 lg:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input 
                            placeholder="Search meetings..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 h-10 rounded-xl bg-muted/20 border-white/10"
                        />
                    </div>
                </div>
           
                {filteredMeetings.length === 0 ? (
                  <div className="py-20 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-muted/20 flex items-center justify-center mx-auto">
                      <Sparkles className="w-8 h-8 text-muted-foreground/30" />
                    </div>
                    <p className="text-muted-foreground font-medium italic">
                        {searchQuery
                            ? "No meetings match your filters." 
                            : "Your schedule is clear for now."}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-muted/30 scrollbar-track-transparent">
                    {filteredMeetings.map(meeting => (
                      <div key={meeting.id} className="flex items-center gap-4 p-4 rounded-2xl bg-muted/10 border border-white/5 hover:bg-muted/20 transition-all group">
                        <div className="w-12 h-12 rounded-xl bg-card border border-border/20 flex flex-col items-center justify-center shadow-lg shadow-black/5">
                          <span className="text-[10px] font-black uppercase text-primary leading-none">
                            {new Date(meeting.start_time).toLocaleString('default', { month: 'short' })}
                          </span>
                          <span className="text-lg font-bold leading-none mt-1">
                            {new Date(meeting.start_time).getDate()}
                          </span>
                        </div>
                        <div className="flex-1 space-y-1">
                          <h4 className="font-bold text-base group-hover:text-primary transition-colors line-clamp-1">{meeting.summary}</h4>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {new Date(meeting.start_time).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}
                            </span>
                            <span className="flex items-center gap-1">
                              <Video className="w-3.5 h-3.5" />
                              Google Meet
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant="outline" 
                            className={cn(
                                "rounded-full uppercase text-[9px] font-black px-3 py-1",
                                meeting.status === 'confirmed' ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : "bg-primary/10 text-primary border-primary/20"
                            )}>
                            {meeting.status}
                          </Badge>
                          {meeting.meet_link && (
                            <Button variant="ghost" size="icon" className="rounded-xl hover:bg-primary/10 hover:text-primary" asChild>
                              <a href={meeting.meet_link} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}
