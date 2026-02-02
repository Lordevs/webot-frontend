import HeroSection from "@/components/home/hero-section";
import ProblemSection from "@/components/home/problem-section";
import SolutionSection from "@/components/home/solution-section";
import HowItWorks from "@/components/home/how-it-works";
import UseCases from "@/components/home/use-cases";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <HowItWorks />
      <UseCases />
    </main>
  );
}
