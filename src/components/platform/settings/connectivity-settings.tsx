"use client";

import { useState, useEffect } from "react";
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
import { 
  Calendar, 
  CheckCircle2, 
  AlertCircle,
  RefreshCw,
  Link2,
  Unlink
} from "lucide-react";
import { motion } from "framer-motion";
import { WhatsAppIcon } from "@/components/common/icons";
import apiCaller from "@/lib/api/api-caller";
import { API_ROUTES } from "@/constants/api-routes";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ConfirmPopover } from "@/components/ui/confirm-popover";

interface UserProfile {
  phone_number: string | null;
  is_phone_verified: boolean;
  is_google_connected: boolean;
}

export const ConnectivitySettings = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [newPhone, setNewPhone] = useState("");
  const [otpMode, setOtpMode] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [updating, setUpdating] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await apiCaller<UserProfile>(API_ROUTES.AUTH.PROFILE_ME, "GET");
      setProfile(res.data);
      if (res.data.phone_number) setNewPhone(res.data.phone_number);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdatePhone = async () => {
    if (!newPhone) return;
    setUpdating(true);
    try {
      await apiCaller(API_ROUTES.AUTH.PHONE_UPDATE, "POST", { phone_number: newPhone });
      toast.success("Verification code sent!", {
        description: "Please check your WhatsApp for the 6-digit code."
      });
      setOtpMode(true);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } } };
      toast.error("Failed to update phone number", {
        description: err.response?.data?.error || "Please check the number format."
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otpCode) return;
    setUpdating(true);
    try {
      await apiCaller(API_ROUTES.AUTH.PHONE_VERIFY, "POST", { code: otpCode });
      toast.success("Phone verified successfully!");
      setOtpMode(false);
      fetchProfile();
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } } };
      toast.error("Invalid verification code", {
        description: err.response?.data?.error || "Please try again."
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleResendCode = async () => {
    try {
      await apiCaller(API_ROUTES.AUTH.PHONE_RESEND, "POST");
      toast.success("Code resent successfully!");
    } catch {
      toast.error("Failed to resend code");
    }
  };

  const handleDisconnectGoogle = async () => {
    try {
      await apiCaller(API_ROUTES.GOOGLE_CALENDAR.DISCONNECT, "POST");
      toast.success("Google Calendar disconnected.");
      fetchProfile();
    } catch {
      toast.error("Failed to disconnect calendar");
    }
  };

  const handleIdelGoogleConnect = async () => {
    try {
        const res = await apiCaller<{ url: string }>(API_ROUTES.GOOGLE_CALENDAR.CONNECT, "GET");
        window.location.href = res.data.url;
    } catch {
        toast.error("Failed to initiate connection");
    }
  }

  if (loading) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* WhatsApp Section */}
      <Card className="border-border/40 bg-card/60 backdrop-blur-sm shadow-xl shadow-black/2 rounded-4xl overflow-hidden">
        <CardHeader className="p-8 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                <WhatsAppIcon className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold">WhatsApp Business</CardTitle>
                <CardDescription>
                  Your primary communication channel for AI-powered bookings.
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
               {profile?.is_phone_verified ? (
                 <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 uppercase text-[10px] font-black">
                   <CheckCircle2 className="w-3 h-3 mr-1" />
                   Verified
                 </Badge>
               ) : (
                 <Badge variant="destructive" className="bg-red-500/10 text-red-600 border-red-500/20 uppercase text-[10px] font-black">
                   <AlertCircle className="w-3 h-3 mr-1" />
                   Pending Verification
                 </Badge>
               )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8 pt-6 space-y-6">
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">
                  WhatsApp Number
                </Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="+1234567890"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    disabled={otpMode}
                    className="h-12 rounded-xl border-border/50 bg-muted/20 focus:bg-background transition-all font-medium"
                  />
                  {!otpMode && (
                    <ConfirmPopover
                      title={profile?.phone_number ? "Update Phone Number?" : "Connect WhatsApp?"}
                      description={
                        profile?.phone_number
                          ? "You'll receive a verification code on your new WhatsApp number."
                          : "You'll receive a verification code to confirm your WhatsApp number."
                      }
                      confirmText={profile?.phone_number ? "Update" : "Connect"}
                      onConfirm={handleUpdatePhone}
                      disabled={updating || (newPhone === profile?.phone_number && profile?.is_phone_verified)}
                    >
                      <Button 
                        disabled={updating || (newPhone === profile?.phone_number && profile?.is_phone_verified)}
                        className="h-12 px-6 rounded-xl font-bold"
                      >
                        {updating ? <RefreshCw className="w-4 h-4 animate-spin" /> : (profile?.phone_number ? "Update" : "Connect")}
                      </Button>
                    </ConfirmPopover>
                  )}
                </div>
              </div>

              {otpMode && (
                <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-4 pt-2"
                >
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">
                      Verification Code
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="6-digit code"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        className="h-12 rounded-xl border-border/50 bg-muted/20 focus:bg-background transition-all font-medium text-center tracking-[0.5em] text-lg"
                        maxLength={6}
                      />
                      <Button onClick={handleVerifyOtp} disabled={updating} className="h-12 px-6 rounded-xl font-bold">
                         {updating ? <RefreshCw className="w-4 h-4 animate-spin" /> : "Verify"}
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs font-medium">
                    <button onClick={handleResendCode} className="text-primary hover:underline">Resend code</button>
                    <button onClick={() => setOtpMode(false)} className="text-muted-foreground hover:underline">Change number</button>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="bg-muted/10 rounded-2xl p-6 border border-border/30 space-y-3">
               <h4 className="text-sm font-bold flex items-center gap-2">
                 <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                 Channel Availability
               </h4>
               <p className="text-xs text-muted-foreground leading-relaxed">
                 Webot uses the WhatsApp Cloud API to handle high-frequency interactions. Once verified, your bot can start managing multiple customer threads simultaneously.
               </p>
               <ul className="text-[11px] space-y-2 font-medium">
                  <li className="flex items-center gap-2 text-emerald-600">
                    <div className="w-1 h-1 rounded-full bg-emerald-500" />
                    Automated meeting booking
                  </li>
                  <li className="flex items-center gap-2 text-emerald-600">
                    <div className="w-1 h-1 rounded-full bg-emerald-500" />
                    Real-time schedule querying
                  </li>
               </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Google Section */}
      <Card className="border-border/40 bg-card/60 backdrop-blur-sm shadow-xl shadow-black/2 rounded-4xl overflow-hidden">
        <CardHeader className="p-8 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold">Google Calendar</CardTitle>
                <CardDescription>
                  Sync your bookings directly to your Google ecosystem.
                </CardDescription>
              </div>
            </div>
            {profile?.is_google_connected ? (
               <Badge className="bg-primary/10 text-primary border-primary/20 uppercase text-[10px] font-black">
                 Connected
               </Badge>
            ) : (
               <Badge variant="outline" className="opacity-50 uppercase text-[10px] font-black">
                 Disconnected
               </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-8 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 max-w-sm">
               <h4 className="font-bold">Sync Management</h4>
               <p className="text-xs text-muted-foreground leading-relaxed">
                 Connecting Google Calendar allows our AI agents to check your availability in real-time and create Google Meet links automatically for your guests.
               </p>
            </div>
            
            <div className="w-full md:w-auto">
              {profile?.is_google_connected ? (
                <ConfirmPopover
                  title="Disconnect Google Calendar?"
                  description="Webot will no longer be able to schedule meetings or create Google Meet links. You can reconnect anytime."
                  confirmText="Disconnect"
                  variant="destructive"
                  onConfirm={handleDisconnectGoogle}
                >
                  <Button 
                    variant="outline" 
                    className="h-12 px-8 rounded-xl font-bold border-red-500/20 text-red-500 hover:bg-red-500/5 gap-2 w-full md:w-auto"
                  >
                    <Unlink className="w-4 h-4" />
                    Disconnect Calendar
                  </Button>
                </ConfirmPopover>
              ) : (
                <Button 
                    onClick={handleIdelGoogleConnect}
                    className="h-12 px-8 rounded-xl font-bold gap-2 w-full md:w-auto bg-primary shadow-lg shadow-primary/20"
                >
                  <Link2 className="w-4 h-4" />
                  Connect Google Calendar
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Badge = ({ children, variant = "default", className }: { children: React.ReactNode, variant?: string, className?: string }) => (
    <div className={cn(
        "px-2 py-0.5 rounded-full border flex items-center",
        variant === "destructive" ? "bg-red-500/10 text-red-500 border-red-500/20" : 
        variant === "outline" ? "border-muted-foreground/20 text-muted-foreground" : 
        "bg-primary/10 text-primary border-primary/20",
        className
    )}>
        {children}
    </div>
)
