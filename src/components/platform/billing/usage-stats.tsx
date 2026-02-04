"use client";

import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Calendar, Users } from "lucide-react";
import { motion } from "framer-motion";

export const UsageStats = () => {
  const usage = {
    messagesUsed: 45,
    messagesLimit: 100,
    appointmentsThisMonth: 12,
  };

  const stats = [
    {
      label: "Messages Used",
      value: `${usage.messagesUsed} / ${usage.messagesLimit}`,
      icon: WhatsAppIcon,
      progress: (usage.messagesUsed / usage.messagesLimit) * 100,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Monthly Appointments",
      value: usage.appointmentsThisMonth,
      icon: Calendar,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Team Capacity",
      value: "1 / 1",
      icon: Users,
      color: "text-primary",
      bg: "bg-primary/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="flex h-full">
          <Card className="flex-1 group border-none bg-card/60 backdrop-blur-sm shadow-xl shadow-black/2 rounded-4xl overflow-hidden hover:scale-[1.02] transition-all">
            <CardContent className="p-6 h-full flex flex-col justify-center">
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center transition-transform group-hover:scale-110 shrink-0`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 truncate">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-black tracking-tight text-foreground truncate">
                      {stat.value}
                    </p>
                  </div>
                </div>

                {/* Progress bar area: either the actual bar or a placeholder to keep heights equal */}
                <div className="h-2 w-full">
                  {stat.progress !== undefined ? (
                    <div className="h-1.5 w-full bg-muted/30 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${stat.progress}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-primary rounded-full shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]"
                      />
                    </div>
                  ) : (
                    <div className="h-1.5 w-full bg-transparent" />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
