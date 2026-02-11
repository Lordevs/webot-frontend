"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import apiCaller from "@/lib/api/api-caller";
import { API_ROUTES } from "@/constants/api-routes";
import { AppointmentsStats } from "./appointments-stats";
import { AppointmentsTable, Appointment } from "./appointments-table";
import { AppointmentDetails } from "./appointment-details";
import { Loader2 } from "lucide-react";

interface BackendMeeting {
  id: number;
  summary: string;
  start_time: string;
  end_time: string;
  meet_link?: string;
  status: "pending" | "confirmed" | "cancelled" | "failed";
  customer_name?: string;
  customer_email?: string;
  duration_minutes?: number;
  source?: string;
}

const AppointmentsOverview = () => {
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await apiCaller<BackendMeeting[]>(API_ROUTES.MEETINGS.LIST, "GET");
        // Mapping backend fields to frontend Appointment type
        const mapped: Appointment[] = response.data.map((apt: BackendMeeting) => ({
          id: apt.id,
          customer: apt.customer_name || "Guest",
          email: apt.customer_email || "",
          date: new Date(apt.start_time).toLocaleDateString(),
          time: new Date(apt.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          duration: `${apt.duration_minutes || 30} min`,
          status: (apt.status === "pending" ? "confirmed" : (apt.status === "failed" ? "cancelled" : apt.status)) as Appointment["status"],
          source: (apt.source as "whatsapp") || "whatsapp",
          meetLink: apt.meet_link || "",
        }));
        setAppointments(mapped);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAppointments();
  }, []);


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
          Overview
        </Badge>
        <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-foreground">
          My{" "}
          <span className="text-primary relative inline-block">
            Appointments
            <span className="absolute bottom-1 left-0 w-full h-3 bg-primary/10 -z-10" />
          </span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed font-medium">
          View and manage all your scheduled meetings in one place. Keep track
          of your upcoming calls and historical bookings.
        </p>
      </motion.div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-40 gap-4">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
          <p className="text-muted-foreground font-medium animate-pulse">Syncing your appointments...</p>
        </div>
      ) : (
        <>
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
        </>
      )}

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
