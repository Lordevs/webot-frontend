import { ROUTES } from "@/constants/routes";
import { LayoutDashboard, Settings2, Bot, CalendarRange } from "lucide-react";
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
    title: "My Bot",
    icon: Bot,
    children: [
      {
        title: "Google Calendar",
        href: ROUTES.PLATFORM.CALENDAR_SETTINGS,
        icon: CalendarRange,
      },
    ],
  },
];

export const BOTTOM_NAV_ITEMS = [
  {
    title: "Settings",
    href: ROUTES.PLATFORM.SETTINGS,
    icon: Settings2,
  },
];
