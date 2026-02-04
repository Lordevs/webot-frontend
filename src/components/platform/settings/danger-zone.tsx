"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Shield, LogOut, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

export const DangerZone = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}>
      <Card className="border gap-0 py-0 border-destructive/20 bg-destructive/5 backdrop-blur-sm shadow-xl shadow-destructive/5 rounded-4xl overflow-hidden">
        <CardHeader className="p-8 pb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-destructive/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-destructive" />
            </div>
            <div>
              ``
              <CardTitle className="text-xl font-black tracking-tight text-destructive">
                Danger Protocol
              </CardTitle>
              <CardDescription className="text-sm font-medium text-destructive/70">
                Irreversible actions for your account. Proceed with caution.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8 pt-6 space-y-4">
          <div className="flex items-center justify-between p-4 bg-background/50 backdrop-blur-md rounded-2xl border border-border/50">
            <div>
              <p className="font-bold text-foreground">Global Sign Out</p>
              <p className="text-xs text-muted-foreground font-medium mt-0.5">
                Terminate all active sessions across devices.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 h-9 border-border/50 hover:bg-background shadow-xs font-bold">
              <LogOut className="w-4 h-4" />
              Log Out All
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-background/50 backdrop-blur-md rounded-2xl border border-border/50">
            <div>
              <p className="font-bold text-destructive">Delete Account</p>
              <p className="text-xs text-muted-foreground font-medium mt-0.5">
                Permanently purge your account and all associated data.
              </p>
            </div>
            <Button
              variant="destructive"
              size="sm"
              className="gap-2 h-9 font-bold shadow-lg shadow-destructive/20">
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
