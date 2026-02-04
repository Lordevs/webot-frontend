"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CalendarProvider,
  CalendarHeader,
  CalendarBody,
  CalendarDatePagination,
  CalendarDate,
  CalendarMonthPicker,
  CalendarYearPicker,
  CalendarItem,
  Feature,
} from "@/components/kibo-ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { motion } from "framer-motion";
import { addDays, setHours, setMinutes } from "date-fns";
import { useState } from "react";

const generateMockFeatures = (): Feature[] => {
  const today = new Date();

  return [
    {
      id: "1",
      name: "Consultation",
      startAt: setHours(setMinutes(addDays(today, 1), 0), 10),
      endAt: setHours(setMinutes(addDays(today, 1), 30), 10),
      status: { id: "confirmed", name: "Confirmed", color: "#10b981" },
    },
    {
      id: "2",
      name: "Strategy Call",
      startAt: setHours(setMinutes(addDays(today, 3), 0), 14),
      endAt: setHours(setMinutes(addDays(today, 3), 45), 14),
      status: { id: "pending", name: "Pending", color: "#f59e0b" },
    },
    {
      id: "3",
      name: "Follow-up",
      startAt: setHours(setMinutes(addDays(today, 5), 0), 11),
      endAt: setHours(setMinutes(addDays(today, 5), 30), 11),
      status: { id: "confirmed", name: "Confirmed", color: "#6366f1" },
    },
    {
      id: "4",
      name: "Strategy Call",
      startAt: setHours(setMinutes(addDays(today, 5), 0), 14),
      endAt: setHours(setMinutes(addDays(today, 5), 45), 14),
      status: { id: "pending", name: "Pending", color: "#f59e0b" },
    },
  ];
};

export const BookingCalendar = () => {
  const [features] = useState<Feature[]>(generateMockFeatures());

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="h-full">
      <Card className="h-full py-0 gap-0 border border-border/40 bg-card/60 backdrop-blur-sm shadow-xl shadow-black/2 rounded-4xl overflow-hidden flex flex-col">
        <CardHeader className="p-8 pb-4 shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <CalendarIcon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold tracking-tight">
                Schedule Preview
              </CardTitle>
              <CardDescription className="text-sm font-medium text-muted-foreground/70">
                Visualize your upcoming booking slots and availability.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8 pt-4 flex-1 flex flex-col min-h-0">
          <div className="flex-1 flex flex-col min-h-0 rounded-2xl border border-border/50 bg-background/50 overflow-hidden">
            <CalendarProvider className="flex-1 flex flex-col min-h-0">
              <div className="flex items-center justify-between p-4 border-b border-border/50 bg-muted/20">
                <CalendarDate>
                  <CalendarDatePagination />
                </CalendarDate>

                <div className="flex items-center gap-2">
                  <CalendarMonthPicker className="w-32 h-9 text-xs font-bold bg-background shadow-xs hover:bg-background/80" />
                  <CalendarYearPicker
                    start={new Date().getFullYear()}
                    end={new Date().getFullYear() + 5}
                    className="w-24 h-9 text-xs font-bold bg-background shadow-xs hover:bg-background/80"
                  />
                </div>
              </div>

              <div className="flex-1 flex flex-col min-h-0 p-4">
                <CalendarHeader className="mb-2" />
                <CalendarBody features={features}>
                  {({ feature }) => (
                    <CalendarItem
                      feature={feature}
                      className="text-[10px] bg-muted/50 p-1 rounded-md mb-1 hover:bg-muted font-medium transition-colors cursor-pointer"
                    />
                  )}
                </CalendarBody>
              </div>
            </CalendarProvider>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
