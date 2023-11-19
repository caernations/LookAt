"use client"
import Image from "next/image";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import ImageInput from "./components/ImageInput";
import Concept from "./components/Concept";
import AboutUs from "./components/AboutUs";
import HowToUse from "./components/HowToUse";
import Footer from "./components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <main id="top-0" className="flex min-h-screen flex-col bg-[#181818]">
      <Navbar />
      <div className="container mt-32 mx-auto py-4">
        <HeroSection />
        <ImageInput />
        <Concept />
        <HowToUse />
        <AboutUs />
      </div>
      <Footer />
    </main>
  );
}
