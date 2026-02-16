"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { ROUTES } from "@/constants/routes";
import apiCaller from "@/lib/api/api-caller";
import { API_ROUTES } from "@/constants/api-routes";
import { setAuthCookies } from "@/lib/cookies";
import { AxiosError } from "axios";
import { GoogleLogin } from "@react-oauth/google";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await apiCaller<{
        session: { access_token: string; refresh_token: string } | null;
        user: { id: string; email: string };
        message: string;
      }>(API_ROUTES.AUTH.SIGNUP, "POST", {
        email,
        password,
        first_name: name,
      });

      const { session, message } = response.data;

      if (session) {
        setAuthCookies(session.access_token, session.refresh_token);
        toast.success("Account created!", {
          description: "Welcome to Webot.",
        });
        router.push(ROUTES.ONBOARDING.ROOT);
      } else {
        // Verification required
        setIsSubmitted(true);
        toast.info("Verification required", {
          description: message,
        });
      }
    } catch (error: unknown) {
      console.error("Signup failed:", error);
      const err = error as { response?: { data?: { error?: string; detail?: string } } };
      const message =
        err.response?.data?.error ||
        err.response?.data?.detail ||
        "Failed to create account. Email might be already in use.";
      toast.error("Signup failed", {
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

      toast.success("Welcome!", {
        description: `Successfully signed up via Google`,
      });

      if (!user.phone_number) {
        router.push(ROUTES.ONBOARDING.ROOT);
      } else {
        router.push(ROUTES.PLATFORM.DASHBOARD);
      }
    } catch (error: unknown) {
      console.error("Google auth failed:", error);
      const axiosError = error as AxiosError<{ error?: string }>;
      const message = axiosError.response?.data?.error || "An error occurred during Google authentication.";
      toast.error("Google auth failed", {
        description: message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        className="flex flex-1 items-center justify-center p-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}>
        <Card className="border-border/70 bg-card/20 w-full max-w-md shadow-[0_10px_26px_#e0e0e0a1] backdrop-blur-lg dark:shadow-none overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-primary animate-pulse" />
          <CardContent className="space-y-6 p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12, delay: 0.2 }}
              className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Mail className="w-10 h-10 text-primary" />
            </motion.div>
            
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Check your email</h2>
              <p className="text-muted-foreground leading-relaxed">
                We&apos;ve sent a verification link to <span className="text-foreground font-semibold">{email}</span>. 
                Please click the link to verify your account.
              </p>
            </div>

            <div className="space-y-4 pt-4">
              <Button 
                variant="outline" 
                className="w-full h-12 font-bold rounded-xl"
                asChild
              >
                <Link href={ROUTES.AUTH.LOGIN}>
                  Back to Login
                </Link>
              </Button>
              <p className="text-xs text-muted-foreground italic">
                Didn&apos;t receive the email? Check your spam folder.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

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
                  Sign Up
                </span>
              </div>
              <p className="text-muted-foreground text-sm">
                Create an account to discover Purgions and find ways to make
                money.
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Input */}
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}>
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-11 h-11 bg-muted/50 border-muted-foreground/10 focus:bg-background transition-all"
                    required
                  />
                </div>
              </motion.div>

              {/* Email Input */}
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}>
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
                transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
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

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  className="w-full font-bold"
                  disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Sign up"}
                </Button>
              </motion.div>
            </form>

            {/* Divider */}
            <motion.div
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9, ease: "easeOut" }}>
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
              transition={{ duration: 0.5, delay: 1.0, ease: "easeOut" }}>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => {
                  toast.error("Google Sign-up failed");
                }}
                // useOneTap
                theme="filled_blue"
                shape="pill"
                width="100%"
                text="signup_with"
              />
            </motion.div>

            <motion.p
              className="text-center text-sm text-muted-foreground pt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.1, ease: "easeOut" }}>
              Already have an account?{" "}
              <Link
                href={ROUTES.AUTH.LOGIN}
                className="text-primary font-bold hover:underline transition-all">
                Sign in
              </Link>
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
