import React from "react";

const usData = [
  {
    name: "Satriadhikara Panji Yudhistira",
    nim: "13522125",
    email: "satriadhikara@gmail.com",
    image: ".././public/images/image1.jpg", 
    alt: "Panji",
  },
  {
    name: "Yasmin Farisah Salma",
    nim: "#13522140",
    email: "yasminfsalma@gmail.com",
    image: "../../public/images/image2.jpg", 
    alt: "Yasmin",
  },
  {
    name: "Farrel Natha Saskoro",
    nim: "13522147",
    email: "farrel.saskoro@gmail.com",
    image: "../../public/images/image3.jpg",
    alt: "Natha"
  },
];

const AboutUs = () => {
  return (
    <section id="about-us">
      <div className="py-4">
        <h1 className="mt-20 text-center text-xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-br from-[#181818] via-[#6e6e6e] to-[#a4a4a4] font-black">
          About Us
        </h1>
      </div>
      <div className="flex-col border-l-4 border-black">
        {usData.map((item, index) => (
          <div key={index} className="mb-4 relative">
            <div className="bg-opacity-5 shadow-none p-6">
              <div className="absolute top-0 h-full" />
              <div className="flex items-center justify-center mb-2"> 
                <div className="bg-opacity-15 w-12 h-12 flex items-center justify-center rounded-full">
                  <img src={item.image} alt={item.alt} />
                </div>
                <div className="pl-4">
                  <p className="text-xs font-semibold">{item.name} </p>
                  <p className="text-xs">{item.nim}</p>
                  <p className="text-xs">{item.email}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutUs;
