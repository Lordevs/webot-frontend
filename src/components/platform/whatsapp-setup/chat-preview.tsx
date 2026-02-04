"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Edit3, Send, ArrowRight } from "lucide-react";

interface ChatPreviewProps {
  greetingMessage: string;
  setGreetingMessage: (val: string) => void;
}

export const ChatPreview = ({
  greetingMessage,
  setGreetingMessage,
}: ChatPreviewProps) => (
  <Card className="group border gap-0 py-0 border-border/40 bg-card/60 backdrop-blur-sm shadow-xl shadow-black/2 rounded-4xl overflow-hidden">
    <CardHeader className="p-8 pb-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Edit3 className="w-5 h-5 text-primary" />
        </div>
        <div>
          <CardTitle className="text-xl font-bold tracking-tight">
            Flow Customization
          </CardTitle>
          <CardDescription className="font-medium text-sm">
            Fine-tune the voice and personality of your assistant
          </CardDescription>
        </div>
      </div>
    </CardHeader>
    <CardContent className="p-8 pt-6">
      <div className="grid lg:grid-cols-2 gap-10">
        {/* Editor */}
        <div className="space-y-6">
          <div className="space-y-3">
            <Label
              htmlFor="greeting"
              className="text-sm font-bold uppercase tracking-widest text-muted-foreground/60">
              Greeting Content
            </Label>
            <div className="relative group/input">
              <Textarea
                id="greeting"
                value={greetingMessage}
                onChange={(e) => setGreetingMessage(e.target.value)}
                rows={5}
                className="resize-none rounded-2xl bg-muted/20 border-border/50 focus:bg-background transition-all p-5 font-medium leading-relaxed"
              />
              <div className="absolute bottom-4 right-4 text-[10px] font-bold text-muted-foreground/40 group-focus-within/input:text-primary transition-colors">
                AI OPTIMIZED
              </div>
            </div>
            <p className="text-xs font-medium text-muted-foreground/50 italic px-2">
              Tip: Keep it short and ask a simple question to increase
              engagement.
            </p>
          </div>
          <Button className="h-12 px-8 rounded-xl font-bold shadow-lg shadow-primary/10 flex items-center gap-2 group/btn">
            <Send className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
            Save Protocol
            <ArrowRight className="w-3 h-3 ml-2 opacity-40" />
          </Button>
        </div>

        {/* WhatsApp Mirror */}
        <div className="relative h-[480px] w-full rounded-[2.5rem] bg-[#f0f2f5] dark:bg-[#0b141a] overflow-hidden border border-border shadow-2xl flex flex-col">
          {/* WhatsApp Header */}
          <div className="bg-[#075e54] dark:bg-[#202c33] p-4 py-3 flex items-center gap-3 shadow-md relative z-10">
            <div className="w-10 h-10 rounded-full bg-white/20 animate-pulse" />
            <div className="space-y-0.5">
              <p className="text-sm font-bold text-white tracking-tight">
                Booking Assistant
              </p>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <p className="text-[10px] font-medium text-white/60">online</p>
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 p-5 space-y-4 overflow-y-auto bg-[url('https://i.ibb.co/3sS7Lp3/bg-chat.png')] bg-repeat bg-contain opacity-90">
            {/* Bot Message */}
            <div className="flex justify-start">
              <div className="max-w-[85%] bg-white dark:bg-[#202c33] p-3 px-4 rounded-2xl rounded-tl-none shadow-sm relative">
                <p className="text-sm font-medium leading-relaxed text-foreground">
                  {greetingMessage}
                </p>
                <p className="text-[9px] font-bold text-right text-muted-foreground/50 mt-1 uppercase">
                  12:45 PM
                </p>
              </div>
            </div>

            {/* User Message */}
            <div className="flex justify-end">
              <div className="max-w-[85%] bg-[#d9fdd3] dark:bg-[#005c4b] p-3 px-4 rounded-2xl rounded-tr-none shadow-sm relative">
                <p className="text-sm font-medium leading-relaxed text-foreground">
                  Tomorrow at 4 PM please
                </p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <p className="text-[9px] font-bold text-muted-foreground/60 uppercase">
                    12:46 PM
                  </p>
                  <div className="w-3 h-3 text-primary">✓✓</div>
                </div>
              </div>
            </div>

            {/* Detailed Bot Message */}
            <div className="flex justify-start">
              <div className="max-w-[85%] bg-white dark:bg-[#202c33] p-4 px-5 rounded-2xl rounded-tl-none shadow-sm space-y-3">
                <p className="text-sm font-medium text-foreground italic">
                  Checking schedule...
                </p>
                <div className="p-3 bg-muted/30 rounded-xl border border-border/5 space-y-1.5">
                  <p className="text-[10px] font-black tracking-widest text-primary uppercase">
                    Slot Found!
                  </p>
                  <p className="text-sm font-bold text-foreground">
                    📅 Tomorrow, 4:00 PM
                  </p>
                </div>
                <p className="text-xs font-medium text-muted-foreground">
                  Type "Confirm" to book.
                </p>
              </div>
            </div>
          </div>

          {/* WhatsApp Bottom Bar */}
          <div className="bg-[#f0f2f5] dark:bg-[#202c33] p-3 flex items-center gap-3">
            <div className="flex-1 h-10 bg-white dark:bg-[#2a3942] rounded-full" />
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
              <Send className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);
