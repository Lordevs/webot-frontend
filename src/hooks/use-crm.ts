"use client";

import { useQuery } from "@tanstack/react-query";
import apiCaller from "@/lib/api/api-caller";
import { API_ROUTES } from "@/constants/api-routes";
import { getAuthTokens } from "@/lib/cookies";
import { Lead, Activity, CRMStats } from "@/types/crm";

export const CRM_QUERY_KEYS = {
  LEADS: ["crm", "leads"],
  STATS: ["crm", "stats"],
  ACTIVITY: (leadId: number) => ["crm", "activity", leadId],
};

export function useLeads() {
  const { accessToken } = getAuthTokens();

  return useQuery({
    queryKey: CRM_QUERY_KEYS.LEADS,
    queryFn: async () => {
      const res = await apiCaller<Lead[]>(API_ROUTES.CRM.LEADS, "GET");
      // Add UI avatars if missing
      return res.data.map((lead) => ({
        ...lead,
        avatar: lead.name ? lead.name[0].toUpperCase() : "?",
      }));
    },
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}

export function useCRMStats() {
  const { accessToken } = getAuthTokens();

  return useQuery({
    queryKey: CRM_QUERY_KEYS.STATS,
    queryFn: async () => {
      const res = await apiCaller<CRMStats>(API_ROUTES.CRM.STATS, "GET");
      return res.data;
    },
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useLeadActivity(leadId: number | null) {
  const { accessToken } = getAuthTokens();

  return useQuery({
    queryKey: CRM_QUERY_KEYS.ACTIVITY(leadId as number),
    queryFn: async () => {
      const res = await apiCaller<Activity[]>(
        API_ROUTES.CRM.LEAD_ACTIVITY(leadId as number),
        "GET",
      );
      return res.data;
    },
    enabled: !!accessToken && leadId !== null,
    staleTime: 1000 * 60, // 1 minute
  });
}

export interface Appointment {
  id: number;
  customer_name: string;
  customer_phone: string;
  service_name: string;
  start_time: string;
  status: string;
}

export function useAppointments() {
  const { accessToken } = getAuthTokens();

  return useQuery({
    queryKey: ["crm", "appointments"],
    queryFn: async () => {
      const res = await apiCaller<Appointment[]>("/api/appointments/", "GET");
      return res.data;
    },
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 5,
  });
}
