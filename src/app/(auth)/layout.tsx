"use client";

import { ReactNode } from "react";
import PromotionalContent from "@/components/auth/promotional-content";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2 overflow-x-hidden">
      {/* Left side - Auth Form */}
      <div className="flex flex-col bg-background">
        <div className="flex flex-1 items-center justify-center">
          {children}
        </div>
      </div>

      <PromotionalContent />
    </div>
  );
};

export default AuthLayout;
