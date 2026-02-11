import { ROUTES } from "@/constants/routes";
import { LayoutDashboard, Settings2, MessageSquare } from "lucide-react";

export const SIDEBAR_ITEMS = [
  {
    title: "Talk to Bot",
    href: process.env.NEXT_PUBLIC_BOT_WHATSAPP_LINK || "#",
    icon: MessageSquare,
    isExternal: true,
  },
  {
    title: "Dashboard",
    href: ROUTES.PLATFORM.DASHBOARD,
    icon: LayoutDashboard,
  },
];

export const BOTTOM_NAV_ITEMS = [
  {
    title: "Settings",
    href: ROUTES.PLATFORM.SETTINGS,
    icon: Settings2,
  },
];
