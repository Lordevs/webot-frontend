"use client";

import { motion } from "framer-motion";
import {
  Smartphone,
  LockKeyhole,
  ShieldX,
  Globe,
  CheckCircle2,
  ShieldCheck,
  ShieldAlert,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const compliancePoints = [
  {
    icon: Smartphone,
    title: "WhatsApp API Compliant",
    description:
      "Built strictly on the official WhatsApp Business infrastructure.",
    badge: "Official Meta",
  },
  {
    icon: LockKeyhole,
    title: "Secure OAuth 2.0",
    description: "Verified direct handshake with Google Calendar protocols.",
    badge: "Secure",
  },
  {
    icon: ShieldX,
    title: "No Message Scraping",
    description: "We don't read your private chats. Only booking signals.",
    badge: "Safe Access",
  },
  {
    icon: Globe,
    title: "GDPR Ready",
    description: "Architected for global data protection standards.",
    badge: "Compliant",
  },
];

export default function TrustCompliance() {
  return (
    <section className="relative py-20 overflow-hidden bg-background/50">
      {/* Background Decorative Architecture */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-primary/5 blur-[120px] rounded-full opacity-30" />
        <div className="absolute bottom-0 left-[-5%] w-[300px] h-[300px] bg-secondary/5 blur-[80px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16 lg:mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}>
            <Badge
              variant="outline"
              className="px-6 py-2 rounded-full border-primary/20 text-primary bg-primary/5 font-black text-[10px] tracking-[0.3em] uppercase">
              <ShieldCheck className="w-4 h-4 mr-2" />
              Enterprise-Grade Trust
            </Badge>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold tracking-tighter text-foreground">
            Built for trust,{" "}
            <span className="text-primary italic">engineered for privacy.</span>
          </motion.h2>
        </div>

        {/* Sophisticated Single Row Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-7xl mx-auto">
          {compliancePoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative h-full">
              {/* Outer Glow on Hover */}
              <div className="absolute -inset-2 bg-primary/5 rounded-[2.5rem] opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

              <div className="relative h-full p-8 rounded-[2.2rem] bg-card/40 backdrop-blur-md border border-border/50 hover:border-primary/20 hover:bg-card/60 transition-all duration-500 flex flex-col items-center text-center overflow-hidden">
                {/* Visual Top Bar Accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-primary/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                <div className="mb-6 relative">
                  <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-lg shadow-primary/5">
                    <point.icon className="w-7 h-7" />
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="w-3 h-3 text-primary" />
                  </motion.div>
                </div>

                <div className="space-y-2.5 flex-1">
                  <h3 className="text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                    {point.title}
                  </h3>
                  <p className="text-muted-foreground leading-snug font-medium text-[13px] px-2 opacity-80 italic">
                    {point.description}
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-border/20 w-full">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary/60">
                    {point.badge}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Verification Text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-20 flex flex-wrap justify-center items-center gap-10">
          <div className="text-[11px] font-bold text-muted-foreground/50 uppercase tracking-[0.3em] flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            256-Bit Encryption Active
          </div>
          <div className="h-4 w-px bg-border/40 hidden md:block" />
          <div className="text-[11px] font-bold text-muted-foreground/50 uppercase tracking-[0.3em] flex items-center gap-3">
            <ShieldAlert className="w-4 h-4 opacity-40 shrink-0" />
            Zero Data Persistence Policy
          </div>
        </motion.div>
      </div>
    </section>
  );
}
