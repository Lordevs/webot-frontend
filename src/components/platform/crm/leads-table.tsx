import { Eye, MoreHorizontal } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface LeadsTableProps {
  onSelectLead: (lead: Lead) => void;
}

export default function LeadsTable({ onSelectLead }: LeadsTableProps) {
  return (
    <Card className="shadow-none py-0 gap-0 bg-white border-border/50">
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
                Meeting
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
                  <span className="text-[11px] font-medium">
                    {lead.nextMeeting || "—"}
                  </span>
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
