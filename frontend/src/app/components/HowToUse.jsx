import React from "react";

const steps = [
  {
    id: 1,
    title: "DATASET SUBMISSION",
    description: "Submit your image set once for multiple CBIR searches. Changing the dataset requires a page refresh.",
  },
  {
    id: 2,
    title: "STEP 2",
    description: "Upload a query image or use the website's camera for continuous snapshots.",
  },
  {
    id: 3,
    title: "STEP 3",
    description: "Adjust parameters for search by color or texture",
  },
  {
    id: 4,
    title: "STEP 4",
    description: "Click the 'Search' button to find matching images",
  },
  {
    id: 5,
    title: "STEP 5",
    description: "View a curated selection of images along with the percentage of similarity that exceeds 60%",
  },
];

const HowToUse = () => {
  return (
    <section
      id="howtouse"
      className="mb-40 mx-auto w-full h-[1900px] md:h-[1300px] bg-primary flex flex-col items-center"
    >
      <div className="mb-40">
        <p className="text-center text-xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-br from-[#181818] via-[#6e6e6e] to-[#a4a4a4] font-black">
          HOW TO USE
        </p>
      </div>
      <div
        className="mt-[5rem] h-[1800px] md:h-[1300px] absolute left-50% w-[5px] bg-white rounded z-5"
        // data-aos="zoom-in"
      />
      {steps.map((item, index) => {
        return (
          <div
            className={`bg-[#121212] w-[350px] h-[200px] rounded-3xl shadow-xl transition-transform hover:scale-105 hover:shadow-2xl p-5 ${
              index % 2 === 0 ? "ml-[400px] mb-8" : "mr-[400px] mb-8"
            }
        `}
            key={index}
            // data-aos="zoom-in"
          >
            <div className="w-[97.5%] h-[97%] rounded bg-primary text-[#ADB7BE] text-center p-3 z-10 flex flex-col justify-center md:justify-none space-y-3">
              <h2 className="font-bold text-xl">{item.title}</h2>
              <hr className="border-white" />
              <p className="font-medium font-gradient">
                {item.description}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default HowToUse;
