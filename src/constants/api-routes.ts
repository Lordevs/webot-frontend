export const API_ROUTES = {
  AUTH: {
    LOGIN: "/api/users/auth/login/",
    SIGNUP: "/api/users/auth/signup/",
    LOGOUT: "/api/users/auth/logout/",
    REFRESH_TOKEN: "/api/users/auth/refresh-token/",
    FORGOT_PASSWORD: "/api/users/auth/forgot-password/",
    RESET_PASSWORD: "/api/users/auth/reset-password/",
    CHANGE_PASSWORD: "/api/users/auth/change-password/",
    PROFILE_ME: "/api/users/me/",
    GOOGLE_AUTH_INIT: "/api/users/auth/google/",
    PHONE_UPDATE: "/api/users/phone/update/",
    PHONE_RESEND: "/api/users/phone/resend-code/",
    PHONE_VERIFY: "/api/users/phone/verify/",
  },
  GOOGLE_CALENDAR: {
    CONNECT: "/api/google-calendar/connect/",
    CALLBACK: "/api/google-calendar/callback/",
    DISCONNECT: "/api/google-calendar/disconnect/",
  },
  MEETINGS: {
    LIST: "/api/meetings/",
    RETRIEVE: (id: string | number) => `/api/meetings/${id}/`,
    DELETE: (id: string | number) => `/api/meetings/${id}/`,
  },
  BOTS: {
    LIST: "/api/bots/",
    CREATE: "/api/bots/",
    MY_BOT: "/api/bots/me/",
    CONNECT_WHATSAPP: (id: number) => `/api/bots/${id}/connect-whatsapp/`,
    ACTIVATE_SUPERADMIN_BOT: (id: number | string) =>
      `/api/bots/${id}/activate-superadmin-bot/`,
    DEACTIVATE_SUPERADMIN_BOT: (id: number | string) =>
      `/api/bots/${id}/deactivate-superadmin-bot/`,
  },
  CRM: {
    STATS: "/api/crm/leads/stats/",
    LEADS: "/api/crm/leads/",
    LEAD_ACTIVITY: (id: number | string) => `/api/crm/leads/${id}/activity/`,
  },
  BUSINESS: {
    SETUP: (botId: number | string) => `/api/bots/${botId}/setup/`,
    CONTEXT: (botId: number | string) => `/api/bots/${botId}/context/`,
    WORKING_HOURS: (botId: number | string) =>
      `/api/bots/${botId}/working-hours/`,
  },
};
