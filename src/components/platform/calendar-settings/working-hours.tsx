"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const WorkingHours = () => {
  const [workingDays, setWorkingDays] = useState({
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: false,
    sunday: false,
  });

  const toggleDay = (day: keyof typeof workingDays) => {
    setWorkingDays((prev) => ({ ...prev, [day]: !prev[day] }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}>
      <Card className="h-full border border-border/40 bg-card/60 backdrop-blur-sm shadow-xl shadow-black/2 rounded-4xl overflow-hidden">
        <CardHeader className="p-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold tracking-tight">
                Working Hours
              </CardTitle>
              <CardDescription className="text-sm font-medium text-muted-foreground/70">
                Set the hours when bookings can be made.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8 pt-0 space-y-8">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/60 px-1">
                Start Time
              </Label>
              <Select defaultValue="9">
                <SelectTrigger className="h-12 rounded-xl bg-muted/20 border-border/50 focus:ring-primary/20 transition-all font-bold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-border/50">
                  {Array.from({ length: 12 }, (_, i) => i + 6).map((hour) => (
                    <SelectItem
                      key={hour}
                      value={hour.toString()}
                      className="font-medium">
                      {hour}:00 AM
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/60 px-1">
                End Time
              </Label>
              <Select defaultValue="17">
                <SelectTrigger className="h-12 rounded-xl bg-muted/20 border-border/50 focus:ring-primary/20 transition-all font-bold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-border/50">
                  {Array.from({ length: 12 }, (_, i) => i + 12).map((hour) => (
                    <SelectItem
                      key={hour}
                      value={hour.toString()}
                      className="font-medium">
                      {hour > 12 ? hour - 12 : hour}:00 PM
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/60 px-1">
              Working Days
            </Label>
            <div className="grid grid-cols-7 gap-2">
              {Object.entries(workingDays).map(([day, enabled]) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day as keyof typeof workingDays)}
                  className={cn(
                    "h-12 rounded-xl text-xs font-black transition-all duration-300 flex items-center justify-center",
                    enabled
                      ? "bg-primary text-background shadow-lg shadow-primary/20 scale-[1.05]"
                      : "bg-muted/30 text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                  )}>
                  {day.slice(0, 3).toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
