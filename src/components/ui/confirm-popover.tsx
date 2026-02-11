"use client";

import * as React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface ConfirmPopoverProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void | Promise<void>;
  variant?: "default" | "destructive";
  icon?: React.ReactNode;
  disabled?: boolean;
}

export function ConfirmPopover({
  children,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  variant = "default",
  icon,
  disabled = false,
}: ConfirmPopoverProps) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
      setOpen(false);
    } catch (error) {
      console.error("Confirmation action failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={disabled}>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 overflow-hidden rounded-2xl border-border/50 bg-card/95 backdrop-blur-xl shadow-2xl">
        <div className="p-6 space-y-4">
          <PopoverHeader>
            <div className="flex items-start gap-3">
              {icon || (
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    variant === "destructive"
                      ? "bg-red-500/10 text-red-500"
                      : "bg-amber-500/10 text-amber-500"
                  }`}>
                  <AlertTriangle className="w-5 h-5" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <PopoverTitle className="text-base font-bold text-foreground">
                  {title}
                </PopoverTitle>
                <PopoverDescription className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  {description}
                </PopoverDescription>
              </div>
            </div>
          </PopoverHeader>

          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
              className="flex-1 h-10 rounded-xl font-bold border-border/50 hover:bg-muted/50">
              {cancelText}
            </Button>
            <Button
              variant={variant === "destructive" ? "destructive" : "default"}
              onClick={handleConfirm}
              disabled={loading}
              className={`flex-1 h-10 rounded-xl font-bold ${
                variant === "destructive"
                  ? "bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/20"
                  : "shadow-lg shadow-primary/20"
              }`}>
              {loading ? "Processing..." : confirmText}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
