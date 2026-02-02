"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  Eye,
  UserCheck,
  CheckCircle,
  ShieldCheck,
  LockKeyhole,
  FileCheck,
  Zap,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const securityPoints = [
  {
    icon: LockKeyhole,
    title: "Google OAuth 2.0",
    description:
      "Enterprise-grade authentication. No passwords ever touch our servers.",
  },
  {
    icon: Eye,
    title: "Consent-Driven Access",
    description:
      "Calendar visibility is strictly limited to scheduling tasks you approve.",
  },
  {
    icon: Shield,
    title: "End-to-End Encryption",
    description:
      "All access tokens are encrypted with military-grade AES-256 standards.",
  },
  {
    icon: UserCheck,
    title: "Your Data, Your Rules",
    description:
      "Revoke access at any time through your Google Security dashboard.",
  },
  {
    icon: FileCheck,
    title: "Standard Compliance",
    description:
      "Built according to Google's strict security and privacy guidelines.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const SecuritySection = () => {
  return (
    <section
      id="security"
      className="relative py-24 lg:py-32 overflow-hidden bg-popover/70">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ opacity: [0.03, 0.08, 0.03], scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[140px] -translate-y-1/2"
        />
        <motion.div
          animate={{ opacity: [0.02, 0.06, 0.02], scale: [1, 1.3, 1] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[140px] -translate-y-1/2"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left - High-Impact Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: -30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative order-2 lg:order-1">
            <Card className="relative overflow-hidden bg-white/5 dark:bg-black/20 backdrop-blur-2xl border-white/20 rounded-[4rem] p-12 lg:p-20 shadow-[0_32px_128px_-16px_rgba(0,0,0,0.3)] group">
              <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent opacity-30" />

              <div className="relative flex flex-col items-center justify-center space-y-12">
                {/* Central Shield Visual */}
                <div className="relative">
                  {/* Decorative Rings */}
                  <motion.div
                    animate={{ rotate: 360, scale: [1, 1.05, 1] }}
                    transition={{
                      duration: 25,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute -inset-16 border border-dashed border-primary/20 rounded-full"
                  />
                  <motion.div
                    animate={{ rotate: -360, scale: [1, 1.1, 1] }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute -inset-8 border border-primary/10 rounded-full"
                  />

                  {/* Main Shield */}
                  <div className="relative w-44 h-52 lg:w-56 lg:h-64 filter drop-shadow-[0_20px_60px_rgba(var(--primary),0.4)] overflow-hidden rounded-[20%]">
                    <svg
                      viewBox="0 0 100 120"
                      className="w-full h-full relative z-20">
                      <defs>
                        <linearGradient
                          id="shieldGrad"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%">
                          <stop offset="0%" stopColor="hsl(var(--primary))" />
                          <stop
                            offset="100%"
                            stopColor="hsl(var(--secondary))"
                          />
                        </linearGradient>
                      </defs>
                      <path
                        d="M50 5 L95 25 L95 60 Q95 95 50 115 Q5 95 5 60 L5 25 Z"
                        fill="url(#shieldGrad)"
                      />
                      <path
                        d="M50 12 L88 28 L88 58 Q88 88 50 106 Q12 88 12 58 L12 28 Z"
                        fill="white"
                        className="opacity-95 dark:opacity-5 dark:fill-primary"
                      />
                    </svg>

                    {/* Pulsing Checkmark */}
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{
                        delay: 0.5,
                        type: "spring",
                        stiffness: 100,
                      }}
                      className="absolute inset-0 flex items-center justify-center pt-4 z-30">
                      <ShieldCheck className="w-20 h-20 lg:w-24 lg:h-24 text-primary group-hover:scale-110 transition-transform duration-500" />
                    </motion.div>

                    {/* Scanning Bar */}
                    <motion.div
                      animate={{ top: ["10%", "90%", "10%"] }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute left-0 right-0 h-1.5 bg-primary/60 blur-[3px] z-40 shadow-[0_0_20px_rgba(var(--primary),0.8)]"
                    />
                  </div>

                  {/* Floating Security Nodes */}
                  <FloatingNode
                    icon={<LockKeyhole className="w-6 h-6" />}
                    className="-top-8 -left-12"
                    delay={0}
                  />
                  <FloatingNode
                    icon={<Zap className="w-6 h-6" />}
                    className="top-1/2 -right-16 translate-y-[-50%]"
                    delay={1}
                  />
                  <FloatingNode
                    icon={<CheckCircle className="w-6 h-6" />}
                    className="-bottom-8 left-1/2 -translate-x-1/2"
                    delay={2}
                  />
                </div>

                {/* Status Indicator Bar */}
                <div className="flex items-center gap-4 px-8 py-4 rounded-3xl bg-white/10 dark:bg-black/40 border border-white/20 backdrop-blur-xl shadow-2xl group-hover:border-primary/50 transition-colors duration-500">
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary focus-ring" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/80">
                      Security Status
                    </span>
                    <span className="text-xs font-bold text-foreground">
                      Military-Grade Encryption Active
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Right - Content & Features */}
          <div className="space-y-10 order-1 lg:order-2">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}>
                <Badge
                  variant="secondary"
                  className="px-5 py-2 rounded-full border-primary/20 text-primary bg-primary/10 font-black text-[10px] tracking-[0.2em] uppercase">
                  <ShieldCheck className="w-4 h-4 mr-2" />
                  Enterprise Security
                </Badge>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
                Your data stays <br />
                <span className="text-primary italic">private and secure</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-muted-foreground leading-relaxed font-medium max-w-xl">
                We prioritize your privacy above all else. ScheduleBot is built
                with a zero-trust architecture, ensuring your data is handled
                with the highest standards of care.
              </motion.p>
            </div>

            {/* Detailed Points */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-4">
              {securityPoints.map((point, index) => (
                <motion.div key={index}>
                  <div className="group flex items-center gap-6 p-6 rounded-4xl bg-card/50 border border-border/50 hover:border-primary/40 hover:bg-primary/5 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-primary shadow-sm transition-all duration-500">
                      <point.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-500" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-lg tracking-tight group-hover:text-primary transition-colors duration-300">
                        {point.title}
                      </p>
                      <p className="text-muted-foreground text-sm font-medium leading-relaxed">
                        {point.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Sub-component for floating nodes
const FloatingNode = ({
  className,
  icon,
  delay,
}: {
  className: string;
  icon: React.ReactNode;
  delay: number;
}) => (
  <motion.div
    animate={{ y: [0, -15, 0] }}
    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
    className={cn(
      "absolute w-16 h-16 rounded-[1.25rem] flex items-center justify-center text-primary shadow-[0_12px_40px_rgba(0,0,0,0.15)] border border-white/40 bg-white/20 dark:bg-black/40 backdrop-blur-xl z-20 hover:scale-110 hover:border-primary/60 transition-all duration-500",
      className,
    )}>
    {icon}
  </motion.div>
);

export default SecuritySection;
