"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Clock, MessageCircle, CheckCircle2 } from "lucide-react";
import { WhatsAppIcon } from "@/components/common/icons";
import { cn } from "@/lib/utils";

interface StatusCardProps {
  isConnected: boolean;
  connectionInfo: {
    phoneNumber: string;
    lastMessageReceived: string;
    messagesProcessed: number;
    bookingsCreated: number;
  };
}

export const StatusCard = ({
  isConnected,
  connectionInfo,
}: StatusCardProps) => (
  <Card className="group border gap-0 py-0 border-border/40 bg-card/60 backdrop-blur-sm shadow-xl shadow-black/2 rounded-4xl overflow-hidden">
    <div
      className={cn(
        "h-1.5 w-full",
        isConnected ? "bg-primary" : "bg-primary/30",
      )}
    />
    <CardHeader className="p-8 pb-6">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="flex items-center gap-5">
          <div
            className={cn(
              "w-16 h-16 rounded-[1.8rem] flex items-center justify-center transition-transform duration-500 group-hover:scale-110 shadow-lg shadow-black/5 ring-1 ring-white/10",
              isConnected
                ? "bg-primary text-background"
                : "bg-primary/10 text-primary",
            )}>
            <WhatsAppIcon className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight">
              System Status
            </CardTitle>
            <CardDescription className="text-base font-medium text-muted-foreground/70">
              {isConnected
                ? "Your bot is live and responding to customers."
                : "Awaiting connection to activate the bot."}
            </CardDescription>
          </div>
        </div>
        <Badge
          variant="outline"
          className={cn(
            "px-4 py-1.5 rounded-full font-bold uppercase text-[10px] tracking-widest transition-all",
            isConnected
              ? "bg-primary text-background border-primary shadow-lg shadow-primary/20"
              : "bg-primary/5 text-primary border-primary/10 shadow-lg shadow-primary/5",
          )}>
          <div
            className={cn(
              "w-2 h-2 rounded-full mr-2",
              isConnected ? "bg-background animate-pulse" : "bg-primary/40",
            )}
          />
          {isConnected ? "Connected" : "Pending Connection"}
        </Badge>
      </div>
    </CardHeader>
    <CardContent className="p-8 pt-0">
      {isConnected && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: "Phone Number",
              value: connectionInfo.phoneNumber,
              icon: Phone,
              color: "text-primary",
              bg: "bg-primary/5",
            },
            {
              label: "Last Activity",
              value: connectionInfo.lastMessageReceived,
              icon: Clock,
              color: "text-primary",
              bg: "bg-primary/5",
            },
            {
              label: "Messages",
              value: connectionInfo.messagesProcessed,
              icon: WhatsAppIcon,
              color: "text-primary",
              bg: "bg-primary/5",
            },
            {
              label: "Bookings",
              value: connectionInfo.bookingsCreated,
              icon: CheckCircle2,
              color: "text-primary",
              bg: "bg-primary/5",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-5 rounded-3xl bg-muted/20 border border-transparent hover:border-border/50 hover:bg-muted/30 transition-all group/stat">
              <div className="flex items-center gap-3 text-muted-foreground/60 mb-2">
                <stat.icon className={cn("w-4 h-4", stat.color)} />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  {stat.label}
                </span>
              </div>
              <p className="text-lg font-bold tracking-tight text-foreground group-hover/stat:text-primary transition-colors">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      )}
    </CardContent>
  </Card>
);
