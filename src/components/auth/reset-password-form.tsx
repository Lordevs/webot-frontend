"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";
import { toast } from "sonner";
import { useEffect } from "react";
import apiCaller from "@/lib/api/api-caller";
import { API_ROUTES } from "@/constants/api-routes";
import { AxiosError } from "axios";
import { getAuthTokens } from "@/lib/cookies";
import {
  Lock as LockIcon,
  Eye as EyeIcon,
  EyeOff as EyeOffIcon,
  ArrowLeft as ArrowLeftIcon,
} from "lucide-react";

export default function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [tokenType, setTokenType] = useState<
    "access_token" | "token_hash" | "code"
  >("access_token");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Supabase recovery links deliver tokens in several ways depending on flow:
    // 1. Implicit:   #access_token=XXX&type=recovery
    // 2. PKCE:       ?code=XXX
    // 3. Email Link: ?token_hash=XXX&type=recovery
    //
    // Sometimes Supabase redirects with an error fragment if verification fails.

    const searchParams = new URLSearchParams(window.location.search);
    const hash = window.location.hash.startsWith("#")
      ? window.location.hash.substring(1)
      : window.location.hash;
    const hashParams = new URLSearchParams(hash);

    // 1. Check for explicit errors from Supabase
    const errorMsg =
      searchParams.get("error_description") ||
      hashParams.get("error_description") ||
      searchParams.get("error") ||
      hashParams.get("error");

    if (errorMsg) {
      setError(decodeURIComponent(errorMsg.replace(/\+/g, " ")));
      return;
    }

    // 2. Try to find a valid token
    const accessToken =
      hashParams.get("access_token") || searchParams.get("access_token");
    const tokenHash =
      searchParams.get("token_hash") ||
      hashParams.get("token_hash") ||
      searchParams.get("token"); // Some older configs use 'token'
    const code = searchParams.get("code") || hashParams.get("code");
    const type = searchParams.get("type") || hashParams.get("type");

    // Log parameters for debugging if needed (visible in browser console)
    console.log("Reset Password Params:", {
      hasAccessToken: !!accessToken,
      hasTokenHash: !!tokenHash,
      hasCode: !!code,
      type,
    });

    if (accessToken) {
      setToken(accessToken);
      setTokenType("access_token");
      return;
    }

    if (tokenHash) {
      setToken(tokenHash);
      setTokenType("token_hash");
      // Note: We used to strictly check type === 'recovery', but some custom
      // redirect flows might omit it. If we have a hash, it's likely intended for this page.
      return;
    }

    if (code) {
      setToken(code);
      setTokenType("code");
      return;
    }

    // 3. Fallback: Check for existing session in cookies (set by AuthCallbackHandler)
    const { accessToken: cookieToken } = getAuthTokens();
    if (cookieToken) {
      console.log("Reset Password: Found session in cookies.");
      setToken(cookieToken);
      setTokenType("access_token");
      return;
    }

    setError("Invalid or expired reset link. Please request a new one.");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast.error("Session expired", {
        description: "Please request a new reset link.",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      if (tokenType === "token_hash" || tokenType === "code") {
        // PKCE or Email token: send in body — backend exchanges via verifyOtp or exchangeCode
        await apiCaller(API_ROUTES.AUTH.RESET_PASSWORD, "POST", {
          password,
          [tokenType === "token_hash" ? "token_hash" : "code"]: token,
        });
      } else {
        // Implicit flow: send access_token as Authorization header
        await apiCaller(
          API_ROUTES.AUTH.RESET_PASSWORD,
          "POST",
          { password },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      }

      toast.success("Password reset successful!", {
        description: "You can now log in with your new password.",
      });
      router.push(ROUTES.AUTH.LOGIN);
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{
        error?: string;
        detail?: string;
      }>;
      const message =
        axiosError.response?.data?.error ||
        axiosError.response?.data?.detail ||
        "Failed to reset password";
      toast.error("Error", { description: message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="flex flex-1 items-center justify-center"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      >
        <Card className="border-border/70 bg-card/20 w-full max-w-md shadow-[0_10px_26px_#e0e0e0a1] backdrop-blur-lg dark:shadow-none">
          <CardContent className="space-y-4 p-6">
            {error ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 flex flex-col items-center text-center space-y-4"
              >
                <div className="p-4 rounded-2xl bg-destructive/10 text-destructive mb-2">
                  <LockIcon className="w-8 h-8 opacity-50" />
                </div>
                <h3 className="text-xl font-bold text-destructive">
                  Invalid Link
                </h3>
                <p className="text-muted-foreground text-sm max-w-[280px]">
                  {error}
                </p>
                <Button variant="outline" asChild className="mt-4 rounded-xl">
                  <Link href={ROUTES.AUTH.FORGOT_PASSWORD}>
                    Request New Link
                  </Link>
                </Button>
              </motion.div>
            ) : (
              <>
                <motion.div
                  className="space-y-2 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-2xl font-bold tracking-tight md:text-4xl">
                      Set New Password
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Enter your new password below to secure your account.
                  </p>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Password Input */}
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
                  >
                    <Label htmlFor="password">New Password</Label>
                    <div className="relative">
                      <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-11 pr-11 h-11 bg-muted/50 border-muted-foreground/10 focus:bg-background transition-all"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? (
                          <EyeOffIcon className="h-4 w-4" />
                        ) : (
                          <EyeIcon className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </motion.div>

                  {/* Confirm Password Input */}
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
                  >
                    <Label htmlFor="confirmPassword">
                      Confirm New Password
                    </Label>
                    <div className="relative">
                      <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="pl-11 pr-11 h-11 bg-muted/50 border-muted-foreground/10 focus:bg-background transition-all"
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOffIcon className="h-4 w-4" />
                        ) : (
                          <EyeIcon className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      className="w-full font-bold"
                      disabled={isLoading}
                    >
                      {isLoading ? "Resetting..." : "Reset Password"}
                    </Button>
                  </motion.div>
                </form>
              </>
            )}

            <motion.div
              className="pt-2 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
            >
              <Link
                href={ROUTES.AUTH.FORGOT_PASSWORD}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-all"
              >
                <ArrowLeftIcon className="h-4 w-4" />
                Back to Forgot Password
              </Link>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
