import { Bot, Clock, Calendar, Wifi, MessageCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function QuickControls() {
  const [botEnabled, setBotEnabled] = useState(true);

  return (
    <Card className="py-2.5 px-4 rounded-xl border-border/50 shadow-none">
      <CardContent className="p-0 flex items-center gap-4 flex-wrap">
        {/* Bot Toggle */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <span className="text-xs font-medium text-foreground">
              Bot Response
            </span>
          </div>
          <Switch checked={botEnabled} onCheckedChange={setBotEnabled} />
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Operating Hours */}
        <div className="flex items-center gap-2 px-1">
          <Clock className="w-3.5 h-3.5 text-muted-foreground" />
          <div className="flex flex-col">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
              Support Hours
            </span>
            <span className="text-[11px] text-foreground font-medium truncate">
              9 AM – 6 PM
            </span>
          </div>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Next Slot */}
        <div className="flex items-center gap-2 px-1">
          <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
          <div className="flex flex-col">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
              Next Demo Slot
            </span>
            <span className="text-[11px] text-foreground font-medium truncate">
              3:00 PM Today
            </span>
          </div>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Statuses */}
        <div className="flex items-center gap-4 ml-auto">
          <div className="flex items-center gap-1.5 group cursor-default">
            <div className="relative">
              <Wifi className="w-3.5 h-3.5 text-success" />
              <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
            </div>
            <span className="text-[11px] text-success font-medium">
              Calendar Sync
            </span>
          </div>

          <div className="flex items-center gap-1.5 group cursor-default">
            <div className="relative">
              <MessageCircle className="w-3.5 h-3.5 text-success" />
              <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
            </div>
            <span className="text-[11px] text-success font-medium">
              WhatsApp
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
