export interface Lead {
  id: number;
  phone_number: string;
  name: string;
  last_message: string;
  last_active: string;
  stage: "new" | "engaged" | "followup" | "closed";
  created_at: string;
  // UI helpers
  avatar?: string;
}

export interface Activity {
  id: number;
  type: "message" | "bot" | "calendar" | "alert" | "check";
  text: string;
  timestamp: string;
  is_outgoing: boolean;
  time?: string; // UI friendly time
}

export interface Meeting {
  id: string;
  time: string;
  client: string;
  agent: string;
  status: "upcoming" | "done" | "missed";
  type: string;
}

export interface CRMStats {
  leads_today: number;
  active_chats: number;
  meetings_today: number;
}
