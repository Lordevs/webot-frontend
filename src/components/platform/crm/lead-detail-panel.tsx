import {
  X,
  Send,
  Phone,
  Calendar,
  Tag,
  Clock,
  CheckCircle,
  RotateCcw,
  MoreHorizontal,
} from "lucide-react";
import { Lead } from "@/types/crm";
import { mockConversation } from "@/data/mock-data";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface LeadDetailPanelProps {
  lead: Lead;
  onClose: () => void;
}

const tagConfig: Record<
  string,
  { variant: "default" | "secondary" | "outline" | "destructive" }
> = {
  Hot: { variant: "destructive" },
  Interested: { variant: "default" },
  VIP: { variant: "secondary" },
  Enterprise: { variant: "outline" },
};

export default function LeadDetailPanel({
  lead,
  onClose,
}: LeadDetailPanelProps) {
  const [message, setMessage] = useState("");

  return (
    <div className="fixed inset-y-0 right-0 w-[460px] bg-background border-l border-border shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div>
          <h3 className="text-sm font-bold text-foreground">Lead Details</h3>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold mt-0.5">
            Contact Overview
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
            <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 rounded-lg hover:bg-destructive/10 hover:text-destructive transition-colors">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Profile Section */}
      <div className="p-6">
        <div className="flex items-center gap-4">
          <Avatar className="w-14 h-14 border-2 border-background shadow-md">
            <AvatarFallback className="text-lg bg-primary/10 text-primary font-bold">
              {lead.avatar}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h4 className="text-base font-bold text-foreground tracking-tight">
              {lead.name}
            </h4>
            <div className="flex items-center gap-2 mt-1">
              <Badge
                variant="secondary"
                className="h-5 px-1.5 gap-1 text-[10px] font-bold">
                <Phone className="w-2.5 h-2.5" />
                {lead.phone}
              </Badge>
              <Badge
                variant="outline"
                className="h-5 px-1.5 text-[10px] font-bold capitalize">
                {lead.stage}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-5 flex-wrap">
          {lead.tags.map((tag) => (
            <Badge
              key={tag}
              variant={tagConfig[tag]?.variant || "secondary"}
              className="px-2 py-0 text-[10px] font-bold uppercase tracking-wider">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <Separator className="mx-6 w-auto opacity-50" />

      {/* Conversation */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
            Chat History
          </p>
          <span className="text-[10px] text-emerald-500 font-bold uppercase">
            Active now
          </span>
        </div>

        <div className="space-y-4">
          {mockConversation.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "user" ? "justify-start" : "justify-end"}`}>
              <div
                className={`max-w-[85%] px-4 py-3 rounded-2xl text-xs leading-relaxed shadow-sm transition-all hover:shadow-md ${
                  msg.sender === "user"
                    ? "bg-muted text-foreground rounded-bl-none border border-border/50"
                    : "bg-primary text-primary-foreground rounded-br-none"
                }`}>
                {msg.text}
                <div
                  className={`flex items-center gap-1.5 mt-2 justify-end ${msg.sender === "user" ? "text-muted-foreground" : "text-primary-foreground/70"}`}>
                  <span className="text-[9px] font-medium uppercase">
                    {msg.time}
                  </span>
                  {msg.sender !== "user" && (
                    <CheckCircle className="w-2.5 h-2.5" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Reply */}
      <div className="p-6 border-t border-border bg-muted/20">
        <div className="flex items-center gap-2 bg-background p-1.5 rounded-2xl border border-border shadow-sm focus-within:ring-2 focus-within:ring-primary/20 transition-all">
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border-none shadow-none focus-visible:ring-0 text-xs h-9 bg-transparent"
          />
          <Button
            size="icon"
            className="h-9 w-9 rounded-xl shadow-none shrink-0">
            <Send className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Action Block */}
      <div className="p-6 border-t border-border">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-4">
          Next Scheduled Action
        </p>
        {lead.nextMeeting ? (
          <Card className="shadow-none border-border/50 bg-muted/30 overflow-hidden">
            <div className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <span className="text-xs font-bold text-foreground block">
                    {lead.nextMeeting}
                  </span>
                  <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mt-0.5">
                    Demo Call • Agent {lead.assignedAgent}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-[11px] font-bold h-8 rounded-lg gap-1.5 bg-background shadow-none">
                  <RotateCcw className="w-3 h-3" /> Reschedule
                </Button>
                <Button
                  size="sm"
                  className="flex-1 text-[11px] font-bold h-8 rounded-lg gap-1.5 bg-emerald-500 hover:bg-emerald-600 shadow-none">
                  <CheckCircle className="w-3 h-3" /> Complete
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <div className="p-4 rounded-xl border border-dashed border-border/50 text-center">
            <p className="text-xs text-muted-foreground font-medium">
              No upcoming meetings scheduled
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="mt-2 text-[11px] font-bold h-7 gap-1.5 text-primary hover:text-primary hover:bg-primary/5">
              <Calendar className="w-3 h-3" /> Schedule Now
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
