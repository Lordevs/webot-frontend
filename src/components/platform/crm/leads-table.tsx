import { Eye, MoreHorizontal, User } from "lucide-react";
import { Lead } from "@/types/crm";
import { mockLeads } from "@/data/mock-data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface LeadsTableProps {
  onSelectLead: (lead: Lead) => void;
}

const stageConfig: Record<
  string,
  {
    label: string;
    variant: "default" | "secondary" | "outline" | "destructive";
  }
> = {
  new: { label: "New", variant: "default" },
  engaged: { label: "Engaged", variant: "secondary" },
  followup: { label: "Follow-up", variant: "outline" },
  closed: { label: "Closed", variant: "outline" },
};

export default function LeadsTable({ onSelectLead }: LeadsTableProps) {
  return (
    <Card className="shadow-none border-border/50">
      <CardHeader className="py-4 border-b flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-semibold tracking-tight">
          Leads Workspace
        </CardTitle>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="px-5 py-3 text-[11px] uppercase tracking-wider">
                Contact
              </TableHead>
              <TableHead className="px-5 py-3 text-[11px] uppercase tracking-wider">
                Last Message
              </TableHead>
              <TableHead className="px-5 py-3 text-[11px] uppercase tracking-wider">
                Active
              </TableHead>
              <TableHead className="px-5 py-3 text-[11px] uppercase tracking-wider">
                Stage
              </TableHead>
              <TableHead className="px-5 py-3 text-[11px] uppercase tracking-wider">
                Meeting
              </TableHead>
              <TableHead className="px-5 py-3 text-[11px] uppercase tracking-wider">
                Agent
              </TableHead>
              <TableHead className="px-5 py-3 text-[11px] uppercase tracking-wider">
                Score
              </TableHead>
              <TableHead className="px-5 py-3 text-[11px] uppercase tracking-wider"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockLeads.map((lead) => (
              <TableRow
                key={lead.id}
                className="cursor-pointer group hover:bg-muted/50 transition-colors"
                onClick={() => onSelectLead(lead)}>
                <TableCell className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="text-[10px] bg-primary/10 text-primary font-bold">
                        {lead.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold leading-none">
                        {lead.name}
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-1">
                        {lead.phone}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-5 py-4">
                  <p className="text-xs text-muted-foreground truncate max-w-[180px]">
                    {lead.lastMessage}
                  </p>
                </TableCell>
                <TableCell className="px-5 py-4">
                  <span className="text-[11px] text-muted-foreground font-medium">
                    {lead.lastActive}
                  </span>
                </TableCell>
                <TableCell className="px-5 py-4">
                  <Badge
                    variant={stageConfig[lead.stage].variant}
                    className="text-[10px] font-bold px-2 py-0">
                    {stageConfig[lead.stage].label}
                  </Badge>
                </TableCell>
                <TableCell className="px-5 py-4">
                  <span className="text-[11px] font-medium">
                    {lead.nextMeeting || "—"}
                  </span>
                </TableCell>
                <TableCell className="px-5 py-4">
                  <Avatar className="w-6 h-6 border-2 border-background shadow-sm">
                    <AvatarFallback className="text-[8px] bg-muted font-bold">
                      {lead.assignedAgent}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <Progress
                      value={lead.interactionScore}
                      className="h-1.5 w-16 bg-muted [&>div]:bg-primary"
                    />
                    <span className="text-[10px] font-bold text-muted-foreground">
                      {lead.interactionScore}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="px-5 py-4 text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 h-8 w-8 transition-opacity">
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
