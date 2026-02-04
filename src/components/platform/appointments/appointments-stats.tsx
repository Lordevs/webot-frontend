"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, Clock, Calendar, X } from "lucide-react";
import { motion } from "framer-motion";

interface AppointmentsStatsProps {
  total: number;
  upcoming: number;
  completed: number;
  cancelled: number;
}

export const AppointmentsStats = ({
  total,
  upcoming,
  completed,
  cancelled,
}: AppointmentsStatsProps) => {
  const stats = [
    {
      label: "Total Bookings",
      value: total,
      icon: CalendarDays,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Upcoming",
      value: upcoming,
      icon: Clock,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Completed",
      value: completed,
      icon: Calendar,
      color: "text-indigo-500",
      bg: "bg-indigo-500/10",
    },
    {
      label: "Cancelled",
      value: cancelled,
      icon: X,
      color: "text-destructive",
      bg: "bg-destructive/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}>
          <Card className="group border-none gap-0 py-0 bg-card/60 backdrop-blur-sm shadow-xl shadow-black/2 rounded-4xl overflow-hidden hover:scale-[1.02] transition-all">
            <CardContent className="p-6">
              <div className="flex items-center gap-5">
                <div
                  className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center transition-transform group-hover:scale-110`}>
                  <stat.icon className={`w-7 h-7 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-muted-foreground/60">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-black tracking-tighter text-foreground mt-0.5">
                    {stat.value}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
