import CalendarSettings from "@/components/platform/calendar-settings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calendar Settings | Webot",
  description: "Configure your availability and calendar preferences.",
};

export default function CalendarSettingsPage() {
  return <CalendarSettings />;
}
