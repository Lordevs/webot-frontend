"use client";

import { motion } from "framer-motion";
import { Mail, Repeat, AlertCircle, Clock, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const problems = [
  {
    icon: Mail,
    title: "Endless email threads",
    description: "Just to find a time that works for everyone",
    stat: "12+",
    statLabel: "avg emails per meeting",
  },
  {
    icon: Repeat,
    title: "Constant app switching",
    description: "Between WhatsApp, Gmail, and Calendar",
    stat: "5x",
    statLabel: "daily context switches",
  },
  {
    icon: AlertCircle,
    title: "Missed meetings",
    description: "Due to miscommunication and confusion",
    stat: "23%",
    statLabel: "meetings rescheduled",
  },
  {
    icon: Clock,
    title: "Time-wasting follow-ups",
    description: "Manual reminders every single day",
    stat: "2hrs",
    statLabel: "lost weekly",
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

const ProblemSection = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-background">
      {/* Background decoration with subtle animated blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            opacity: [0.03, 0.05, 0.03],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-64 w-[600px] h-[600px] bg-destructive/10 rounded-full blur-[120px]"
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
          className="absolute bottom-1/4 -right-64 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-20 space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center">
            <Badge
              variant="outline"
              className="px-4 py-1.5 rounded-full border-destructive/20 text-destructive bg-destructive/5 font-bold text-[10px] tracking-[0.2em] uppercase">
              The Problem
            </Badge>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.15]">
            Scheduling meetings is still <br className="hidden md:block" />
            <span className="text-destructive">slow and manual</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground leading-relaxed font-medium">
            Traditional scheduling creates friction, wastes time, and leads to
            lost opportunities. Stop fighting your calendar and start focusing
            on your work.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {problems.map((problem, index) => (
            <motion.div key={index}>
              <Card className="group relative h-full bg-card/40 backdrop-blur-sm border-border/50 hover:border-destructive/30 hover:shadow-2xl hover:shadow-destructive/5 transition-all duration-500 overflow-hidden rounded-[2.5rem] py-8">
                <CardContent className="p-0 px-8 flex flex-col h-full">
                  {/* Icon Container */}
                  <div className="relative mb-8 w-14 h-14">
                    <div className="absolute inset-0 bg-destructive/20 rounded-[1.25rem] group-hover:rotate-12 transition-transform duration-500 blur-sm group-hover:blur-md" />
                    <div className="relative w-14 h-14 rounded-[1.25rem] bg-card border border-destructive/10 flex items-center justify-center text-destructive group-hover:scale-110 group-hover:bg-destructive group-hover:text-white transition-all duration-500">
                      <problem.icon className="w-7 h-7" />
                    </div>
                  </div>

                  <div className="flex-1 space-y-3 mb-10">
                    <h3 className="text-xl font-bold tracking-tight group-hover:text-destructive transition-colors duration-300">
                      {problem.title}
                    </h3>
                    <p className="text-muted-foreground text-[15px] leading-relaxed font-medium">
                      {problem.description}
                    </p>
                  </div>

                  {/* Stat section with improved viz */}
                  <div className="pt-6 border-t border-border/50 relative">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-destructive tracking-tighter">
                        {problem.stat}
                      </span>
                    </div>
                    <p className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-widest mt-1">
                      {problem.statLabel}
                    </p>

                    {/* Subtle arrow on hover */}
                    <div className="absolute right-0 bottom-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-500">
                      <ArrowRight className="w-5 h-5 text-destructive/40" />
                    </div>
                  </div>
                </CardContent>

                {/* Subtle Hover Gradient */}
                <div className="absolute inset-0 bg-linear-to-br from-destructive/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Message Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 flex justify-center">
          <div className="group relative inline-flex items-center gap-4 px-8 py-4 rounded-full bg-muted/30 border border-border/50 backdrop-blur-md hover:border-primary/20 transition-all duration-500 cursor-default">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-40"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
            </span>
            <p className="text-muted-foreground font-semibold text-sm lg:text-base">
              We built ScheduleBot as a{" "}
              <span className="text-foreground font-bold italic tracking-tight">
                workflow fix
              </span>
              , not just another tool.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
