"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Camera } from "lucide-react";
import { motion } from "framer-motion";

export const ProfileSettings = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      <Card className="border-border/40 gap-0 py-0 bg-card/60 backdrop-blur-sm shadow-xl shadow-black/2 rounded-4xl overflow-hidden">
        <CardHeader className="p-8 pb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl font-black tracking-tight">
                Identity Profile
              </CardTitle>
              <CardDescription className="text-sm font-medium text-muted-foreground/70">
                Manage your personal authentication details.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8 pt-6 space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative group">
              <div className="w-24 h-24 rounded-3xl bg-linear-to-tr from-primary to-indigo-500 p-0.5 shadow-2xl shadow-primary/20">
                <div className="w-full h-full rounded-[22px] bg-background flex items-center justify-center overflow-hidden">
                  <span className="text-3xl font-black text-primary">JD</span>
                </div>
              </div>
              <button className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95">
                <Camera className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-foreground">Profile Avatar</h3>
              <p className="text-xs text-muted-foreground font-medium max-w-[200px]">
                Supports high-res JPG, PNG (Max 5MB).
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="firstName"
                className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">
                First Name
              </Label>
              <Input
                id="firstName"
                defaultValue="John"
                className="h-12 rounded-xl border-border/50 bg-muted/20 focus:bg-background transition-all font-medium"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="lastName"
                className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">
                Last Name
              </Label>
              <Input
                id="lastName"
                defaultValue="Doe"
                className="h-12 rounded-xl border-border/50 bg-muted/20 focus:bg-background transition-all font-medium"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">
                Email Credentials
              </Label>
              <Input
                id="email"
                type="email"
                defaultValue="john.doe@gmail.com"
                className="h-12 rounded-xl border-border/50 bg-muted/20 focus:bg-background transition-all font-medium"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">
                Contact Protocol
              </Label>
              <Input
                id="phone"
                defaultValue="+1 (555) 123-4567"
                className="h-12 rounded-xl border-border/50 bg-muted/20 focus:bg-background transition-all font-medium"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
