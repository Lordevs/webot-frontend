"use client";

import { useState } from "react";
import {
  Smartphone,
  CheckCircle2,
  Loader2,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import apiCaller from "@/lib/api/api-caller";
import { API_ROUTES } from "@/constants/api-routes";
import { AxiosError } from "axios";
import Image from "next/image";

interface WhatsAppStepProps {
  connected: boolean;
  onConnect: () => void;
}

export function WhatsAppStep({ connected, onConnect }: WhatsAppStepProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [step, setStep] = useState<"input" | "verify">("input");

  const handleSendCode = async () => {
    if (!phoneNumber) {
      toast.error("Please enter a phone number");
      return;
    }

    setIsLoading(true);
    try {
      await apiCaller(API_ROUTES.AUTH.PHONE_UPDATE, "POST", {
        phone_number: phoneNumber,
      });
      toast.success("Verification code sent!", {
        description: "Please check your WhatsApp.",
      });
      setStep("verify");
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ error?: string }>;
      console.error("Failed to send code:", axiosError);
      toast.error("Failed to send code", {
        description: axiosError.response?.data?.error || "Something went wrong.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!otpCode) {
      toast.error("Please enter the verification code");
      return;
    }

    setIsLoading(true);
    try {
      await apiCaller(API_ROUTES.AUTH.PHONE_VERIFY, "POST", {
        phone_number: phoneNumber,
        otp_code: otpCode,
      });
      toast.success("Phone verified!", {
        description: "Your WhatsApp is now connected.",
      });
      onConnect();
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ error?: string }>;
      console.error("Verification failed:", axiosError);
      toast.error("Verification failed", {
        description: axiosError.response?.data?.error || "Invalid code.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-4">
      <div className="space-y-2 mb-12">
        <Badge
          variant="outline"
          className="rounded-full border-emerald-500/20 text-emerald-500 bg-emerald-500/5 px-4 py-1">
          Messaging Layer
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground lg:text-5xl">
          Activate your{" "}
          <span className="text-emerald-500 italic">WhatsApp Hub.</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl">
          Choose between our instant-provisioned virtual numbers or linking your
          own Meta Business account.
        </p>
      </div>

      <div className="grid gap-6">
        {!connected ? (
          <div className="grid gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="p-8 rounded-[2.5rem] border-2 border-border/50 bg-card/20 backdrop-blur-md space-y-6">
              <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center mb-6">
                <Smartphone className="w-8 h-8 text-primary" />
              </div>

              {step === "input" ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-lg font-bold">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      placeholder="+1 (555) 000-0000"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="h-14 text-lg bg-background/50 border-border/50 rounded-2xl"
                    />
                    <p className="text-xs text-muted-foreground italic">
                      Include country code (e.g., +1 for USA)
                    </p>
                  </div>
                  <Button
                    onClick={handleSendCode}
                    disabled={isLoading}
                    className="w-full h-14 text-lg font-bold rounded-2xl">
                    {isLoading ? (
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : (
                      "Send Verification Code"
                    )}
                  </Button>
                </div>
              ) : (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                  <div className="space-y-2">
                    <Label htmlFor="otp" className="text-lg font-bold">
                      Verification Code
                    </Label>
                    <Input
                      id="otp"
                      placeholder="Enter 6-digit code"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      className="h-14 text-2xl tracking-[0.5em] text-center bg-background/50 border-border/50 rounded-2xl"
                      maxLength={6}
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setStep("input")}
                      disabled={isLoading}
                      className="h-14 px-6 rounded-2xl border-border/50">
                      Back
                    </Button>
                    <Button
                      onClick={handleVerifyCode}
                      disabled={isLoading}
                      className="flex-1 h-14 text-lg font-bold rounded-2xl">
                      {isLoading ? (
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      ) : (
                        "Verify & Connect"
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div className="p-8 rounded-3xl bg-muted/30 border border-border/50 flex flex-col sm:flex-row gap-6 items-center">
              <div className="flex -space-x-3 shrink-0">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-4 border-background bg-muted flex items-center justify-center overflow-hidden">
                    <Image
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`}
                      alt="User"
                      width={40}
                      height={40}
                      unoptimized
                    />
                  </div>
                ))}
              </div>
              <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                We&apos;ll send you a verification code via WhatsApp. Make sure
                your{" "}
                <span className="text-foreground font-bold italic">
                  number is active
                </span>{" "}
                and ready to receive messages.
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full animate-in zoom-in-95 fade-in duration-700">
            <div className="p-1 rounded-[3rem] bg-linear-to-br from-emerald-500 to-emerald-400 shadow-3xl shadow-emerald-500/20">
              <div className="bg-background rounded-[2.9rem] p-12 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center mb-10 ring-8 ring-emerald-500/5">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                </div>

                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-emerald-600/60 mb-4">
                  Dedicated Business Line
                </h3>
                <p className="text-4xl sm:text-5xl font-black tracking-tight mb-8 tabular-nums">
                  +1 (888) <span className="text-emerald-500">WEBOT</span>-AI
                </p>

                <div className="grid grid-cols-2 gap-4 w-full max-w-xs mb-10">
                  <div className="flex flex-col items-center gap-1">
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-50">
                      Verified
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Sparkles className="w-5 h-5 text-emerald-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-50">
                      AI Ready
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 rounded-full bg-muted/50 border border-border/50 px-6">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-muted-foreground">
                    Accepting Global Requests
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
