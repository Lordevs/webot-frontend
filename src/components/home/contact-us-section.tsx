"use client";

import { motion } from "framer-motion";
import { Mail, MessageSquare, Clock, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ContactUsSection() {
  return (
    <section
      id="contact"
      className="relative py-24 lg:py-32 overflow-hidden bg-background">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.03),transparent_70%)]" />
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-secondary/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-primary/5 blur-[100px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-20 space-y-6 hidden lg:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex justify-center">
            <Badge
              variant="outline"
              className="px-5 py-2 rounded-full border-primary/20 text-primary bg-primary/5 font-black text-[10px] tracking-[0.2em] uppercase">
              <Sparkles className="w-3.5 h-3.5 mr-2" />
              Get In Touch
            </Badge>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]">
            How can we help <br />
            <span className="text-primary italic font-bold">
              your business?
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto font-medium">
            Have questions about WhatsApp automation or custom integrations? Our
            team is here to help you scale your scheduling workflow.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Contact Info & Support Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 space-y-6">
            <div className="space-y-6">
              <ContactInfoCard
                icon={Mail}
                title="Email Us"
                content="hello@webot.com"
                description="We wrap back within 12 hours."
              />
            </div>

            <div className="p-8 rounded-[2.5rem] bg-primary/5 border border-primary/10">
              <p className="text-sm font-bold text-primary mb-2 uppercase tracking-widest">
                Enterprise Needs?
              </p>
              <p className="text-muted-foreground text-sm font-medium leading-relaxed">
                Looking for white-labeled solutions or API-only access? Let's
                discuss how Webot can power your established platform.
              </p>
            </div>
          </motion.div>

          {/* Right Column: The Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7">
            <Card className="overflow-hidden gap-0 py-0 border-border/50 bg-card/50 backdrop-blur-xl shadow-2xl rounded-[3rem]">
              <CardContent className="p-8 lg:p-12">
                <form
                  className="space-y-8"
                  onSubmit={(e) => e.preventDefault()}>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label
                        htmlFor="first-name"
                        className="text-sm font-bold tracking-tight ml-1">
                        First Name
                      </Label>
                      <Input
                        id="first-name"
                        placeholder="Jane"
                        className="h-14 rounded-2xl bg-background/50 border-border/50 focus:ring-primary/20 transition-all font-medium"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label
                        htmlFor="last-name"
                        className="text-sm font-bold tracking-tight ml-1">
                        Last Name
                      </Label>
                      <Input
                        id="last-name"
                        placeholder="Doe"
                        className="h-14 rounded-2xl bg-background/50 border-border/50 focus:ring-primary/20 transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="email"
                      className="text-sm font-bold tracking-tight ml-1">
                      Work Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="jane@company.com"
                      className="h-14 rounded-2xl bg-background/50 border-border/50 focus:ring-primary/20 transition-all font-medium"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="message"
                      className="text-sm font-bold tracking-tight ml-1">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="How can we help you?"
                      className="min-h-[160px] rounded-4xl bg-background/50 border-border/50 focus:ring-primary/20 transition-all font-medium resize-none p-5"
                    />
                  </div>

                  <Button className="w-full h-16 rounded-2xl text-base font-black shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all group">
                    Send Message
                    <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Button>

                  <p className="text-center text-[11px] font-bold text-muted-foreground/60 uppercase tracking-widest">
                    We hate spam as much as you do. Your data is secure.
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ContactInfoCard({
  icon: Icon,
  title,
  content,
  description,
}: {
  icon: any;
  title: string;
  content: string;
  description: string;
}) {
  return (
    <div className="group flex items-start gap-6 p-6 rounded-4xl bg-card border border-border/40 hover:border-primary/30 transition-all duration-300">
      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
        <Icon className="w-6 h-6" />
      </div>
      <div className="space-y-1.5">
        <h3 className="text-sm font-black uppercase tracking-widest text-primary/80">
          {title}
        </h3>
        <p className="text-xl font-bold tracking-tight">{content}</p>
        <p className="text-sm text-muted-foreground font-medium leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
