"use client";
import React, { useState } from "react";

const usData = [
  {
    name: "Satriadhikara Panji Yudhistira",
    nim: "13522125",
    email: "satriadhikara@gmail.com",
    image: "../../images/image1.jpg",
    alt: "Panji",
  },
  {
    name: "Yasmin Farisah Salma",
    nim: "#13522140",
    email: "yasminfsalma@gmail.com",
    image: "../../images/image2.jpg",
    alt: "Yasmin",
  },
  {
    name: "Farrel Natha Saskoro",
    nim: "13522145",
    email: "farrel.saskoro@gmail.com",
    image: "../../images/image3.jpg",
    alt: "Natha",
  },
  {
    name: "Farrel Natha Saskoro",
    nim: "13522145",
    email: "farrel.saskoro@gmail.com",
    image: "../../images/image4.jpg",
    alt: "Natha",
  },
];

const AboutUs = () => {
  const [current, setCurrent] = useState(0);

  const handleNextClick = () => {
    setCurrent((prevCurrent) => (prevCurrent + 1) % usData.length);
  };

  return (
    <section id="about-us" className="text-white bg-[#181818]">
      <div className="container mx-auto px-4 py-8 w-[1200px]">
        <h1 className="mt-20 text-center text-xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-br from-[#181818] via-[#6e6e6e] to-[#a4a4a4] font-black">
          ABOUT US
        </h1>
        <div className="mt-16 grid grid-cols-9 gap-4">
          <div className="col-span-5 p-4">
            <p>
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
              sed rutrum facilisis. Nunc facilisis ante vehicula, fringilla
              mauris a, imperdiet mauris.
            </p>
          </div>
          <div className="col-span-4 relative">
            <img
              src={usData[current].image}
              alt={usData[current].alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500 to-green-700 opacity-0 hover:opacity-90 transition-opacity duration-300 flex items-center justify-start pl-4">
              <p className="text-white text-xl font-bold">
                {usData[current].name}
              </p>
            </div>
            <button
              onClick={handleNextClick}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 z-10"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
