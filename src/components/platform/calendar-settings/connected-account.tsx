"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle2, User, Clock, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

export const ConnectedAccount = () => {
  const connectedAccount = {
    email: "john.doe@gmail.com",
    calendar: "Primary Calendar",
    lastSync: "Just now",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      <Card className="group border gap-0 py-0 border-border/40 bg-card/60 backdrop-blur-sm shadow-xl shadow-black/2 rounded-4xl overflow-hidden">
        <div className="h-1.5 w-full bg-primary" />
        <CardHeader className="p-8 pb-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-[1.8rem] bg-primary/10 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 shadow-lg shadow-black/5 ring-1 ring-white/10">
                <Calendar className="w-8 h-8 text-primary" />
              </div>
              <div className="space-y-1">
                <CardTitle className="text-2xl font-bold tracking-tight">
                  Google Calendar
                </CardTitle>
                <CardDescription className="text-base font-medium text-muted-foreground/70">
                  Your calendar is connected and syncing automatically.
                </CardDescription>
              </div>
            </div>
            <Badge
              variant="outline"
              className="px-4 py-1.5 rounded-full font-bold uppercase text-[10px] tracking-widest bg-primary text-background border-primary shadow-lg shadow-primary/20">
              <CheckCircle2 className="w-3.5 h-3.5 mr-2" />
              Connected
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-8 pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                label: "Connected Account",
                value: connectedAccount.email,
                icon: User,
              },
              {
                label: "Active Calendar",
                value: connectedAccount.calendar,
                icon: Calendar,
              },
              {
                label: "Last Synced",
                value: connectedAccount.lastSync,
                icon: Clock,
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-5 rounded-3xl bg-muted/20 border border-transparent hover:border-border/50 hover:bg-muted/30 transition-all group/stat">
                <div className="flex items-center gap-3 text-muted-foreground/60 mb-2">
                  <stat.icon className="w-4 h-4 text-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    {stat.label}
                  </span>
                </div>
                <p className="text-sm font-bold tracking-tight text-foreground truncate group-hover/stat:text-primary transition-colors">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3 mt-8">
            <Button className="h-12 px-8 rounded-xl font-bold shadow-lg shadow-primary/10 flex items-center gap-2 group/btn">
              <RefreshCw className="w-4 h-4 transition-transform group-hover/btn:rotate-180" />
              Sync Now
            </Button>
            <Button
              variant="ghost"
              className="h-12 px-8 rounded-xl font-bold text-destructive hover:bg-destructive/10 transition-colors">
              Disconnect
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
