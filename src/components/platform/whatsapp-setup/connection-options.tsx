"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import { WhatsAppIcon } from "@/components/common/icons";
import { cn } from "@/lib/utils";
import { EmbeddedSignupButton } from "./embedded-signup-button";

interface ConnectionOptionsProps {
  onSuccess: (code: string, wabaId: string, phoneNumberId: string) => void;
  onError?: (message: string) => void;
  isConnecting: boolean;
}

export const ConnectionOptions = ({
  onSuccess,
  onError,
  isConnecting,
}: ConnectionOptionsProps) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    {/* Own WhatsApp Business Number — Meta Embedded Signup */}
    <Card className="group border-2 border-primary bg-primary/5 shadow-xl shadow-primary/10 transition-all duration-500 rounded-[2.5rem] overflow-hidden">
      <CardHeader className="p-8">
        <div className="flex items-start gap-5">
          <div className="w-14 h-14 rounded-2xl bg-primary text-background flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
            <WhatsAppIcon className="w-7 h-7" />
          </div>
          <div className="flex-1 space-y-1">
            <CardTitle className="text-xl font-bold tracking-tight text-foreground">
              Connect My WhatsApp Business
            </CardTitle>
            <CardDescription className="text-sm font-medium">
              Link your own WhatsApp Business number via Meta
            </CardDescription>
          </div>
          <Badge className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 rounded-full px-3 py-1 font-bold text-[10px] uppercase tracking-widest">
            Recommended
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-8 pt-0 space-y-6">
        <div className="space-y-3">
          {[
            "Your own branded WhatsApp Business number",
            "Full control over your WABA & conversations",
            "Customers message you directly",
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 text-sm font-medium text-muted-foreground/80"
            >
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <EmbeddedSignupButton
          onSuccess={onSuccess}
          onError={onError}
          disabled={isConnecting}
        />
      </CardContent>
    </Card>

    {/* Virtual Number — Coming Soon */}
    <Card className="group border-border/40 bg-card/40 backdrop-blur-sm rounded-[2.5rem] overflow-hidden opacity-80 filter grayscale-[0.5] hover:grayscale-0 transition-all duration-500">
      <CardHeader className="p-8">
        <div className="flex items-start gap-5">
          <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
            <WhatsAppIcon className="w-7 h-7 text-primary/40" />
          </div>
          <div className="flex-1 space-y-1">
            <CardTitle
              className={cn(
                "text-xl font-bold tracking-tight text-muted-foreground/80 group-hover:text-foreground/80 transition-colors",
              )}
            >
              Shared Virtual Number
            </CardTitle>
            <CardDescription className="text-sm font-medium">
              Use Webot&apos;s hosted WhatsApp number
            </CardDescription>
          </div>
          <Badge
            variant="secondary"
            className="rounded-full px-3 py-1 font-bold text-[10px] uppercase tracking-widest opacity-60"
          >
            Soon
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-8 pt-0 space-y-6">
        <div className="space-y-3">
          {[
            "Instant activation without Meta verification",
            "Dedicated business identifier for your brand",
            "Reliable 24/7 endpoint for automated booking",
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 text-sm font-medium text-muted-foreground/60"
            >
              <CheckCircle2 className="w-4 h-4 text-muted/40 shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);
