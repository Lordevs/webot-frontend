import { ROUTES } from "@/constants/routes";
import { HelpCircle, Lightbulb, ShieldCheck } from "lucide-react";

export const NAV_ITEMS = [
  {
    label: "How it works",
    href: ROUTES.HOW_IT_WORKS,
    icon: HelpCircle,
  },
  {
    label: "Use cases",
    href: ROUTES.USE_CASES,
    icon: Lightbulb,
  },
  {
    label: "Security",
    href: ROUTES.SECURITY,
    icon: ShieldCheck,
  },
];
