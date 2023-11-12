"use client";
import React from "react";
import { TypeAnimation } from "react-type-animation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const HeroSection = () => {
  return (
    <section id="home">
      <div className="flex justify-center items-end">
        <h1 className="inline-flex text-center text-3xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-br from-[#181818] via-[#6e6e6e] to-[#a4a4a4] font-black">
          REVERSE IMAGE SEARCH
        </h1>
        <MagnifyingGlassIcon className="h-8 w-8" />
      </div>
      <h1 className="text-[#a4a4a4] text-center mt-4 mb-4 text-xl md:text-2xl lg:text-3xl font-bold">
        <TypeAnimation
          sequence={["— Reverse Image Search —", 1000, "— Search What You See —", 1000]}
          wrapper="span"
          speed={20}
          repeat={Infinity}
        />
      </h1>
      
    </section>
    
  );
};

export default HeroSection;
