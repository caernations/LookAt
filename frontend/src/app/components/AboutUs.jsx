"use client";
import React, { useState } from "react";
import {
  ArrowRightCircleIcon,
  ArrowLeftCircleIcon,
} from "@heroicons/react/24/solid";

const usData = [
  {
    name: "Satriadhikara Panji Yudhistira",
    nim: "13522125",
    email: "satriadhikara@gmail.com",
    image: "../../images/panji32.png",
    alt: "Panji",
    paragraph:
      "An Apple fanboy that now really into backend development. He didn't choose backend. Backend chose him",
  },
  {
    name: "Yasmin Farisah Salma",
    nim: "13522140",
    email: "yasminfsalma@gmail.com",
    image: "../../images/yasmin32.png",
    alt: "Yasmin",
    paragraph: "A dedicated front-end enthusiast and a lifelong learner.",
  },
  {
    name: "Farrel Natha Saskoro",
    nim: "13522145",
    email: "farrel.saskoro@gmail.com",
    image: "../../images/natha32.png",
    alt: "Natha",
    paragraph:
      "A not-so-religious boy that try to be and also an enthusiast in algorithm.",
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
        <h1
          data-aos="fade-up"
          data-aos-duration="800"
          className="mt-20 text-center text-xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-br from-[#181818] via-[#6e6e6e] to-[#a4a4a4] font-black"
        >
          ABOUT US
        </h1>
        <div className="mt-16 mx-8 grid grid-cols-1 md:grid-cols-10 gap-4 md:gap-16">
          <div
            data-aos="flip-right"
            data-aos-duration="1200"
            className="md:col-span-5 p relative"
          >
            <div className="overflow-hidden w-full h-auto">
              <img
                src="../../images/fotbar.jpg"
                alt="Developers"
                className="w-full h-auto object-cover rounded-2xl transition-transform duration-500"
              />
            </div>
            <div className="rounded-2xl absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-900 to-black opacity-0 hover:opacity-90 transition-opacity duration-300 flex flex-col items-end justify-center px-16">
              <p className="text-white text-xl font-bold text-right">
                Developers
              </p>
              <p className="text-white text-sm font-light text-right">
                Panji, Yasmin, Natha
              </p>
              <p className="text-white text-sm font-light text-right">
              13522125, 13522140, 13522145
              </p>
              <div className="border-t border-gray-500 w-full my-4"></div>
              <p className="text-white text-sm font-light text-right">
                Have you seen three pretty bestfriend? Here we are.
              </p>
            </div>
          </div>
          <div
            data-aos="flip-left"
            data-aos-duration="1200"
            className="md:col-span-5 relative"
          >
            <div className="overflow-hidden w-full h-auto">
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
                {usData[current].paragraph}
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
