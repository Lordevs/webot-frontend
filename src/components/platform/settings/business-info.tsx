"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Building2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export const BusinessInfo = () => {
  const [businessName, setBusinessName] = useState("John's Consulting");
  const [description, setDescription] = useState(
    "We provide expert consulting services to help businesses grow and succeed.",
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}>
      <Card className="border-border/40 gap-0 py-0 bg-card/60 backdrop-blur-sm shadow-xl shadow-black/2 rounded-4xl overflow-hidden">
        <CardHeader className="p-8 pb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-indigo-500" />
            </div>
            <div>
              <CardTitle className="text-xl font-black tracking-tight">
                Entity Information
              </CardTitle>
              <CardDescription className="text-sm font-medium text-muted-foreground/70">
                Public details appearing on booking confirmations.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8 pt-6 space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="businessName"
              className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">
              Organization Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="businessName"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="h-12 rounded-xl border-border/50 bg-muted/20 focus:bg-background transition-all font-medium from-font"
              required
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">
              Description <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[120px] rounded-xl border-border/50 bg-muted/20 focus:bg-background transition-all font-medium resize-none p-4"
              placeholder="Tell us about your business..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="industry"
              className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">
              Sector / Industry <span className="text-destructive">*</span>
            </Label>
            <Select defaultValue="consulting" required>
              <SelectTrigger className="h-12 rounded-xl border-border/50 bg-muted/20 focus:bg-background transition-all font-medium">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-border/50 shadow-xl">
                <SelectItem value="consulting">Consulting</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="legal">Legal</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="tech">Technology</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
