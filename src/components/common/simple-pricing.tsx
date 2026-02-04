"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Sparkles, ArrowRight, Check, Star, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const plans = [
  {
    id: "starter",
    name: "Starter",
    icon: Star,
    price: "Free during beta",
    description:
      "Experience the power of Webot without any costs while we're in beta.",
    features: [
      "WhatsApp Appointment Booking",
      "Google Calendar Sync",
      "Auto Confirmations",
      "Personalized Bot Name",
      "Community Support",
    ],
    cta: "Join the Beta",
    popular: true,
  },
  {
    id: "pro",
    name: "Pro",
    icon: Zap,
    price: "Coming Soon",
    description:
      "Advanced automation features for growing businesses and teams.",
    features: [
      "Multiple AI Workflows",
      "Bulk Message Updates",
      "Advanced Analytics",
      "Priority API Access",
      "Dedicated Account Support",
    ],
    cta: "Get Notified",
    comingSoon: true,
  },
];

export default function SimplePricing() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section id="pricing" className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="flex flex-col items-center space-y-2">
            <Badge
              variant="outline"
              className="px-5 py-2 rounded-full border-primary/20 text-primary bg-primary/5 font-black text-[10px] tracking-[0.2em] uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5 mr-2" />
              Pricing Plans
            </Badge>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]">
              Pick the perfect plan <br />
              <span className="text-primary italic font-bold">
                for your needs
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto font-medium pt-4">
              Simple, transparent pricing to get you started. Focus on your
              growth while we handle the scheduling.
            </motion.p>
          </div>

          <div className="mt-8 grid w-full max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="flex">
                <Card
                  className={cn(
                    "bg-card relative h-full w-full text-left transition-all duration-300 hover:shadow-lg rounded-[2.5rem] p-4",
                    plan.popular
                      ? "ring-primary/50 dark:shadow-primary/10 shadow-md ring-2"
                      : "hover:border-primary/30 border-dashed",
                    plan.popular &&
                      "from-primary/5 bg-linear-to-b to-transparent",
                    plan.comingSoon && "opacity-80 cursor-not-allowed",
                  )}>
                  {(plan.popular || plan.comingSoon) && (
                    <div className="absolute -top-3 right-0 left-0 mx-auto w-fit">
                      <Badge
                        className={cn(
                          "rounded-full px-4 py-1 shadow-sm font-black text-[10px] tracking-widest uppercase",
                          plan.popular
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground border border-muted-foreground/20",
                        )}>
                        {plan.popular && (
                          <Sparkles className="mr-1 h-3.5 w-3.5" />
                        )}
                        {plan.popular ? "Active Beta" : "Roadmap"}
                      </Badge>
                    </div>
                  )}
                  <CardHeader
                    className={cn(
                      "pb-4",
                      (plan.popular || plan.comingSoon) && "pt-8",
                    )}>
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-2xl",
                          plan.popular
                            ? "bg-primary/20 text-primary"
                            : "bg-muted text-muted-foreground",
                        )}>
                        <plan.icon className="h-5 w-5" />
                      </div>
                      <CardTitle
                        className={cn(
                          "text-2xl font-bold tracking-tight",
                          plan.popular && "text-primary text-3xl",
                        )}>
                        {plan.name}
                      </CardTitle>
                    </div>
                    <CardDescription className="mt-4 space-y-4">
                      <p className="text-sm font-medium leading-relaxed">
                        {plan.description}
                      </p>
                      <div className="pt-4">
                        <span
                          className={cn(
                            "text-2xl font-black tracking-tight",
                            plan.popular
                              ? "text-foreground"
                              : "text-muted-foreground/70",
                          )}>
                          {plan.price}
                        </span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4 pb-8 flex-1">
                    {plan.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 text-sm">
                        <div
                          className={cn(
                            "flex h-5 w-5 items-center justify-center rounded-full shrink-0",
                            plan.popular
                              ? "bg-primary/20 text-primary"
                              : "bg-muted text-muted-foreground/40",
                          )}>
                          <Check className="h-3.5 w-3.5" />
                        </div>
                        <span
                          className={cn(
                            "font-medium",
                            plan.popular
                              ? "text-foreground"
                              : "text-muted-foreground",
                          )}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter>
                    <Button
                      disabled={plan.comingSoon}
                      variant={plan.popular ? "default" : "outline"}
                      className={cn(
                        "w-full h-12 rounded-2xl font-bold transition-all duration-300",
                        plan.popular
                          ? "bg-primary hover:bg-primary/90 hover:shadow-primary/20 hover:shadow-lg"
                          : "hover:border-primary/30 hover:bg-primary/5 hover:text-primary",
                      )}>
                      {plan.cta}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </CardFooter>

                  {/* Subtle gradient effects */}
                  {plan.popular && (
                    <>
                      <div className="from-primary/5 pointer-events-none absolute right-0 bottom-0 left-0 h-1/2 rounded-[2.5rem] bg-linear-to-t to-transparent" />
                    </>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
