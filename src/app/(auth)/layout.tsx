"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import PromotionalContent from "@/components/auth/promotional-content";
import { GoogleOAuthProvider } from "@react-oauth/google";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <GoogleOAuthProvider
      clientId={
        process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""
      }>
      <div className="grid min-h-screen grid-cols-1 md:grid-cols-2 overflow-x-hidden">
        {/* Left side - Auth Form */}
        <div className="flex flex-col">
          <div className="flex items-center p-6 lg:p-8">
            <Link href={ROUTES.APP.HOME} className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-primary-foreground font-bold italic">
                  W
                </span>
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground/90">
                Webot
              </span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-center">{children}</div>
        </div>

        <PromotionalContent />
      </div>
    </GoogleOAuthProvider>
  );
};

export default AuthLayout;
