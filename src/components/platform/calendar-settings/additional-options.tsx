"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Settings2 } from "lucide-react";
import { motion } from "framer-motion";

export const AdditionalOptions = () => {
  const options = [
    {
      title: "Auto-generate Google Meet links",
      description: "Automatically create video call links for all bookings",
      defaultChecked: true,
    },
    {
      title: "Require confirmation before booking",
      description:
        "Users must confirm before the meeting is added to your calendar",
      defaultChecked: true,
    },
    {
      title: "Send email reminders",
      description: "Send reminder emails 24 hours before meetings",
      defaultChecked: true,
    },
    {
      title: "Allow same-day bookings",
      description: "Let users book meetings on the same day",
      defaultChecked: false,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}>
      <Card className="border border-border/40 bg-card/60 backdrop-blur-sm shadow-xl shadow-black/2 rounded-4xl overflow-hidden">
        <CardHeader className="p-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Settings2 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold tracking-tight">
                Additional Options
              </CardTitle>
              <CardDescription className="text-sm font-medium text-muted-foreground/70">
                Fine-tune your booking experience.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8 pt-0 space-y-4">
          {options.map((option, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-5 bg-muted/20 border border-transparent hover:border-border/50 hover:bg-muted/30 transition-all rounded-3xl group">
              <div className="space-y-1">
                <p className="font-bold text-foreground group-hover:text-primary transition-colors">
                  {option.title}
                </p>
                <p className="text-xs font-medium text-muted-foreground/70">
                  {option.description}
                </p>
              </div>
              <Switch
                defaultChecked={option.defaultChecked}
                className="data-[state=checked]:bg-primary"
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
};
