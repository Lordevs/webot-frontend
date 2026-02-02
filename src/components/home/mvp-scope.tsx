"use client";

import { motion, Variants } from "framer-motion";
import { Check, Clock, Sparkles, Plus, ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const included = [
  "Google Calendar integration",
  "WhatsApp scheduling chat-bot",
  "Single or multiple user support",
  "Automated Google Meet links",
  "Instant confirmation booking",
];

const comingSoon = [
  "Custom availability windows",
  "Shared team calendars",
  "Direct CRM integrations",
  "Advanced admin dashboard",
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const MVPScope = () => {
  return (
    <section
      id="mvp-scope"
      className="relative py-24 lg:py-32 overflow-hidden bg-background">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex justify-center">
            <Badge
              variant="outline"
              className="px-5 py-2 rounded-full border-primary/20 text-primary bg-primary/5 font-black text-[10px] tracking-[0.2em] uppercase">
              <Sparkles className="w-3.5 h-3.5 mr-2" />
              Feature Set
            </Badge>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
            What the{" "}
            <span className="text-primary italic font-bold">MVP supports</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto font-medium">
            We're doubling down on core efficiency. Here's what's ready for you
            right now and what's currently in development.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Included Features */}
          <motion.div variants={itemVariants}>
            <Card className="h-full relative overflow-hidden bg-card/60 backdrop-blur-xl border-2 border-primary/20 rounded-[3rem] shadow-2xl shadow-primary/5 group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-[60px] -mr-16 -mt-16 group-hover:bg-primary/20 transition-colors duration-700" />

              <CardHeader className="p-8 pb-4 relative z-10">
                <div className="flex items-center gap-5 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shadow-[0_8px_16px_-4px_rgba(var(--primary),0.4)] group-hover:scale-110 transition-transform duration-500">
                    <Check className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-black tracking-tight">
                      Included
                    </CardTitle>
                    <CardDescription className="text-xs font-bold uppercase tracking-widest text-primary/80">
                      Available now
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-8 pt-4 relative z-10">
                <ul className="space-y-4">
                  {included.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-4 group/item">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover/item:bg-primary group-hover/item:scale-110 transition-all duration-300">
                        <Check className="w-3.5 h-3.5 text-primary group-hover/item:text-white transition-colors duration-300" />
                      </div>
                      <span className="font-bold text-base tracking-tight text-foreground/90">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Coming Soon Features */}
          <motion.div variants={itemVariants}>
            <Card className="h-full relative overflow-hidden bg-card/40 backdrop-blur-lg border border-border/50 rounded-[3rem] shadow-xl group">
              <CardHeader className="p-8 pb-4 relative z-10">
                <div className="flex items-center gap-5 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center border border-border/50 group-hover:scale-110 group-hover:bg-muted/80 transition-all duration-500">
                    <Clock className="w-7 h-7 text-muted-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-black tracking-tight">
                      Coming Soon
                    </CardTitle>
                    <CardDescription className="text-xs font-bold uppercase tracking-widest">
                      On the roadmap
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-8 pt-4 relative z-10">
                <ul className="space-y-4">
                  {comingSoon.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-4 group/item grayscale group-hover:grayscale-0 transition-all duration-500">
                      <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center shrink-0 border border-border/50 group-hover/item:border-primary/30 transition-all duration-300">
                        <Plus className="w-3.5 h-3.5 text-muted-foreground group-hover/item:text-primary transition-colors duration-300" />
                      </div>
                      <span className="font-semibold text-base tracking-tight text-muted-foreground group-hover/item:text-foreground transition-colors duration-300">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                {/* Feature Request */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mt-12 pt-8 border-t border-border/50">
                  <p className="text-sm font-bold text-muted-foreground group/cta cursor-pointer inline-flex items-center gap-2">
                    Have a feature request?
                    <span className="text-primary hover:underline flex items-center gap-1 transition-all">
                      Let us know{" "}
                      <ArrowRight className="w-4 h-4 translate-x-0 group-hover/cta:translate-x-1 transition-transform" />
                    </span>
                  </p>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Bottom micro-copy */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 text-center text-xs font-black uppercase tracking-[0.3em] text-muted-foreground/60">
          Building for the{" "}
          <span className="text-primary">future of productivity</span>
        </motion.p>
      </div>
    </section>
  );
};

export default MVPScope;
