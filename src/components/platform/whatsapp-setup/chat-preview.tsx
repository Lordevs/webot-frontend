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
import {
  Edit3,
  Send,
  ArrowRight,
  Check,
  MoreVertical,
  Phone,
  Video,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ChatPreviewProps {
  greetingMessage: string;
  setGreetingMessage: (val: string) => void;
}

const WLogo = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full text-white"
  >
    <path
      d="M22 10.5V12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C13.5997 2 15.112 2.37894 16.4685 3.0638"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 2L11 13"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M22 2L15 22L11 13L2 9L22 2Z" fill="currentColor" />
  </svg>
);

const WhatsAppLogoIcon = () => (
  <div className="relative flex items-center justify-center w-full h-full bg-primary rounded-full p-2 shadow-lg">
    <span className="text-primary-foreground font-black text-lg italic pr-0.5 pt-0.5">
      W
    </span>
  </div>
);

const templates = [
  {
    label: "Friendly",
    text: "Hi Wahaj! 👋 Thanks for messaging. How can I help you schedule today?",
  },
  {
    label: "Professional",
    text: "Hello Wahaj. Thank you for contacting us. Please let me know your preferred time slot.",
  },
  {
    label: "Direct",
    text: "Hey! Ready to book a meeting? Just let me know when.",
  },
];

export const ChatPreview = ({
  greetingMessage,
  setGreetingMessage,
}: ChatPreviewProps) => (
  <Card className="group border gap-0 py-0 border-border/40 bg-card/60 backdrop-blur-sm shadow-xl shadow-black/2 rounded-[2rem] overflow-hidden">
    <CardHeader className="p-8 pb-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Edit3 className="w-5 h-5 text-primary" />
        </div>
        <div>
          <CardTitle className="text-xl font-bold tracking-tight">
            Welcome Message
          </CardTitle>
          <CardDescription className="font-medium text-sm">
            Customize how your AI Assistant welcomes new users.
          </CardDescription>
        </div>
      </div>
    </CardHeader>
    <CardContent className="p-8 pt-6">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Editor */}
        <div className="space-y-8 py-2">
          <div className="flex items-center justify-between p-4 rounded-3xl bg-primary/5 border border-primary/10 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-2xl bg-background flex items-center justify-center shadow-sm border border-border/50">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-bold text-foreground text-sm">
                  Conversation Opener
                </p>
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">
                  First Touchpoint
                </p>
              </div>
            </div>
            <Badge
              variant="secondary"
              className="bg-background shadow-sm text-primary font-bold px-3 py-1 rounded-lg border-border/50"
            >
              Active
            </Badge>
          </div>

          <div className="space-y-4">
            {/* Templates */}
            <div className="space-y-2">
              <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/60 px-1">
                Quick Start
              </Label>
              <div className="flex gap-2 flex-wrap">
                {templates.map((t) => (
                  <button
                    key={t.label}
                    onClick={() => setGreetingMessage(t.text)}
                    className="text-[10px] font-bold px-3 py-1.5 rounded-xl bg-background border border-border/50 hover:bg-primary/5 hover:border-primary/30 hover:text-primary transition-all shadow-sm"
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between px-1 pt-2">
              <Label
                htmlFor="greeting"
                className="text-xs font-black uppercase tracking-widest text-muted-foreground/60"
              >
                Message Content
              </Label>
              <div className="flex gap-1.5">
                {["Wahaj", "10:00 AM"].map((tag) => (
                  <span
                    key={tag}
                    onClick={() =>
                      setGreetingMessage(greetingMessage + " " + tag)
                    }
                    className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-muted/50 text-muted-foreground border border-border/50 cursor-pointer hover:bg-primary/10 hover:text-primary hover:border-primary/20 transition-all select-none"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative group/input">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-indigo-500/20 rounded-2xl blur opacity-0 group-focus-within/input:opacity-100 transition duration-500" />
              <Textarea
                id="greeting"
                value={greetingMessage}
                onChange={(e) => setGreetingMessage(e.target.value)}
                rows={6}
                className="relative resize-none rounded-2xl bg-background/50 border-border/50 focus:bg-background transition-all p-6 pb-8 font-medium leading-relaxed text-base shadow-sm group-hover/input:border-primary/20"
                placeholder="Enter your greeting message..."
              />
              <div className="absolute bottom-4 left-6 text-[10px] font-bold text-muted-foreground/40">
                {greetingMessage.length} characters
              </div>
              <div className="absolute bottom-4 right-4 flex items-center gap-2">
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  AI Optimized
                </span>
              </div>
            </div>
            <p className="text-xs font-medium text-muted-foreground leading-relaxed px-2">
              <span className="text-primary font-bold">Pro Tip:</span> Keeping
              greetings under 160 characters can improve response rates by{" "}
              <span className="font-bold text-foreground">30%</span>.
            </p>
          </div>

          <Button className="h-14 w-full rounded-2xl font-bold shadow-xl shadow-primary/20 flex items-center justify-between px-6 group/btn bg-primary hover:bg-primary/90 text-primary-foreground overflow-hidden relative transition-all hover:scale-[1.01]">
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
            <span className="relative flex items-center gap-3">
              <Send className="w-5 h-5" />
              <span className="tracking-tight">Push Update to W-Bot</span>
            </span>
            <div className="relative w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <ArrowRight className="w-4 h-4" />
            </div>
          </Button>
        </div>

        {/* WhatsApp Mirror */}
        <div className="relative mx-auto w-full max-w-[380px] h-[600px] rounded-[3rem] border-8 border-zinc-900 bg-zinc-950 shadow-2xl overflow-hidden flex flex-col ring-1 ring-white/10">
          {/* Dynamic Island / Notch Area */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-7 w-32 bg-black rounded-b-2xl z-50 flex items-center justify-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
            <div className="w-1.5 h-1.5 rounded-full bg-blue-900/50" />
          </div>

          {/* Status Bar */}
          <div className="h-12 bg-[#075e54] w-full flex items-end justify-between px-6 pb-2 text-white z-20 pt-4">
            <span className="text-[10px] font-medium">9:41</span>
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-white text-black text-[8px] flex items-center justify-center font-bold">
                5G
              </div>
              <div className="w-4 h-2.5 border- border-white/50 rounded-[2px] relative">
                <div className="absolute inset-0.5 bg-white" />
              </div>
            </div>
          </div>

          {/* WhatsApp Header */}
          <div className="bg-[#075e54] p-3 flex items-center gap-3 shadow-md relative z-10 shrink-0">
            <Button
              size="icon"
              variant="ghost"
              className="w-8 h-8 -ml-1 text-white hover:bg-white/10 rounded-full"
            >
              <ArrowRight className="w-5 h-5 rotate-180" />
            </Button>

            <div className="w-10 h-10 shrink-0">
              <WhatsAppLogoIcon />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold text-white tracking-tight truncate">
                W Bot
              </h3>
              <p className="text-[10px] font-medium text-white/80 truncate">
                Generic • Business Account
              </p>
            </div>

            <div className="flex items-center gap-1 text-white">
              <Button
                size="icon"
                variant="ghost"
                className="w-8 h-8 hover:bg-white/10 rounded-full"
              >
                <Video className="w-5 h-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="w-8 h-8 hover:bg-white/10 rounded-full"
              >
                <Phone className="w-4 h-4 text-white" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="w-8 h-8 hover:bg-white/10 rounded-full"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-[#e5ddd5] relative">
            <div className="absolute inset-0 opacity-[0.06] bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/WhatsApp_logo-color-vertical.svg/2048px-WhatsApp_logo-color-vertical.svg.png')] bg-center bg-no-repeat bg-size-50" />

            {/* Encryption Notice */}
            <div className="flex justify-center my-4">
              <div className="bg-[#ffeba0] text-[10px] px-3 py-1.5 rounded-lg text-center shadow-sm max-w-[80%] opacity-90">
                <p className="text-amber-900 leading-tight">
                  Messages and calls are end-to-end encrypted. No one outside of
                  this chat, not even WhatsApp, can read or listen to them.
                </p>
              </div>
            </div>

            {/* Date */}
            <div className="flex justify-center">
              <span className="bg-[#dcf8c6] text-teal-900 text-[10px] font-bold px-2 py-1 rounded-md shadow-sm uppercase tracking-wide">
                Today
              </span>
            </div>

            {/* Bot Message */}
            <div className="flex justify-start">
              <div className="max-w-[85%] bg-white p-2 pl-3 pr-4 rounded-lg rounded-tl-none shadow-sm relative group">
                <div className="absolute -left-2 top-0 w-0 h-0 border-t-0 border-r-10 border-b-10 border-transparent border-r-white" />
                <p className="text-[13px] leading-relaxed text-gray-900">
                  {greetingMessage}
                </p>
                <div className="flex justify-end gap-1 mt-1">
                  <span className="text-[9px] text-gray-500 font-medium">
                    10:00 AM
                  </span>
                </div>
              </div>
            </div>

            {/* User Message */}
            <div className="flex justify-end">
              <div className="max-w-[85%] bg-[#dcf8c6] p-2 pl-3 pr-4 rounded-lg rounded-tr-none shadow-sm relative group">
                <div className="absolute -right-2 top-0 w-0 h-0 border-t-0 border-l-10 border-b-10 border-transparent border-l-[#dcf8c6]" />
                <p className="text-[13px] leading-relaxed text-gray-900">
                  I&apos;d like to book a consultation for next Tuesday.
                </p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="text-[9px] text-gray-500 font-medium">
                    10:02 AM
                  </span>
                  <div className="flex -space-x-1">
                    <Check className="w-3 h-3 text-[#53bdeb]" />
                    <Check className="w-3 h-3 text-[#53bdeb]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Bot Response with Action */}
            <div className="flex justify-start">
              <div className="max-w-[85%] bg-white p-2 pl-3 pb-3 pr-4 rounded-lg rounded-tl-none shadow-sm relative group">
                <div className="absolute -left-2 top-0 w-0 h-0 border-t-0 border-r-10 border-b-10 border-transparent border-r-white" />
                <p className="text-[13px] leading-relaxed text-gray-900">
                  I can check that for you. One moment...
                </p>
                <div className="flex justify-end gap-1 mt-1">
                  <span className="text-[9px] text-gray-500 font-medium">
                    10:02 AM
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-2">
              <div className="bg-[#dcf8c6] px-4 py-2 rounded-full shadow-sm flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-bold text-emerald-900 uppercase tracking-wide">
                  W-Bot Checking Calendar
                </span>
              </div>
            </div>
          </div>

          {/* WhatsApp Bottom Bar */}
          <div className="bg-[#f0f2f5] p-2 px-3 flex items-center gap-2 z-20 pb-6">
            <Button
              size="icon"
              variant="ghost"
              className="w-8 h-8 text-gray-500 rounded-full hover:bg-black/5"
            >
              <span className="text-xl leading-none font-light">+</span>
            </Button>
            <div className="flex-1 bg-white rounded-full h-9 px-4 flex items-center gap-2 shadow-sm border border-transparent focus-within:border-emerald-500/50 transition-colors">
              <span className="text-gray-400 text-sm">Message</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-[#00a884] flex items-center justify-center text-white shadow-sm hover:scale-105 transition-transform cursor-pointer">
              <span className="sr-only">Voice</span>
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="currentColor"
              >
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"></path>
                <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"></path>
              </svg>
            </div>
          </div>

          {/* Home Indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-black/20 rounded-full z-30" />
        </div>
      </div>
    </CardContent>
  </Card>
);
