import { Eye, Smartphone } from "lucide-react";
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
    <Card className="h-[500px] py-0 gap-0 flex flex-col border-none bg-[#FCFDFF] shadow-[0_15px_50px_-15px_rgba(0,0,0,0.03)] rounded-[3rem] overflow-hidden group/container transition-all duration-700">
      <CardHeader className="p-8 px-10 border-b border-muted/20 flex flex-row items-center justify-between shrink-0 bg-white/40 backdrop-blur-md z-10">
        <div>
          <CardTitle className="text-xl font-black tracking-tight text-foreground">
            Leads Workspace
          </CardTitle>
          {/* <div className="flex items-center gap-3 mt-1.5">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-4 h-4 rounded-full border-2 border-white bg-primary/20"
                />
              ))}
            </div>
            <p className="text-[9px] text-primary font-black uppercase tracking-[0.3em]">
              Real-time Intelligence
            </p>
          </div> */}
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto custom-scrollbar p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-none bg-secondary/30 hover:bg-secondary/30">
              <TableHead className="px-10 py-5 text-[9px] uppercase tracking-[0.3em] font-black text-primary/40">
                Identity
              </TableHead>
              <TableHead className="px-10 py-5 text-[9px] uppercase tracking-[0.3em] font-black text-primary/40">
                Transmission
              </TableHead>
              <TableHead className="px-10 py-5 text-[9px] uppercase tracking-[0.3em] font-black text-primary/40 text-center">
                Status
              </TableHead>
              <TableHead className="px-10 py-5 text-[9px] uppercase tracking-[0.3em] font-black text-primary/40">
                Milestone
              </TableHead>
              <TableHead className="px-10 py-5 text-[10px] uppercase tracking-[0.3em] font-black text-primary/40 text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockLeads.map((lead) => (
              <TableRow
                key={lead.id}
                className="cursor-pointer group border-b border-muted/10 last:border-none hover:bg-primary/1 transition-all duration-500"
                onClick={() => onSelectLead(lead)}>
                <TableCell className="px-10 py-6">
                  <div className="flex items-center gap-5">
                    <div className="relative">
                      <Avatar className="w-12 h-12 rounded-[1.25rem] border-4 border-white shadow-lg ring-1 ring-black/5 transition-all duration-500 group-hover:scale-110 group-hover:rotate-2">
                        <AvatarFallback className="text-[12px] bg-primary/5 text-primary font-black uppercase">
                          {lead.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full border-2 border-white shadow-sm scale-0 group-hover:scale-100 transition-transform duration-500" />
                    </div>
                    <div>
                      <p className="text-sm font-black tracking-tight text-foreground group-hover:text-primary transition-colors leading-none">
                        {lead.name}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Smartphone className="w-3 h-3 text-muted-foreground/40" />
                        <p className="text-[10px] text-muted-foreground/60 font-bold tabular-nums tracking-wider uppercase">
                          {lead.phone}
                        </p>
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-10 py-6">
                  <div className="max-w-[220px]">
                    <p className="text-xs text-foreground/60 font-medium truncate italic leading-relaxed">
                      "{lead.lastMessage}"
                    </p>
                  </div>
                </TableCell>
                <TableCell className="px-10 py-6 text-center">
                  <span className="text-[9px] bg-primary/5 text-primary font-black px-3 py-1.5 rounded-xl ring-1 ring-primary/10 shadow-sm uppercase tracking-widest">
                    {lead.lastActive}
                  </span>
                </TableCell>
                <TableCell className="px-10 py-6">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8_rgba(16,185,129,0.5)] shrink-0" />
                    <span className="text-[11px] font-black text-foreground/60 tabular-nums">
                      {lead.nextMeeting || "Unscheduled"}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="px-10 py-6 text-right">
                  <div className="flex justify-end opacity-0 group-hover:opacity-100 group-hover:translate-x-[-10px] transition-all duration-500">
                    <Button
                      size="icon"
                      className="h-10 w-10 rounded-2xl bg-primary text-white shadow-lg shadow-primary/40 hover:scale-110 active:scale-95 transition-all">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
