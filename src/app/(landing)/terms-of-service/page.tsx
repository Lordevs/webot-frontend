import fs from "fs";
import path from "path";
import { LegalContent } from "@/components/common/legal-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Webot",
  description: "Terms of Service for Webot",
};

export default async function TermsOfServicePage() {
  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "terms-of-service.md",
  );
  const content = fs.readFileSync(filePath, "utf8");

  return <LegalContent content={content} />;
}
