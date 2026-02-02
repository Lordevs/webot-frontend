"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Calendar,
  Shield,
  Users,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";
import { GridPattern } from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";

const HeroSection = () => {
  const scrollToHowItWorks = () => {
    document
      .getElementById("how-it-works")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" },
  };

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Grid Pattern Background */}
      <GridPattern
        width={40}
        height={40}
        x={-1}
        y={-1}
        className={cn(
          "mask-[radial-gradient(1050px_circle_at_center,white,transparent)] stroke-primary/10 dark:stroke-primary/5",
        )}
      />

      {/* Decorative Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-primary/3 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-primary/2 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-32 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left content */}
          <motion.div
            variants={containerVariants}
            initial="initial"
            animate="animate"
            className="text-center lg:text-left space-y-7">
            {/* Badge */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-primary/5 border border-primary/15 self-center lg:self-start">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-[12px] font-bold text-primary uppercase tracking-widest">
                Now in Beta — Limited Access
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-bold leading-[1.1] tracking-tight">
              Schedule Meetings{" "}
              <span className="text-gradient-primary">Directly From</span>{" "}
              <span className="relative inline-block text-primary">
                WhatsApp
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3"
                  viewBox="0 0 200 12"
                  fill="none">
                  <path
                    d="M2 10C50 4 150 4 198 10"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              variants={fadeInUp}
              className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Automatically book Google Calendar meetings by chatting on
              WhatsApp.
              <span className="text-foreground font-semibold">
                {" "}
                No emails. No back-and-forth.
              </span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="group shadow-glow rounded-full bg-linear-to-tl from-primary to-secondary-foreground">
                Connect WhatsApp
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full"
                onClick={scrollToHowItWorks}>
                View how it works
              </Button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row flex-wrap gap-x-8 gap-y-3 justify-center lg:justify-start pt-2">
              <div className="flex items-center gap-2.5 text-[13px] text-muted-foreground font-semibold uppercase tracking-wider">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-3 h-3 text-primary" />
                </div>
                <span>Google Calendar Sync</span>
              </div>
              <div className="flex items-center gap-2.5 text-[13px] text-muted-foreground font-semibold uppercase tracking-wider">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="w-3 h-3 text-primary" />
                </div>
                <span>Secure OAuth 2.0</span>
              </div>
              <div className="flex items-center gap-2.5 text-[13px] text-muted-foreground font-semibold uppercase tracking-wider">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-3 h-3 text-primary" />
                </div>
                <span>Teams Ready</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right content - Chat mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative">
            <div className="relative max-w-[340px] mx-auto">
              {/* Phone frame */}
              <div className="relative bg-[#1d1d1f] rounded-[3rem] p-3 shadow-2xl border border-white/10">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#1d1d1f] rounded-b-3xl z-20" />

                <div className="bg-card rounded-[2.5rem] overflow-hidden border border-white/5">
                  {/* WhatsApp header */}
                  <div className="bg-[#075E54] px-4 py-4 flex items-center gap-3 pt-10">
                    <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-bold text-sm leading-tight">
                        ScheduleBot
                      </p>
                      <p className="text-white/70 text-[10px] flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />{" "}
                        online
                      </p>
                    </div>
                    <div className="flex gap-4 text-white/80">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24">
                        <path d="M17.25 6.75L22.5 12l-5.25 5.25M6.75 17.25L1.5 12l5.25-5.25" />
                      </svg>
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24">
                        <circle cx="12" cy="5" r="2" />
                        <circle cx="12" cy="12" r="2" />
                        <circle cx="12" cy="19" r="2" />
                      </svg>
                    </div>
                  </div>

                  {/* Chat messages */}
                  <div className="p-4 space-y-3 min-h-[400px] bg-[#e5ddd5] bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat">
                    {/* User message */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 }}
                      className="flex justify-end">
                      <div className="chat-bubble chat-bubble-user max-w-[80%] shadow-sm">
                        <p className="text-[13px] leading-relaxed">
                          Schedule a meeting with Alex tomorrow at 3 PM
                        </p>
                        <p className="text-[9px] text-foreground/40 text-right mt-1 flex items-center justify-end gap-1 font-bold">
                          10:24
                          <CheckCircle2 className="w-2.5 h-2.5 text-[#53bdeb]" />
                        </p>
                      </div>
                    </motion.div>

                    {/* Bot response */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.8 }}
                      className="flex justify-start">
                      <div className="chat-bubble chat-bubble-bot max-w-[85%] shadow-sm">
                        <p className="text-[13px] leading-relaxed">
                          Got it! I'll schedule a meeting with Alex for:
                        </p>
                        <div className="mt-2.5 p-2.5 rounded-xl bg-primary/5 border border-primary/10">
                          <p className="text-[11px] font-bold text-primary mb-1 uppercase tracking-wider">
                            Proposed Event
                          </p>
                          <p className="text-[12px] font-semibold">
                            📅 Tomorrow, Feb 3
                          </p>
                          <p className="text-[12px] font-semibold">
                            🕒 3:00 PM — 30 min
                          </p>
                          <p className="text-[12px] font-semibold text-blue-600">
                            📍 Google Meet link
                          </p>
                        </div>
                        <p className="text-[9px] text-muted-foreground text-right mt-1.5 font-bold">
                          10:24
                        </p>
                      </div>
                    </motion.div>

                    {/* Confirmation buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 2.6 }}
                      className="flex justify-start">
                      <div className="chat-bubble chat-bubble-bot max-w-[220px]! shadow-sm">
                        <p className="text-[13px] font-bold mb-2.5">
                          Confirm booking?
                        </p>
                        <div className="flex gap-2">
                          <button className="flex-1 px-3 py-2 bg-[#25D366] text-white rounded-xl text-[11px] font-bold shadow-sm hover:opacity-90 transition-opacity">
                            Confirm
                          </button>
                          <button className="flex-1 px-3 py-2 bg-muted text-muted-foreground rounded-xl text-[11px] font-bold hover:bg-muted/80 transition-colors">
                            Edit
                          </button>
                        </div>
                        <p className="text-[9px] text-muted-foreground text-right mt-1.5 font-bold">
                          10:24
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Input bar */}
                  <div className="bg-[#f0f0f0] px-3 py-3 flex items-center gap-2.5">
                    <div className="flex-1 bg-white rounded-full px-4 py-2 flex items-center">
                      <span className="text-muted-foreground/60 text-[13px] font-medium">
                        Type a message...
                      </span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center shadow-sm">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24">
                        <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating calendar notification */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -right-6 lg:-right-16 top-24 bg-card rounded-2xl p-4 shadow-2xl border border-border hidden sm:block z-30">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#4285F4] flex items-center justify-center shadow-lg">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1">
                      Google Calendar
                    </p>
                    <p className="text-sm font-bold tracking-tight">
                      Meeting Booked!
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Floating WhatsApp badge */}
              <motion.div
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -left-6 lg:-left-12 bottom-32 bg-card rounded-2xl p-3 shadow-2xl border border-border hidden sm:block z-30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#25D366] flex items-center justify-center shadow-lg">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-6 h-6 text-white fill-current">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold tracking-tight">
                    WhatsApp Active
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:block">
        <div className="w-7 h-11 rounded-full border-2 border-primary/20 flex justify-center pt-2">
          <motion.div
            animate={{ height: [4, 8, 4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 bg-primary/40 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
