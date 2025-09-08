import CTASection from "@/components/CTASection";
import FAQSection from "@/components/FAQSection";
import FeaturesSection from "@/components/FeaturesSection";
import FooterSection from "@/components/FooterSection";
import HeaderSection from "@/components/HeaderSection";
import HeroSection from "@/components/HeroSection";
import ProcessSteps from "@/components/ProcessSteps";

export default function Page() {
  return (
    <main className="min-h-svh flex flex-col">
      <HeaderSection isLoggedIn={true} />
      <HeroSection />
      <ProcessSteps />
      <CTASection />
      <FeaturesSection />
      <FAQSection />
      <FooterSection />
    </main>
  );
}
