"use client";

import { motion, Variants } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Video, ArrowUpRight } from "lucide-react";
import Image from "next/image";

interface NextAppointmentProps {
  appointment: {
    title: string;
    customer: string;
    time: string;
    date: string;
    duration: string;
    avatar: string;
    meetLink?: string;
  };
  variants: Variants;
}

export const NextAppointmentCard = ({
  appointment,
  variants,
}: NextAppointmentProps) => (
  <motion.div variants={variants} className="lg:col-span-1 h-full">
    <div className="group relative h-full flex flex-col bg-card/40 backdrop-blur-2xl border border-white/10 rounded-4xl overflow-hidden shadow-2xl transition-all duration-500 hover:border-primary/30">
      {/* Decorative Gradient Overlay */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] -z-10 transition-transform duration-700 group-hover:scale-150" />
      
      <div className="flex flex-col h-full p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
              Live Priority
            </span>
          </div>
          <Badge variant="outline" className="rounded-full bg-white/5 border-white/10 text-[9px] font-bold uppercase tracking-wider px-3 py-1">
            Confirmed
          </Badge>
        </div>

        <div className="flex-1 space-y-6">
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-2xl font-bold tracking-tight text-foreground line-clamp-2">
                {appointment.title}
              </h3>
              <p className="text-muted-foreground font-medium text-sm">
                Meeting with {appointment.customer}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Image
                src={appointment.avatar}
                alt=""
                width={40}
                height={40}
                unoptimized
                className="rounded-2xl border-2 border-background object-cover bg-muted"
              />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-tighter">Customer</span>
                <span className="text-sm font-bold">{appointment.customer}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-muted/20 border border-white/5 transition-colors group-hover:bg-muted/30">
              <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                <Clock className="w-4 h-4 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-muted-foreground/50 uppercase">Timing</span>
                <span className="text-xs font-bold">{appointment.date}, {appointment.time}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-muted/20 border border-white/5 transition-colors group-hover:bg-muted/30">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                <Video className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-muted-foreground/50 uppercase">Link</span>
                <span className="text-xs font-bold">G-Meet</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
           <Button 
            className="w-full h-12 rounded-2xl font-bold bg-primary hover:bg-primary/90 text-primary-foreground group/join shadow-xl shadow-primary/20 transition-all hover:scale-[1.02]"
            asChild
           >
             <a href={appointment.meetLink} target="_blank" rel="noopener noreferrer">
              Join Virtual Room
              <ArrowUpRight className="w-4 h-4 ml-2 transition-transform group-hover/join:translate-x-0.5 group-hover/join:-translate-y-0.5" />
             </a>
           </Button>
        </div>
      </div>
    </div>
  </motion.div>
);
