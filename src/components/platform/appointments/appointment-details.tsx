"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Video } from "lucide-react";
import { WhatsAppIcon } from "@/components/common/icons";
import { Appointment } from "./appointments-table";

interface AppointmentDetailsProps {
  appointment: Appointment | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AppointmentDetails = ({
  appointment,
  open,
  onOpenChange,
}: AppointmentDetailsProps) => {
  if (!appointment) return null;

  const getStatusBadge = (status: Appointment["status"]) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge className="bg-primary/10 text-primary border-primary/20 font-bold px-4 py-1.5 rounded-full">
            Confirmed
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 font-bold px-4 py-1.5 rounded-full">
            Completed
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-destructive/10 text-destructive border-destructive/20 font-bold px-4 py-1.5 rounded-full">
            Cancelled
          </Badge>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl p-0 overflow-hidden border-border/40 bg-card/90 backdrop-blur-xl rounded-4xl shadow-3xl">
        <div className="h-2 w-full bg-primary" />
        <div className="p-8 space-y-8">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-[1.8rem] bg-primary text-background flex items-center justify-center text-xl font-black shadow-2xl shadow-primary/30">
                  {appointment.customer
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="text-left">
                  <DialogTitle className="text-2xl font-black tracking-tight">
                    {appointment.customer}
                  </DialogTitle>
                  <DialogDescription className="text-base font-medium text-muted-foreground/70">
                    Intelligence Report & Metadata
                  </DialogDescription>
                </div>
              </div>
              {getStatusBadge(appointment.status)}
            </div>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 rounded-3xl bg-muted/20 border border-border/10 space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground/60">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest text-primary/60">
                  Session Date
                </span>
              </div>
              <p className="text-lg font-black tracking-tight">
                {appointment.date}
              </p>
            </div>
            <div className="p-5 rounded-3xl bg-muted/20 border border-border/10 space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground/60">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest text-primary/60">
                  Start Time
                </span>
              </div>
              <p className="text-lg font-black tracking-tight">
                {appointment.time}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 px-1">
                Session Data
              </h4>
              <div className="grid gap-3">
                <div className="flex items-center justify-between p-4 bg-muted/20 rounded-2xl border border-transparent hover:border-border/50 transition-all">
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-primary/60" />
                    <span className="text-sm font-bold opacity-60">
                      Customer Email
                    </span>
                  </div>
                  <span className="text-sm font-black">
                    {appointment.email}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-muted/20 rounded-2xl border border-transparent hover:border-border/50 transition-all">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-primary/60" />
                    <span className="text-sm font-bold opacity-60">
                      Duration
                    </span>
                  </div>
                  <span className="text-sm font-black uppercase">
                    {appointment.duration}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-muted/20 rounded-2xl border border-transparent hover:border-border/50 transition-all">
                  <div className="flex items-center gap-3">
                    <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                    <span className="text-sm font-bold opacity-60">
                      Source Protocol
                    </span>
                  </div>
                  <span className="text-sm font-black text-[#25D366] uppercase tracking-widest">
                    WhatsApp Business
                  </span>
                </div>
              </div>
            </div>

            {appointment.status === "confirmed" && appointment.meetLink && (
              <div className="pt-4 flex flex-col gap-3">
                <Button className="h-14 px-8 rounded-2xl font-black shadow-xl shadow-primary/20 flex items-center justify-center gap-3 text-lg transition-transform hover:scale-[1.02] active:scale-[0.98]">
                  <Video className="w-6 h-6" />
                  Initiate Video Bridge
                </Button>
                <div className="flex items-center gap-2 justify-center text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">
                  <Shield className="w-3 h-3" />
                  Secure End-To-End Connection
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Shield = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
