import Image from "next/image";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import ImageInput from "./components/ImageInput";
import AboutUs from "./components/AboutUs";
import HowToUse from "./components/HowToUse";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#181818]">
      <Navbar />
      <div className="container mt-32 mx-auto px-12 py-4">
        <HeroSection />
        <ImageInput />
        <HowToUse />
        <AboutUs />
      </div>
      <Footer />
    </main>
  );
}
