import HeroSection from "@/components/home/hero-section";
import ProblemSection from "@/components/home/problem-section";
import SolutionSection from "@/components/home/solution-section";
import HowItWorks from "@/components/home/how-it-works";
import UseCases from "@/components/home/use-cases";
import SecuritySection from "@/components/home/security-section";
import MVPScope from "@/components/home/mvp-scope";
import FutureAutomationEcosystem from "@/components/home/future-automation-ecosystem";
import CTASection from "@/components/home/cta-section";
import SimplePricing from "@/components/home/simple-pricing";
import TrustCompliance from "@/components/home/trust-compliance";
import ContactUsSection from "@/components/home/contact-us-section";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <HowItWorks />
      <MVPScope />
      <FutureAutomationEcosystem />
      <UseCases />
      <TrustCompliance />
      <SecuritySection />
      <SimplePricing />
      <CTASection />
      <ContactUsSection />
    </main>
  );
}
