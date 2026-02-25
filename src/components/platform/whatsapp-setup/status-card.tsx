"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Hash } from "lucide-react";
import { WhatsAppIcon } from "@/components/common/icons";
import { cn } from "@/lib/utils";

interface StatusCardProps {
  isConnected: boolean;
  connectionInfo: {
    phoneNumber: string; // phone_number_id from Meta
    wabaId: string; // waba_id from Meta
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
        isConnected ? "bg-emerald-500" : "bg-primary/30",
      )}
    />
    <CardHeader className="p-8 pb-6">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="flex items-center gap-5">
          <div
            className={cn(
              "w-16 h-16 rounded-[1.8rem] flex items-center justify-center transition-transform duration-500 group-hover:scale-110 shadow-lg shadow-black/5 ring-1 ring-white/10",
              isConnected
                ? "bg-emerald-500 text-white"
                : "bg-primary/10 text-primary",
            )}
          >
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
              ? "bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/20"
              : "bg-primary/5 text-primary border-primary/10",
          )}
        >
          <div
            className={cn(
              "w-2 h-2 rounded-full mr-2",
              isConnected ? "bg-white animate-pulse" : "bg-primary/40",
            )}
          />
          {isConnected ? "Connected" : "Pending Connection"}
        </Badge>
      </div>
    </CardHeader>

    {isConnected && (
      <CardContent className="p-8 pt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              label: "Phone Number ID",
              value: connectionInfo.phoneNumber,
              icon: Phone,
            },
            {
              label: "WABA ID",
              value: connectionInfo.wabaId,
              icon: Hash,
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-5 rounded-3xl bg-muted/20 border border-transparent hover:border-border/50 hover:bg-muted/30 transition-all group/stat"
            >
              <div className="flex items-center gap-3 text-muted-foreground/60 mb-2">
                <stat.icon className="w-4 h-4 text-emerald-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  {stat.label}
                </span>
              </div>
              <p className="text-sm font-bold tracking-tight text-foreground group-hover/stat:text-emerald-600 transition-colors truncate">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Success Banner */}
        <div className="mt-4 p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
            <WhatsAppIcon className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
              Ready to receive messages
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Customers can now message your WhatsApp Business number and your
              AI bot will respond automatically.
            </p>
          </div>
        </div>
      </CardContent>
    )}
  </Card>
);
