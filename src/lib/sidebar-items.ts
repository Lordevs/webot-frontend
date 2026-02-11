import { ROUTES } from "@/constants/routes";
import { LayoutDashboard, Settings2 } from "lucide-react";

export const SIDEBAR_ITEMS = [
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
