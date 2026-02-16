"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Card, CardContent } from "../ui/card";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import apiCaller from "@/lib/api/api-caller";
import { API_ROUTES } from "@/constants/api-routes";
import { setAuthCookies } from "@/lib/cookies";
import { AxiosError } from "axios";
import { GoogleLogin } from "@react-oauth/google";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await apiCaller<{
        session: { access_token: string; refresh_token: string };
        user: { id: string; email: string; phone_number: string | null };
      }>(API_ROUTES.AUTH.LOGIN, "POST", {
        email,
        password,
      });

      const { session, user } = response.data;
      setAuthCookies(session.access_token, session.refresh_token);

      toast.success("Welcome back!", {
        description: `Successfully logged in as ${user.email}`,
      });

      // Check if user has a phone number, if not, they might need onboarding
      if (!user.phone_number) {
        router.push(ROUTES.ONBOARDING.ROOT);
      } else {
        router.push(ROUTES.PLATFORM.DASHBOARD);
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ error?: string; detail?: string }>;
      console.error("Login failed:", axiosError);
      const message =
        axiosError.response?.data?.error ||
        axiosError.response?.data?.detail ||
        "Invalid email or password";
      toast.error("Login failed", {
        description: message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: { credential?: string }) => {
    setIsLoading(true);
    try {
      const response = await apiCaller<{
        session: { access_token: string; refresh_token: string };
        user: { id: string; email: string; phone_number: string | null };
      }>(API_ROUTES.AUTH.GOOGLE_AUTH_INIT, "POST", {
        id_token: credentialResponse.credential,
      });

      const { session, user } = response.data;
      setAuthCookies(session.access_token, session.refresh_token);

      toast.success("Welcome back!", {
        description: `Successfully logged in via Google`,
      });

      if (!user.phone_number) {
        router.push(ROUTES.ONBOARDING.ROOT);
      } else {
        router.push(ROUTES.PLATFORM.DASHBOARD);
      }
    } catch (error: unknown) {
      console.error("Google login failed:", error);
      const axiosError = error as AxiosError<{ error?: string }>;
      const message = axiosError.response?.data?.error || "An error occurred during Google authentication.";
      toast.error("Google login failed", {
        description: message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="flex flex-1 items-center justify-center"
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
                  Login
                </span>
              </div>
              <p className="text-muted-foreground text-sm">
                Create an account or log in to discover Purgions and find ways
                to make money.
              </p>
            </motion.div>
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

              {/* Password Input */}
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-11 pr-11 h-11 bg-muted/50 border-muted-foreground/10 focus:bg-background transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </motion.div>
              {/* Forgot Password */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}>
                <Link
                   href={ROUTES.AUTH.FORGOT_PASSWORD}
                  className="flex justify-end text-xs text-primary hover:underline font-medium">
                  Forgot password?
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </motion.div>
            </form>
            {/* Divider */}
            <motion.div
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}>
              <div className="absolute inset-0 flex items-center">
                <div className="border-border w-full border-t"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-card text-muted-foreground px-2">OR</span>
              </div>
            </motion.div>
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9, ease: "easeOut" }}>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => {
                  toast.error("Google Login failed");
                }}
                // useOneTap
                theme="filled_blue"
                shape="pill"
                width="100%"
              />
            </motion.div>
            {/* Footer Links */}
            <motion.p
              className="text-center text-sm text-muted-foreground pt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.0, ease: "easeOut" }}>
              Don&apos;t have an account?{" "}
              <Link
                href={ROUTES.AUTH.SIGNUP}
                className="text-primary font-bold hover:underline transition-all">
                Sign up
              </Link>
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
