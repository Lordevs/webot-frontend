"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { AppointmentsStats } from "./appointments-stats";
import { AppointmentsTable, Appointment } from "./appointments-table";
import { AppointmentDetails } from "./appointment-details";

const AppointmentsOverview = () => {
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  // Mock data
  const appointments: Appointment[] = [
    {
      id: 1,
      customer: "Sarah Johnson",
      email: "sarah.j@email.com",
      date: "Feb 3, 2026",
      time: "10:00 AM",
      duration: "30 min",
      status: "confirmed",
      source: "whatsapp",
      meetLink: "https://meet.google.com/abc-defg-hij",
    },
    {
      id: 2,
      customer: "Mike Wilson",
      email: "mike.w@email.com",
      date: "Feb 3, 2026",
      time: "11:30 AM",
      duration: "30 min",
      status: "completed",
      source: "whatsapp",
      meetLink: "https://meet.google.com/xyz-uvwx-yz",
    },
    {
      id: 3,
      customer: "Emma Davis",
      email: "emma.d@email.com",
      date: "Feb 3, 2026",
      time: "2:00 PM",
      duration: "45 min",
      status: "confirmed",
      source: "whatsapp",
      meetLink: "https://meet.google.com/qrs-tuvw-xyz",
    },
    {
      id: 4,
      customer: "John Smith",
      email: "john.s@email.com",
      date: "Feb 4, 2026",
      time: "9:00 AM",
      duration: "30 min",
      status: "confirmed",
      source: "whatsapp",
      meetLink: "https://meet.google.com/lmn-opqr-stu",
    },
    {
      id: 5,
      customer: "Lisa Brown",
      email: "lisa.b@email.com",
      date: "Feb 4, 2026",
      time: "3:00 PM",
      duration: "60 min",
      status: "cancelled",
      source: "whatsapp",
      meetLink: "",
    },
  ];

  const handleViewDetails = (apt: Appointment) => {
    setSelectedAppointment(apt);
    setDetailsOpen(true);
  };

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

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-screen-2xl mx-auto space-y-10 p-4 lg:p-8 relative">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-0 -z-10 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 -z-10 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <motion.div variants={itemVariants} className="space-y-2">
        <Badge
          variant="outline"
          className="bg-primary/5 border-primary/20 text-primary font-bold uppercase tracking-[0.2em] text-[10px] px-4 py-1 rounded-full">
          Session Matrix
        </Badge>
        <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-foreground">
          Command{" "}
          <span className="text-primary relative inline-block">
            Appointments
            <span className="absolute bottom-1 left-0 w-full h-3 bg-primary/10 -z-10" />
          </span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed font-medium">
          Monitor your operational queue and active sessions. Seamlessly
          transition between customer protocols and strategic syncs.
        </p>
      </motion.div>

      {/* Stats Layer */}
      <AppointmentsStats
        total={appointments.length}
        upcoming={appointments.filter((a) => a.status === "confirmed").length}
        completed={appointments.filter((a) => a.status === "completed").length}
        cancelled={appointments.filter((a) => a.status === "cancelled").length}
      />

      {/* Table Layer */}
      <motion.div variants={itemVariants}>
        <AppointmentsTable
          appointments={appointments}
          onViewDetails={handleViewDetails}
        />
      </motion.div>

      {/* Intelligence Dialog */}
      <AppointmentDetails
        appointment={selectedAppointment}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
    </motion.div>
  );
};

export default AppointmentsOverview;
