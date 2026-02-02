"use client";

import { motion } from "framer-motion";
import {
  MessageSquare,
  CalendarCheck,
  Video,
  Globe,
  CheckCircle,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: MessageSquare,
    text: "Natural language scheduling",
    description:
      "Just type like you're texting a friend. No rigid commands needed.",
  },
  {
    icon: CalendarCheck,
    text: "Automatic calendar invites",
    description: "Events created instantly with all the details you discussed.",
  },
  {
    icon: Video,
    text: "Google Meet links instantly",
    description:
      "Unique video call links are auto-generated for every meeting.",
  },
  {
    icon: Globe,
    text: "Time-zone aware booking",
    description: "The bot automatically handles time-zone conversions for you.",
  },
  {
    icon: CheckCircle,
    text: "Confirmation before booking",
    description: "Nothing ends up on your calendar without your explicit 'OK'.",
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
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const SolutionSection = () => {
  return (
    <section
      id="solution"
      className="relative py-20 overflow-hidden bg-background">
      {/* Decorative background blurs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            opacity: [0.03, 0.05, 0.03],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            opacity: [0.02, 0.04, 0.02],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute -bottom-24 -left-24 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px]"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left - Content */}
          <div className="space-y-10">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}>
                <Badge
                  variant="secondary"
                  className="px-4 py-1.5 rounded-full bg-primary/5 text-primary border-primary/10 font-bold text-[10px] tracking-[0.2em] uppercase">
                  <Sparkles className="w-3.5 h-3.5 mr-2" />
                  The Solution
                </Badge>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
                Turn WhatsApp into your <br />
                <span className="text-primary italic">
                  scheduling assistant
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-muted-foreground leading-relaxed font-medium max-w-xl">
                Our AI understands natural speech. No more rigid commands—just
                talk to your bot and watch it sync perfectly with your life.
              </motion.p>
            </div>

            {/* Features list */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-4">
              {features.map((feature, index) => (
                <motion.div key={index}>
                  <div className="group flex items-center gap-5 p-5 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:bg-primary/1 hover:shadow-lg transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <feature.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-base tracking-tight">
                        {feature.text}
                      </p>
                      <p className="text-muted-foreground text-sm font-medium">
                        {feature.description}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-40 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-primary" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right - High-Fidelity Visual Visualizer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative">
            <Card className="relative overflow-hidden bg-card/30 backdrop-blur-2xl border-white/20 rounded-[3rem] p-1 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)]">
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-secondary/5" />
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />

              <CardContent className="relative p-8 lg:p-14">
                {/* Visual Engine Container */}
                <div className="flex flex-col items-center justify-center gap-16 relative">
                  {/* The AI Central Engine */}
                  <div className="relative w-48 h-48 flex items-center justify-center">
                    {/* Concentric Rotating Rings */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-0 border border-primary/10 rounded-full scale-110"
                    />
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-4 border border-dashed border-primary/20 rounded-full scale-105"
                    />

                    {/* The Core */}
                    <div className="relative w-24 h-24 rounded-full bg-linear-to-br from-primary via-primary/80 to-primary/60 p-0.5 shadow-2xl shadow-primary/40">
                      <div className="w-full h-full rounded-full bg-background/10 backdrop-blur-md flex items-center justify-center overflow-hidden">
                        <motion.div
                          animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.8, 1, 0.8],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}>
                          <Sparkles className="w-10 h-10 text-white" />
                        </motion.div>

                        {/* Scanning Effect */}
                        <motion.div
                          animate={{ y: [-100, 100] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="absolute inset-0 bg-linear-to-b from-transparent via-white/20 to-transparent w-full h-1/2"
                        />
                      </div>
                    </div>

                    {/* Data Flow Nodes */}
                    <PlatformNode
                      className="-top-8 -left-8 bg-[#25D366] shadow-green-500/30"
                      icon={
                        <svg
                          viewBox="0 0 24 24"
                          className="w-6 h-6 text-white fill-current">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
                        </svg>
                      }
                      delay={0}
                    />
                    <PlatformNode
                      className="-bottom-8 -right-8 bg-[#4285F4] shadow-blue-500/30"
                      icon={<CalendarCheck className="w-6 h-6 text-white" />}
                      delay={0.5}
                    />

                    {/* Floating Notification Snippets */}
                    <FloatingSnippet
                      className="top-0 -right-24 bg-white/80 border-[#25D366]/20"
                      text="Meeting set for tomorrow"
                      delay={1}
                    />
                    <FloatingSnippet
                      className="bottom-12 -left-28 bg-white/80 border-[#4285F4]/20"
                      text="Calendar synced"
                      delay={2}
                    />
                  </div>

                  {/* Enhanced Stats Layer */}
                  <div className="w-full grid grid-cols-3 gap-8 p-6 rounded-3xl bg-white/40 border border-white/60 shadow-inner">
                    <div className="text-center">
                      <p className="text-3xl font-black text-primary tracking-tighter">
                        30s
                      </p>
                      <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest mt-1">
                        Avg. Booking
                      </p>
                    </div>
                    <div className="text-center border-x border-border/50">
                      <p className="text-3xl font-black text-primary tracking-tighter">
                        0
                      </p>
                      <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest mt-1">
                        Emails Needed
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-black text-primary tracking-tighter">
                        100%
                      </p>
                      <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest mt-1">
                        Satisfaction
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Background Orbs */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-[80px] animate-pulse" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-secondary/20 rounded-full blur-[80px] animate-pulse delay-1000" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Sub-components for better organization

const PlatformNode = ({
  className,
  icon,
  delay,
}: {
  className: string;
  icon: React.ReactNode;
  delay: number;
}) => (
  <motion.div
    initial={{ scale: 0 }}
    whileInView={{ scale: 1 }}
    viewport={{ once: true }}
    animate={{ y: [0, -10, 0] }}
    transition={{
      scale: { delay, duration: 0.5 },
      y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: delay * 2 },
    }}
    className={cn(
      "absolute w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transform z-20",
      className,
    )}>
    {icon}
  </motion.div>
);

const FloatingSnippet = ({
  className,
  text,
  delay,
}: {
  className: string;
  text: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, x: 20 }}
    whileInView={{ opacity: 1, scale: 1, x: 0 }}
    viewport={{ once: true }}
    animate={{ y: [0, 8, 0] }}
    transition={{
      opacity: { delay: delay + 0.5 },
      scale: { delay: delay + 0.5 },
      y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay },
    }}
    className={cn(
      "absolute px-3 py-2 rounded-xl backdrop-blur-md border shadow-sm hidden md:block z-30",
      className,
    )}>
    <p className="text-[9px] font-black tracking-tight whitespace-nowrap text-foreground">
      {text}
    </p>
  </motion.div>
);

export default SolutionSection;
