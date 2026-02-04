"use client";

import { useState } from "react";
import {
  Smartphone,
  CheckCircle2,
  Loader2,
  Sparkles,
  Zap,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WhatsAppIcon } from "../common/icons";
import { cn } from "@/lib/utils";

interface WhatsAppStepProps {
  connected: boolean;
  onConnect: () => void;
}

export function WhatsAppStep({ connected, onConnect }: WhatsAppStepProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onConnect();
    }, 1800);
  };

  return (
    <div className="max-w-2xl mx-auto py-4">
      <div className="space-y-2 mb-12">
        <Badge
          variant="outline"
          className="rounded-full border-emerald-500/20 text-emerald-500 bg-emerald-500/5 px-4 py-1">
          Messaging Layer
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground lg:text-5xl">
          Activate your{" "}
          <span className="text-emerald-500 italic">WhatsApp Hub.</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl">
          Choose between our instant-provisioned virtual numbers or linking your
          own Meta Business account.
        </p>
      </div>

      <div className="grid gap-6">
        {!connected ? (
          <>
            <div className="grid sm:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <button
                onClick={handleConnect}
                disabled={isLoading}
                className={cn(
                  "group relative p-8 rounded-[2.5rem] border-2 text-left transition-all duration-500",
                  "bg-card hover:shadow-[0_20px_50px_rgba(var(--primary-rgb),0.1)] hover:-translate-y-1",
                  isLoading
                    ? "border-primary shadow-lg"
                    : "border-border/50 hover:border-primary/50",
                )}>
                <div className="absolute top-6 right-6">
                  <Badge className="bg-emerald-500 hover:bg-emerald-600 text-[10px] font-black uppercase tracking-wider px-3 border-none">
                    Recommended
                  </Badge>
                </div>

                <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  {isLoading ? (
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  ) : (
                    <Smartphone className="w-8 h-8 text-primary" />
                  )}
                </div>

                <div className="space-y-2">
                  <h3 className="font-black text-2xl tracking-tight">
                    Virtual Assistant
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                    We provision a dedicated business line instantly. Ideal for
                    scaling fast.
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-2 text-xs font-bold text-primary italic">
                  <Zap className="w-3 h-3 fill-current" />
                  Setup in &lt; 10 seconds
                </div>
              </button>

              <button
                disabled
                className="p-8 rounded-[2.5rem] border-2 border-dashed border-muted text-left opacity-60 grayscale cursor-not-allowed group transition-all duration-500">
                <div className="w-16 h-16 rounded-3xl bg-muted flex items-center justify-center mb-6">
                  <WhatsAppIcon className="w-8 h-8 text-muted-foreground" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-black text-2xl tracking-tight text-muted-foreground whitespace-nowrap">
                    Meta Cloud API
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                    Connect your existing company number via official Business
                    API.
                  </p>
                </div>

                <div className="mt-8">
                  <Badge
                    variant="secondary"
                    className="bg-muted text-[10px] font-black uppercase tracking-widest px-3">
                    Waitlist Active
                  </Badge>
                </div>
              </button>
            </div>

            <div className="p-8 rounded-3xl bg-muted/30 border border-border/50 flex flex-col sm:flex-row gap-6 items-center">
              <div className="flex -space-x-3 shrink-0">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-4 border-background bg-muted flex items-center justify-center overflow-hidden">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`}
                      alt="User"
                    />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-4 border-background bg-primary flex items-center justify-center text-[10px] font-black text-white">
                  +2k
                </div>
              </div>
              <p className="text-sm font-medium text-muted-foreground leading-relaxed text-center sm:text-left">
                Join thousands of businesses delegating their{" "}
                <span className="text-foreground font-bold italic">
                  customer coordination
                </span>{" "}
                to Webot's proprietary virtual layer.
              </p>
            </div>
          </>
        ) : (
          <div className="w-full animate-in zoom-in-95 fade-in duration-700">
            <div className="p-1 rounded-[3rem] bg-linear-to-br from-emerald-500 to-emerald-400 shadow-3xl shadow-emerald-500/20">
              <div className="bg-background rounded-[2.9rem] p-12 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center mb-10 ring-8 ring-emerald-500/5">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                </div>

                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-emerald-600/60 mb-4">
                  Dedicated Business Line
                </h3>
                <p className="text-4xl sm:text-5xl font-black tracking-tight mb-8 tabular-nums">
                  +1 (888) <span className="text-emerald-500">WEBOT</span>-AI
                </p>

                <div className="grid grid-cols-2 gap-4 w-full max-w-xs mb-10">
                  <div className="flex flex-col items-center gap-1">
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-50">
                      Verified
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Sparkles className="w-5 h-5 text-emerald-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-50">
                      AI Ready
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 rounded-full bg-muted/50 border border-border/50 px-6">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-muted-foreground">
                    Accepting Global Requests
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
