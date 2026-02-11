"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  CheckCircle2,
  Loader2,
  Link2,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { API_ROUTES } from "@/constants/api-routes";
import apiCaller from "@/lib/api/api-caller";
import { toast } from "sonner";

interface CalendarStepProps {
  connected: boolean;
  onConnect: () => void;
}

export function CalendarStep({ connected, onConnect }: CalendarStepProps) {
  const [isLoading, setIsLoading] = useState(false);

  // Trigger onConnect when the parent state updates from URL params
  useEffect(() => {
    if (connected) {
      onConnect();
    }
  }, [connected, onConnect]);

  const handleConnect = async () => {
    setIsLoading(true);
    try {
      const res = await apiCaller<{ url: string }>(API_ROUTES.GOOGLE_CALENDAR.CONNECT, "GET");
      window.location.href = res.data.url;
    } catch (error) {
      console.error("Failed to initiate Google Calendar connection:", error);
      toast.error("Failed to connect", {
        description: "Could not initiate Google Calendar connection. Please try again.",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-4">
      <div className="space-y-2 mb-12">
        <Badge
          variant="outline"
          className="rounded-full border-primary/20 text-primary bg-primary/5 px-4 py-1">
          Infrastructure Setup
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          <span className="bg-linear-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
            Connect your{" "}
          </span>
          <span className="text-primary italic">Source of Truth.</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl">
          We need to read your calendar to identify availability and write new
          bookings directly to your schedule.
        </p>
      </div>

      <div className="grid gap-10">
        {!connected ? (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-4xl border-2 border-primary bg-card/50 shadow-xl shadow-primary/5 flex flex-col gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                  <svg
                    className="w-6 h-6 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Google Calendar</h3>
                  <p className="text-sm text-muted-foreground">
                    Most popular for businesses
                  </p>
                </div>
                <Button
                  onClick={handleConnect}
                  disabled={isLoading}
                  className="mt-4 w-full h-12 rounded-xl font-bold">
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <Link2 className="w-4 h-4 mr-2" />
                  )}
                  {isLoading ? "Negotiating..." : "Select Service"}
                </Button>
              </div>

              <div className="p-6 rounded-4xl border-2 border-transparent bg-muted/30 grayscale opacity-60 flex flex-col gap-4">
                <div className="w-12 h-12 rounded-2xl bg-muted-foreground/20 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Outlook / iCloud</h3>
                  <p className="text-sm text-muted-foreground">
                    Legacy Enterprise systems
                  </p>
                </div>
                <Button
                  variant="secondary"
                  disabled
                  className="mt-4 w-full h-12 rounded-xl font-bold bg-muted/50">
                  Coming Soon
                </Button>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-amber-500/5 border border-amber-500/10 flex gap-4">
              <Info className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-bold text-amber-900 dark:text-amber-200">
                  Security Note
                </p>
                <p className="text-xs text-amber-800/70 dark:text-amber-300/60 leading-relaxed">
                  Webot creates a read-write link to your calendar. We never
                  share your data with 3rd parties. You can revoke access any
                  time from your Google Account settings.
                </p>
              </div>
            </div>

          </div>
        ) : (
          <div className="animate-in zoom-in-95 fade-in duration-500 py-10">
            <div className="relative p-1 bg-linear-to-br from-emerald-500 to-teal-500 rounded-[2.5rem] shadow-2xl shadow-emerald-500/20">
              <div className="bg-background rounded-[2.4rem] p-10 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center mb-8 ring-8 ring-emerald-500/5">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                </div>
                <h3 className="text-3xl font-black mb-2">Service Live</h3>
                <p className="text-muted-foreground max-w-sm mb-8 font-medium">
                  Webot successfully integrated with{" "}
                  <span className="text-foreground font-bold italic">
                    primary@calendar.net
                  </span>
                </p>

                <div className="w-full grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-muted/40 text-left">
                    <p className="text-[10px] font-black uppercase text-muted-foreground/70 mb-1">
                      Status
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-sm font-bold">Synchronized</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-muted/40 text-left">
                    <p className="text-[10px] font-black uppercase text-muted-foreground/70 mb-1">
                      Latency
                    </p>
                    <span className="text-sm font-bold">&lt; 150ms</span>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  className="mt-10 text-xs font-bold text-muted-foreground underline">
                  Disconnect Account
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
