"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  RefreshCw,
  X,
  MessageCircle,
  CalendarDays,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/common/icons";
import { motion } from "framer-motion";

export interface Appointment {
  id: number;
  customer: string;
  email: string;
  date: string;
  time: string;
  duration: string;
  status: "confirmed" | "cancelled" | "completed";
  source: "whatsapp";
  meetLink: string;
}

interface AppointmentsTableProps {
  appointments: Appointment[];
  onViewDetails: (apt: Appointment) => void;
}

export const AppointmentsTable = ({
  appointments,
  onViewDetails,
}: AppointmentsTableProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAppointments = appointments.filter(
    (apt) =>
      apt.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getStatusBadge = (status: Appointment["status"]) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge className="bg-primary/10 text-primary border-primary/20 font-bold hover:bg-primary/20">
            Confirmed
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 font-bold">
            Completed
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-destructive/10 text-destructive border-destructive/20 font-bold">
            Cancelled
          </Badge>
        );
    }
  };

  return (
    <Card className="border-border/40 gap-0 py-0 bg-card/60 backdrop-blur-sm shadow-2xl shadow-black/2 rounded-4xl overflow-hidden">
      <CardHeader className="p-8 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
            <Input
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 pl-12 rounded-2xl bg-muted/20 border-border/50 focus:bg-background transition-all font-medium"
            />
          </div>
          <Button
            variant="outline"
            className="h-12 px-6 rounded-2xl font-bold gap-2 border-border/50 bg-background/50">
            <Filter className="w-4 h-4" />
            Filter Records
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-8 pt-6">
        <div className="rounded-3xl border border-border/50 overflow-hidden bg-background/30 shadow-inner">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 border-border/50 hover:bg-muted/30">
                <TableHead className="py-5 font-black uppercase tracking-widest text-[10px] text-muted-foreground/60">
                  Customer
                </TableHead>
                <TableHead className="py-5 font-black uppercase tracking-widest text-[10px] text-muted-foreground/60">
                  Date & Time
                </TableHead>
                <TableHead className="py-5 font-black uppercase tracking-widest text-[10px] text-muted-foreground/60">
                  Duration
                </TableHead>
                <TableHead className="py-5 font-black uppercase tracking-widest text-[10px] text-muted-foreground/60">
                  Status
                </TableHead>
                <TableHead className="py-5 font-black uppercase tracking-widest text-[10px] text-muted-foreground/60">
                  Source
                </TableHead>
                <TableHead className="py-5 w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAppointments.map((apt) => (
                <TableRow
                  key={apt.id}
                  className="border-border/40 hover:bg-primary/5 transition-colors group">
                  <TableCell className="py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-primary text-background flex items-center justify-center font-black text-xs shadow-lg shadow-primary/20">
                        {apt.customer
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="font-bold text-foreground group-hover:text-primary transition-colors">
                          {apt.customer}
                        </p>
                        <p className="text-xs font-medium text-muted-foreground/70">
                          {apt.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-0.5">
                      <p className="font-bold text-sm text-foreground">
                        {apt.date}
                      </p>
                      <p className="text-xs font-bold text-primary">
                        {apt.time}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-black text-xs uppercase tracking-wider text-muted-foreground/60">
                      {apt.duration}
                    </span>
                  </TableCell>
                  <TableCell>{getStatusBadge(apt.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                      <WhatsAppIcon className="w-3.5 h-3.5" />
                      WhatsApp
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-10 w-10 rounded-xl hover:bg-primary/10 transition-all">
                          <MoreHorizontal className="w-5 h-5 text-muted-foreground/60" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="rounded-2xl border-border/50 shadow-2xl shadow-black/10">
                        <DropdownMenuItem
                          onClick={() => onViewDetails(apt)}
                          className="py-3 px-4 font-bold text-sm focus:bg-primary focus:text-background cursor-pointer gap-3">
                          <Eye className="w-4 h-4" />
                          View Details
                        </DropdownMenuItem>
                        {apt.status === "confirmed" && (
                          <>
                            <DropdownMenuItem className="py-3 px-4 font-bold text-sm focus:bg-primary focus:text-background cursor-pointer gap-3">
                              <RefreshCw className="w-4 h-4" />
                              Reschedule
                            </DropdownMenuItem>
                            <DropdownMenuItem className="py-3 px-4 font-bold text-sm text-destructive focus:bg-destructive focus:text-background cursor-pointer gap-3">
                              <X className="w-4 h-4" />
                              Cancel Booking
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredAppointments.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24">
            <div className="w-20 h-20 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CalendarDays className="w-10 h-10 text-muted-foreground/20" />
            </div>
            <h3 className="text-xl font-bold text-foreground">
              No appointments found
            </h3>
            <p className="text-muted-foreground font-medium mt-1">
              Try adjusting your search filters.
            </p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};
