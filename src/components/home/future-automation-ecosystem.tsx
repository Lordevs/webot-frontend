"use client";

import { motion, Variants } from "framer-motion";
import {
  ShoppingBag,
  Users,
  CreditCard,
  LifeBuoy,
  Cpu,
  Lock,
  Sparkles,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const modules = [
  {
    icon: ShoppingBag,
    title: "Shopify Order Updates",
    description:
      "Connect your store to send automated delivery alerts and status updates on WhatsApp.",
    status: "Coming Soon",
  },
  {
    icon: Users,
    title: "CRM Lead Sync",
    description:
      "Automatically sync WhatsApp conversations and leads with Salesforce, HubSpot, or Pipedrive.",
    status: "Coming Soon",
  },
  {
    icon: CreditCard,
    title: "Payment Links",
    description:
      "Generate and send secure payment links directly in the chat to close deals instantly.",
    status: "Coming Soon",
  },
  {
    icon: LifeBuoy,
    title: "Support Ticket Automation",
    description:
      "Convert complex queries into support tickets automatically while AI handles common FAQs.",
    status: "Coming Soon",
  },
  {
    icon: Cpu,
    title: "Custom AI Workflows",
    description:
      "Build unique automation logic tailored to your specific business processes and needs.",
    status: "Coming Soon",
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

const FutureAutomationEcosystem = () => {
  return (
    <section
      id="ecosystem"
      className="relative py-20 overflow-hidden bg-popover/70">
      {/* Visionary Background Decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/2 rounded-full blur-[150px]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
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
              className="px-5 py-2 rounded-full bg-muted/50 text-muted-foreground border-muted-foreground/20 font-black text-[10px] tracking-[0.2em] uppercase">
              <Sparkles className="w-3.5 h-3.5 mr-2" />
              Product Vision
            </Badge>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
            Built for More Than <br />
            <span className="text-muted-foreground italic opacity-50">
              Scheduling
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto font-medium">
            Webot is evolving into a complete WhatsApp automation engine. While
            we perfect scheduling today, our ecosystem is expanding to power
            your entire business lifecycle.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {modules.map((module, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full relative overflow-hidden bg-muted/5 backdrop-blur-sm border-dashed border-muted-foreground/20 rounded-[2.5rem] group opacity-60 hover:opacity-80 transition-all duration-500">
                {/* Lock Overlay */}
                <div className="absolute top-6 right-6 z-20">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center border border-muted-foreground/10">
                    <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                  </div>
                </div>

                <CardContent className="p-10 flex flex-col items-center text-center space-y-6">
                  <div className="w-16 h-16 rounded-3xl bg-muted/30 flex items-center justify-center text-muted-foreground group-hover:scale-110 transition-all duration-500">
                    <module.icon className="w-8 h-8" />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-bold tracking-tight text-foreground/70">
                      {module.title}
                    </h3>
                    <p className="text-muted-foreground text-sm font-medium leading-relaxed">
                      {module.description}
                    </p>
                  </div>

                  <Badge
                    variant="outline"
                    className="mt-4 border-muted-foreground/30 text-muted-foreground/60 text-[9px] font-black uppercase tracking-widest">
                    {module.status}
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {/* Vision card for 'And More' */}
          <motion.div variants={itemVariants}>
            <div className="h-full flex flex-col items-center justify-center p-10 border-2 border-dashed border-primary/5 rounded-[2.5rem] bg-primary/2">
              <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary/30 mb-6">
                <PlusIcon className="w-6 h-6" />
              </div>
              <p className="text-sm font-black text-primary/30 uppercase tracking-[0.3em]">
                Infinite Possibilities
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const PlusIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}>
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

export default FutureAutomationEcosystem;
