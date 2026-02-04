"use client";

import {
  Building2,
  Clock,
  Timer,
  LayoutGrid,
  Briefcase,
  Settings2,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function BusinessStep() {
  return (
    <div className="max-w-2xl mx-auto py-4">
      <div className="space-y-2 mb-12">
        <Badge
          variant="outline"
          className="rounded-full border-amber-500/20 text-amber-500 bg-amber-500/5 px-4 py-1">
          Identity & Rules
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground lg:text-5xl">
          Define your <span className="text-amber-500 italic">Work Ethos.</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl">
          Set the parameters for your AI assistant. This determines how it
          introduces itself and filters requests.
        </p>
      </div>

      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-amber-500" />
            </div>
            <h3 className="text-lg font-black tracking-tight">
              Public Identity
            </h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="business-name"
                className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/50 ml-1">
                Business Branding
              </Label>
              <div className="relative group">
                <Input
                  id="business-name"
                  placeholder="e.g. Skyline Architecture"
                  className="h-16 bg-card border-none shadow-xl shadow-black/5 rounded-2xl px-6 text-xl font-bold placeholder:text-muted-foreground/30 focus-visible:ring-2 focus-visible:ring-amber-500/20 transition-all"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-focus-within:opacity-100 transition-opacity">
                  <Badge className="bg-amber-500/10 text-amber-600 border-none px-3 font-bold">
                    Bot Name
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Settings2 className="w-4 h-4 text-amber-500" />
            </div>
            <h3 className="text-lg font-black tracking-tight">Booking Logic</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-6">
            <div className="p-8 rounded-[2.5rem] bg-card border-none shadow-2xl shadow-black/5 space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-black uppercase tracking-widest text-muted-foreground/60">
                  Availability Window
                </span>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-black uppercase text-muted-foreground/40 ml-1">
                    Operations Start
                  </Label>
                  <Select defaultValue="9">
                    <SelectTrigger className="h-12 bg-muted/30 border-none rounded-xl font-bold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      {Array.from({ length: 12 }, (_, i) => i + 6).map(
                        (hour) => (
                          <SelectItem key={hour} value={hour.toString()}>
                            {hour}:00 AM
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[10px] font-black uppercase text-muted-foreground/40 ml-1">
                    Operations End
                  </Label>
                  <Select defaultValue="17">
                    <SelectTrigger className="h-12 bg-muted/30 border-none rounded-xl font-bold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      {Array.from({ length: 12 }, (_, i) => i + 12).map(
                        (hour) => (
                          <SelectItem key={hour} value={hour.toString()}>
                            {hour > 12 ? hour - 12 : hour}:00 PM
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-[2.5rem] bg-card border-none shadow-2xl shadow-black/5 space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <Timer className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-black uppercase tracking-widest text-muted-foreground/60">
                  Time Allocation
                </span>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-black uppercase text-muted-foreground/40 ml-1">
                    Standard Duration
                  </Label>
                  <Select defaultValue="30">
                    <SelectTrigger className="h-12 bg-muted/30 border-none rounded-xl font-bold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="15">15 Minutes</SelectItem>
                      <SelectItem value="30">30 Minutes</SelectItem>
                      <SelectItem value="45">45 Minutes</SelectItem>
                      <SelectItem value="60">1 Hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[10px] font-black uppercase text-muted-foreground/40 ml-1">
                    Safety Buffer
                  </Label>
                  <Select defaultValue="15">
                    <SelectTrigger className="h-12 bg-muted/30 border-none rounded-xl font-bold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="0">Zero Buffer</SelectItem>
                      <SelectItem value="5">5 Minutes</SelectItem>
                      <SelectItem value="15">15 Minutes</SelectItem>
                      <SelectItem value="30">30 Minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
