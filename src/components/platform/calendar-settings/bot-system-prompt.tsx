"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles, Bot, Wand2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export const BotSystemPrompt = () => {
  const [prompt, setPrompt] = useState(
    "You are a helpful scheduling assistant. Your goal is to find the best available time for the user while being polite and concise. Always confirm the timezone before finalizing a booking.",
  );

  const templates = [
    {
      title: "Professional",
      content:
        "You are a professional executive assistant. Be polite, formal, and efficient. prioritize business hours and avoid informal language.",
    },
    {
      title: "Friendly",
      content:
        "You are a friendly and casual scheduler. Use emojis occasionally and keep the tone lighthearted while ensuring the booking is accurate.",
    },
    {
      title: "Strict",
      content:
        "You are a strict time-management bot. Only offer slots that strictly adhere to the defined working hours. Do not make exceptions.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}>
      <Card className="border border-border/40 bg-card/60 backdrop-blur-sm shadow-xl shadow-black/2 rounded-4xl overflow-hidden">
        <CardHeader className="p-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Bot className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold tracking-tight">
                System Prompt
              </CardTitle>
              <CardDescription className="text-sm font-medium text-muted-foreground/70">
                Instruct the AI on how to handle your calendar and negotiations.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8 pt-0 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/60 px-1">
                Prompt Configuration
              </Label>
              <div className="flex gap-2">
                {templates.map((t) => (
                  <Badge
                    key={t.title}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors border-border/50 bg-background/50 backdrop-blur-sm"
                    onClick={() => setPrompt(t.content)}>
                    {t.title}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="relative group">
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[200px] rounded-2xl border-border/50 bg-muted/20 focus:bg-background transition-all font-medium resize-none p-6 text-base leading-relaxed shadow-inner"
                placeholder="Ex: You are a helpful assistant..."
              />
              <div className="absolute top-4 right-4">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-muted-foreground hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <Wand2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-2xl border border-primary/10">
              <Sparkles className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-bold text-primary">Pro Tip</p>
                <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                  Be specific about your constraints. For example, mention if
                  you prefer 30-minute gaps between meetings or avoid scheduling
                  calls on Friday afternoons.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
