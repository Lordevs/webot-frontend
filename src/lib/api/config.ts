/**
 * Shared API Configuration
 * Centralized configuration for API base URL
 * Works in both client and server contexts
 */

/**
 * Get the API base URL
 * Checks environment variables in order of preference
 * @returns The API base URL (e.g., "http://localhost:8000" or "https://api.example.com")
 */
export function getApiBaseUrl(): string {
  // Check NEXT_PUBLIC_BACKEND_URL first (used by client-side api.ts)
  if (process.env.NEXT_PUBLIC_BACKEND_URL) {
    const url = process.env.NEXT_PUBLIC_BACKEND_URL.trim();
    // Remove trailing slash if present
    return url.replace(/\/+$/, "");
  }

  // Check NEXT_PUBLIC_API_BASE_URL (alternative naming)
  if (process.env.NEXT_PUBLIC_API_BASE_URL) {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL.trim();
    // Remove trailing slash if present
    return url.replace(/\/+$/, "");
  }

  // Check API_BASE_URL (server-side only)
  if (process.env.API_BASE_URL) {
    const url = process.env.API_BASE_URL.trim();
    // Remove trailing slash if present
    return url.replace(/\/+$/, "");
  }

  // Default fallback
  return "http://localhost:8000";
}

/**
 * Get the full API URL for a given route
 * @param route - The API route (e.g., "users/register/")
 * @returns The full API URL
 */
export function getApiUrl(route: string): string {
  const baseUrl = getApiBaseUrl();
  // Remove leading slash from route if present
  const cleanRoute = route.startsWith("/") ? route.slice(1) : route;
  // Ensure baseUrl doesn't end with / and route doesn't start with /
  return `${baseUrl.replace(/\/$/, "")}/${cleanRoute}`;
}
