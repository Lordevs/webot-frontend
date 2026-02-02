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
  product: [
    { name: "Features", href: "#" },
    { name: "How it works", href: "#how-it-works" },
    { name: "Use Cases", href: "#use-cases" },
    { name: "Security", href: "#security" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Cookie Policy", href: "#" },
  ],
  support: [
    { name: "Help Center", href: "#" },
    { name: "Contact Us", href: "#" },
    { name: "Status", href: "#" },
  ],
};

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
          <div className="lg:col-span-4 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                <Calendar className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-2xl tracking-tighter">
                ScheduleBot
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-sm font-medium leading-relaxed max-w-xs">
              The AI-powered scheduling engine that works where you do. Automate
              your life through the power of WhatsApp.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-4">
              <SocialIcon icon={Twitter} />
              <SocialIcon icon={Linkedin} />
              <SocialIcon icon={Github} />
              <SocialIcon icon={Instagram} />
            </motion.div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <LinkGroup
              title="Product"
              links={footerLinks.product}
              delay={0.3}
            />
            <LinkGroup
              title="Support"
              links={footerLinks.support}
              delay={0.4}
            />
            <LinkGroup title="Legal" links={footerLinks.legal} delay={0.5} />
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
            className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
            &copy; 2026 ScheduleBot. Built for the{" "}
            <span className="text-primary italic">future.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
            Built with{" "}
            <Heart className="w-3 h-3 text-primary fill-primary animate-pulse" />{" "}
            for better productivity
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-6">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors uppercase tracking-widest">
                Systems Operational
              </span>
            </div>
          </motion.div>
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
