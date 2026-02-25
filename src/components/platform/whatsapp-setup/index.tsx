"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { StatusCard } from "./status-card";
import { ConnectionOptions } from "./connection-options";
import { ChatPreview } from "./chat-preview";
import { useBotSetup } from "@/hooks/use-bot-setup";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const WhatsAppSetupOverview = () => {
  const { bot, status, error, handleConnectWhatsApp } = useBotSetup();
  const [greetingMessage, setGreetingMessage] = useState(
    "Hi there! 👋 I'm your AI booking assistant. How can I help you today?",
  );
  const [connectError, setConnectError] = useState<string | null>(null);

  const isConnected = status === "connected" || bot?.is_whatsapp_connected;
  const isLoading = status === "loading";
  const isConnecting = status === "connecting";

  const handleSuccess = async (
    code: string,
    wabaId: string,
    phoneNumberId: string,
  ) => {
    setConnectError(null);
    await handleConnectWhatsApp(code, wabaId, phoneNumberId);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-screen-2xl mx-auto space-y-10 p-4 lg:p-8 relative"
    >
      {/* Background Ornaments */}
      <div className="absolute top-0 left-0 -z-10 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 -z-10 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <motion.div variants={itemVariants} className="space-y-2">
        <Badge
          variant="outline"
          className="bg-emerald-500/5 border-emerald-500/20 text-emerald-600 font-bold uppercase tracking-[0.2em] text-[10px] px-4 py-1 rounded-full"
        >
          Channel Configuration
        </Badge>
        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
          WhatsApp{" "}
          <span className="text-emerald-600 relative inline-block">
            Integration
            <span className="absolute bottom-1 left-0 w-full h-3 bg-emerald-500/10 -z-10" />
          </span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
          Connect your WhatsApp Business number and let your AI assistant handle
          bookings, answer questions, and serve customers 24/7.
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {/* Error Alert */}
        {(error || connectError) && (
          <motion.div
            key="error"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={itemVariants}
          >
            <Alert variant="destructive" className="rounded-2xl">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error || connectError}</AlertDescription>
            </Alert>
          </motion.div>
        )}

        {/* Loading State */}
        {isLoading && (
          <motion.div
            key="loading"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={itemVariants}
            className="flex items-center justify-center py-20 gap-3 text-muted-foreground"
          >
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="text-base font-medium">Loading your bot…</span>
          </motion.div>
        )}

        {/* Status Card — shown when connected */}
        {!isLoading && isConnected && bot && (
          <motion.div
            key="status"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={itemVariants}
          >
            <StatusCard
              isConnected={true}
              connectionInfo={{
                phoneNumber: bot.phone_number_id ?? "—",
                wabaId: bot.waba_id ?? "—",
              }}
            />
          </motion.div>
        )}

        {/* Connection Options — shown when NOT connected */}
        {!isLoading && !isConnected && (
          <motion.div
            key="options"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={itemVariants}
          >
            <ConnectionOptions
              onSuccess={handleSuccess}
              onError={setConnectError}
              isConnecting={isConnecting}
            />
          </motion.div>
        )}

        {/* Chat Preview — always shown once bot is loaded */}
        {!isLoading && (
          <motion.div
            key="preview"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={itemVariants}
          >
            <ChatPreview
              greetingMessage={greetingMessage}
              setGreetingMessage={setGreetingMessage}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default WhatsAppSetupOverview;
