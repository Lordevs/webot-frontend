"use client";

import { useState } from "react";
import {
  TestTube,
  Send,
  CheckCircle2,
  Loader2,
  User,
  Phone,
  Signal,
  Battery,
  Wifi,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WhatsAppIcon } from "../common/icons";
import { cn } from "@/lib/utils";

interface TestBookingStepProps {
  completed: boolean;
  onComplete: () => void;
}

export function TestBookingStep({
  completed,
  onComplete,
}: TestBookingStepProps) {
  const [isSimulating, setIsSimulating] = useState(false);

  const handleTest = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      onComplete();
    }, 2800);
  };

  return (
    <div className="max-w-2xl mx-auto py-4 h-full flex flex-col">
      <div className="space-y-2 mb-10">
        <Badge
          variant="outline"
          className="rounded-full border-indigo-500/20 text-indigo-500 bg-indigo-500/5 px-4 py-1">
          Final Validation
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground lg:text-5xl">
          Observe your{" "}
          <span className="text-indigo-500 italic">Conversational Engine.</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl">
          We've simulated a client inquiry to show you exactly how Webot handles
          time coordination and confirmation.
        </p>
      </div>

      <div className="flex-1 min-h-[500px] flex flex-col lg:flex-row gap-12 items-start">
        {!completed ? (
          <>
            {/* Realistic Phone Frame */}
            <div className="relative w-full max-w-[320px] mx-auto lg:mx-0 shrink-0">
              <div className="relative z-10 w-full aspect-[9/18.5] bg-zinc-900 rounded-[3rem] p-3 border-[6px] border-zinc-800 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden">
                {/* iPhone Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-900 rounded-b-2xl z-30 flex items-center justify-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500/20" />
                  <div className="w-12 h-1.5 rounded-full bg-zinc-800" />
                </div>

                {/* Status Bar */}
                <div className="absolute top-2 left-0 right-0 px-6 flex justify-between items-center z-20">
                  <span className="text-[10px] font-black text-white">
                    11:21
                  </span>
                  <div className="flex items-center gap-1">
                    <Signal className="w-3 h-3 text-white" />
                    <Wifi className="w-3 h-3 text-white" />
                    <Battery className="w-4 h-4 text-white rotate-90" />
                  </div>
                </div>

                {/* WhatsApp UI */}
                <div className="w-full h-full bg-[#E5DDD5] dark:bg-zinc-950 flex flex-col rounded-[2.2rem] overflow-hidden">
                  <div className="bg-[#075E54] pt-8 pb-3 px-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <WhatsAppIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white text-[11px] font-bold">
                        Webot HQ
                      </p>
                      <p className="text-white/60 text-[9px]">Always Active</p>
                    </div>
                  </div>

                  <div className="flex-1 p-3 space-y-3 overflow-y-auto">
                    <div className="flex justify-end">
                      <div className="bg-[#DCF8C6] dark:bg-emerald-900/40 p-3 rounded-2xl rounded-tr-none max-w-[85%] shadow-sm">
                        <p className="text-[11px] leading-relaxed text-zinc-900 dark:text-zinc-100">
                          Hi, I'd like to book a demo for next Thursday.
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-start">
                      <div className="bg-white dark:bg-zinc-800 p-3 rounded-2xl rounded-tl-none max-w-[85%] shadow-sm animate-in slide-in-from-left-2 duration-500 delay-300 fill-mode-both">
                        <p className="text-[11px] leading-relaxed">
                          Sure! Let me check the schedule... 🔍
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-start">
                      <div className="bg-white dark:bg-zinc-800 p-3 rounded-2xl rounded-tl-none max-w-[90%] shadow-sm border-l-4 border-emerald-500 animate-in slide-in-from-left-2 duration-500 delay-1000 fill-mode-both">
                        <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                          Perfect! I have these slots:
                        </p>
                        <div className="mt-2 space-y-1">
                          <div className="flex items-center justify-between text-[10px] bg-muted/50 p-2 rounded-lg">
                            <span>10:00 AM</span>
                            <span className="text-[8px] font-black uppercase tracking-tighter opacity-50 underline">
                              Select
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] bg-muted/50 p-2 rounded-lg">
                            <span>2:30 PM</span>
                            <span className="text-[8px] font-black uppercase tracking-tighter opacity-50 underline">
                              Select
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-white/10 backdrop-blur-sm">
                    <div className="bg-background rounded-full py-2 px-4 flex items-center justify-between border border-white/10">
                      <p className="text-[10px] text-muted-foreground italic">
                        Client is typing...
                      </p>
                      <div className="w-6 h-6 rounded-full bg-[#075E54] flex items-center justify-center text-white">
                        <Send className="w-3 h-3 fill-current" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-8 pt-10">
              <div className="space-y-4">
                <h3 className="text-2xl font-black tracking-tight">
                  How it works
                </h3>
                <ul className="space-y-4">
                  {[
                    {
                      title: "Real-time Conflict Check",
                      desc: "Instantly cross-references with your Google Calendar.",
                    },
                    {
                      title: "Natural Language Processing",
                      desc: "Understands dates like 'next Thursday' or 'tomorrow'.",
                    },
                    {
                      title: "Auto-Confirmation",
                      desc: "Sends Google Meet links once the user confirms.",
                    },
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4">
                      <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5 font-black text-[10px]">
                        {i + 1}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground">
                          {item.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                onClick={handleTest}
                disabled={isSimulating}
                className="w-full h-16 rounded-2xl text-lg font-black shadow-2xl shadow-indigo-500/20 transition-all active:scale-95">
                {isSimulating ? (
                  <div className="flex items-center gap-3">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing Logic...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Send className="w-5 h-5 -rotate-45" />
                    <span>Run Test Broadcast</span>
                  </div>
                )}
              </Button>
            </div>
          </>
        ) : (
          <div className="w-full animate-in zoom-in-95 fade-in duration-700">
            <div className="p-1 rounded-[3rem] bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-3xl shadow-indigo-500/30">
              <div className="bg-background rounded-[2.9rem] p-12 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-indigo-500/10 flex items-center justify-center mb-10 ring-8 ring-indigo-500/5">
                  <CheckCircle2 className="w-12 h-12 text-indigo-500" />
                </div>

                <h3 className="text-4xl font-black tracking-tight mb-4">
                  You're Fully{" "}
                  <span className="text-indigo-500">Automated.</span>
                </h3>
                <p className="text-muted-foreground max-w-lg mb-12 font-medium">
                  The test booking was successful. A calendar invite was
                  simulated and the Google Meet link was generated for 2:30 PM
                  next Thursday.
                </p>

                <div className="w-full p-8 rounded-[2.5rem] bg-muted/40 border border-indigo-500/10 text-left relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-indigo-500/10 transition-colors" />

                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-zinc-800 shadow-xl flex items-center justify-center">
                      <User className="w-6 h-6 text-indigo-500" />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-muted-foreground opacity-50">
                        Latest Test Result
                      </p>
                      <h4 className="text-lg font-bold">
                        Simulation Confirmed
                      </h4>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <p className="text-[10px] font-black uppercase text-muted-foreground mb-1">
                        Time Assigned
                      </p>
                      <p className="font-bold text-sm italic">
                        Next Thursday, 2:30 PM
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase text-muted-foreground mb-1">
                        Integration Status
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-sm font-bold">Active Link</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
