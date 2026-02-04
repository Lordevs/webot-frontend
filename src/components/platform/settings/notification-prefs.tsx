"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Bell, Mail, CalendarCheck, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export const NotificationPrefs = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}>
      <Card className="border-border/40 gap-0 py-0 bg-card/60 backdrop-blur-sm shadow-xl shadow-black/2 rounded-4xl overflow-hidden">
        <CardHeader className="p-8 pb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
              <Bell className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <CardTitle className="text-xl font-black tracking-tight">
                Signal Preferences
              </CardTitle>
              <CardDescription className="text-sm font-medium text-muted-foreground/70">
                Configure your alert channels.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8 pt-6 space-y-4">
          {[
            {
              title: "Email Notifications",
              desc: "Incoming signal for new bookings.",
              icon: Mail,
              defaultChecked: true,
            },
            {
              title: "Confirmation Receipts",
              desc: "Signal when a booking is confirmed.",
              icon: CalendarCheck,
              defaultChecked: true,
            },
            {
              title: "Cancellation Alerts",
              desc: "Priority alert for dropped sessions.",
              icon: AlertTriangle,
              defaultChecked: true,
            },
            {
              title: "Weekly Intelligence",
              desc: "Digest of appointments and performance.",
              icon: Bell,
              defaultChecked: false,
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 bg-muted/20 border border-transparent hover:border-border/50 rounded-2xl transition-all">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center shadow-sm">
                  <item.icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">
                    {item.title}
                  </p>
                  <p className="text-xs text-muted-foreground font-medium mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>
              <Switch defaultChecked={item.defaultChecked} />
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
};
