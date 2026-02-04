import AppointmentsOverview from "@/components/platform/appointments";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Appointments | Webot",
  description: "Manage your scheduled meetings and customer sessions.",
};

export default function AppointmentsPage() {
  return <AppointmentsOverview />;
}
