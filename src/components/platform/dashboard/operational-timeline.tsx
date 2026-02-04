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
    <Card className="h-full border border-border/50 shadow-2xl shadow-black/2 rounded-[3rem] overflow-hidden flex flex-col">
      <CardHeader className="p-8 pb-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-black tracking-tight">
              Today's Protocol
            </CardTitle>
            <CardDescription className="font-medium">
              Operational timeline for efficient execution
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            className="rounded-xl font-bold gap-2"
            asChild>
            <Link href={ROUTES.PLATFORM.APPOINTMENTS}>
              View Matrix
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-8 pt-0 flex-1">
        <div className="space-y-4">
          {appointments.map((apt) => (
            <div
              key={apt.id}
              className="group flex items-center justify-between p-4 px-6 rounded-3xl bg-muted/20 border border-transparent hover:border-border transition-all duration-300">
              <div className="flex items-center gap-5">
                <div
                  className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-black ring-4 ring-offset-2 ring-transparent transition-all",
                    apt.status === "completed"
                      ? "bg-muted text-muted-foreground opacity-50 capitalize shadow-inner"
                      : "bg-primary/10 text-primary shadow-lg shadow-primary/5 ring-primary/5",
                  )}>
                  {apt.customer
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="space-y-0.5">
                  <p
                    className={cn(
                      "font-black tracking-tight text-lg",
                      apt.status === "completed"
                        ? "text-muted-foreground/60"
                        : "text-foreground",
                    )}>
                    {apt.customer}
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest opacity-40">
                      {apt.type}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground opacity-20" />
                    <span className="text-xs font-black text-muted-foreground/60">
                      {apt.time}
                    </span>
                  </div>
                </div>
              </div>
              <Badge
                variant="outline"
                className={cn(
                  "rounded-xl px-4 py-1.5 font-black uppercase text-[9px] tracking-widest transition-all",
                  apt.status === "completed"
                    ? "bg-muted text-muted-foreground/40 border-transparent"
                    : "bg-emerald-500/10 text-emerald-600 border-emerald-500/10",
                )}>
                {apt.status === "completed" ? "Synchronized" : "Upcoming"}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </motion.div>
);
