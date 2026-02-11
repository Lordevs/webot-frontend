"use client";

import { motion, Variants } from "framer-motion";
import {
  Calendar,
  CalendarCheck,
  TrendingUp,
  Users,
  Sparkles,
  Zap,
  Loader2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ROUTES } from "@/constants/routes";
import { WhatsAppIcon } from "@/components/common/icons";
import { useState, useEffect } from "react";
import apiCaller from "@/lib/api/api-caller";
import { API_ROUTES } from "@/constants/api-routes";

// Sub-components
import { StatCard } from "./stats-cards";
import { IntegrationCard } from "./integration-status";
import { NextAppointmentCard } from "./next-appointment";
import { SchedulePreview } from "./schedule-preview";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

interface UserProfile {
  id: string;
  email: string;
  phone_number: string | null;
  is_phone_verified: boolean;
  is_google_connected: boolean;
  meeting_stats: {
    today: number;
    this_week: number;
    total: number;
  };
}

interface BackendMeeting {
  id: number;
  summary: string;
  start_time: string;
  end_time: string;
  meet_link?: string;
  status: "pending" | "confirmed" | "cancelled" | "failed";
}

const DashboardOverview = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [meetings, setMeetings] = useState<BackendMeeting[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const status = searchParams.get("status");
    const provider = searchParams.get("provider");
    if (status === "success" && provider === "google") {
      toast.success("Calendar Connected!", {
        description: "Your Google Calendar is now synced with Webot.",
      });
    }

    const fetchData = async () => {
      try {
        const [profileRes, meetingsRes] = await Promise.all([
          apiCaller<UserProfile>(API_ROUTES.AUTH.PROFILE_ME, "GET"),
          apiCaller<BackendMeeting[]>(API_ROUTES.MEETINGS.LIST, "GET"),
        ]);
        setProfile(profileRes.data);
        setMeetings(meetingsRes.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchParams]);

  const nextApt =
    meetings.find(
      (m) => m.status === "confirmed" && new Date(m.start_time) > new Date(),
    ) || null;

  const nextAppointmentData = nextApt
    ? {
        title: nextApt.summary,
        customer: "Guest",
        time: new Date(nextApt.start_time).toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
        date:
          new Date(nextApt.start_time).toDateString() === new Date().toDateString()
            ? "Today"
            : new Date(nextApt.start_time).toLocaleDateString([], {
                month: "short",
                day: "numeric",
              }),
        duration: `${Math.round(
          (new Date(nextApt.end_time).getTime() -
            new Date(nextApt.start_time).getTime()) /
            60000,
        )} min`,
        meetLink: nextApt.meet_link,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${nextApt.id}`,
      }
    : null;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-muted-foreground font-medium animate-pulse">
          Loading your personalized workspace...
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-screen-2xl mx-auto space-y-10 p-4 lg:p-8 relative">
      {/* Background Ornament */}
      <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        <motion.div variants={itemVariants} className="space-y-2">
          <Badge
            variant="outline"
            className="bg-primary/5 border-primary/20 text-primary font-bold uppercase tracking-[0.2em] text-[10px] px-4 py-1 rounded-full">
            Platform Alpha
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Welcome back,{" "}
            <span className="relative inline-block text-primary italic">
              {profile?.email?.split("@")[0] || "there"}
              <span className="absolute bottom-1 left-0 w-full h-3 bg-primary/10 -z-10" />
            </span>{" "}
            👋
          </h1>
          <p className="text-muted-foreground text-lg max-w-lg font-medium">
            Your AI agent is active and monitoring your schedule.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex items-center gap-3">
          <Button
            variant="outline"
            className="h-11 px-5 rounded-xl font-bold bg-background border-border shadow-sm transition-all hover:bg-muted"
            asChild>
            <Link href={ROUTES.PLATFORM.APPOINTMENTS}>
              <Calendar className="w-4 h-4 mr-2" />
              All Appointments
            </Link>
          </Button>
          <Button
            variant="default"
            className="h-11 px-5 rounded-xl font-bold gap-2"
            asChild>
            <Link href={ROUTES.PLATFORM.SETTINGS}>
              <Zap className="w-4 h-4 shadow-sm" />
              Manage Settings
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* Integration Status Layer */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <IntegrationCard
          title="WhatsApp Status"
          statusText={
            profile?.is_phone_verified ? "Verified" : "Action Required"
          }
          statusColor={profile?.is_phone_verified ? "emerald" : "amber"}
          icon={WhatsAppIcon}
          href={ROUTES.PLATFORM.SETTINGS}
          variants={itemVariants}
        />
        <IntegrationCard
          title="Google Calendar"
          statusText={
            profile?.is_google_connected ? "Connected" : "Not Synced"
          }
          statusColor={profile?.is_google_connected ? "emerald" : "amber"}
          icon={Calendar}
          href={ROUTES.PLATFORM.SETTINGS}
          variants={itemVariants}
        />
      </motion.div>

      {/* High-Impact Stat Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          label="Today's Bookings"
          value={profile?.meeting_stats?.today || 0}
          icon={CalendarCheck}
          color="text-primary"
          bg="bg-primary/5"
          variants={itemVariants}
        />
        <StatCard
          label="Meetings This Week"
          value={profile?.meeting_stats?.this_week || 0}
          icon={TrendingUp}
          color="text-amber-500"
          bg="bg-amber-500/5"
          variants={itemVariants}
        />
        <StatCard
          label="Total Managed"
          value={profile?.meeting_stats?.total || 0}
          icon={Users}
          color="text-indigo-500"
          bg="bg-indigo-500/5"
          variants={itemVariants}
        />
      </div>

      {/* Strategic Content Layout */}
      <div className="grid lg:grid-cols-3 gap-6">
        <SchedulePreview meetings={meetings} variants={itemVariants} />
        {nextAppointmentData ? (
          <NextAppointmentCard
            appointment={nextAppointmentData}
            variants={itemVariants}
          />
        ) : (
          <motion.div variants={itemVariants}>
            <Card className="h-full border-dashed border-2 bg-muted/20 flex flex-col items-center justify-center p-10 text-center rounded-[2.5rem]">
               <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                 <Sparkles className="w-8 h-8 text-muted-foreground/30" />
               </div>
               <h3 className="text-lg font-bold mb-1">Stay Tuned</h3>
               <p className="text-sm text-muted-foreground">No upcoming appointments confirmed yet.</p>
            </Card>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default DashboardOverview;
