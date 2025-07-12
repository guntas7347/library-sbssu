import Footer from "../../components/pages/public/footer/Footer";
import Navbar from "../../components/pages/public/navbar/Navbar";
import FeaturesSection from "../../components/pages/public/sections/FeaturesSection";
import HeroSection from "../../components/pages/public/sections/HeroSection";
import QuickAccessSection from "../../components/pages/public/sections/QuickAccessSection";
import StatsSection from "../../components/pages/public/sections/StatsSection";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 transition-all duration-300">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <QuickAccessSection />
      <StatsSection />
    </div>
  );
}
