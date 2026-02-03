import { ROUTES } from "@/constants/routes";
import { HelpCircle, Lightbulb, ShieldCheck } from "lucide-react";

export const NAV_ITEMS = [
  {
    label: "How it works",
    href: ROUTES.APP.HOW_IT_WORKS,
    icon: HelpCircle,
  },
  {
    label: "Use cases",
    href: ROUTES.APP.USE_CASES,
    icon: Lightbulb,
  },
  {
    label: "Security",
    href: ROUTES.APP.SECURITY,
    icon: ShieldCheck,
  },
];
