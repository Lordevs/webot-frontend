"use client";

import { motion, Variants } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ConnectivitySettings } from "./connectivity-settings";
import { SecuritySettings } from "./security-settings";

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
      className="max-w-screen-2xl mx-auto space-y-8 p-4 lg:p-8 relative pb-20">
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
            Manage your connectivity status, communication channels, and security.
          </p>
        </motion.div>
      </div>

      <div className="grid gap-10">
        <ConnectivitySettings />
        <SecuritySettings />
      </div>
    </motion.div>
  );
};

export default SettingsOverview;
