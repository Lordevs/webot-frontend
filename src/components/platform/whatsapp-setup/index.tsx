"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { StatusCard } from "./status-card";
import { ConnectionOptions } from "./connection-options";
import { ChatPreview } from "./chat-preview";

const WhatsAppSetupOverview = () => {
  const [isConnected] = useState(true);
  const [greetingMessage, setGreetingMessage] = useState(
    "Hi there! 👋 I'm your scheduling assistant. I can help you find a time for our meeting. When would you like to connect?",
  );

  const connectionInfo = {
    phoneNumber: "+1 (555) WE-BOT-IT",
    lastMessageReceived: "Just now",
    messagesProcessed: 1284,
    bookingsCreated: 412,
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-screen-2xl mx-auto space-y-10 p-4 lg:p-8 relative">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-0 -z-10 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 -z-10 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <motion.div variants={itemVariants} className="space-y-2">
        <Badge
          variant="outline"
          className="bg-emerald-500/5 border-emerald-500/20 text-emerald-600 font-bold uppercase tracking-[0.2em] text-[10px] px-4 py-1 rounded-full">
          Channel Configuration
        </Badge>
        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
          WhatsApp{" "}
          <span className="text-emerald-600 relative inline-block">
            Integration
            <span className="absolute bottom-1 left-0 w-full h-3 bg-emerald-500/10 -z-10" />
          </span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
          Manage your automated booking assistant on WhatsApp. Customize the
          greeting, monitor system throughput, and scale your customer
          connections.
        </p>
      </motion.div>

      {/* Status Matrix */}
      <motion.div variants={itemVariants}>
        <StatusCard isConnected={isConnected} connectionInfo={connectionInfo} />
      </motion.div>

      {/* Deployment Modes */}
      {/* <motion.div variants={itemVariants}>
        <ConnectionOptions isConnected={isConnected} />
      </motion.div> */}

      {/* Flow Engineering */}
      <motion.div variants={itemVariants}>
        <ChatPreview
          greetingMessage={greetingMessage}
          setGreetingMessage={setGreetingMessage}
        />
      </motion.div>
    </motion.div>
  );
};

export default WhatsAppSetupOverview;
