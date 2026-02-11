// lib/api.ts
import { API_ROUTES } from "@/constants/api-routes";
import { ROUTES } from "@/constants/routes";
import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import {
  clearAuthCookies,
  getAuthTokens,
  setAuthCookies,
  setCookie,
} from "@/lib/cookies";

import { getApiBaseUrl } from "./config";

const BACKEND_URL = getApiBaseUrl();

interface PendingRequest {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}

export class ApiClient {
  private axios: AxiosInstance;
  private isRefreshing = false;
  private queue: PendingRequest[] = [];

  constructor() {
    this.axios = axios.create({
      baseURL: BACKEND_URL,
      headers: { "Content-Type": "application/json" },
    });

    this.axios.interceptors.request.use(this.attachAccessToken.bind(this));
    this.axios.interceptors.response.use(
      (res) => res,
      this.handleResponseError.bind(this),
    );
  }

  private attachAccessToken(config: InternalAxiosRequestConfig) {
    // Avoid attaching Authorization for auth endpoints that must be anonymous
    const url = config.url ?? "";
    const pathOnly = url.split("?")[0];
    const authBypassPaths = [
      API_ROUTES.AUTH.REFRESH_TOKEN,
      API_ROUTES.AUTH.LOGIN,
      API_ROUTES.AUTH.SIGNUP,
      API_ROUTES.AUTH.FORGOT_PASSWORD,
      API_ROUTES.AUTH.GOOGLE_AUTH_INIT,
      API_ROUTES.GOOGLE_CALENDAR.CALLBACK,
    ].filter(Boolean) as string[];
    // Check if it's a public endpoint (starts with "public/")
    const isPublicEndpoint = pathOnly.startsWith("public/");
    const shouldBypass =
      authBypassPaths.some((p) => pathOnly === p) || isPublicEndpoint;
    if (shouldBypass) {
      // Ensure Authorization is not sent for these endpoints
      if (!config.headers) config.headers = {} as typeof config.headers;
      delete (config.headers as Record<string, unknown>)["Authorization"];
      delete (config.headers as Record<string, unknown>)["authorization"];
      return config;
    }

    // Get token from cookies via shared storage utility
    const token = getAuthTokens().accessToken;
    if (token && config.headers && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }

  private async refreshAccessToken(): Promise<string> {
    try {
      const { refreshToken } = getAuthTokens();

      // Construct payload only if we have a visible token
      const payload = refreshToken ? { refresh_token: refreshToken } : {};

      // Use a clean axios instance to avoid interceptor recursion
      const response = await axios.post(
        `${BACKEND_URL}${API_ROUTES.AUTH.REFRESH_TOKEN}`,
        payload,
      );

      const data = response.data;
      const session = data.session || data;
      const newAccess = session.access ?? session.access_token;
      const newRefresh = session.refresh ?? session.refresh_token;

      if (!newAccess) {
        throw new Error("Refresh endpoint did not return an access token");
      }

      // Standardized token update
      if (newRefresh) {
        setAuthCookies(newAccess, newRefresh);
      } else {
        setCookie("accessToken", newAccess, 7);
      }

      return newAccess;
    } catch (error) {
      console.error("ApiClient: Refresh token failed", error);
      throw error;
    }
  }

  private processQueue(error: unknown, token: string | null = null) {
    this.queue.forEach(({ resolve, reject }) => {
      if (error) reject(error);
      else resolve(token!);
    });
    this.queue = [];
  }

  private async handleResponseError(error: AxiosError) {
    const originalReq = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // If it's a 401 or 403 error and we haven't retried yet
    const status = error.response?.status;
    const isAuthError =
      (status === 401 || status === 403) && !originalReq._retry;

    if (isAuthError) {
      console.log(
        `ApiClient: Intercepted ${status} error, attempting refresh...`,
      );
      // CRITICAL: If the failed request IS the refresh request, do not retry
      // This prevents infinite loops if the refresh token is also invalid
      if (originalReq.url?.includes(API_ROUTES.AUTH.REFRESH_TOKEN)) {
        this.redirectToLogin();
        return Promise.reject(error);
      }

      // We proceed to try refreshing even if we can't see the refresh token (might be HttpOnly)

      originalReq._retry = true;

      // If already refreshing, queue this request
      if (this.isRefreshing) {
        return new Promise((resolve, reject) => {
          this.queue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalReq.headers) {
              originalReq.headers.Authorization = `Bearer ${token}`;
            }
            return this.axios.request(originalReq);
          })
          .catch((err) => Promise.reject(err));
      }

      this.isRefreshing = true;
      try {
        const newToken = await this.refreshAccessToken();
        this.isRefreshing = false;
        this.processQueue(null, newToken);

        if (originalReq.headers) {
          originalReq.headers.Authorization = `Bearer ${newToken}`;
        }
        return this.axios.request(originalReq);
      } catch (refreshError) {
        this.isRefreshing = false;
        this.processQueue(refreshError, null);
        this.redirectToLogin();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }

  private redirectToLogin() {
    clearAuthCookies();
    if (typeof window !== "undefined") {
      const loginPath = ROUTES.AUTH.LOGIN.replace(/\/$/, "");
      const currentPath = window.location.pathname.replace(/\/$/, "");

      if (currentPath !== loginPath) {
        console.error("ApiClient: Session expired, redirecting to login.");
        window.location.href = ROUTES.AUTH.LOGIN;
      }
    }
  }

  public get instance(): AxiosInstance {
    return this.axios;
  }
}

export const api = new ApiClient().instance;
