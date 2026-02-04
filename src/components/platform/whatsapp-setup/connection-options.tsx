"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Smartphone,
  MessageCircle,
  RefreshCw,
  Link2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ConnectionOptionsProps {
  isConnected: boolean;
}

export const ConnectionOptions = ({ isConnected }: ConnectionOptionsProps) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    {/* Virtual Number */}
    <Card
      className={cn(
        "group border-2 transition-all duration-500 rounded-[2.5rem] overflow-hidden",
        isConnected
          ? "border-primary bg-primary/2"
          : "border-border/40 bg-card/40 backdrop-blur-sm",
      )}>
      <CardHeader className="p-8">
        <div className="flex items-start gap-5">
          <div
            className={cn(
              "w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110",
              isConnected
                ? "bg-primary text-primary-foreground"
                : "bg-primary/10 text-primary",
            )}>
            <Smartphone className="w-7 h-7" />
          </div>
          <div className="flex-1 space-y-1">
            <CardTitle className="text-xl font-bold tracking-tight text-foreground">
              Dedicated Virtual Number
            </CardTitle>
            <CardDescription className="text-sm font-medium">
              Use our high-performance WhatsApp numbers
            </CardDescription>
          </div>
          {isConnected && (
            <Badge className="bg-primary hover:bg-primary shadow-lg shadow-primary/20 rounded-full px-3 py-1 font-bold text-[10px] uppercase tracking-widest">
              Active
            </Badge>
          )}
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
              className="flex items-center gap-3 text-sm font-medium text-muted-foreground/80">
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
              {item}
            </div>
          ))}
        </div>
        {isConnected ? (
          <Button
            variant="outline"
            className="w-full h-12 rounded-xl font-bold gap-2 border-primary/20 hover:bg-primary/5 transition-all text-primary">
            <RefreshCw className="w-4 h-4" />
            Refresh Terminal
          </Button>
        ) : (
          <Button className="w-full h-12 rounded-xl font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
            <Link2 className="w-4 h-4 mr-2" />
            Connect Instance
          </Button>
        )}
      </CardContent>
    </Card>

    {/* Own Number (Coming Soon) */}
    <Card className="group border-border/40 bg-card/40 backdrop-blur-sm rounded-[2.5rem] overflow-hidden opacity-80 filter grayscale-[0.5] hover:grayscale-0 transition-all duration-500">
      <CardHeader className="p-8">
        <div className="flex items-start gap-5">
          <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
            <MessageCircle className="w-7 h-7 text-muted-foreground" />
          </div>
          <div className="flex-1 space-y-1">
            <CardTitle className="text-xl font-bold tracking-tight text-muted-foreground/80 group-hover:text-foreground/80 transition-colors">
              Personal Integration
            </CardTitle>
            <CardDescription className="text-sm font-medium">
              Link your existing WhatsApp Business API
            </CardDescription>
          </div>
          <Badge
            variant="secondary"
            className="rounded-full px-3 py-1 font-bold text-[10px] uppercase tracking-widest opacity-60">
            Soon
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-8 pt-0 space-y-6">
        <div className="space-y-3">
          {[
            "Connect existing customer contacts",
            "Full Meta Business Suite integration",
            "Custom branding and verification badges",
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 text-sm font-medium text-muted-foreground/60">
              <CheckCircle2 className="w-4 h-4 text-muted/40 shrink-0" />
              {item}
            </div>
          ))}
        </div>
        <Button
          variant="secondary"
          className="w-full h-12 rounded-xl font-bold"
          disabled>
          Register for Early Access
        </Button>
      </CardContent>
    </Card>
  </div>
);
