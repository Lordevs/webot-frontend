import { MessageSquare, Calendar, Bot, Users, PlusCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function StatusBar() {
  const statusItems = [
    {
      icon: <MessageSquare className="w-4 h-4 text-emerald-500" />,
      bg: "bg-emerald-500/10",
      label: "WhatsApp",
      status: "Connected",
      online: true,
    },
    {
      icon: <Calendar className="w-4 h-4 text-primary" />,
      bg: "bg-primary/10",
      label: "Calendar",
      status: "Synced 2m ago",
      online: true,
    },
    {
      icon: <Bot className="w-4 h-4 text-emerald-500" />,
      bg: "bg-emerald-500/10",
      label: "Bot",
      status: "Auto-reply active",
      online: true,
    },
  ];

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {statusItems.map((item, idx) => (
        <Card
          key={idx}
          className="shadow-none border-border/50 min-w-[170px] flex-1 sm:flex-none">
          <CardContent className="p-3 flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-lg ${item.bg} flex items-center justify-center shrink-0`}>
              {item.icon}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-semibold text-foreground leading-tight">
                  {item.label}
                </span>
                {item.online && (
                  <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                )}
              </div>
              <p className="text-[10px] text-muted-foreground truncate leading-tight">
                {item.status}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}

      <Card className="shadow-none border-border/50 min-w-[140px] flex-1 sm:flex-none">
        <CardContent className="p-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
            <Users className="w-4 h-4 text-orange-500" />
          </div>
          <div>
            <span className="text-base font-bold text-foreground leading-tight">
              12
            </span>
            <p className="text-[10px] text-muted-foreground leading-tight">
              Active Chats
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="ml-auto flex items-center gap-3">
        <Button
          size="sm"
          variant="outline"
          className="h-10 px-4 gap-2 rounded-xl border-border/50 shadow-none hover:bg-accent/50">
          <Calendar className="w-4 h-4" />
          Schedule Meeting
        </Button>
        <Button size="sm" className="h-10 px-4 gap-2 rounded-xl shadow-none">
          <PlusCircle className="w-4 h-4" />
          Add Lead
        </Button>
      </div>
    </div>
  );
}
