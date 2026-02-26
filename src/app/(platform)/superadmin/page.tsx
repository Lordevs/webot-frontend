"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useProfile } from "@/hooks/use-profile";
import { useBotSetup } from "@/hooks/use-bot-setup";
import { activateSuperadminBot, deactivateSuperadminBot } from "@/lib/api/bots";
import { api } from "@/lib/api/api";
import { API_ROUTES } from "@/constants/api-routes";
import { toast } from "sonner";
import {
  Bot,
  Brain,
  Building2,
  Clock,
  FileText,
  HelpCircle,
  Loader2,
  MessageSquare,
  Save,
  Shield,
  Zap,
} from "lucide-react";
import { WorkingHours } from "@/components/platform/calendar-settings/working-hours";

// ─── Types ────────────────────────────────────────────────────────────────────

interface BusinessProfile {
  business_name: string;
  industry: string;
  description: string;
  timezone: string;
  booking_enabled: boolean;
  default_slot_duration_minutes: number;
}

interface BusinessContext {
  services_text: string;
  faq_text: string;
  policies_text: string;
  system_prompt: string;
}

type Tab = "profile" | "context" | "availability" | "activate";

// ─── Constants ────────────────────────────────────────────────────────────────

const CHAR_LIMITS = {
  services_text: 2000,
  faq_text: 2000,
  policies_text: 1000,
  system_prompt: 1000,
};

const INDUSTRIES = [
  "Consulting",
  "Healthcare",
  "Legal",
  "Finance",
  "Technology",
  "Education",
  "Real Estate",
  "Retail",
  "Restaurant",
  "Beauty & Wellness",
  "Fitness",
  "Other",
];

const TIMEZONES = [
  "UTC",
  "Asia/Karachi",
  "Asia/Kolkata",
  "America/New_York",
  "America/Chicago",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Berlin",
  "Asia/Dubai",
  "Asia/Singapore",
  "Australia/Sydney",
];

// ─── Small sub-components ────────────────────────────────────────────────────

function CharCount({ value, max }: { value: string; max: number }) {
  const len = value.length;
  const pct = len / max;
  return (
    <span
      className={`text-xs font-medium tabular-nums ${
        pct >= 1
          ? "text-destructive"
          : pct >= 0.85
            ? "text-yellow-500"
            : "text-muted-foreground"
      }`}
    >
      {len}/{max}
    </span>
  );
}

function SectionCard({
  icon: Icon,
  iconColor,
  title,
  description,
  children,
}: {
  icon: React.ElementType;
  iconColor: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border bg-card/60 backdrop-blur-sm overflow-hidden">
      <div className="p-6 pb-4 flex items-center gap-4 border-b border-border/50">
        <div
          className={`w-10 h-10 rounded-xl ${iconColor} flex items-center justify-center`}
        >
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-base">{title}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        </div>
      </div>
      <div className="p-6 space-y-5">{children}</div>
    </div>
  );
}

function FieldLabel({
  htmlFor,
  label,
  hint,
}: {
  htmlFor: string;
  label: string;
  hint?: string;
}) {
  return (
    <div className="flex items-center justify-between mb-1.5">
      <label
        htmlFor={htmlFor}
        className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80"
      >
        {label}
      </label>
      {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function SuperadminPage() {
  const router = useRouter();
  const { data: profile, isLoading: profileLoading } = useProfile();
  const { bot, status: botStatus, refresh: refreshBot } = useBotSetup();

  const [activeTab, setActiveTab] = useState<Tab>("profile");

  // Business Profile
  const [profileData, setProfileData] = useState<BusinessProfile>({
    business_name: "",
    industry: "Consulting",
    description: "",
    timezone: "UTC",
    booking_enabled: true,
    default_slot_duration_minutes: 60,
  });
  const [profileSaving, setProfileSaving] = useState(false);

  // Business Context
  const [contextData, setContextData] = useState<BusinessContext>({
    services_text: "",
    faq_text: "",
    policies_text: "",
    system_prompt: "",
  });
  const [contextSaving, setContextSaving] = useState(false);

  // Activate
  const [activating, setActivating] = useState(false);
  const [deactivating, setDeactivating] = useState(false);

  // ── Staff guard ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!profileLoading && profile && !profile.is_staff) {
      router.replace("/dashboard");
    }
  }, [profile, profileLoading, router]);

  // ── Fetch existing data when bot is ready ──────────────────────────────────
  const loadBotData = useCallback(async () => {
    if (!bot) return;
    try {
      const [profRes, ctxRes] = await Promise.all([
        api.get(API_ROUTES.BUSINESS.SETUP(bot.id)),
        api.get(API_ROUTES.BUSINESS.CONTEXT(bot.id)),
      ]);
      if (Object.keys(profRes.data).length > 0) {
        setProfileData((prev) => ({ ...prev, ...profRes.data }));
      }
      if (Object.keys(ctxRes.data).length > 0) {
        setContextData((prev) => ({ ...prev, ...ctxRes.data }));
      }
    } catch {
      // No data yet — silently ignore
    }
  }, [bot]);

  useEffect(() => {
    loadBotData();
  }, [loadBotData]);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleSaveProfile = async () => {
    if (!bot) return;
    setProfileSaving(true);
    try {
      await api.post(API_ROUTES.BUSINESS.SETUP(bot.id), profileData);
      toast.success("Business profile saved!");
    } catch {
      toast.error("Failed to save profile.");
    } finally {
      setProfileSaving(false);
    }
  };

  const handleSaveContext = async () => {
    if (!bot) return;
    setContextSaving(true);
    try {
      await api.post(API_ROUTES.BUSINESS.CONTEXT(bot.id), contextData);
      toast.success("AI context saved! The bot will use this on next message.");
    } catch {
      toast.error("Failed to save context.");
    } finally {
      setContextSaving(false);
    }
  };

  const handleActivate = async () => {
    if (!bot) return;
    setActivating(true);
    try {
      await activateSuperadminBot(bot.id);
      toast.success(
        "Platform bot activated! External users can now message it.",
      );
      await refreshBot();
    } catch (err: unknown) {
      console.error(err);
      const msg =
        (err as { response?: { data?: { error?: string } } })?.response?.data
          ?.error ??
        "Failed to activate. Check SUPERADMIN_PHONE_NUMBER_ID in .env";
      toast.error(msg);
    } finally {
      setActivating(false);
    }
  };

  const handleDeactivate = async () => {
    if (!bot) return;
    setDeactivating(true);
    try {
      await deactivateSuperadminBot(bot.id);
      toast.success("Platform bot deactivated.");
      await refreshBot();
    } catch {
      toast.error("Failed to deactivate.");
    } finally {
      setDeactivating(false);
    }
  };

  // ── Render guards ──────────────────────────────────────────────────────────
  if (profileLoading || botStatus === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!profile?.is_staff) return null;

  const isActivated = bot?.is_superadmin_bot && bot?.is_whatsapp_connected;

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "profile", label: "Business Profile", icon: Building2 },
    { id: "context", label: "AI Context", icon: Brain },
    { id: "availability", label: "Availability", icon: Clock },
    { id: "activate", label: "Activation", icon: Zap },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-xs uppercase tracking-widest text-primary font-bold">
              Superadmin
            </span>
          </div>
          <h1 className="text-3xl font-black tracking-tight">Platform Bot</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Configure the AI brain and WhatsApp connection for your
            platform&apos;s business bot.
          </p>
        </div>

        {/* Status pill */}
        {bot && (
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full ${
                isActivated
                  ? "bg-emerald-500/15 text-emerald-600"
                  : "bg-yellow-500/15 text-yellow-600"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${isActivated ? "bg-emerald-500" : "bg-yellow-500"}`}
              />
              {isActivated ? "Live on WhatsApp" : "Not Activated"}
            </span>
            <span className="text-xs text-muted-foreground font-medium">
              Bot: <span className="text-foreground">{bot.name}</span>
            </span>
            {bot.phone_number_id && (
              <span className="text-xs text-muted-foreground font-mono">
                #{bot.phone_number_id.slice(-6)}
              </span>
            )}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 bg-muted/50 p-1 rounded-xl w-fit">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === id
                  ? "bg-background shadow text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* ── Tab: Business Profile ─────────────────────────────────────────── */}
        {activeTab === "profile" && (
          <motion.div
            key="profile"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            <SectionCard
              icon={Building2}
              iconColor="bg-indigo-500/10 text-indigo-500"
              title="Business Identity"
              description="This information appears in booking confirmations and AI greetings."
            >
              {/* Business Name */}
              <div>
                <FieldLabel htmlFor="biz-name" label="Business Name *" />
                <input
                  id="biz-name"
                  value={profileData.business_name}
                  onChange={(e) =>
                    setProfileData((p) => ({
                      ...p,
                      business_name: e.target.value,
                    }))
                  }
                  placeholder="e.g. Acme Consulting Co."
                  className="w-full h-11 px-4 rounded-xl border border-border/50 bg-muted/20 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm font-medium transition-all"
                />
              </div>

              {/* Description */}
              <div>
                <FieldLabel htmlFor="biz-desc" label="Description" />
                <textarea
                  id="biz-desc"
                  value={profileData.description}
                  onChange={(e) =>
                    setProfileData((p) => ({
                      ...p,
                      description: e.target.value,
                    }))
                  }
                  placeholder="A short intro injected into every AI response (max 500 chars)"
                  maxLength={500}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-border/50 bg-muted/20 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm font-medium resize-none transition-all"
                />
              </div>

              {/* Industry + Timezone row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <FieldLabel htmlFor="industry" label="Industry" />
                  <select
                    id="industry"
                    value={profileData.industry}
                    onChange={(e) =>
                      setProfileData((p) => ({
                        ...p,
                        industry: e.target.value,
                      }))
                    }
                    className="w-full h-11 px-4 rounded-xl border border-border/50 bg-muted/20 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm font-medium transition-all"
                  >
                    {INDUSTRIES.map((ind) => (
                      <option key={ind} value={ind}>
                        {ind}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <FieldLabel htmlFor="timezone" label="Timezone" />
                  <select
                    id="timezone"
                    value={profileData.timezone}
                    onChange={(e) =>
                      setProfileData((p) => ({
                        ...p,
                        timezone: e.target.value,
                      }))
                    }
                    className="w-full h-11 px-4 rounded-xl border border-border/50 bg-muted/20 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm font-medium transition-all"
                  >
                    {TIMEZONES.map((tz) => (
                      <option key={tz} value={tz}>
                        {tz}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Booking + slot duration row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <FieldLabel
                    htmlFor="slot-dur"
                    label="Default Slot Duration (min)"
                  />
                  <input
                    id="slot-dur"
                    type="number"
                    min={15}
                    max={480}
                    step={15}
                    value={profileData.default_slot_duration_minutes}
                    onChange={(e) =>
                      setProfileData((p) => ({
                        ...p,
                        default_slot_duration_minutes: Number(e.target.value),
                      }))
                    }
                    className="w-full h-11 px-4 rounded-xl border border-border/50 bg-muted/20 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm font-medium transition-all"
                  />
                </div>

                <div className="flex items-center gap-3 pt-6">
                  <input
                    id="booking-enabled"
                    type="checkbox"
                    checked={profileData.booking_enabled}
                    onChange={(e) =>
                      setProfileData((p) => ({
                        ...p,
                        booking_enabled: e.target.checked,
                      }))
                    }
                    className="w-4 h-4 accent-primary"
                  />
                  <label
                    htmlFor="booking-enabled"
                    className="text-sm font-medium"
                  >
                    Booking Enabled
                  </label>
                </div>
              </div>
            </SectionCard>

            <button
              onClick={handleSaveProfile}
              disabled={profileSaving || !bot}
              className="flex items-center gap-2 h-11 px-6 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {profileSaving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Save Profile
            </button>
          </motion.div>
        )}

        {/* ── Tab: AI Context ───────────────────────────────────────────────── */}
        {activeTab === "context" && (
          <motion.div
            key="context"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            {/* Services */}
            <SectionCard
              icon={FileText}
              iconColor="bg-blue-500/10 text-blue-500"
              title="Services"
              description="Describe what your business offers. The AI uses this to answer pricing and availability questions."
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <FieldLabel htmlFor="services" label="Services Text" />
                  <CharCount
                    value={contextData.services_text}
                    max={CHAR_LIMITS.services_text}
                  />
                </div>
                <textarea
                  id="services"
                  value={contextData.services_text}
                  onChange={(e) =>
                    setContextData((p) => ({
                      ...p,
                      services_text: e.target.value,
                    }))
                  }
                  maxLength={CHAR_LIMITS.services_text}
                  rows={6}
                  placeholder={`Haircut — 30 min — PKR 500\nBeard Trim — 15 min — PKR 300\nFull Styling — 60 min — PKR 1200`}
                  className="w-full px-4 py-3 rounded-xl border border-border/50 bg-muted/20 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm font-medium resize-none transition-all font-mono"
                />
              </div>
            </SectionCard>

            {/* FAQ */}
            <SectionCard
              icon={HelpCircle}
              iconColor="bg-violet-500/10 text-violet-500"
              title="FAQ"
              description="Common questions and answers. The AI quotes these verbatim when customers ask."
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <FieldLabel htmlFor="faq" label="FAQ Text" />
                  <CharCount
                    value={contextData.faq_text}
                    max={CHAR_LIMITS.faq_text}
                  />
                </div>
                <textarea
                  id="faq"
                  value={contextData.faq_text}
                  onChange={(e) =>
                    setContextData((p) => ({ ...p, faq_text: e.target.value }))
                  }
                  maxLength={CHAR_LIMITS.faq_text}
                  rows={6}
                  placeholder={`Q: Do you take walk-ins?\nA: Yes, subject to availability.\n\nQ: What payment methods do you accept?\nA: Cash and bank transfer.`}
                  className="w-full px-4 py-3 rounded-xl border border-border/50 bg-muted/20 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm font-medium resize-none transition-all font-mono"
                />
              </div>
            </SectionCard>

            {/* Policies */}
            <SectionCard
              icon={Clock}
              iconColor="bg-amber-500/10 text-amber-500"
              title="Policies"
              description="Cancellation, refund, and booking policies the AI communicates to customers."
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <FieldLabel htmlFor="policies" label="Policies Text" />
                  <CharCount
                    value={contextData.policies_text}
                    max={CHAR_LIMITS.policies_text}
                  />
                </div>
                <textarea
                  id="policies"
                  value={contextData.policies_text}
                  onChange={(e) =>
                    setContextData((p) => ({
                      ...p,
                      policies_text: e.target.value,
                    }))
                  }
                  maxLength={CHAR_LIMITS.policies_text}
                  rows={4}
                  placeholder="Cancellations must be made 24 hours in advance. No-shows are charged 50%."
                  className="w-full px-4 py-3 rounded-xl border border-border/50 bg-muted/20 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm font-medium resize-none transition-all font-mono"
                />
              </div>
            </SectionCard>

            {/* System Prompt Override */}
            <SectionCard
              icon={MessageSquare}
              iconColor="bg-rose-500/10 text-rose-500"
              title="System Prompt Override"
              description="Optional: fully replaces the auto-generated AI persona. Leave blank to use default."
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <FieldLabel
                    htmlFor="sys-prompt"
                    label="System Prompt"
                    hint="Optional"
                  />
                  <CharCount
                    value={contextData.system_prompt}
                    max={CHAR_LIMITS.system_prompt}
                  />
                </div>
                <textarea
                  id="sys-prompt"
                  value={contextData.system_prompt}
                  onChange={(e) =>
                    setContextData((p) => ({
                      ...p,
                      system_prompt: e.target.value,
                    }))
                  }
                  maxLength={CHAR_LIMITS.system_prompt}
                  rows={5}
                  placeholder={`You are Aria, the friendly AI assistant for Acme Corp. You help customers book appointments and answer questions about our services. Always be warm, concise, and professional.`}
                  className="w-full px-4 py-3 rounded-xl border border-border/50 bg-muted/20 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm font-medium resize-none transition-all"
                />
                <p className="mt-2 text-xs text-muted-foreground">
                  💡 When blank, the AI auto-generates a prompt from your
                  Business Name, Description, Services, FAQ, and Policies above.
                </p>
              </div>
            </SectionCard>

            <button
              onClick={handleSaveContext}
              disabled={contextSaving || !bot}
              className="flex items-center gap-2 h-11 px-6 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {contextSaving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Save AI Context
            </button>
          </motion.div>
        )}

        {activeTab === "availability" && bot && <WorkingHours botId={bot.id} />}

        {/* ── Tab: Activation ───────────────────────────────────────────────── */}
        {activeTab === "activate" && (
          <motion.div
            key="activate"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            <SectionCard
              icon={Bot}
              iconColor="bg-primary/10 text-primary"
              title="Bot Status"
              description="Current activation state of your platform bot."
            >
              <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                <span className="text-muted-foreground">Bot Name</span>
                <span className="font-semibold">{bot?.name ?? "—"}</span>
                <span className="text-muted-foreground">WhatsApp</span>
                <span className="font-semibold">
                  {bot?.is_whatsapp_connected
                    ? "✅ Connected"
                    : "❌ Not Connected"}
                </span>
                <span className="text-muted-foreground">Platform Bot</span>
                <span className="font-semibold">
                  {bot?.is_superadmin_bot ? "✅ Yes" : "❌ No"}
                </span>
                {bot?.phone_number_id && (
                  <>
                    <span className="text-muted-foreground">
                      Phone Number ID
                    </span>
                    <span className="font-mono text-xs">
                      {bot.phone_number_id}
                    </span>
                  </>
                )}
              </div>
            </SectionCard>

            {isActivated ? (
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6 space-y-4">
                <p className="text-sm text-emerald-600 font-medium">
                  ✅ Your platform bot is live! External users can message your
                  WhatsApp number and interact with the AI using your configured
                  business context.
                </p>
                <div className="pt-2">
                  <button
                    onClick={handleDeactivate}
                    disabled={deactivating}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive/10 text-destructive font-bold text-xs hover:bg-destructive/20 transition-all disabled:opacity-50"
                  >
                    {deactivating ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <Shield className="w-3 h-3" />
                    )}
                    Deactivate Platform Bot
                  </button>
                  <p className="mt-2 text-[10px] text-muted-foreground italic">
                    Caution: Deactivating will immediately stop the bot from
                    responding to any customers on WhatsApp.
                  </p>
                </div>
              </div>
            ) : (
              <SectionCard
                icon={Zap}
                iconColor="bg-yellow-500/10 text-yellow-500"
                title="Activate Platform Bot"
                description="Pre-fill credentials from your .env settings — no Embedded Signup needed."
              >
                <div className="bg-muted/30 rounded-xl p-4 text-xs text-muted-foreground space-y-1.5 font-mono">
                  <p>
                    <span className="text-foreground font-semibold">
                      Required in .env:
                    </span>
                  </p>
                  <p>SUPERADMIN_PHONE_NUMBER_ID=&lt;number_id&gt;</p>
                  <p>SUPERADMIN_ACCESS_TOKEN=&lt;whatsapp_token&gt;</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Add a dedicated number in{" "}
                  <strong>
                    Meta Business Manager → WhatsApp → Phone Numbers
                  </strong>
                  , then set the env vars above and click activate.
                </p>
                <button
                  onClick={handleActivate}
                  disabled={activating || !bot}
                  className="flex items-center gap-2 w-full h-11 px-6 rounded-xl bg-primary text-primary-foreground font-bold text-sm justify-center hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  {activating ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Zap className="w-4 h-4" />
                  )}
                  Activate as Platform Bot
                </button>
              </SectionCard>
            )}

            {/* Checklist */}
            <div className="rounded-2xl border bg-muted/20 p-5">
              <h3 className="text-sm font-bold mb-3">Setup Checklist</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {[
                  ["Add phone number in Meta Business Manager", isActivated],
                  ["Set SUPERADMIN_PHONE_NUMBER_ID in .env", isActivated],
                  ["Fill in Business Profile", !!profileData.business_name],
                  [
                    "Add AI Context (services, FAQ, policies)",
                    !!contextData.services_text,
                  ],
                  ["Click Activate as Platform Bot", !!isActivated],
                ].map(([label, done]) => (
                  <li key={String(label)} className="flex items-center gap-2">
                    <span
                      className={
                        String(done) === "true"
                          ? "text-emerald-500"
                          : "text-muted-foreground"
                      }
                    >
                      {String(done) === "true" ? "✅" : "⬜"}
                    </span>
                    {String(label)}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
