import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Webot",
  description: "Webot is a platform that helps you schedule your meetings",
};

import AuthCallbackHandler from "@/components/auth/auth-callback-handler";
import { RootProvider } from "@/components/providers/root-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} antialiased`}
        suppressHydrationWarning>
        <RootProvider>
          <AuthCallbackHandler />
          <Toaster richColors />
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
