"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiCaller from "@/lib/api/api-caller";
import { API_ROUTES } from "@/constants/api-routes";
import { getAuthTokens } from "@/lib/cookies";

export interface UserProfile {
  id: string;
  email: string;
  username: string;
  phone_number: string | null;
  is_phone_verified: boolean;
  is_google_connected: boolean;
  timezone: string;
  meeting_stats?: {
    today: number;
    this_week: number;
    total: number;
  };
}

export const PROFILE_QUERY_KEY = ["profile"];

export function useProfile() {
  const { accessToken } = getAuthTokens();

  return useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: async () => {
      const res = await apiCaller<UserProfile>(
        API_ROUTES.AUTH.PROFILE_ME,
        "GET",
      );
      return res.data;
    },
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 15, // 15 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
    retry: 1,
  });
}

export interface ApiError extends Error {
  response?: {
    data?: {
      error?: string;
    };
  };
}

/**
 * Hook for updating phone number.
 */
export function useUpdatePhone() {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, string>({
    mutationFn: async (phoneNumber: string) => {
      await apiCaller(API_ROUTES.AUTH.PHONE_UPDATE, "POST", {
        phone_number: phoneNumber,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
    },
  });
}

/**
 * Hook for verifying phone OTP.
 */
export function useVerifyPhone() {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, string>({
    mutationFn: async (code: string) => {
      await apiCaller(API_ROUTES.AUTH.PHONE_VERIFY, "POST", { code });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
    },
  });
}

/**
 * Hook for disconnecting Google Calendar.
 */
export function useDisconnectGoogle() {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, void>({
    mutationFn: async () => {
      await apiCaller(API_ROUTES.GOOGLE_CALENDAR.DISCONNECT, "POST");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
    },
  });
}

/**
 * Hook for action-based mutations that should invalidate the profile.
 */
export function useProfileMutation() {
  const queryClient = useQueryClient();

  return {
    invalidate: () =>
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY }),
  };
}
