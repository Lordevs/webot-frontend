import { ROUTES } from "@/constants/routes";
import {
  LayoutDashboard,
  Settings2,
  MessageSquare,
  Users,
  Shield,
} from "lucide-react";

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
  {
    title: "CRM",
    href: ROUTES.PLATFORM.CRM,
    icon: Users,
  },
  {
    title: "Super Admin",
    href: ROUTES.PLATFORM.SUPER_ADMIN,
    icon: Shield,
  },
];

export const BOTTOM_NAV_ITEMS = [
  {
    title: "Settings",
    href: ROUTES.PLATFORM.SETTINGS,
    icon: Settings2,
  },
];
