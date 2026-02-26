export interface Lead {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  lastMessage: string;
  lastActive: string;
  stage: "new" | "engaged" | "followup" | "closed";
  nextMeeting?: string;
  assignedAgent: string;
  interactionScore: number;
  tags: string[];
}

export interface Activity {
  id: string;
  type: "message" | "bot" | "meeting" | "escalation" | "completed";
  text: string;
  time: string;
  icon: string;
}

export interface Meeting {
  id: string;
  time: string;
  client: string;
  agent: string;
  status: "upcoming" | "done" | "missed";
  type: string;
}
