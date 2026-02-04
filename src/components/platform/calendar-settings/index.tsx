"use client";

import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConnectedAccount } from "./connected-account";
import { WorkingHours } from "./working-hours";
import { BookingPreferences } from "./booking-preferences";
import { AdditionalOptions } from "./additional-options";
import { motion } from "framer-motion";

export const CalendarSettings = () => {
  return (
    <div className="max-w-screen-2xl mx-auto space-y-10 p-4 lg:p-8 relative pb-20">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}>
          <h1 className="text-4xl font-black tracking-tight text-foreground">
            Calendar Settings
          </h1>
          <p className="text-muted-foreground font-medium mt-1 text-lg">
            Configure your availability and synchronization preferences.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}>
          <Button className="h-14 px-10 rounded-2xl font-black shadow-2xl shadow-primary/20 flex items-center gap-3 text-lg hover:scale-[1.02] active:scale-[0.98] transition-all">
            <Save className="w-5 h-5" />
            Save Protocol
          </Button>
        </motion.div>
      </div>

      <div className="space-y-8">
        {/* Connected Account Card */}
        <ConnectedAccount />

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column: Working Hours */}
          <WorkingHours />

          {/* Right Column: Booking Preferences */}
          <BookingPreferences />
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
