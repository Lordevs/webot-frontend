import { X, Send, Phone, Calendar, CheckCircle, RotateCcw } from "lucide-react";
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

export default function LeadDetailPanel({
  lead,
  onClose,
}: LeadDetailPanelProps) {
  const [message, setMessage] = useState("");

  return (
    <div className="h-full flex flex-col bg-[#FCFDFF]">
      {/* Header */}
      <div className="flex items-center justify-between p-10 border-b border-muted/20 shrink-0 bg-white/40 backdrop-blur-md">
        <div>
          <h3 className="text-2xl font-black tracking-tight text-foreground">
            Lead Detail
          </h3>
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <p className="text-[10px] text-emerald-600 uppercase tracking-[0.3em] font-black">
              Session Active
            </p>
          </div>
        </div>
        <Button
          variant="secondary"
          size="icon"
          onClick={onClose}
          className="h-12 w-12 rounded-[1.25rem] bg-secondary/50 hover:bg-destructive/10 hover:text-destructive hover:scale-105 transition-all duration-500">
          <X className="w-6 h-6" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* Profile Section */}
        <div className="px-10">
          <div className="flex items-center gap-8">
            <div className="relative group">
              <Avatar className="w-24 h-24 rounded-4xl border-[6px] border-white shadow-2xl ring-1 ring-black/5 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                <AvatarFallback className="text-3xl bg-primary/5 text-primary font-black uppercase">
                  {lead.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-2xl border-[6px] border-white shadow-lg" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-2xl font-black text-foreground tracking-tight truncate">
                {lead.name}
              </h4>
              <div className="flex items-center gap-3 mt-4">
                <Badge className="h-8 px-4 gap-2 text-[11px] font-black rounded-xl border-none bg-primary/5 text-primary tracking-tight">
                  <Phone className="w-3.5 h-3.5 opacity-60" />
                  {lead.phone}
                </Badge>
                <Badge
                  variant="outline"
                  className="h-8 px-4 text-[11px] font-black uppercase tracking-widest rounded-xl border-muted-foreground/10 text-muted-foreground/60">
                  {lead.stage}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2.5 mt-8 flex-wrap">
            {lead.tags.map((tag) => (
              <Badge
                key={tag}
                className="px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] rounded-xl shadow-sm border-none bg-primary text-white hover:bg-primary/90 transition-colors">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="px-10">
          <Separator className="opacity-10" />
        </div>

        {/* Conversation */}
        <div className="px-10 py-6 space-y-10">
          <div className="flex items-center justify-between">
            <p className="text-[10px] uppercase tracking-[0.4em] text-primary/40 font-black">
              Communication Log
            </p>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/20" />
              <span className="text-[9px] font-black text-primary/30 uppercase tracking-[0.2em]">
                Verified Sync
              </span>
            </div>
          </div>

          <div className="space-y-8 ">
            {mockConversation.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-start" : "justify-end"}`}>
                <div
                  className={`max-w-[85%] px-6 py-5 rounded-4xl text-[13px] font-black leading-relaxed shadow-sm transition-all hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.05)] ${
                    msg.sender === "user"
                      ? "bg-white text-foreground/80 rounded-bl-none border border-muted/20"
                      : "bg-primary text-white rounded-br-none shadow-lg shadow-primary/30"
                  }`}>
                  {msg.text}
                  <div
                    className={`flex items-center gap-3 mt-4 justify-end ${msg.sender === "user" ? "text-muted-foreground/30" : "text-white/50"}`}>
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] tabular-nums">
                      {msg.time}
                    </span>
                    {msg.sender !== "user" && (
                      <CheckCircle className="w-3.5 h-3.5" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Block */}
        <div className="p-10 bg-white/40 backdrop-blur-md rounded-t-[3rem] border-t border-muted/20">
          <p className="text-[10px] uppercase tracking-[0.4em] text-primary/40 font-black mb-6">
            Protocol Objective
          </p>
          {lead.nextMeeting ? (
            <Card className="border-none bg-primary/2 rounded-[2.5rem] overflow-hidden group/card shadow-inner ring-1 ring-primary/5">
              <div className="p-8">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-[1.25rem] bg-primary flex items-center justify-center shadow-lg shadow-primary/30 group-hover/card:scale-110 group-hover:-rotate-3 transition-all duration-500">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className="text-xl font-black text-foreground block tracking-tight">
                      {lead.nextMeeting}
                    </span>
                    <p className="text-[10px] text-primary font-black uppercase tracking-[0.25em] mt-1.5 opacity-40">
                      Phase: Discovery • Rep: {lead.assignedAgent}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <Button
                    variant="outline"
                    className="rounded-2xl text-[10px] font-black h-12 gap-2 bg-white border-muted/20 shadow-sm hover:bg-secondary transition-all uppercase tracking-widest">
                    <RotateCcw className="w-4 h-4" /> Reschedule
                  </Button>
                  <Button className="rounded-2xl text-[10px] font-black h-12 gap-2 bg-primary text-white shadow-lg shadow-primary/40 hover:scale-105 transition-all uppercase tracking-widest">
                    <CheckCircle className="w-4 h-4" /> Confirmed
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <div className="p-10 rounded-[3rem] border-2 border-dashed border-primary/10 text-center bg-primary/2 group cursor-pointer hover:bg-primary/4 transition-all duration-500">
              <p className="text-xs text-primary/40 font-black uppercase tracking-widest">
                No active objectives
              </p>
              <Button
                variant="ghost"
                className="mt-6 text-[10px] font-black h-11 gap-3 text-primary hover:bg-primary/5 rounded-2xl uppercase tracking-[0.2em]">
                <Calendar className="w-4 h-4" /> Initiate Discovery
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Quick Reply */}
      <div className="p-10 pt-6 border-t border-muted/20 bg-white/40 backdrop-blur-md shrink-0">
        <div className="flex items-center gap-4 bg-white p-2.5 rounded-4xl border border-muted/20 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] focus-within:ring-4 focus-within:ring-primary/5 transition-all duration-500">
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="System response command..."
            className="flex-1 border-none shadow-none focus-visible:ring-0 text-[14px] font-black h-11 bg-transparent px-5 placeholder:text-muted-foreground/30"
          />
          <Button
            size="icon"
            className="h-11 w-11 rounded-2xl shadow-lg shadow-primary/40 bg-primary hover:scale-110 active:scale-95 transition-all duration-500 shrink-0">
            <Send className="w-4 h-4 ml-0.5 text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
}
