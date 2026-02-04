"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

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
        <Link key={i} href={action.href} className="group">
          <div className="h-full p-8 rounded-[2.5rem] bg-card border border-border/50 shadow-xl shadow-black/2 hover:shadow-2xl hover:border-primary/20 transition-all text-center space-y-4">
            <div
              className={cn(
                "w-14 h-14 rounded-2xl mx-auto flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform",
                action.bg,
              )}>
              <action.icon className={cn("w-7 h-7", action.color)} />
            </div>
            <div className="space-y-1">
              <h4 className="text-xl font-black tracking-tight group-hover:text-primary transition-colors">
                {action.title}
              </h4>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest opacity-60 leading-none">
                {action.desc}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </motion.div>
);
