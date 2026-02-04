"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Receipt } from "lucide-react";
import { motion } from "framer-motion";

export const InvoiceHistory = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}>
      <Card className="border border-border/40 bg-card/60 backdrop-blur-sm shadow-xl shadow-black/2 rounded-4xl overflow-hidden">
        <CardHeader className="p-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Receipt className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl font-black tracking-tight text-foreground">
                Invoice History
              </CardTitle>
              <CardDescription className="text-sm font-medium text-muted-foreground/70">
                View and download your past billing transactions.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8 pt-0">
          <div className="text-center py-20 bg-muted/20 rounded-3xl border border-dashed border-border/50">
            <div className="w-20 h-20 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Receipt className="w-10 h-10 text-muted-foreground/20" />
            </div>
            <h3 className="text-xl font-bold text-foreground">
              No invoices yet
            </h3>
            <p className="text-muted-foreground font-medium mt-1 max-w-xs mx-auto">
              Statements will appear here once you upgrade to a premium
              protocol.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
