"use client";

import { useQuery } from "@tanstack/react-query";
import apiCaller from "@/lib/api/api-caller";
import { API_ROUTES } from "@/constants/api-routes";
import { getAuthTokens } from "@/lib/cookies";

export interface BackendMeeting {
  id: number;
  summary: string;
  start_time: string;
  end_time: string;
  meet_link?: string;
  status: "pending" | "confirmed" | "cancelled" | "failed";
}

export const MEETINGS_QUERY_KEY = ["meetings"];

export function useMeetings() {
  const { accessToken } = getAuthTokens();

  return useQuery({
    queryKey: MEETINGS_QUERY_KEY,
    queryFn: async () => {
      const res = await apiCaller<BackendMeeting[]>(
        API_ROUTES.MEETINGS.LIST,
        "GET",
      );
      return res.data;
    },
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });
}
