"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User, Bell, Shield, Palette, Globe } from "lucide-react";

export default function SettingsPage() {
  const categories = [
    { title: "Profile", desc: "Manage your personal information", icon: User },
    {
      title: "Notifications",
      desc: "Configure how you receive alerts",
      icon: Bell,
    },
    {
      title: "Privacy & Security",
      desc: "Control your account security",
      icon: Shield,
    },
    {
      title: "Appearance",
      desc: "Customize the theme and layout",
      icon: Palette,
    },
    { title: "Language", desc: "Choose your preferred language", icon: Globe },
  ];

  return (
    <div className="max-w-screen-2xl mx-auto space-y-10 p-4 lg:p-8 relative">
      <div>
        <Badge
          variant="outline"
          className="bg-primary/5 border-primary/20 text-primary font-bold uppercase tracking-[0.2em] text-[10px] px-4 py-1 rounded-full">
          Account Preferences
        </Badge>
        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground mt-2">
          General Settings
        </h1>
        <p className="text-muted-foreground text-lg max-w-lg mt-2">
          Manage your account settings and application preferences.
        </p>
      </div>

      <div className="grid gap-6">
        {categories.map((cat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}>
            <Card className="group hover:border-primary/50 transition-all cursor-pointer bg-card/60 backdrop-blur-sm border-border/40 overflow-hidden">
              <CardHeader className="flex flex-row items-center gap-6 p-8">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <cat.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold">
                    {cat.title}
                  </CardTitle>
                  <CardDescription className="text-base font-medium text-muted-foreground/70">
                    {cat.desc}
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
