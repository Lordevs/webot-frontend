import { Bot, Clock, Calendar, CalendarIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function QuickControls() {
  const [botEnabled, setBotEnabled] = useState(true);

  return (
    <Card className="py-2.5 gap-0 px-4 bg-white rounded-xl border-border/50 shadow-none">
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
              <CalendarIcon className="w-3.5 h-3.5 text-success" />
              <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
            </div>
            <span className="text-[11px] text-success font-medium">
              Calendar Sync
            </span>
          </div>

          <div className="flex items-center gap-1.5 group cursor-default">
            <div className="relative">
              <WhatsAppIcon className="w-3.5 h-3.5 text-success" />
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
