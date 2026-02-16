"use client";

import { useProfile } from "@/hooks/use-profile";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface UserProfileCardProps {
  className?: string;
  avatarSize?: number;
}

export function UserProfileCard({ className, avatarSize = 40 }: UserProfileCardProps) {
  const { data: profile, isLoading } = useProfile();

  if (isLoading) {
    return (
      <div className={cn("flex items-center gap-3 p-3 rounded-2xl bg-muted/30 border border-border/50", className)}>
        <Skeleton className={cn("rounded-full")} style={{ width: avatarSize, height: avatarSize }} />
        <div className="flex flex-col gap-1.5 flex-1 min-w-0">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-2 w-16" />
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-3 p-3 rounded-2xl bg-muted/30 border border-border/50 min-w-0", className)}>
      <div 
        className="rounded-full bg-linear-to-tr from-primary to-emerald-500 p-0.5 shadow-md shrink-0"
        style={{ width: avatarSize, height: avatarSize }}
      >
        <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden border-2 border-background">
          <Image
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile?.email || "guest"}`}
            alt="Avatar"
            width={avatarSize}
            height={avatarSize}
            unoptimized
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-xs font-black text-foreground truncate">
          {profile?.email?.split("@")[0] || "User"}
        </span>
        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider truncate">
          {profile?.email || "Guest User"}
        </span>
      </div>
    </div>
  );
}
