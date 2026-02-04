"use client";

import { motion, Variants } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { UsageStats } from "./usage-stats";
import SimplePricing from "@/components/common/simple-pricing";
import { InvoiceHistory } from "./invoice-history";
import { CreditCard, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

const BillingOverview = () => {
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
      className="max-w-screen-2xl mx-auto space-y-12 p-4 lg:p-8 relative pb-20">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-1/4 -z-10 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 -z-10 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div variants={itemVariants} className="space-y-2">
          <Badge
            variant="outline"
            className="bg-primary/5 border-primary/20 text-primary font-bold uppercase tracking-[0.2em] text-[10px] px-4 py-1 rounded-full">
            Subscription Matrix
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-foreground">
            Billing &{" "}
            <span className="text-primary relative inline-block">
              Capacity
              <span className="absolute bottom-1 left-0 w-full h-3 bg-primary/10 -z-10" />
            </span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-lg leading-relaxed font-medium">
            Monitor your resource utilization and manage your platform
            commitment levels.
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Button
            variant="outline"
            className="h-14 px-8 rounded-2xl font-black gap-3 border-border/40 bg-card/60 backdrop-blur-sm shadow-xl shadow-black/2 hover:scale-[1.02] transition-all">
            <CreditCard className="w-5 h-5 text-primary" />
            Payment Methods
          </Button>
        </motion.div>
      </div>

      {/* Resource Utilization (Usage Stats) */}
      <motion.div variants={itemVariants} className="space-y-4">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 px-1">
          Resource Utilization
        </h3>
        <UsageStats />
      </motion.div>

      {/* Available Protocols (Plans) */}
      <div className="-mt-16">
        <SimplePricing />
      </div>

      {/* Transaction Records (Invoice History) */}
      <motion.div variants={itemVariants}>
        <InvoiceHistory />
      </motion.div>
    </motion.div>
  );
};

export default BillingOverview;
