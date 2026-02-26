import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api/api";
import { API_ROUTES } from "@/constants/api-routes";
import { toast } from "sonner";

export interface WorkingHour {
  weekday: number;
  start_time: string;
  end_time: string;
}

export interface BusinessProfile {
  business_name: string;
  industry: string;
  description: string;
  timezone: string;
  booking_enabled: boolean;
  default_slot_duration_minutes: number;
}

export function useWorkingHours(botId: number | string | undefined) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["working-hours", botId],
    queryFn: async () => {
      if (!botId) return [];
      const response = await api.get<WorkingHour[]>(
        API_ROUTES.BUSINESS.WORKING_HOURS(botId),
      );
      return response.data;
    },
    enabled: !!botId,
  });

  const mutation = useMutation({
    mutationFn: async (data: WorkingHour[]) => {
      if (!botId) throw new Error("Bot ID is required");
      const response = await api.post<WorkingHour[]>(
        API_ROUTES.BUSINESS.WORKING_HOURS(botId),
        data,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["working-hours", botId] });
      toast.success("Working hours updated successfully");
    },
    onError: (error: unknown) => {
      const message =
        (
          error as {
            response?: { data?: { error?: string } };
            message?: string;
          }
        ).response?.data?.error ||
        (error as Error).message ||
        "Failed to update working hours";
      toast.error(message);
    },
  });

  return {
    ...query,
    updateHours: mutation.mutate,
    isUpdating: mutation.isPending,
  };
}

export function useBusinessProfile(botId: number | string | undefined) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["business-profile", botId],
    queryFn: async () => {
      if (!botId) return null;
      const response = await api.get<BusinessProfile>(
        API_ROUTES.BUSINESS.SETUP(botId),
      );
      return response.data;
    },
    enabled: !!botId,
  });

  const mutation = useMutation({
    mutationFn: async (data: Partial<BusinessProfile>) => {
      if (!botId) throw new Error("Bot ID is required");
      const response = await api.post<BusinessProfile>(
        API_ROUTES.BUSINESS.SETUP(botId),
        data,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["business-profile", botId] });
      toast.success("Business profile updated");
    },
  });

  return {
    ...query,
    updateProfile: mutation.mutate,
    isUpdating: mutation.isPending,
  };
}
