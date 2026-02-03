"use client";

import { motion } from "framer-motion";
import {
  Stethoscope,
  Briefcase,
  Home,
  Sparkles,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const useCases = [
  {
    icon: Stethoscope,
    title: "Clinics & Doctors",
    description:
      "Manage patient appointments and follow-ups without a receptionist.",
  },
  {
    icon: Briefcase,
    title: "Consultants & Coaches",
    description:
      "Book discovery calls and coaching sessions instantly via WhatsApp.",
  },
  {
    icon: Home,
    title: "Real Estate Agents",
    description:
      "Schedule property viewings and client meetings while on the move.",
  },
  {
    icon: Sparkles,
    title: "Salons & Services",
    description: "Automate chair bookings and service appointments 24/7.",
  },
  {
    icon: Layers,
    title: "Agencies",
    description:
      "Coordinate client kick-offs and reviews across your whole team.",
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

export default function UseCases() {
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
            Whether you're a solo professional or part of a growing team, Webot
            adapts to your workflow seamlessly.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {useCases.map((useCase, index) => (
            <motion.div key={index}>
              <Card className="group h-full relative py-0 overflow-hidden bg-card/40 backdrop-blur-md border-border/50 hover:border-primary/20 transition-all duration-500 rounded-[2.5rem] hover:shadow-2xl hover:shadow-primary/5">
                <CardContent className="p-8 relative z-10 flex flex-col h-full">
                  <div className="relative mb-8 pt-2">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                      <useCase.icon className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="space-y-4 flex-1 flex flex-col">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold tracking-tight text-foreground transition-colors duration-300">
                        {useCase.title}
                      </h3>
                      <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-40 -translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 text-primary" />
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
}
