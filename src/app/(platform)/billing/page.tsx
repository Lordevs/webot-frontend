import BillingOverview from "@/components/platform/billing";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Billing & Capacity | Webot",
  description: "Manage your subscription, usage, and billing history.",
};

export default function BillingPage() {
  return <BillingOverview />;
}
