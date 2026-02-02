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
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2" />
        <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] -translate-y-1/2" />
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
            <Card className="relative overflow-hidden bg-card/40 backdrop-blur-xl border-white/20 rounded-[3rem] p-12 lg:p-16 shadow-2xl">
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-50" />

              <div className="relative flex flex-col items-center justify-center space-y-10">
                {/* Central Shield Visual */}
                <div className="relative">
                  {/* Decorative Rings */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute -inset-12 border border-dashed border-primary/20 rounded-full"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute -inset-6 border border-primary/10 rounded-full"
                  />

                  {/* Main Shield */}
                  <div className="relative w-40 h-48 lg:w-48 lg:h-56 filter drop-shadow-[0_20px_40px_rgba(var(--primary),0.3)]">
                    <svg viewBox="0 0 100 120" className="w-full h-full">
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
                        className="opacity-90 dark:opacity-10 dark:fill-primary"
                      />
                    </svg>

                    {/* Pulsing Checkmark */}
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.5, type: "spring" }}
                      className="absolute inset-0 flex items-center justify-center pt-4">
                      <ShieldCheck className="w-16 h-16 lg:w-20 lg:h-20 text-primary" />
                    </motion.div>
                  </div>

                  {/* Floating Security Nodes */}
                  <FloatingNode
                    icon={<LockKeyhole className="w-5 h-5" />}
                    className="-top-4 -left-10 bg-primary/10"
                    delay={0}
                  />
                  <FloatingNode
                    icon={<Zap className="w-5 h-5" />}
                    className="top-1/2 -right-12 bg-secondary/10"
                    delay={1}
                  />
                  <FloatingNode
                    icon={<ShieldCheck className="w-5 h-5" />}
                    className="-bottom-4 left-1/2 -translate-x-1/2 bg-blue-500/10"
                    delay={2}
                  />
                </div>

                {/* Status Indicator */}
                <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/50 dark:bg-black/20 border border-white/50 backdrop-blur-md shadow-sm">
                  <div className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest text-foreground">
                    End-to-End Encrypted
                  </span>
                </div>
              </div>
            </Card>

            {/* Background floating particles */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-700" />
          </motion.div>

          {/* Right - Content & Features */}
          <div className="space-y-12 order-1 lg:order-2">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}>
                <Badge
                  variant="outline"
                  className="px-4 py-1.5 rounded-full border-primary/20 text-primary bg-primary/5 font-bold text-[10px] tracking-[0.2em] uppercase">
                  <ShieldCheck className="w-3.5 h-3.5 mr-2" />
                  Security First
                </Badge>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
                Your data stays <br />
                <span className="text-primary italic">private and secure</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-muted-foreground leading-relaxed font-medium max-w-xl">
                We never store your passwords or read your private messages. Our
                infrastructure is built on industry-leading protocols to ensure
                your calendar remains 100% yours.
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
                  <div className="group flex items-center gap-5 p-5 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:bg-primary/1 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <point.icon className="w-6 h-6 text-primary transition-colors duration-300" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-base tracking-tight">
                        {point.title}
                      </p>
                      <p className="text-muted-foreground text-sm font-medium leading-snug">
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
    animate={{ y: [0, -12, 0] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
    className={cn(
      "absolute w-14 h-14 rounded-2xl flex items-center justify-center text-primary shadow-lg border border-white/50 backdrop-blur-md z-20",
      className,
    )}>
    {icon}
  </motion.div>
);

export default SecuritySection;
