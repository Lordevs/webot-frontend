"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";

interface LegalContentProps {
  content: string;
}

export function LegalContent({ content }: LegalContentProps) {
  return (
    <main className="min-h-screen pt-32 pb-40 bg-[#FDF8F1] selection:bg-[#8b6d4d]/20 selection:text-[#4a3728]">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main Title Area */}
          <div className="mb-20">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-4xl md:text-5xl font-bold text-[#453225] mb-8 tracking-tight">
              Privacy Policy for Webot
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}>
              <p className="text-[13px] font-bold text-[#a08b6b] mb-2 uppercase tracking-wide">
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
                  <h2 className="font-serif text-2xl font-bold text-[#453225] mt-16 mb-8">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="font-serif text-xl font-bold text-[#453225] mt-10 mb-6">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-[#5c4a3d] leading-[1.7] text-[17px] font-normal mb-8">
                    {children}
                  </p>
                ),
                strong: ({ children }) => (
                  <strong className="text-[#453225] font-bold">
                    {children}
                  </strong>
                ),
                ul: ({ children }) => (
                  <ul className="space-y-4 my-10 pl-6 list-disc">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="space-y-8 my-10 pl-6 list-decimal">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="text-[#5c4a3d] text-[17px] font-normal leading-[1.7] mb-4 last:mb-0 marker:text-[#a08b6b] marker:font-bold">
                    {children}
                  </li>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    className="text-[#a08b6b] font-medium underline decoration-[#a08b6b]/30 underline-offset-4 hover:decoration-[#a08b6b]">
                    {children}
                  </a>
                ),
                hr: () => <hr className="border-[#453225]/10 my-16" />,
                blockquote: ({ children }) => (
                  <blockquote className="border-l-[3px] border-[#a08b6b]/40 pl-8 py-4 text-[#5c4a3d]/80 italic my-12 bg-[#f9f3eb] rounded-r-lg">
                    {children}
                  </blockquote>
                ),
              }}>
              {content}
            </ReactMarkdown>
          </div>

          {/* Minimalist Signature */}
          <div className="mt-40 pt-10 border-t border-[#453225]/10 text-center md:text-left">
            <p className="text-[11px] font-bold text-[#453225]/30 uppercase tracking-[0.4em]">
              Webot &mdash; Refined Efficiency &mdash;{" "}
              {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
