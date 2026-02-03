import { ROUTES } from "@/constants/routes";
import { HelpCircle, DollarSign, Mail } from "lucide-react";

export const NAV_ITEMS = [
  {
    label: "How it works",
    href: ROUTES.APP.HOW_IT_WORKS,
    icon: HelpCircle,
  },
  {
    label: "Pricing",
    href: ROUTES.APP.PRICING,
    icon: DollarSign,
  },
  {
    label: "Contact us",
    href: ROUTES.APP.CONTACT_US,
    icon: Mail,
  },
];
