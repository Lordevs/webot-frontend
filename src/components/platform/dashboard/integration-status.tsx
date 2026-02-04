"use client";

import { Button } from "@/components/ui/button";
import { ExternalLink, LucideIcon } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface IntegrationCardProps {
  title: string;
  statusText: string;
  statusColor: string;
  icon: any; // WhatsAppIcon or LucideIcon
  href: string;
  variants: any;
}

export const IntegrationCard = ({
  title,
  statusText,
  statusColor,
  icon: Icon,
  href,
  variants,
}: IntegrationCardProps) => (
  <motion.div
    variants={variants}
    className="group relative p-6 rounded-[2.5rem] bg-card border border-border/50 shadow-2xl shadow-black/2 hover:shadow-primary/5 transition-all overflow-hidden flex items-center gap-6">
    <div className="absolute top-0 right-0 p-8 opacity-5">
      <Icon className="w-24 h-24" />
    </div>
    <div
      className={cn(
        "w-16 h-16 rounded-[1.8rem] flex items-center justify-center shrink-0 border group-hover:scale-110 transition-transform",
        statusColor === "emerald"
          ? "bg-emerald-500/10 border-emerald-500/10"
          : "bg-primary/10 border-primary/10",
      )}>
      <Icon
        className={cn(
          "w-8 h-8",
          statusColor === "emerald" ? "text-emerald-500" : "text-primary",
        )}
      />
    </div>
    <div className="flex-1 space-y-1">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
        Protocol Status
      </p>
      <h3 className="text-xl font-black tracking-tight">{title}</h3>
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase border",
            statusColor === "emerald"
              ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/10"
              : "bg-primary/10 text-primary border-primary/10",
          )}>
          <div
            className={cn(
              "w-1.5 h-1.5 rounded-full animate-pulse",
              statusColor === "emerald" ? "bg-emerald-500" : "bg-primary",
            )}
          />
          {statusText}
        </span>
      </div>
    </div>
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full transition-colors"
      asChild>
      <Link href={href}>
        <ExternalLink
          className={cn(
            "w-4 h-4",
            statusColor === "emerald" ? "text-emerald-500" : "text-primary",
          )}
        />
      </Link>
    </Button>
  </motion.div>
);
