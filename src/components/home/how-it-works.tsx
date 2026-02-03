"use client";

import { motion } from "framer-motion";
import { Calendar, CalendarCheck, Sparkles, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
  </svg>
);

const steps = [
  {
    number: "01",
    icon: WhatsAppIcon,
    title: "Customer sends a message",
    description: "Start a conversation on WhatsApp to book an appointment.",
    color: "#25D366",
    gradient: "from-[#25D366]/20 to-transparent",
  },
  {
    number: "02",
    icon: Calendar,
    title: "Webot checks availability",
    description:
      "Real-time sync with Google Calendar to find the perfect slot.",
    color: "#4285F4",
    gradient: "from-[#4285F4]/20 to-transparent",
  },
  {
    number: "03",
    icon: CalendarCheck,
    title: "Confirmed automatically",
    description: "Instant confirmation and invites sent to both parties.",
    color: "#10B981",
    gradient: "from-[#10B981]/20 to-transparent",
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
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-size-[64px_64px] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000,transparent)] opacity-20" />
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
            className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.1]">
            Three simple steps to <br className="hidden md:block" />
            <span className="text-primary italic">complete automation</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground leading-relaxed font-medium">
            We designed Webot to be invisible. No new apps to learn, just your
            favorite chat interface powered by advanced AI.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {/* Connecting Line - Desktop */}
          <div className="hidden lg:block absolute top-18 left-[10%] right-[10%] h-[2px] pointer-events-none overflow-visible">
            <svg
              width="100%"
              height="20"
              viewBox="0 0 1000 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="overflow-visible">
              <motion.path
                d="M0 10H1000"
                stroke="url(#line-gradient)"
                strokeWidth="2"
                strokeDasharray="12 12"
                initial={{ strokeDashoffset: 100 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="opacity-30"
              />
              <motion.path
                d="M0 10H1000"
                stroke="url(#line-gradient)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="drop-shadow-[0_0_8px_rgba(var(--primary),0.5)]"
              />
              <defs>
                <linearGradient
                  id="line-gradient"
                  x1="0"
                  y1="10"
                  x2="1000"
                  y2="10"
                  gradientUnits="userSpaceOnUse">
                  <stop stopColor="#25D366" />
                  <stop offset="0.5" stopColor="hsl(var(--primary))" />
                  <stop offset="1" stopColor="#4183f3" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative group flex flex-col h-full">
              <Card className="flex-1 flex py-0 gap-0 flex-col bg-card/40 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-500 rounded-[2.5rem] overflow-hidden group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] group-hover:-translate-y-2">
                <CardContent className="p-8 pb-10 flex-1 flex flex-col items-center text-center">
                  {/* Step Number Badge */}
                  <div className="mb-8 w-16 h-16 rounded-3xl relative flex items-center justify-center overflow-hidden">
                    <div
                      className={cn(
                        "absolute inset-0 bg-linear-to-br opacity-20",
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
                    className="w-[2px] h-6 bg-linear-to-b from-primary/50 to-transparent"
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
