"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  Users,
  TrendingUp,
  UserCheck,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const useCases = [
  {
    icon: Briefcase,
    title: "Freelancers & Consultants",
    description:
      "Book client calls without the email back-and-forth. Let clients message you directly.",
    gradient: "from-orange-500 to-amber-500",
    bgGradient: "from-orange-500/5 to-amber-500/5",
    shadow: "shadow-orange-500/10",
  },
  {
    icon: Users,
    title: "Founders & Remote Teams",
    description:
      "Coordinate internal and external meetings fast. Perfect for async-first teams.",
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-500/5 to-cyan-500/5",
    shadow: "shadow-blue-500/10",
  },
  {
    icon: TrendingUp,
    title: "Sales & Client Success",
    description:
      "Instant call scheduling from chat conversations. Close deals faster.",
    gradient: "from-emerald-500 to-teal-500",
    bgGradient: "from-emerald-500/5 to-teal-500/5",
    shadow: "shadow-emerald-500/10",
  },
  {
    icon: UserCheck,
    title: "Recruiters & HR",
    description:
      "Schedule interviews in seconds. Candidates love the simple experience.",
    gradient: "from-violet-500 to-purple-500",
    bgGradient: "from-violet-500/5 to-purple-500/5",
    shadow: "shadow-violet-500/10",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const UseCases = () => {
  return (
    <section id="use-cases" className="relative py-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ opacity: [0.03, 0.05, 0.03], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-12 w-64 h-64 bg-primary/10 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ opacity: [0.02, 0.04, 0.02], scale: [1, 1.2, 1] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/4 -right-12 w-80 h-80 bg-secondary/10 rounded-full blur-[120px]"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-20 space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex justify-center">
            <Badge
              variant="secondary"
              className="px-4 py-1.5 rounded-full bg-primary/5 text-primary border-primary/10 font-bold text-[10px] tracking-[0.2em] uppercase">
              <Sparkles className="w-3.5 h-3.5 mr-2" />
              Versatility
            </Badge>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]">
            Built for{" "}
            <span className="text-primary italic">real-world scheduling</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Whether you're a solo professional or part of a growing team,
            ScheduleBot adapts to your workflow seamlessly.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {useCases.map((useCase, index) => (
            <motion.div key={index}>
              <Card className="group h-full relative py-0 overflow-hidden bg-card/40 backdrop-blur-md border-border/50 hover:border-primary/20 transition-all duration-500 rounded-[2.5rem] hover:shadow-2xl hover:shadow-primary/5">
                <CardContent className="p-8 relative z-10">
                  <div
                    className={cn(
                      "absolute inset-0 bg-linear-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700",
                      useCase.bgGradient,
                    )}
                  />

                  <div className="relative mb-8 pt-2">
                    <div
                      className={cn(
                        "w-14 h-14 rounded-2xl bg-linear-to-br flex items-center justify-center text-white shadow-lg transition-all duration-500 group-hover:scale-110",
                        useCase.gradient,
                        useCase.shadow,
                      )}>
                      <useCase.icon className="w-7 h-7" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                        {useCase.title}
                      </h3>
                      <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-40 -translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500" />
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed font-medium">
                      {useCase.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-20 text-center">
          <p className="text-[12px] font-black text-muted-foreground uppercase tracking-widest">
            Trusted by professionals from{" "}
            <span className="text-foreground border-b border-primary/20">
              50+ industries
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default UseCases;
