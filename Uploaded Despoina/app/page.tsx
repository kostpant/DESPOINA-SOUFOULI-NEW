import HeroCanvas from "@/components/HeroCanvas";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import LocationSection from "@/components/LocationSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroCanvas />
      <ServicesSection />
      <TestimonialsSection />
      <LocationSection />
      <CTASection />
    </div>
  );
}
