"use client";

import { motion, Variants } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Save, Settings2 } from "lucide-react";
import { ProfileSettings } from "./profile-settings";
import { BusinessInfo } from "./business-info";
import { NotificationPrefs } from "./notification-prefs";
import { TimezoneSettings } from "./timezone-settings";
import { DangerZone } from "./danger-zone";

const SettingsOverview = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="container mx-auto space-y-8 p-4 lg:p-8 relative pb-20">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-0 -z-10 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 -z-10 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4">
        <motion.div variants={itemVariants} className="space-y-2">
          <Badge
            variant="outline"
            className="bg-primary/5 border-primary/20 text-primary font-bold uppercase tracking-[0.2em] text-[10px] px-4 py-1 rounded-full">
            Configuration
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-foreground">
            Account{" "}
            <span className="text-primary relative inline-block">
              Settings
              <span className="absolute bottom-1 left-0 w-full h-3 bg-primary/10 -z-10" />
            </span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-lg leading-relaxed font-medium">
            Manage your personal profile, entity details, and system
            preferences.
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Button className="h-14 px-8 rounded-2xl font-black gap-3 shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all bg-primary/90 hover:bg-primary">
            <Save className="w-5 h-5" />
            Save Changes
          </Button>
        </motion.div>
      </div>

      <div className="grid gap-8">
        <ProfileSettings />
        <BusinessInfo />

        <div className="grid md:grid-cols-2 gap-8">
          <NotificationPrefs />
          <TimezoneSettings />
        </div>

        <DangerZone />
      </div>
    </motion.div>
  );
};

export default SettingsOverview;
