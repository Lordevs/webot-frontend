"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function CTASection() {
  return (
    <section
      id="cta"
      className="relative py-12 lg:py-24 overflow-hidden bg-popover/70">
      {/* Background Accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] opacity-20" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden bg-card/40 backdrop-blur-xl border border-border/50 rounded-[2rem] lg:rounded-[3.5rem] p-8 lg:p-14 shadow-2xl">
            {/* Soft Gradient Decorative Backgrounds */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl -mr-40 -mt-40 opacity-40" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl -ml-40 -mb-40 opacity-40" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10 lg:gap-16">
              {/* Left - Branding & Value Proposition */}
              <div className="flex-1 space-y-6 text-center lg:text-left">
                <div className="flex justify-center lg:justify-start">
                  <Badge
                    variant="secondary"
                    className="px-4 py-1.5 rounded-full border-primary/20 text-primary bg-primary/10 font-black text-[10px] tracking-[0.3em] uppercase">
                    <Zap className="w-3.5 h-3.5 mr-2 animate-pulse" />
                    Limited Beta Access
                  </Badge>
                </div>

                <div className="space-y-4">
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight text-foreground">
                    Start Automating <br className="hidden xl:block" />
                    <span className="text-primary italic">
                      WhatsApp Appointments.
                    </span>
                  </h2>
                  <p className="text-muted-foreground font-medium text-base md:text-xl max-w-xl mx-auto lg:mx-0">
                    Join the exclusive list of professionals streamlining their
                    scheduling with Webot.{" "}
                    <span className="text-foreground">
                      100% free while in early access.
                    </span>
                  </p>
                </div>
              </div>

              {/* Right - High-Contrast Actions */}
              <div className="flex flex-col items-center lg:items-end gap-8 shrink-0">
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto h-16 px-10 rounded-2xl text-base font-black shadow-2xl shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-all group">
                    Get Early Access
                    <ArrowRight className="ml-2 w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto h-16 px-10 rounded-2xl text-base font-bold bg-background/50 backdrop-blur-sm border-border/50 hover:bg-muted/50 transition-all font-serif italic tracking-wide">
                    Watch Demo
                  </Button>
                </div>

                {/* Refined Trust Row */}
                <div className="flex items-center gap-8 opacity-60">
                  {["1-Min Setup", "Secure OAuth", "GDPR Ready"].map(
                    (feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 text-primary" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest leading-none bg-linear-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                          {feature}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
