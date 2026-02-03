"use client";

import { motion, Variants } from "framer-motion";
import { Calendar, LayoutDashboard, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={cn("w-6 h-6", className)}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
  </svg>
);

const mvpFeatures = [
  {
    icon: WhatsAppIcon,
    title: "WhatsApp Automation",
    description: "Launch your own scheduling bot on WhatsApp in minutes.",
  },
  {
    icon: Calendar,
    title: "Google Calendar Sync (2-way)",
    description:
      "Automated real-time synchronization between chat and calendar.",
  },

  {
    icon: LayoutDashboard,
    title: "Admin Dashboard",
    description:
      "Simple control panel to manage your connections and settings.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function MVPScope() {
  return (
    <section
      id="mvp-scope"
      className="relative py-20 overflow-hidden bg-background">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] translate-y-1/2" />
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
              className="px-5 py-2 rounded-full border-primary/20 text-primary bg-primary/5 font-black text-[10px] tracking-[0.2em] uppercase">
              <Sparkles className="w-3.5 h-3.5 mr-2" />
              Core Capabilities
            </Badge>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]">
            Everything you need <br />
            <span className="text-primary italic font-bold">
              to automate now
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto font-medium">
            We've concentrated on the essential tools to get you up and running
            instantly. Professional scheduling has never been this simple.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {mvpFeatures.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full gap-0 py-0 relative overflow-hidden bg-card/40 backdrop-blur-lg border border-border/50 rounded-[2.5rem] group hover:border-primary/30 transition-all duration-300">
                <CardHeader className="p-8 pb-4 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl font-bold tracking-tight">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0 relative z-10">
                  <p className="text-muted-foreground text-sm font-medium leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center">
          <p className="text-sm font-bold text-muted-foreground/80 max-w-md mx-auto italic">
            Note: Designed for businesses, freelancers, and service providers.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
