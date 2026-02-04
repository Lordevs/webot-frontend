import SettingsOverview from "@/components/platform/settings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings | Webot",
  description: "Manage your account preferences and global configuration.",
};

export default function SettingsPage() {
  return <SettingsOverview />;
}
