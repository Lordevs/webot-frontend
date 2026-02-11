"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { setAuthCookies } from "@/lib/cookies";
import { ROUTES } from "@/constants/routes";
import { toast } from "sonner";

/**
 * Handles Supabase hash fragments (e.g., #access_token=...)
 * Extra tokens from the URL, stores them in cookies, and redirects.
 */
export default function AuthCallbackHandler() {
  const router = useRouter();

  useEffect(() => {
    // Hash fragments are only accessible on the client
    const hash = window.location.hash;
    if (!hash) return;

    // Supabase sends tokens like #access_token=...&refresh_token=...
    const params = new URLSearchParams(hash.substring(1));
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");
    const type = params.get("type");

    if (accessToken && refreshToken) {
      console.log("Auth tokens found in hash, setting cookies...");
      
      // Store tokens in cookies for the middleware and API client to use
      setAuthCookies(accessToken, refreshToken);

      // Clear the hash from the URL to keep it clean
      window.history.replaceState(null, "", window.location.pathname);

      if (type === "signup") {
        toast.success("Email verified!", {
          description: "Welcome to Webot. Let's finish your setup.",
        });
        router.push(ROUTES.ONBOARDING.ROOT);
      } else if (type === "recovery") {
        toast.success("Session restored", {
          description: "Please update your password now.",
        });
        router.push(ROUTES.AUTH.RESET_PASSWORD);
      } else {
        router.push(ROUTES.PLATFORM.DASHBOARD);
      }
    }
  }, [router]);

  return null; // This component doesn't render anything
}
