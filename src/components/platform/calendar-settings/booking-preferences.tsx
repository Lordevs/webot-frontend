"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Globe } from "lucide-react";
import { motion } from "framer-motion";

export const BookingPreferences = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}>
      <Card className="h-full border border-border/40 bg-card/60 backdrop-blur-sm shadow-xl shadow-black/2 rounded-4xl overflow-hidden">
        <CardHeader className="p-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold tracking-tight">
                Booking Preferences
              </CardTitle>
              <CardDescription className="text-sm font-medium text-muted-foreground/70">
                Configure default meeting duration and timezone.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8 pt-0 space-y-6">
          <div className="space-y-3">
            <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/60 px-1">
              Default Duration
            </Label>
            <Select defaultValue="30">
              <SelectTrigger className="h-12 rounded-xl bg-muted/20 border-border/50 focus:ring-primary/20 transition-all font-bold">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-border/50">
                <SelectItem value="15" className="font-medium">
                  15 minutes
                </SelectItem>
                <SelectItem value="30" className="font-medium">
                  30 minutes
                </SelectItem>
                <SelectItem value="45" className="font-medium">
                  45 minutes
                </SelectItem>
                <SelectItem value="60" className="font-medium">
                  60 minutes
                </SelectItem>
                <SelectItem value="90" className="font-medium">
                  90 minutes
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/60 px-1">
              Buffer Between Meetings
            </Label>
            <Select defaultValue="15">
              <SelectTrigger className="h-12 rounded-xl bg-muted/20 border-border/50 focus:ring-primary/20 transition-all font-bold">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-border/50">
                <SelectItem value="0" className="font-medium">
                  No buffer
                </SelectItem>
                <SelectItem value="5" className="font-medium">
                  5 minutes
                </SelectItem>
                <SelectItem value="10" className="font-medium">
                  10 minutes
                </SelectItem>
                <SelectItem value="15" className="font-medium">
                  15 minutes
                </SelectItem>
                <SelectItem value="30" className="font-medium">
                  30 minutes
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground/60 px-1">
              <Globe className="w-3 h-3" />
              Timezone
            </Label>
            <Select defaultValue="est">
              <SelectTrigger className="h-12 rounded-xl bg-muted/20 border-border/50 focus:ring-primary/20 transition-all font-bold">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-border/50">
                <SelectItem value="pst" className="font-medium">
                  Pacific Time (UTC-8)
                </SelectItem>
                <SelectItem value="mst" className="font-medium">
                  Mountain Time (UTC-7)
                </SelectItem>
                <SelectItem value="cst" className="font-medium">
                  Central Time (UTC-6)
                </SelectItem>
                <SelectItem value="est" className="font-medium">
                  Eastern Time (UTC-5)
                </SelectItem>
                <SelectItem value="utc" className="font-medium">
                  UTC
                </SelectItem>
                <SelectItem value="ist" className="font-medium">
                  India (UTC+5:30)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
