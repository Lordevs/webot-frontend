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
      title: "Bot Sandbox",
      desc: "Simulate chat flows",
      icon: MessageCircle,
      color: "text-[#25D366]",
      bg: "bg-emerald-500/5",
      href: ROUTES.PLATFORM.WHATSAPP_SETUP,
    },
    {
      title: "Rules Engine",
      desc: "Matrix coordination",
      icon: Zap,
      color: "text-amber-500",
      bg: "bg-amber-500/5",
      href: ROUTES.PLATFORM.AUTOMATIONS,
    },
    {
      title: "Temporal Sync",
      desc: "Availability window",
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
      className="max-w-7xl mx-auto space-y-8 p-4 lg:p-8">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <motion.div variants={itemVariants} className="space-y-1">
          <Badge
            variant="outline"
            className="mb-2 bg-primary/5 border-primary/10 text-primary font-bold uppercase tracking-widest text-[10px] px-3 py-1">
            Enterprise Command Center
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-foreground">
            Welcome back, <span className="text-primary">Felix!</span> 👋
          </h1>
          <p className="text-muted-foreground text-lg font-medium">
            Your conversational engine is optimized and handling{" "}
            <span className="text-foreground font-bold italic">
              14 active inquiries.
            </span>
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            className="h-12 px-6 rounded-xl font-bold bg-background border-border/50 shadow-sm transition-all hover:bg-muted"
            asChild>
            <Link href={ROUTES.PLATFORM.APPOINTMENTS}>
              <Calendar className="w-4 h-4 mr-2" />
              All Appointments
            </Link>
          </Button>
          <Button className="h-12 px-6 rounded-xl font-bold shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95 group">
            <WhatsAppIcon className="w-4 h-4 mr-2" />
            Launch Sandbox
            <ArrowRight className="w-3 h-3 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>

      {/* Integration Status Layer */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <IntegrationCard
          title="WhatsApp Hub"
          statusText="Linked: +1 (888) WEBOT"
          statusColor="emerald"
          icon={WhatsAppIcon}
          href={ROUTES.PLATFORM.WHATSAPP_SETUP}
          variants={itemVariants}
        />
        <IntegrationCard
          title="Main Calendar"
          statusText="Live Sync: Primary"
          statusColor="primary"
          icon={Calendar}
          href={ROUTES.PLATFORM.CALENDAR_SETTINGS}
          variants={itemVariants}
        />
      </motion.div>

      {/* High-Impact Stat Matrix */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Daily Appointments"
          value={stats.todayAppointments}
          icon={CalendarCheck}
          color="text-primary"
          bg="bg-primary/5"
          variants={itemVariants}
        />
        <StatCard
          label="Revenue Momentum"
          value="12"
          icon={TrendingUp}
          color="text-amber-500"
          bg="bg-amber-500/5"
          suffix=" Units"
          variants={itemVariants}
        />
        <StatCard
          label="Active Network"
          value={stats.totalCustomers}
          icon={Users}
          color="text-indigo-500"
          bg="bg-indigo-500/5"
          variants={itemVariants}
        />
        <StatCard
          label="Bot Precision"
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
