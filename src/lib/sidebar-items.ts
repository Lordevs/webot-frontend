import { ROUTES } from "@/constants/routes";
import {
  LayoutDashboard,
  Calendar,
  Settings2,
  Bot,
  CalendarRange,
  CreditCard,
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
    title: "My Bot",
    icon: Bot,
    children: [
      {
        title: "Calendar Settings",
        href: ROUTES.PLATFORM.CALENDAR_SETTINGS,
        icon: CalendarRange,
      },
      {
        title: "Automations",
        href: ROUTES.PLATFORM.AUTOMATIONS,
        icon: Bot,
        isComingSoon: true,
      },
    ],
  },
];

export const BOTTOM_NAV_ITEMS = [
  {
    title: "Billing",
    href: ROUTES.PLATFORM.BILLING,
    icon: CreditCard,
  },
  {
    title: "Settings",
    href: ROUTES.PLATFORM.SETTINGS,
    icon: Settings2,
  },
];
