"use client";
import React, { useRef, useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";

const ImageInput = () => {
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleImageUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileSelected = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleDeleteImage = () => {
    setSelectedImage(null);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  return (
    <section>
      <div
        className={`mx-auto bg-opacity-50 mt-16 grid grid-cols-1 md:grid-cols-5 gap-5 bg-[#373737] p-4 rounded-3xl w-full md:w-[900px] border-8 border-opacity-10 border-[#373737] ${
          isDragging ? "border-blue-600" : ""
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <div className="md:col-span-3 bg-[#EEEEEE] h-[300px] md:h-[300px] w-full flex items-center justify-center relative">
          {selectedImage ? (
            <>
              <img src={selectedImage} alt="Selected" className="h-40" />
              <button
                onClick={handleDeleteImage}
                className="absolute bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Delete Image
              </button>
            </>
          ) : (
            <PhotoIcon onClick={handleImageUpload} className="h-20 cursor-pointer" />
          )}
        </div>
        <div className="md:col-span-2 bg-[#EEEEEE] h-[300px] md:h-[300px] w-full flex flex-col items-center justify-center">
          <button
            className="bg-slate-950 text-white px-4 py-2 rounded-md hover:bg-slate-800"
            onClick={handleImageUpload}
          >
            Insert an Image
          </button>

          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" class="sr-only peer" />
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              ea
            </span>
          </label>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileSelected}
            style={{ display: "none" }}
          />
        </div>
      </div>
    </section>
  );
};

export default ImageInput;
