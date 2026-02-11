"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import apiCaller from "@/lib/api/api-caller";
import { API_ROUTES } from "@/constants/api-routes";

export interface UserProfile {
  id: string;
  email: string;
  username: string;
  phone_number: string | null;
  is_phone_verified: boolean;
  is_google_connected: boolean;
  timezone: string;
}

interface ProfileContextType {
  profile: UserProfile | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await apiCaller<UserProfile>(API_ROUTES.AUTH.PROFILE_ME, "GET");
      setProfile(res.data);
      setError(null);
    } catch (err) {
      console.error("ProfileContext: Failed to fetch profile:", err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, loading, error, refetch: fetchProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}
