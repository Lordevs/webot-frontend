"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { LucideIcon, TrendingUp } from "lucide-react";

interface StatProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  bg: string;
  suffix?: string;
  variants: any;
}

export const StatCard = ({
  label,
  value,
  icon: Icon,
  color,
  bg,
  suffix,
  variants,
}: StatProps) => (
  <motion.div variants={variants}>
    <Card className="group border border-border/40 bg-card/60 backdrop-blur-sm shadow-xl shadow-black/2 rounded-4xl overflow-hidden hover:border-primary/20 hover:shadow-primary/5 transition-all duration-500">
      <CardContent className="p-7 relative">
        {/* Subtle Background Pattern */}
        <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:scale-125 transition-transform duration-700">
          <Icon className="w-20 h-20" />
        </div>

        <div className="flex flex-col gap-4">
          <div
            className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-black/5 ring-1 ring-white/10",
              bg,
            )}>
            <Icon className={cn("w-6 h-6", color)} />
          </div>

          <div className="space-y-1 relative z-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/50 leading-none">
              {label}
            </p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold tracking-tight text-foreground">
                {value}
                {suffix || ""}
              </p>
              <span className="text-[10px] font-bold text-emerald-500 flex items-center bg-emerald-500/10 px-1.5 py-0.5 rounded-md">
                <TrendingUp className="w-3 h-3 mr-0.5" />
                +12%
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);
