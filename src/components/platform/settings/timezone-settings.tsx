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
import { Globe, Clock } from "lucide-react";
import { motion } from "framer-motion";

export const TimezoneSettings = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}>
      <Card className="border-border/40 gap-0 py-0 bg-card/60 backdrop-blur-sm shadow-xl shadow-black/2 rounded-4xl overflow-hidden">
        <CardHeader className="p-8 pb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center">
              <Globe className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <CardTitle className="text-xl font-black tracking-tight">
                Temporal Coordinates
              </CardTitle>
              <CardDescription className="text-sm font-medium text-muted-foreground/70">
                Set your primary operational timezone.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8 pt-6">
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80 flex items-center gap-2">
              <Clock className="w-3 h-3" />
              Primary Timezone
            </Label>
            <Select defaultValue="est">
              <SelectTrigger className="h-12 rounded-xl border-border/50 bg-muted/20 focus:bg-background transition-all font-medium">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-border/50 shadow-xl">
                <SelectItem value="pst">Pacific Time (UTC-8)</SelectItem>
                <SelectItem value="mst">Mountain Time (UTC-7)</SelectItem>
                <SelectItem value="cst">Central Time (UTC-6)</SelectItem>
                <SelectItem value="est">Eastern Time (UTC-5)</SelectItem>
                <SelectItem value="utc">UTC</SelectItem>
                <SelectItem value="gmt">GMT (UTC+0)</SelectItem>
                <SelectItem value="ist">India (UTC+5:30)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
