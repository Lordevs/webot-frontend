"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface QuickActionProps {
  title: string;
  desc: string;
  icon: LucideIcon;
  color: string;
  bg: string;
  href: string;
}

interface QuickActionsProps {
  actions: QuickActionProps[];
  variants: any;
}

export const QuickActions = ({ actions, variants }: QuickActionsProps) => (
  <motion.div variants={variants}>
    <div className="grid sm:grid-cols-3 gap-6">
      {actions.map((action, i) => (
        <Link key={i} href={action.href} className="group relative">
          <div className="absolute inset-0 bg-primary/5 blur-xl rounded-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <Card className="relative gap-0 py-0 h-full border border-border/40 bg-card/60 backdrop-blur-sm shadow-xl shadow-black/2 rounded-4xl overflow-hidden hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
            <CardContent className="p-8 flex flex-col items-center text-center gap-4">
              <div
                className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 ring-1 ring-white/10",
                  action.bg,
                )}>
                <action.icon className={cn("w-8 h-8", action.color)} />
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                  {action.title}
                </h4>
                <p className="text-xs text-muted-foreground/60 font-medium px-4">
                  {action.desc}
                </p>
              </div>
              <div className="text-primary font-bold text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                Launch Now →
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  </motion.div>
);
