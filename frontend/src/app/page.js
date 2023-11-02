import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import HowToUse from "@/components/HowToUse";

export default function Home() {
  return (
    <main className="flex min-h-screen col bg-[#121212]">
      <Navbar />
      <div>
        <HeroSection />
        <HowToUse />
        <AboutSection />
      </div>
    </main>
  );
}
