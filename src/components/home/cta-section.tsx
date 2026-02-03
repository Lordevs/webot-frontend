"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CTASection = () => {
  return (
    <section id="cta" className="relative py-20 overflow-hidden bg-popover/70">
      {/* Background Accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] opacity-30" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden bg-card/40 backdrop-blur-xl border border-border/50 rounded-[3rem] p-12 lg:p-20 text-center shadow-2xl">
            {/* Soft Gradient Decorative Backgrounds */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20 opacity-50" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -ml-20 -mb-20 opacity-50" />

            <div className="relative z-10 space-y-10">
              {/* Badge */}
              <div className="flex justify-center">
                <Badge
                  variant="secondary"
                  className="px-4 py-1.5 rounded-full border-primary/20 text-primary bg-primary/10 font-bold text-[10px] tracking-[0.2em] uppercase">
                  <Zap className="w-3.5 h-3.5 mr-2" />
                  No more scheduling stress
                </Badge>
              </div>

              {/* Title */}
              <div className="space-y-6">
                <h2 className="text-4xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-foreground">
                  Ready to automate your <br className="hidden md:block" />
                  <span className="text-primary italic">entire calendar?</span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto font-medium">
                  Join hundreds of professionals who have simplified their day
                  with WhatsApp scheduling. Free while in early access.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Button
                  size="lg"
                  className="h-14 px-10 rounded-2xl text-base font-bold shadow-xl shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-all group">
                  Get Started Now
                  <ArrowRight className="ml-2 w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-14 px-10 rounded-2xl text-base font-bold bg-background/50 backdrop-blur-sm border-border/50 hover:bg-muted/50 transition-all">
                  View Case Studies
                </Button>
              </div>

              {/* Trust Features */}
              <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 pt-10 border-t border-border/30">
                {[
                  "1-Minute Setup",
                  "Secure OAuth 2.0",
                  "Priority Early Access",
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm font-bold text-muted-foreground/80 lowercase tracking-tight first-letter:uppercase">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bottom Fine Print */}
          <div className="mt-12 text-center opacity-40">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground">
              Built for <span className="text-primary">efficiency</span> first
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
