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
    <Card className="h-full py-0 gap-0 border border-border/40 bg-card/60 backdrop-blur-sm shadow-xl shadow-black/2 rounded-4xl overflow-hidden flex flex-col">
      <CardHeader className="p-8 pb-4 border-b border-border/10">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
              Today's Schedule
            </CardTitle>
            <CardDescription className="font-medium text-sm text-muted-foreground/60">
              Your appointments for today
            </CardDescription>
          </div>
          <Button
            variant="outline"
            className="h-10 px-4 rounded-xl font-bold text-xs gap-2 border-border/50 bg-background/50 backdrop-blur-md hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            asChild>
            <Link href={ROUTES.PLATFORM.APPOINTMENTS}>
              View All
              <ArrowRight className="w-3" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-8 pt-6 flex-1">
        <div className="space-y-4">
          {appointments.map((apt) => (
            <div
              key={apt.id}
              className="group flex items-center justify-between p-4 px-5 rounded-3xl bg-muted/10 border border-transparent hover:border-primary/10 hover:bg-white/2 hover:shadow-lg hover:shadow-black/5 transition-all duration-300 pointer-events-auto">
              <div className="flex items-center gap-5">
                <div
                  className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold ring-4 ring-offset-2 ring-transparent transition-all duration-500",
                    apt.status === "completed"
                      ? "bg-muted/40 text-muted-foreground/40"
                      : "bg-primary/10 text-primary shadow-xl shadow-primary/5 ring-primary/5 group-hover:scale-110",
                  )}>
                  {apt.customer
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="space-y-0.5">
                  <p
                    className={cn(
                      "font-bold tracking-tight text-lg transition-colors",
                      apt.status === "completed"
                        ? "text-muted-foreground/40"
                        : "text-foreground group-hover:text-primary",
                    )}>
                    {apt.customer}
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-bold text-muted-foreground/40 uppercase tracking-widest">
                      {apt.type}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-primary/20" />
                    <span className="text-[11px] font-bold text-primary/60">
                      {apt.time}
                    </span>
                  </div>
                </div>
              </div>
              <Badge
                variant="outline"
                className={cn(
                  "rounded-full px-4 py-1.5 font-bold uppercase text-[9px] tracking-widest transition-all",
                  apt.status === "completed"
                    ? "bg-muted/10 text-muted-foreground/30 border-transparent shadow-inner"
                    : "bg-emerald-500/5 text-emerald-500 border-emerald-500/20 shadow-lg shadow-emerald-500/5",
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
