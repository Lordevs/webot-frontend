"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  Heart,
  Twitter,
  Linkedin,
  Github,
  Instagram,
  ArrowUpRight,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
  ],
};

const CONTACT_EMAIL = "hello@webot.com";

const Footer = () => {
  return (
    <footer className="relative pt-20 pb-10 overflow-hidden border-t border-border/40">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-primary-foreground font-bold italic">
                  W
                </span>
              </div>
              <span className="font-bold text-2xl tracking-tighter">Webot</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-sm font-medium leading-relaxed max-w-sm">
              The AI-powered scheduling engine that works where you do. Automate
              your business conversations and bookings through the power of
              WhatsApp.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-foreground/40">
                Get in touch
              </span>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-sm font-bold text-foreground hover:text-primary transition-colors">
                {CONTACT_EMAIL}
              </a>
            </motion.div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-6 flex md:justify-end gap-16">
            <LinkGroup title="Legal" links={footerLinks.legal} delay={0.3} />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="space-y-6">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-foreground">
                Connect
              </h4>
              <div className="flex items-center gap-3">
                <SocialIcon icon={Twitter} />
                <SocialIcon icon={Linkedin} />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}>
          <Separator className="bg-border/50" />
        </motion.div>

        {/* Bottom Bar */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-[11px] font-bold tracking-[0.2em] uppercase">
            &copy; {new Date().getFullYear()} Webot. All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

const LinkGroup = ({
  title,
  links,
  delay,
}: {
  title: string;
  links: { name: string; href: string }[];
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="space-y-6">
    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-foreground">
      {title}
    </h4>
    <nav className="flex flex-col gap-4">
      {links.map((link, idx) => (
        <a
          key={idx}
          href={link.href}
          className="group flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300">
          {link.name}
          <ArrowUpRight className="ml-1 w-3 h-3 opacity-0 group-hover:opacity-100 -translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
        </a>
      ))}
    </nav>
  </motion.div>
);

const SocialIcon = ({ icon: Icon }: { icon: any }) => (
  <div className="w-10 h-10 rounded-xl bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 cursor-pointer transition-all active:scale-95 group shadow-sm">
    <Icon className="w-5 h-5 group-hover:rotate-6 transition-transform" />
  </div>
);

export default Footer;
