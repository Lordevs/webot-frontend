import { ROUTES } from "@/constants/routes";
import {
  LayoutDashboard,
  Calendar,
  Settings2,
  Bot,
  CalendarRange,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/common/icons";

export const SIDEBAR_ITEMS = [
  {
    title: "Dashboard",
    href: ROUTES.PLATFORM.DASHBOARD,
    icon: LayoutDashboard,
  },
  {
    title: "WhatsApp Setup",
    href: ROUTES.PLATFORM.WHATSAPP_SETUP,
    icon: WhatsAppIcon,
  },
  {
    title: "Calendar Settings",
    href: ROUTES.PLATFORM.CALENDAR_SETTINGS,
    icon: CalendarRange,
  },
  {
    title: "Appointments",
    href: ROUTES.PLATFORM.APPOINTMENTS,
    icon: Calendar,
  },
  {
    title: "Automations",
    href: ROUTES.PLATFORM.AUTOMATIONS,
    icon: Bot,
  },
];
