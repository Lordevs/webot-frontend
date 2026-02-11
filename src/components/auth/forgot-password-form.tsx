"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, ArrowLeft } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { toast } from "sonner";
import apiCaller from "@/lib/api/api-caller";
import { API_ROUTES } from "@/constants/api-routes";
import { AxiosError } from "axios";
import { CheckCircle2 } from "lucide-react";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await apiCaller(API_ROUTES.AUTH.FORGOT_PASSWORD, "POST", { email });
      setIsSent(true);
      toast.success("Reset link sent!", {
        description: "Please check your email to reset your password.",
      });
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ error?: string; detail?: string }>;
      const message =
        axiosError.response?.data?.error ||
        axiosError.response?.data?.detail ||
        "Failed to send reset link";
      toast.error("Error", { description: message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="flex flex-1 items-center justify-center placeholder:bg-white"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}>
        <Card className="border-border/70 bg-card/20 w-full max-w-md shadow-[0_10px_26px_#e0e0e0a1] backdrop-blur-lg dark:shadow-none">
          <CardContent className="space-y-4 p-6">
            {/* Logo and Header */}
            <motion.div
              className="space-y-2 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-2xl font-bold tracking-tight md:text-4xl">
                  Reset Password
                </span>
              </div>
              <p className="text-muted-foreground text-sm">
                Enter your email address and we&apos;ll send you a link to reset
                your password.
              </p>
            </motion.div>

            {isSent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold">Check your email</h3>
                <p className="text-muted-foreground text-sm max-w-[280px]">
                  We&apos;ve sent a password reset link to <br />
                  <span className="text-foreground font-semibold font-mono text-xs">
                    {email}
                  </span>
                </p>
                <Button
                  variant="outline"
                  onClick={() => setIsSent(false)}
                  className="mt-4 rounded-xl font-bold">
                  Try another email
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Input */}
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}>
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-11 h-11 bg-muted/50 border-muted-foreground/10 focus:bg-background transition-all"
                      required
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    className="w-full font-bold"
                    disabled={isLoading}>
                    {isLoading ? "Sending link..." : "Send Reset Link"}
                  </Button>
                </motion.div>
              </form>
            )}

            <motion.div
              className="pt-2 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}>
              <Link
                href={ROUTES.AUTH.LOGIN}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-all">
                <ArrowLeft className="h-4 w-4" />
                Back to Login
              </Link>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
