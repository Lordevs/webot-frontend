"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";

interface Appointment {
  id: number;
  customer: string;
  time: string;
  status: string;
  type: string;
}

interface OperationalTimelineProps {
  appointments: Appointment[];
  variants: any;
}

export const OperationalTimeline = ({
  appointments,
  variants,
}: OperationalTimelineProps) => (
  <motion.div variants={variants} className="lg:col-span-2">
    <Card className="h-full border border-border/50 shadow-2xl shadow-black/2 rounded-[2.5rem] overflow-hidden flex flex-col">
      <CardHeader className="p-6 pb-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl font-bold tracking-tight">
              Today's Schedule
            </CardTitle>
            <CardDescription className="font-medium text-xs">
              Your appointments for today
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            className="h-9 px-3 rounded-xl font-semibold text-xs gap-2"
            asChild>
            <Link href={ROUTES.PLATFORM.APPOINTMENTS}>
              View All
              <ArrowRight className="w-3 h-3" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-2 flex-1">
        <div className="space-y-3">
          {appointments.map((apt) => (
            <div
              key={apt.id}
              className="group flex items-center justify-between p-3 px-4 rounded-2xl bg-muted/20 border border-transparent hover:border-border transition-all duration-300">
              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold ring-2 ring-offset-2 ring-transparent transition-all",
                    apt.status === "completed"
                      ? "bg-muted text-muted-foreground opacity-50 shadow-inner"
                      : "bg-primary/10 text-primary shadow-lg shadow-primary/5 ring-primary/5",
                  )}>
                  {apt.customer
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="space-y-0">
                  <p
                    className={cn(
                      "font-bold tracking-tight text-base",
                      apt.status === "completed"
                        ? "text-muted-foreground/60"
                        : "text-foreground",
                    )}>
                    {apt.customer}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest opacity-40">
                      {apt.type}
                    </span>
                    <span className="w-0.5 h-0.5 rounded-full bg-muted-foreground opacity-20" />
                    <span className="text-[10px] font-semibold text-muted-foreground/60">
                      {apt.time}
                    </span>
                  </div>
                </div>
              </div>
              <Badge
                variant="outline"
                className={cn(
                  "rounded-lg px-3 py-1 font-semibold uppercase text-[8px] tracking-widest transition-all",
                  apt.status === "completed"
                    ? "bg-muted text-muted-foreground/40 border-transparent"
                    : "bg-emerald-500/10 text-emerald-600 border-emerald-500/10",
                )}>
                {apt.status === "completed" ? "Done" : "Upcoming"}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </motion.div>
);
