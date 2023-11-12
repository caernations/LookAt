import React from "react";

const HowToUse = () => {
  return (
    <section id="how-to-use" className="w-full">
      <svg className="w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#0099ff" fillOpacity="1" d="M0,192L60,165.3C120,139,240,85,360,80C480,75,600,117,720,144C840,171,960,181,1080,176C1200,171,1320,149,1380,138.7L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
      <div>
        <h1 className="mt-80 mb-12 text-center text-xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-br from-[#181818] via-[#6e6e6e] to-[#a4a4a4] font-black">
          HOW TO USE
        </h1>
        <div className="relative flex justify-center items-center">
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-2 bg-black"></div>

          <div className="flex flex-col space-y-4 mr-2">
            <div className="bg-[#343434] bg-opacity-30 h-24 w-80 text-white py-2 px-4 rounded-full mb-8">
              STEP 1
            </div>
            <div className="bg-[#343434] bg-opacity-30 h-24 w-80 text-white py-2 px-4 rounded-full mb-8">
              STEP 3
            </div>
            <div className="bg-[#343434] bg-opacity-30 h-24 w-80 text-white py-2 px-4 rounded-full mb-8">
              STEP 5
            </div>
          </div>

          <div className="flex flex-col space-y-4 ml-2">
            <div className="bg-[#343434] bg-opacity-30 h-24 w-80 text-white py-2 px-4 rounded-full mb-8">
              STEP 2
            </div>
            <div className="bg-[#343434] bg-opacity-30 h-24 w-80 text-white py-2 px-4 rounded-full">
              STEP 4
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default HowToUse;
