"use client";

import { LogOut, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { API_ROUTES } from "@/constants/api-routes";
import apiCaller from "@/lib/api/api-caller";
import { clearAuthCookies } from "@/lib/cookies";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface LogoutButtonProps {
  className?: string;
}

export function LogoutButton({ className }: LogoutButtonProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await apiCaller(API_ROUTES.AUTH.LOGOUT, "POST");
    } catch (error) {
      console.error("Logout API failed:", error);
    } finally {
      clearAuthCookies();
      queryClient.clear(); // Clear all queries on logout
      router.push(ROUTES.AUTH.LOGIN);
    }
  };

  return (
    <Button
      variant="ghost"
      onClick={handleLogout}
      disabled={isLoggingOut}
      className={cn(
        "w-full flex items-center justify-start gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 h-auto",
        "text-destructive hover:bg-destructive/10 hover:text-destructive",
        className
      )}
    >
      {isLoggingOut ? (
        <RefreshCw className="w-4 h-4 shrink-0 animate-spin" />
      ) : (
        <LogOut className="w-4 h-4 shrink-0" />
      )}
      <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
    </Button>
  );
}
