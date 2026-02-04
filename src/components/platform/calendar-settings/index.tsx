"use client";

import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConnectedAccount } from "./connected-account";
import { WorkingHours } from "./working-hours";
import { BookingCalendar } from "./booking-calendar";
import { AdditionalOptions } from "./additional-options";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge"; // Added for Badge component

export const CalendarSettings = () => {
  return (
    <div className="max-w-screen-2xl mx-auto space-y-8 p-4 lg:p-8 relative pb-20">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 -z-10 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2">
          <Badge
            variant="outline"
            className="bg-primary/5 border-primary/20 text-primary font-bold uppercase tracking-[0.2em] text-[10px] px-4 py-1 rounded-full">
            Scheduler
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-foreground">
            Calendar{" "}
            <span className="text-primary relative inline-block">
              Settings
              <span className="absolute bottom-1 left-0 w-full h-3 bg-primary/10 -z-10" />
            </span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-lg leading-relaxed font-medium">
            Manage your availability, working hours, and booking preferences.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}>
          <Button className="h-14 px-8 rounded-2xl font-black gap-3 shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all bg-primary/90 hover:bg-primary">
            <Save className="w-5 h-5" />
            Save Changes
          </Button>
        </motion.div>
      </div>

      <div className="grid gap-8">
        {/* Top Section: Connected Account */}
        <ConnectedAccount />

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column: Working Hours */}
          <BookingCalendar />

          {/* Right Column: Booking Calendar */}
          <WorkingHours />
        </div>

        {/* Bottom Section: Additional Options */}
        <AdditionalOptions />
      </div>

      {/* Mobile Sticky Save Button (Optional) */}
      <div className="fixed bottom-8 right-8 lg:hidden z-50">
        <Button className="w-16 h-16 rounded-2xl shadow-2xl shadow-primary/40 flex items-center justify-center p-0">
          <Save className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
};

export default CalendarSettings;
