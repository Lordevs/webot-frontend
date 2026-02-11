"use client";

import { useState } from "react";
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
import { ShieldCheck, Lock, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import apiCaller from "@/lib/api/api-caller";
import { API_ROUTES } from "@/constants/api-routes";
import { toast } from "sonner";

export const SecuritySettings = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdatePassword = async () => {
    if (!password) {
      toast.error("Password cannot be empty");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await apiCaller(API_ROUTES.AUTH.CHANGE_PASSWORD, "POST", { password });
      toast.success("Password updated successfully!");
      setPassword("");
      setConfirmPassword("");
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } } };
      toast.error("Failed to update password", {
        description: err.response?.data?.error || "Please try again later."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="border-border/40 bg-card/60 backdrop-blur-sm shadow-xl shadow-black/2 rounded-4xl overflow-hidden">
        <CardHeader className="p-8 pb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold">Security & Security</CardTitle>
              <CardDescription>
                Manage your account credentials and security level.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8 pt-6 space-y-6">
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">
                  New Password
                </Label>
                <div className="relative">
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 rounded-xl border-border/50 bg-muted/20 focus:bg-background transition-all font-medium pl-10"
                  />
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-12 rounded-xl border-border/50 bg-muted/20 focus:bg-background transition-all font-medium pl-10"
                  />
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                </div>
              </div>
              <Button 
                onClick={handleUpdatePassword} 
                className="h-12 px-8 rounded-xl font-bold gap-2 w-full sm:w-auto"
                disabled={loading}
              >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : "Update Password"}
              </Button>
            </div>

            <div className="bg-muted/10 rounded-2xl p-6 border border-border/30 space-y-3">
               <h4 className="text-sm font-bold flex items-center gap-2">
                 <Lock className="w-4 h-4 text-primary" />
                 Password Policy
               </h4>
               <p className="text-xs text-muted-foreground leading-relaxed">
                 To maintain a highly secure ecosystem, we recommend passwords with:
               </p>
               <ul className="text-[11px] space-y-2 font-medium">
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-primary" />
                    At least 8 characters
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-primary" />
                    A mix of uppercase and lowercase
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-primary" />
                    Numerical and special characters
                  </li>
               </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
