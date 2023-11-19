"use client";
import React, { useState, useEffect, useRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const Concept = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const carouselRef = useRef();
  const [overlayIndex, setOverlayIndex] = useState(null);

  const coffeeItems = [
    {
      name: "COLOR PARAMETER",
      description:
        " Images are compared based on color by converting RGB images to a common color histogram method.",
      imageUrl: "../../images/color.jpg",
      moredesc:
        " Images are compared based on color by converting RGB images to a common color histogram method. Color histograms represent the frequency of various colors within a certain color space, which helps distribute the color information from an image. Global color histograms and block color histograms are features used in this parameter, where HSV color space is preferred due to its commonality in white backgrounds. Cosine similarity is used to compare the histogram of the input image with those in the dataset.",
    },
    {
      name: "WHAT IS CBIR?",
      description:
        "Content-Based Image Retrieval (CBIR) is the process used to search and retrieve images based on their content.",
      imageUrl: "../../images/cbir.jpg",
      moredesc:
        "Content-Based Image Retrieval (CBIR) is the process used to search and retrieve images based on their content. Key features such as color, texture, and shape are extracted from images and represented as numerical descriptors or feature vectors. These are then compared to feature vectors of other images in a database using matching algorithms. The results of these comparisons are used to rank and display images most similar to the search image.",
    },
    {
      name: "TEXTURE PARAMETERS",
      description:
        " Images are compared based on color by converting RGB images to a common color histogram method.",
      imageUrl: "../../images/texture.jpg",
      moredesc:
        "Texture comparison in CBIR is done using a co-occurrence matrix, which is a simple and fast processing method producing smaller-sized vectors. From this matrix, texture features such as contrast, entropy, and homogeneity are derived and used to create a feature vector. These vectors are then compared using Cosine Similarity theorem to determine the similarity between two images.",
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

  const toggleOverlay = (index) => {
    if (overlayIndex === index) {
      // If the same card is clicked, hide the overlay
      setOverlayIndex(null);
    } else {
      // Show the overlay for the clicked card
      setOverlayIndex(index);
    }
  };

  const card = coffeeItems[currentCard];

  return (
    <section id="concept" className="flex flex-col items-center py-10">
      <h1
        data-aos="fade-up"
        data-aos-duration="800"
        className="mt-24 text-3xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-gray-800 via-gray-600 to-gray-400"
      >
        WHAT IS THIS?
      </h1>

      <div
        data-aos="fade-up"
        data-aos-duration="800"
        className="flex flex-col items-center mt-10"
      >
        <hr className="border-t border-gray-400 my-8 w-[1100px]" />
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
        data-aos="fade-up"
        data-aos-duration="800"
        className="mt-24 mb-20 text-3xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-gray-800 via-gray-600 to-gray-400"
      >
        CONCEPT
      </h1>
      <div
        data-aos="fade-up"
        data-aos-duration="800"
        className="relative w-full mt-10 mb-40"
        ref={carouselRef}
      >
        <div className="flex justify-center gap-16">
          {coffeeItems.map((card, index) => (
            <div
              key={card.name}
              className={`flex flex-col rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out ${
                currentCard === index ? "bg-gray-200" : "bg-gray-400"
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
                <p className="mt-2 text-gray-600 text-sm">{card.description}</p>
              </div>
              <div className="flex justify-center p-5">
                <button
                  className="text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 transition-colors duration-300"
                  onClick={() => toggleOverlay(index)}
                >
                  Learn More
                </button>
              </div>
              {overlayIndex === index && (
                <div className="absolute inset-0 bg-black bg-opacity-90 flex justify-center items-center">
                  <XMarkIcon
                    className="h-6 w-6 absolute top-2 right-2 cursor-pointer"
                    onClick={() => toggleOverlay(index)}
                  />
                  <div className="text-white text-justify leading-5 text-sm px-8 rounded-lg relative">
                    <p>{card.moredesc}</p>{" "}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Concept;
