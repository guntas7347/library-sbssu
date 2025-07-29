import { useRef } from "react";
import Footer from "../../components/features/public/footer/Footer";
import Navbar from "../../components/features/public/navbar/Navbar";
import FeaturesSection from "../../components/features/public/sections/FeaturesSection";
import HeroSection from "../../components/features/public/sections/HeroSection";
import QuickAccessSection from "../../components/features/public/sections/QuickAccessSection";
import StatsSection from "../../components/features/public/sections/StatsSection";

export default function LandingPage() {
  const servicesRef = useRef(null);
  const quickAccessRef = useRef(null);
  const handleScroll = (to) => {
    switch (to) {
      case "services":
        servicesRef.current?.scrollIntoView({ behavior: "smooth" });
        break;

      case "quick-access":
        quickAccessRef.current?.scrollIntoView({ behavior: "smooth" });
        break;

      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 transition-all duration-300">
      <Navbar scroll={handleScroll} />
      <HeroSection scroll={handleScroll} />
      <FeaturesSection ref={servicesRef} />
      <QuickAccessSection ref={quickAccessRef} />
      <StatsSection />
    </div>
  );
}
