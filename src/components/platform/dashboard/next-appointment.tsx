"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Video, ArrowRight } from "lucide-react";

interface NextAppointmentProps {
  appointment: {
    title: string;
    customer: string;
    time: string;
    date: string;
    duration: string;
    avatar: string;
  };
  variants: any;
}

export const NextAppointmentCard = ({
  appointment,
  variants,
}: NextAppointmentProps) => (
  <motion.div variants={variants} className="lg:col-span-1">
    <div className="h-full relative group">
      {/* Dynamic Glow Background */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/30 via-indigo-500/30 to-purple-600/30 blur-[2px] rounded-[3rem] -z-10 group-hover:blur-xs transition-all duration-700" />

      <div className="bg-card/40 backdrop-blur-xl border border-white/10 h-full rounded-[2.8rem] p-8 flex flex-col relative overflow-hidden shadow-2xl shadow-primary/5">
        {/* Animated Corner Ornament */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />

        <div className="flex items-center justify-between mb-10">
          <Badge className="bg-primary text-primary-foreground border-none font-bold text-[10px] uppercase px-4 py-1.5 tracking-widest shadow-lg shadow-primary/20">
            Next Appointment
          </Badge>
          <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md">
            <Clock className="w-5 h-5 text-primary" />
          </div>
        </div>

        <div className="flex-1 space-y-8">
          <div className="space-y-3">
            <h3 className="text-3xl font-bold tracking-tight text-foreground leading-tight">
              {appointment.title}
            </h3>
            <div className="flex items-center gap-3 p-2 pr-4 rounded-2xl bg-white/5 border border-white/5 w-fit">
              <img
                src={appointment.avatar}
                alt=""
                className="w-8 h-8 rounded-full border-2 border-primary/30"
              />
              <p className="text-muted-foreground font-bold text-sm tracking-tight">
                with {appointment.customer}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-3xl bg-white/5 border border-white/10 flex flex-col gap-1 hover:bg-white/10 transition-colors">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-primary/60">
                Date & Time
              </p>
              <p className="font-bold text-sm text-foreground">
                {appointment.date}, {appointment.time}
              </p>
            </div>
            <div className="p-4 rounded-3xl bg-white/5 border border-white/10 flex flex-col gap-1 hover:bg-white/10 transition-colors">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-primary/60">
                Duration
              </p>
              <p className="font-bold text-sm text-foreground">
                {appointment.duration}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/5">
          <Button className="w-full h-14 rounded-2xl font-bold uppercase tracking-widest shadow-2xl shadow-primary/40 bg-primary hover:bg-primary/90 text-primary-foreground gap-3 transition-all active:scale-95 group/btn">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
              <Video className="w-4 h-4" />
            </div>
            Join Meeting
            <ArrowRight className="w-4 h-4 ml-auto transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  </motion.div>
);
