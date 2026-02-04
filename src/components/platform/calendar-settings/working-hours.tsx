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
import { Clock, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Switch } from "@/components/ui/switch";

export const WorkingHours = () => {
  const [workingDays, setWorkingDays] = useState({
    monday: { enabled: true, start: "9:00 AM", end: "5:00 PM" },
    tuesday: { enabled: true, start: "9:00 AM", end: "5:00 PM" },
    wednesday: { enabled: true, start: "9:00 AM", end: "5:00 PM" },
    thursday: { enabled: true, start: "9:00 AM", end: "5:00 PM" },
    friday: { enabled: true, start: "9:00 AM", end: "5:00 PM" },
    saturday: { enabled: false, start: "10:00 AM", end: "2:00 PM" },
    sunday: { enabled: false, start: "10:00 AM", end: "2:00 PM" },
  });

  const [useGlobalSchedule, setUseGlobalSchedule] = useState(true);

  const toggleDay = (day: keyof typeof workingDays) => {
    setWorkingDays((prev) => ({
      ...prev,
      [day]: { ...prev[day], enabled: !prev[day].enabled },
    }));
  };

  const days = [
    { key: "monday", label: "Mon" },
    { key: "tuesday", label: "Tue" },
    { key: "wednesday", label: "Wed" },
    { key: "thursday", label: "Thu" },
    { key: "friday", label: "Fri" },
    { key: "saturday", label: "Sat" },
    { key: "sunday", label: "Sun" },
  ];

  const timeSlots = [
    "12:00 AM",
    "1:00 AM",
    "2:00 AM",
    "3:00 AM",
    "4:00 AM",
    "5:00 AM",
    "6:00 AM",
    "7:00 AM",
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
    "9:00 PM",
    "10:00 PM",
    "11:00 PM",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}>
      <Card className="border border-border/40 bg-card/60 backdrop-blur-sm shadow-xl shadow-black/2 rounded-4xl overflow-hidden flex flex-col">
        <CardHeader className="p-8 pb-4 shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold tracking-tight">
                Working Hours
              </CardTitle>
              <CardDescription className="text-sm font-medium text-muted-foreground/70">
                Configure your weekly availability.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8 pt-0 overflow-visible">
          <div className="flex items-center justify-between mb-8 bg-muted/20 p-4 rounded-2xl border border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center shadow-sm">
                <Briefcase className="w-4 h-4 text-foreground" />
              </div>
              <div>
                <Label className="font-bold text-foreground">
                  Consistent Schedule
                </Label>
                <p className="text-[10px] sm:text-xs text-muted-foreground font-medium">
                  Use the same hours for all active days.
                </p>
              </div>
            </div>
            <Switch
              checked={useGlobalSchedule}
              onCheckedChange={setUseGlobalSchedule}
            />
          </div>

          <AnimatePresence mode="wait">
            {useGlobalSchedule ? (
              <motion.div
                key="global"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8">
                <div className="grid grid-cols-2 gap-4 w-[220px]">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 px-1">
                      Start Time
                    </Label>
                    <Select defaultValue="9:00 AM">
                      <SelectTrigger className="h-12 rounded-xl bg-background border-border/50 focus:ring-primary/20 transition-all font-bold shadow-sm hover:border-primary/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="max-h-[200px] rounded-xl">
                        {timeSlots.map((t) => (
                          <SelectItem key={t} value={t} className="font-medium">
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 px-1">
                      End Time
                    </Label>
                    <Select defaultValue="5:00 PM">
                      <SelectTrigger className="h-12 rounded-xl bg-background border-border/50 focus:ring-primary/20 transition-all font-bold shadow-sm hover:border-primary/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="max-h-[200px] rounded-xl">
                        {timeSlots.map((t) => (
                          <SelectItem key={t} value={t} className="font-medium">
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 px-1">
                    Active Days
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {days.map(({ key, label }) => {
                      const isEnabled =
                        workingDays[key as keyof typeof workingDays].enabled;
                      return (
                        <button
                          key={key}
                          onClick={() =>
                            toggleDay(key as keyof typeof workingDays)
                          }
                          className={cn(
                            "w-12 h-12 rounded-2xl text-xs font-black transition-all duration-300 flex items-center justify-center border-2",
                            isEnabled
                              ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105"
                              : "bg-transparent border-muted-foreground/20 text-muted-foreground hover:border-primary/50 hover:text-foreground",
                          )}>
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="custom"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {days.map(({ key, label }) => {
                  const dayState = workingDays[key as keyof typeof workingDays];
                  return (
                    <div
                      key={key}
                      className={cn(
                        "flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-2xl border transition-all duration-300",
                        dayState.enabled
                          ? "bg-background border-primary/20 shadow-sm"
                          : "bg-muted/10 border-transparent opacity-60 hover:opacity-100",
                      )}>
                      <div className="flex items-center justify-between sm:w-32 shrink-0">
                        <span className="font-bold text-sm uppercase tracking-wider">
                          {label}
                        </span>
                        <Switch
                          checked={dayState.enabled}
                          onCheckedChange={() =>
                            toggleDay(key as keyof typeof workingDays)
                          }
                        />
                      </div>

                      {dayState.enabled && (
                        <motion.div
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          className="flex items-center gap-2 flex-1 min-w-0">
                          <Select defaultValue={dayState.start}>
                            <SelectTrigger className="h-9 rounded-lg border-border/50 text-xs font-bold w-full bg-muted/20">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {timeSlots.map((t) => (
                                <SelectItem
                                  key={t}
                                  value={t}
                                  className="text-xs">
                                  {t}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <span className="text-muted-foreground text-xs font-black">
                            -
                          </span>
                          <Select defaultValue={dayState.end}>
                            <SelectTrigger className="h-9 rounded-lg border-border/50 text-xs font-bold w-full bg-muted/20">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {timeSlots.map((t) => (
                                <SelectItem
                                  key={t}
                                  value={t}
                                  className="text-xs">
                                  {t}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
};
