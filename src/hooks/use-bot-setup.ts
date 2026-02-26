"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { getMyBot, createBot, connectWhatsApp, Bot } from "@/lib/api/bots";

type SetupStatus = "idle" | "loading" | "connecting" | "connected" | "error";

interface UseBotSetupReturn {
  bot: Bot | null;
  status: SetupStatus;
  error: string | null;
  /** Call this with data from the Meta Embedded Signup popup */
  handleConnectWhatsApp: (
    code: string,
    wabaId: string,
    phoneNumberId: string,
  ) => Promise<void>;
  /** Refetch bot state from the server */
  refresh: () => Promise<void>;
}

export function useBotSetup(): UseBotSetupReturn {
  const [bot, setBot] = useState<Bot | null>(null);
  const [status, setStatus] = useState<SetupStatus>("loading");
  const [error, setError] = useState<string | null>(null);

  const isFetchingRef = useRef(false);

  const fetchBot = useCallback(async () => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;

    setStatus("loading");
    setError(null);
    try {
      let fetchedBot = await getMyBot();
      // MVP: auto-create a bot if the user doesn't have one yet
      if (!fetchedBot) {
        fetchedBot = await createBot("My Business Bot");
      }
      setBot(fetchedBot);
      setStatus(fetchedBot.is_whatsapp_connected ? "connected" : "idle");
    } catch (err) {
      console.error("useBotSetup: failed to fetch/create bot", err);
      setError("Could not load your bot. Please refresh.");
      setStatus("error");
    } finally {
      isFetchingRef.current = false;
    }
  }, []);

  useEffect(() => {
    fetchBot();
  }, [fetchBot]);

  const handleConnectWhatsApp = useCallback(
    async (code: string, wabaId: string, phoneNumberId: string) => {
      if (!bot) return;
      setStatus("connecting");
      setError(null);
      try {
        await connectWhatsApp(bot.id, {
          code,
          waba_id: wabaId,
          phone_number_id: phoneNumberId,
        });
        // Refetch bot to get updated phone_number_id from server
        const updated = await getMyBot();
        setBot(updated);
        setStatus("connected");
      } catch (err) {
        console.error("useBotSetup: connectWhatsApp failed", err);
        setError("Failed to connect. Please try again.");
        setStatus("error");
      }
    },
    [bot],
  );

  return {
    bot,
    status,
    error,
    handleConnectWhatsApp,
    refresh: fetchBot,
  };
}
