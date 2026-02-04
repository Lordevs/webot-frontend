import { AutomationsComingSoon } from "@/components/platform/automations/coming-soon";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Automations | Webot",
  description: "Advanced scheduling automations coming soon to Webot.",
};

export default function AutomationsPage() {
  return <AutomationsComingSoon />;
}
