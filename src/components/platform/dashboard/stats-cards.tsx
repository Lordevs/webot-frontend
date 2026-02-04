"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

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
    <Card className="border-0 shadow-2xl shadow-black/2 rounded-3xl overflow-hidden hover:translate-y-[-4px] transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 leading-none">
              {label}
            </p>
            <p className="text-3xl font-black tracking-tighter">
              {value}
              {suffix || ""}
            </p>
          </div>
          <div
            className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm",
              bg,
            )}>
            <Icon className={cn("w-6 h-6", color)} />
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);
