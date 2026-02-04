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
    <div className="h-full relative p-1 bg-linear-to-br from-primary via-indigo-500 to-purple-600 rounded-[3rem] shadow-3xl shadow-primary/10">
      <div className="bg-background dark:bg-zinc-950 h-full rounded-[2.8rem] p-8 flex flex-col relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />

        <div className="flex items-center justify-between mb-8">
          <Badge className="bg-primary/10 text-primary border-none font-black text-[10px] uppercase px-4 py-1.5 tracking-widest">
            Priority One
          </Badge>
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            <Clock className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>

        <div className="flex-1 space-y-6">
          <div>
            <h3 className="text-3xl font-black tracking-tighter mb-2 line-clamp-1">
              {appointment.title}
            </h3>
            <div className="flex items-center gap-3">
              <img
                src={appointment.avatar}
                alt=""
                className="w-8 h-8 rounded-full border-2 border-primary/20"
              />
              <p className="text-muted-foreground font-bold">
                with {appointment.customer}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-muted/40 border border-border/10 space-y-1">
              <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">
                Timestamp
              </p>
              <p className="font-black text-sm">
                {appointment.date}, {appointment.time}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-muted/40 border border-border/10 space-y-1">
              <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">
                Duration
              </p>
              <p className="font-black text-sm">{appointment.duration}</p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-border/10">
          <Button className="w-full h-14 rounded-2xl font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/20 flex items-center gap-3 group">
            <Video className="w-5 h-5" />
            Jump into Stream
            <ArrowRight className="w-4 h-4 ml-auto transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  </motion.div>
);
