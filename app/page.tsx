import Navbar from "@/components/home/Navbar";
import HeroSection from "@/components/home/sections/HeroSection";
import FeaturesSection from "@/components/home/sections/FeaturesSection";
import QuickAccessSection from "@/components/home/sections/QuickAccessSection";
import StatsSection from "@/components/home/sections/StatsSection";

export default function Home() {
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
