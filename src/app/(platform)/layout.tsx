"use client";

import Sidebar from "@/components/platform/common/sidebar";
import { ProfileProvider } from "@/contexts/profile-context";

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProfileProvider>
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 overflow-y-auto relative">{children}</main>
      </div>
    </ProfileProvider>
  );
}
