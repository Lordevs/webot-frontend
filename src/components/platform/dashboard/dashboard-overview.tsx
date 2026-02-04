"use client";

import { motion, Variants } from "framer-motion";
import {
  Calendar,
  ArrowRight,
  CalendarCheck,
  TrendingUp,
  Users,
  Sparkles,
  MessageCircle,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ROUTES } from "@/constants/routes";
import { WhatsAppIcon } from "@/components/common/icons";

// Sub-components
import { StatCard } from "./stats-cards";
import { IntegrationCard } from "./integration-status";
import { NextAppointmentCard } from "./next-appointment";
import { OperationalTimeline } from "./operational-timeline";
import { QuickActions } from "./quick-actions";

const DashboardOverview = () => {
  // Mock data - replace with real data
  const stats = {
    todayAppointments: 4,
    weekAppointments: 12,
    totalCustomers: 48,
    conversionRate: 87,
  };

  const nextAppointmentData = {
    title: "Executive Strategy Sync",
    customer: "Sarah Johnson",
    time: "2:00 PM",
    date: "Today",
    duration: "45 min",
    meetLink: "https://meet.google.com/abc-defg-hij",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  };

  const recentAppointments = [
    {
      id: 1,
      customer: "Mike Wilson",
      time: "10:00 AM",
      status: "completed",
      type: "Demo",
    },
    {
      id: 2,
      customer: "Emma Davis",
      time: "11:30 AM",
      status: "completed",
      type: "Follow up",
    },
    {
      id: 3,
      customer: "Sarah Johnson",
      time: "2:00 PM",
      status: "upcoming",
      type: "Consultation",
    },
    {
      id: 4,
      customer: "John Smith",
      time: "4:00 PM",
      status: "upcoming",
      type: "Onboarding",
    },
  ];

  const quickActionsData = [
    {
      title: "Test Bot",
      desc: "See how your bot chats",
      icon: MessageCircle,
      color: "text-[#25D366]",
      bg: "bg-emerald-500/5",
      href: ROUTES.PLATFORM.WHATSAPP_SETUP,
    },
    {
      title: "Automations",
      desc: "Manage your workflows",
      icon: Zap,
      color: "text-amber-500",
      bg: "bg-amber-500/5",
      href: ROUTES.PLATFORM.AUTOMATIONS,
    },
    {
      title: "Calendar",
      desc: "Set your work hours",
      icon: Calendar,
      color: "text-primary",
      bg: "bg-primary/5",
      href: ROUTES.PLATFORM.CALENDAR_SETTINGS,
    },
  ];

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
        ease: [0.22, 1, 0.36, 1], // Beizer curve [number, number, number, number]
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-7xl mx-auto space-y-10 p-6 lg:p-10 relative">
      {/* Background Ornament */}
      <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 -z-10 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

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
            <span className="relative inline-block">
              Felix
              <span className="absolute bottom-1 left-0 w-full h-3 bg-primary/10 -z-10" />
            </span>{" "}
            👋
          </h1>
          <p className="text-muted-foreground text-lg max-w-lg">
            Your AI assistant is currently helping{" "}
            <span className="text-foreground font-bold underline decoration-primary/30 underline-offset-8 decoration-4">
              14 customers
            </span>{" "}
            today with a 98% satisfaction rate.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex items-center gap-3">
          <Button
            variant="outline"
            className="h-11 px-5 rounded-xl font-semibold bg-background border-border/50 shadow-sm transition-all hover:bg-muted"
            asChild>
            <Link href={ROUTES.PLATFORM.APPOINTMENTS}>
              <Calendar className="w-4 h-4 mr-2" />
              All Appointments
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="h-11 px-5 rounded-xl font-semibold text-emerald-600 hover:bg-emerald-50 gap-2"
            asChild>
            <Link href={ROUTES.PLATFORM.WHATSAPP_SETUP}>
              <WhatsAppIcon className="w-4 h-4" />
              WhatsApp Setup
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
          statusText="Connected"
          statusColor="emerald"
          icon={WhatsAppIcon}
          href={ROUTES.PLATFORM.WHATSAPP_SETUP}
          variants={itemVariants}
        />
        <IntegrationCard
          title="Google Calendar"
          statusText="Synced"
          statusColor="primary"
          icon={Calendar}
          href={ROUTES.PLATFORM.CALENDAR_SETTINGS}
          variants={itemVariants}
        />
      </motion.div>

      {/* High-Impact Stat Matrix */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Today's Bookings"
          value={stats.todayAppointments}
          icon={CalendarCheck}
          color="text-primary"
          bg="bg-primary/5"
          variants={itemVariants}
        />
        <StatCard
          label="Total This Week"
          value="12"
          icon={TrendingUp}
          color="text-amber-500"
          bg="bg-amber-500/5"
          variants={itemVariants}
        />
        <StatCard
          label="My Customers"
          value={stats.totalCustomers}
          icon={Users}
          color="text-indigo-500"
          bg="bg-indigo-500/5"
          variants={itemVariants}
        />
        <StatCard
          label="Closing Rate"
          value={stats.conversionRate}
          icon={Sparkles}
          color="text-emerald-500"
          bg="bg-emerald-500/5"
          suffix="%"
          variants={itemVariants}
        />
      </div>

      {/* Strategic Content Layout */}
      <div className="grid lg:grid-cols-3 gap-8">
        <NextAppointmentCard
          appointment={nextAppointmentData}
          variants={itemVariants}
        />
        <OperationalTimeline
          appointments={recentAppointments}
          variants={itemVariants}
        />
      </div>

      {/* Quick Execution Layer */}
      <QuickActions actions={quickActionsData} variants={itemVariants} />
    </motion.div>
  );
};

export default DashboardOverview;
