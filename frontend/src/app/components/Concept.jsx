"use client";
import React, { useState, useEffect, useRef } from "react";

const Concept = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const carouselRef = useRef();

  const coffeeItems = [
    {
      name: "COLOR PARAMETER",
      description: "DESCRIPTION",
      imageUrl: "../../images/yasmin32.png",
    },
    {
      name: "WHAT IS CBIR?",
      description: "DESCRIPTION",
      imageUrl: "../../images/yasmin32.png",
    },
    {
      name: "TEXTURE PARAMETERS",
      description: "DESCRIPTION",
      imageUrl: "../../images/yasmin32.png",
    },
  ];

  useEffect(() => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const children = container.children;
      if (currentCard >= 0 && currentCard < children.length) {
        const currentCardElement = children[currentCard];
        if (currentCardElement) {
          const scrollLeftValue =
            currentCardElement.offsetLeft -
            container.offsetWidth / 2 +
            currentCardElement.offsetWidth / 2;
          container.scrollLeft = scrollLeftValue;
        }
      }
    }
  }, [currentCard]);

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % coffeeItems.length);
  };

  const prevCard = () => {
    setCurrentCard(
      (prev) => (prev - 1 + coffeeItems.length) % coffeeItems.length
    );
  };

  const card = coffeeItems[currentCard];

  return (
    <section id="concept" className="flex flex-col items-center py-10">
      <h1
        // data-aos="fade-up"
        // data-aos-duration="800"
        className="mt-24 text-3xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-gray-800 via-gray-600 to-gray-400"
      >
        WHAT IS THIS?
      </h1>
      <div
        // data-aos="fade-up"
        // data-aos-duration="800"
        className="flex flex-col items-center mt-10"
      >
        <p className="text-lg text-gray-500 mt-8 px-52 text-center justify-center">
          "This website offers a sophisticated Content-Based Image Retrieval
          (CBIR) system that relies on linear algebra for image analysis. Users
          can upload their own input image and datasets, allowing them to
          leverage the power of linear algebra to identify visually similar
          images based on mathematical representations of color and texture of
          an image. This approach enhances the accuracy and efficiency of image
          retrieval, making it an invaluable tool for users engaged in image
          identification and research."
        </p>
      </div>

      <h1
        // data-aos="fade-up"
        // data-aos-duration="800"
        className="mt-24 mb-20 text-3xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-gray-800 via-gray-600 to-gray-400"
      >
        CONCEPT
      </h1>
      <div
        // data-aos="fade-up"
        // data-aos-duration="800"
        className="relative w-full mt-10 mb-40"
        ref={carouselRef}
      >
        <div className="flex justify-center gap-16">
          {coffeeItems.map((card, index) => (
            <div
              key={card.name}
              className={`flex flex-col rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out ${
                currentCard === index
                  ? "ring-2 ring-gray-100 bg-gray-100"
                  : "bg-gray-300"
              }`}
              style={{
                width: "300px",
                height: "400px",
                flex: "0 0 auto",
                transform: currentCard === index ? "scale(1.1)" : "scale(1.0)",
                transition: "transform 0.4s, background-color 0.5s",
              }}
              onClick={() => setCurrentCard(index)}
            >
              <img
                className="w-full h-40 object-cover"
                src={card.imageUrl}
                alt={card.name}
              />
              <div className="p-5 flex-grow">
                <h5 className="text-xl font-semibold text-gray-900">
                  {card.name}
                </h5>
                <p className="mt-2 text-gray-600">{card.description}</p>
              </div>
              <div className="flex justify-center p-5">
                <button className="text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 transition-colors duration-300">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Concept;
