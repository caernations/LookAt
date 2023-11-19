"use client";
import React, { useState } from "react";
import {
  ArrowRightCircleIcon,
  ArrowLeftCircleIcon,
} from "@heroicons/react/24/solid";

const usData = [
  {
    name: "Foto Bareng",
    nim: "13522145",
    email: "farrel.saskoro@gmail.com",
    image: "../../images/fotbar.jpg",
    alt: "Natha",
  },
  {
    name: "Satriadhikara Panji Yudhistira",
    nim: "13522125",
    email: "satriadhikara@gmail.com",
    image: "../../images/panji32.png",
    alt: "Panji",
  },
  {
    name: "Yasmin Farisah Salma",
    nim: "13522140",
    email: "yasminfsalma@gmail.com",
    image: "../../images/yasmin32.png",
    alt: "Yasmin",
  },
  {
    name: "Farrel Natha Saskoro",
    nim: "13522145",
    email: "farrel.saskoro@gmail.com",
    image: "../../images/natha32.png",
    alt: "Natha",
  },
];

const AboutUs = () => {
  const [current, setCurrent] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  const handleNextClick = () => {
    if (!isSliding) {
      setIsSliding(true);
      setTimeout(() => {
        setCurrent((prevCurrent) => (prevCurrent + 1) % usData.length);
        setIsSliding(false);
      }, 500);
    }
  };
  const handlePrevClick = () => {
    if (!isSliding) {
      setIsSliding(true);
      setTimeout(() => {
        setCurrent(
          (prevCurrent) => (prevCurrent - 1 + usData.length) % usData.length
        );
        setIsSliding(false);
      }, 500);
    }
  };

  return (
    <section id="about-us" className="text-white bg-[#181818]">
      <div className="container mx-auto px-20 py-8 max-w-full">
        <h1 data-aos="fade-up" data-aos-duration="800" className="mt-20 text-center text-xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-br from-[#181818] via-[#6e6e6e] to-[#a4a4a4] font-black">
          ABOUT US
        </h1>
        <div className="mt-16 mx-8 grid grid-cols-1 md:grid-cols-9 gap-4 md:gap-16">
          <div data-aos="flip-right" data-aos-duration="1200" className="md:col-span-5 p-4">
            <p className="text-justify bg-[#373737] p-8 rounded-3xl bg-opacity-30">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit
              amet dolor eleifend, elementum diam vel, bibendum odio. Morbi
              eleifend ex sit amet consequat suscipit. Nullam accumsan nulla
              erat, vel egestas tortor consequat vitae. Suspendisse tempor
              mauris a sapien rhoncus tempor. Nam in bibendum erat. Proin tortor
              orci, placerat vestibulum congue eget, volutpat aliquet risus.
              Pellentesque ac mi orci. Duis id varius ligula. Aliquam eu ante
              sit amet mauris congue laoreet ac eget est. Nam facilisis, mauris
              ornare finibus mattis, velit odio laoreet odio, non congue augue
              eros sit amet sem. Etiam congue dictum mauris, eget consectetur
              libero auctor at. Aenean cursus blandit tellus eu lobortis.
              Aliquam ornare diam in ornare vulputate. Donec ultrices auctor
              orci, vitae tincidunt nulla vestibulum non. Cras suscipit lacus
              sed rutrum facilisis.
            </p>
          </div>
          <div data-aos="flip-left" data-aos-duration="1200" className="md:col-span-4 relative">
            <div className="overflow-hidden relative w-full h-auto">
              <img
                src={usData[current].image}
                alt={usData[current].alt}
                className={`w-full h-auto object-cover rounded-2xl transition-transform duration-500 ${
                  isSliding ? "-translate-x-full" : ""
                }`}
              />
            </div>
            <div className="rounded-2xl absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-900 to-black opacity-0 hover:opacity-90 transition-opacity duration-300 flex flex-col items-end justify-center px-16">
              <p className="text-white text-xl font-bold text-right">
                {usData[current].name}
              </p>
              <p className="text-white text-sm font-light text-right">
                {usData[current].nim}
              </p>
              <p className="text-white text-sm font-light text-right">
                {usData[current].email}
              </p>
              <div className="border-t border-gray-500 w-full my-4"></div>
              <p className="text-white text-sm font-light text-right">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                sit amet dolor eleifend, elementum diam vel, bibendum odio.
                Morbi eleifend ex sit amet consequat suscipit.
              </p>
            </div>
            <button
              onClick={handlePrevClick}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white p-2 z-10"
            >
              <ArrowLeftCircleIcon className="text-white h-10" />
            </button>
            <button
              onClick={handleNextClick}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white p-2 z-10"
            >
              <ArrowRightCircleIcon className="text-white h-10" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
