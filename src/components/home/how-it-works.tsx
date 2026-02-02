"use client";

import { motion } from "framer-motion";
import {
  MessageCircle,
  ClipboardCheck,
  ThumbsUp,
  CalendarCheck,
  Sparkles,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Message on WhatsApp",
    description: '"Schedule a meeting tomorrow at 3 PM"',
    color: "#25D366",
    gradient: "from-[#25D366]/20 to-transparent",
  },
  {
    number: "02",
    icon: ClipboardCheck,
    title: "Bot confirms details",
    description: "Date, time, duration, and attendees sync instantly.",
    color: "#10B981", // More refined emerald
    gradient: "from-[#10B981]/20 to-transparent",
  },
  {
    number: "03",
    icon: ThumbsUp,
    title: "You approve",
    description: "Confirm with a single tap. You're always in control.",
    color: "#F59E0B", // More refined amber
    gradient: "from-[#F59E0B]/20 to-transparent",
  },
  {
    number: "04",
    icon: CalendarCheck,
    title: "Meeting booked",
    description: "Calendar event + Google Meet link sent to everyone.",
    color: "#4285F4",
    gradient: "from-[#4285F4]/20 to-transparent",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="relative py-20 overflow-hidden bg-popover/70">
      {/* Background patterns */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-primary)_0%,transparent_70%)] opacity-[0.03]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000,transparent)] opacity-20" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-20 space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex justify-center">
            <Badge
              variant="outline"
              className="px-4 py-1.5 rounded-full border-primary/20 text-primary bg-primary/5 font-bold text-[10px] tracking-[0.2em] uppercase">
              <Sparkles className="w-3.5 h-3.5 mr-2" />
              The Workflow
            </Badge>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl lg:text-5xl font-black tracking-tight text-foreground leading-[1.1]">
            Four simple steps to <br className="hidden md:block" />
            <span className="text-primary italic">complete automation</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground leading-relaxed font-medium">
            We designed ScheduleBot to be invisible. No new apps to learn, just
            your favorite chat interface powered by advanced AI.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Connecting Line - Desktop */}
          <div className="hidden lg:block absolute top-[5.5rem] left-[10%] right-[10%] h-[2px] pointer-events-none">
            <svg
              width="100%"
              height="2"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <motion.path
                d="M0 1H1000"
                stroke="url(#line-gradient)"
                strokeWidth="2"
                strokeDasharray="8 8"
                initial={{ strokeDashoffset: 100 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <defs>
                <linearGradient
                  id="line-gradient"
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0">
                  <stop stopColor="#25D366" />
                  <stop offset="0.5" stopColor="var(--color-primary)" />
                  <stop offset="1" stopColor="#4285F4" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {steps.map((step, index) => (
            <motion.div key={index} className="relative group">
              <Card className="h-full bg-card/40 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-500 rounded-[2.5rem] overflow-hidden group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] group-hover:-translate-y-2">
                <CardContent className="p-8 flex flex-col items-center text-center">
                  {/* Step Number Badge */}
                  <div className="mb-8 w-16 h-16 rounded-[1.5rem] relative flex items-center justify-center overflow-hidden">
                    <div
                      className={cn(
                        "absolute inset-0 bg-gradient-to-br opacity-20",
                        step.gradient,
                      )}
                    />
                    <div className="relative w-12 h-12 rounded-xl bg-background border border-border/50 shadow-sm flex items-center justify-center text-primary font-black text-lg group-hover:scale-110 transition-transform duration-500">
                      {step.number}
                    </div>
                  </div>

                  {/* Icon Container */}
                  <div className="mb-6 relative">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500"
                      style={{
                        backgroundColor: `${step.color}15`,
                        color: step.color,
                      }}>
                      <step.icon className="w-7 h-7 group-hover:rotate-12 transition-transform duration-500" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-[14px] leading-relaxed font-medium italic">
                      {step.description}
                    </p>
                  </div>
                </CardContent>

                {/* Visual Bottom Accent */}
                <div
                  className="h-1.5 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ backgroundColor: step.color }}
                />
              </Card>

              {/* Connector for Tablet - Vertical */}
              {index < steps.length - 1 && (
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 md:hidden">
                  <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-[2px] h-6 bg-gradient-to-b from-primary/50 to-transparent"
                  />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Closing trust badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 flex justify-center">
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-muted/30 border border-border/50 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-40"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <p className="text-[13px] font-bold text-muted-foreground uppercase tracking-widest">
              Setup takes{" "}
              <span className="text-foreground">under 2 minutes</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
