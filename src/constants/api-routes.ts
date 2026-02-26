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
    DETAIL: (id: number) => `/api/bots/${id}/`,
    CONNECT_WHATSAPP: (id: number) => `/api/bots/${id}/connect-whatsapp/`,
    ACTIVATE_SUPERADMIN_BOT: (id: number) =>
      `/api/bots/${id}/activate-superadmin-bot/`,
    DEACTIVATE_SUPERADMIN_BOT: (id: number) =>
      `/api/bots/${id}/deactivate-superadmin-bot/`,
  },
  BUSINESS: {
    PROFILE: (botId: number) => `/api/bots/${botId}/setup/`,
    CONTEXT: (botId: number) => `/api/bots/${botId}/context/`,
    WORKING_HOURS: (botId: number) => `/api/bots/${botId}/working-hours/`,
  },
};
