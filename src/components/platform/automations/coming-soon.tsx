"use client";

import { motion } from "framer-motion";
import { Zap, Sparkles, Rocket, Clock, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export const AutomationsComingSoon = () => {
  const previewFeatures = [
    {
      title: "Flow Builder",
      desc: "Visual drag-and-drop editor for complex booking logic.",
      icon: Zap,
    },
    {
      title: "AI Analysis",
      desc: "Sentiment analysis to prioritize high-value sessions.",
      icon: Sparkles,
    },
    {
      title: "Auto-Pilot",
      desc: "Full hands-off scheduling with dynamic rescheduling.",
      icon: Rocket,
    },
  ];

  return (
    <div className="max-w-screen-2xl mx-auto p-4 lg:p-8 relative min-h-[80vh] flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute top-0 right-0 -z-10 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6 max-w-3xl">
        <Badge
          variant="outline"
          className="bg-primary/5 border-primary/20 text-primary font-bold uppercase tracking-[0.2em] text-[10px] px-6 py-2 rounded-full">
          Project Horizon
        </Badge>

        <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-foreground leading-[1.1]">
          Automations are{" "}
          <span className="text-primary relative inline-block">
            Incoming
            <span className="absolute bottom-2 left-0 w-full h-4 bg-primary/10 -z-10" />
          </span>
        </h1>

        <p className="text-muted-foreground text-xl font-medium leading-relaxed">
          We're currently engineering a high-performance automation engine to
          supercharge your scheduling protocols.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-muted/30 rounded-2xl border border-border/40 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            <Clock className="w-4 h-4 text-primary" />
            Under Construction
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-muted/30 rounded-2xl border border-border/40 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            <Shield className="w-4 h-4 text-primary" />
            Secure Testing
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="grid md:grid-cols-3 gap-6 mt-20 w-full">
        {previewFeatures.map((feature, i) => (
          <Card
            key={i}
            className="group border-border/40 bg-card/40 backdrop-blur-md shadow-2xl shadow-black/5 rounded-4xl overflow-hidden hover:border-primary/30 transition-all duration-500">
            <CardContent className="p-8 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left space-y-1">
                <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-16 text-muted-foreground/40 text-[10px] font-black uppercase tracking-[0.3em]">
        Proprietary Automation Protocol v1.0.alpha
      </motion.div>
    </div>
  );
};
