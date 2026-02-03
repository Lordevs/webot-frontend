"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";

interface LegalContentProps {
  content: string;
}

export function LegalContent({ content }: LegalContentProps) {
  return (
    <main className="min-h-screen pt-32 pb-40 bg-popover/70 selection:bg-primary/20 selection:text-primary">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main Title Area */}
          <div className="mb-20">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-8 tracking-tight">
              {content.split("\n")[0].replace("# ", "")}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}>
              <p className="text-[13px] font-bold text-primary mb-2 uppercase tracking-wide">
                Effective Date:{" "}
                {new Date().toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </motion.div>
          </div>

          {/* Clean Editorial Content */}
          <div className="relative">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: () => null, // Hidden as we handle it above
                h2: ({ children }) => (
                  <h2 className="font-serif text-2xl font-bold text-foreground mt-16 mb-8">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="font-serif text-xl font-bold text-foreground mt-10 mb-6">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-muted-foreground leading-[1.7] text-[17px] font-normal mb-8">
                    {children}
                  </p>
                ),
                strong: ({ children }) => (
                  <strong className="text-foreground font-bold underline decoration-primary/20 underline-offset-4 decoration-2">
                    {children}
                  </strong>
                ),
                ul: ({ children }) => (
                  <ul className="space-y-4 my-10 pl-6 list-disc marker:text-primary/60">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="space-y-8 my-10 pl-6 list-decimal marker:text-primary/60">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="text-muted-foreground text-[17px] font-normal leading-[1.7] mb-4 last:mb-0">
                    {children}
                  </li>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    className="text-primary font-medium underline decoration-primary/30 underline-offset-4 hover:decoration-primary transition-all">
                    {children}
                  </a>
                ),
                hr: () => <hr className="border-border/30 my-16" />,
                blockquote: ({ children }) => (
                  <blockquote className="border-l-[3px] border-primary/40 pl-8 py-4 text-muted-foreground/90 italic my-12 bg-primary/5 rounded-r-lg">
                    {children}
                  </blockquote>
                ),
              }}>
              {content}
            </ReactMarkdown>
          </div>

          {/* Minimalist Signature */}
          <div className="mt-40 pt-10 border-t border-border/40 text-center md:text-left">
            <p className="text-[12px] font-bold text-muted-foreground uppercase tracking-[0.4em]">
              Webot &mdash; Refined Efficiency &mdash;{" "}
              {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
