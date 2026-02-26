import { api } from "./api";
import { API_ROUTES } from "@/constants/api-routes";

export interface Bot {
  id: number;
  name: string;
  phone_number_id: string | null;
  waba_id: string | null;
  is_active: boolean;
  is_superadmin_bot: boolean;
  is_whatsapp_connected: boolean;
  created_at: string;
  updated_at: string;
}

export interface ConnectWhatsAppPayload {
  code: string;
  waba_id: string;
  phone_number_id: string;
}

/** Fetch the authenticated user's first active bot (MVP: one per user). */
export async function getMyBot(): Promise<Bot | null> {
  const res = await api.get<Bot[]>(API_ROUTES.BOTS.LIST + "?mine=true");
  return res.data.length > 0 ? res.data[0] : null;
}

/** Create a new bot with the given name. */
export async function createBot(name: string): Promise<Bot> {
  const res = await api.post<Bot>(API_ROUTES.BOTS.LIST, { name });
  return res.data;
}

/**
 * Exchange Meta Embedded Signup code for a long-lived access token
 * and store the bot's WhatsApp credentials on the backend.
 */
export async function connectWhatsApp(
  botId: number,
  payload: ConnectWhatsAppPayload,
): Promise<{ status: string; waba_id: string; phone_number_id: string }> {
  const res = await api.post(API_ROUTES.BOTS.CONNECT_WHATSAPP(botId), payload);
  return res.data;
}

/**
 * Staff-only: activate a bot as the platform superadmin bot.
 * Pre-fills phone_number_id + access_token from Django settings.
 */
export async function activateSuperadminBot(
  botId: number,
): Promise<{ status: string; phone_number_id: string; message: string }> {
  const res = await api.post(
    API_ROUTES.BOTS.ACTIVATE_SUPERADMIN_BOT(botId),
    {},
  );
  return res.data;
}

export async function deactivateSuperadminBot(
  botId: number,
): Promise<{ status: string; message: string }> {
  const res = await api.post(
    API_ROUTES.BOTS.DEACTIVATE_SUPERADMIN_BOT(botId),
    {},
  );
  return res.data;
}
