"use client";
import React, { useRef, useState, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import Result from "./Result";
import {
  PhotoIcon,
  CameraIcon,
  XCircleIcon,
  FolderOpenIcon,
} from "@heroicons/react/24/solid";

const ImageInput = () => {
  const fileInputRef = useRef(null);
  const webcamRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [toggleState, setToggleState] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [searchClicked, setSearchClicked] = useState(false);
  const [imagePath, setImagePath] = useState("");
  const [searchInitiated, setSearchInitiated] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [searchError, setError] = useState("");
  const [timer, setTimer] = useState(0);
  const intervalRef = useRef(null);

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

  const handleToggle = () => {
    setToggleState(!toggleState);
  };

  const handleOpenCamera = () => {
    setShowCamera(true);
  };

  const handleSearch = () => {
    setShowResult(false);
    setError("");

    if (selectedImage) {
      setSearchClicked(true);
      setSearchInitiated(true);
      setImagePath(selectedImage);
      setShowResult(true);
    } else {
      setError("Please upload an image first.");
      setSearchClicked(false);
    }
  };

  const mirroredStyle = {
    transform: "scaleX(-1)",
  };

  const videoConstraints = {
    width: 460,
    height: 280,
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    // Create an image element
    const img = new Image();
    img.onload = () => {
      // Create canvas to mirror the image
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      // Flip the context horizontally
      ctx.translate(img.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(img, 0, 0);
      // Convert the canvas to an image data URL
      const mirroredImage = canvas.toDataURL("image/jpeg");
      setSelectedImage(mirroredImage);
    };
    img.src = imageSrc;
  }, [webcamRef]);

  useEffect(() => {
    if (showCamera) {
      setTimer(10); // Reset timer to 10 seconds when the camera is shown
      intervalRef.current = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            capture(); // Take a picture when the timer hits 0
            return 10; // Reset the timer back to 10
          } else {
            return prevTimer - 1;
          }
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current); // Clear the interval when the camera is not shown
    }
  
    // Cleanup interval on component unmount
    return () => clearInterval(intervalRef.current);
  }, [showCamera, capture]);
  

  return (
    <section>
      {showCamera && (
        <div className="camera-modal">
          <div className="timer">{timer}</div>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            style={mirroredStyle}
            className="webcam p-8 rounded-2xl bg-[#373737] bg-opacity-30"
          />
          <button
            onClick={() => {
              setShowCamera(false);
              clearInterval(intervalRef.current);
            }}
            className="close-camera-button"
          >
            Close Camera
          </button>
        </div>
      )}
      <div
        className={`mx-auto bg-opacity-50 mt-16 grid grid-cols-1 md:grid-cols-5 gap-5 bg-[#373737] p-4 rounded-3xl w-full md:w-[900px] border-8 border-opacity-10 border-[#373737] ${
          isDragging ? "border-gray-600" : ""
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
            <PhotoIcon
              onClick={handleImageUpload}
              className="h-20 cursor-pointer"
            />
          )}
        </div>
        <div className="md:col-span-2 bg-[#EEEEEE] h-[300px] md:h-[300px] w-full flex flex-col items-center justify-center">
          <button
            className="camera-button h-9 flex items-center justify-center space-x-2 bg-[#181818] bg-opacity-30 text-white px-4 py-2 rounded-full shadow-lg hover:scale-105 hover:bg-opacity-50 transition-colors duration-200"
            onClick={handleOpenCamera}
          >
            <CameraIcon className="h-5 w-5 text-white" />
            <span className="font-bold">| Open Camera</span>
          </button>

          <button
            className="h-9 mt-2 flex items-center justify-center space-x-2 bg-[#181818] bg-opacity-30 text-white px-4 py-2 rounded-full shadow-lg hover:scale-105 hover:bg-opacity-50 transition-colors duration-200"
            onClick={handleImageUpload}
          >
            <FolderOpenIcon className="h-5 w-5 text-white" />
            <span className="font-bold">| Choose From File</span>
          </button>
          <div className="flex items-center justify-center mb-4 mt-4">
            <button
              onClick={handleToggle}
              className={`relative w-36 h-9 flex items-center rounded-full p-1 ${
                toggleState ? "bg-gray-300" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute left-1 w-full text-white text-sm font-medium transition-opacity duration-500 ${
                  toggleState ? "opacity-0" : "opacity-100"
                }`}
              >
                Color
              </span>

              <div
                className={`absolute bg-white w-9 h-9 rounded-full shadow-md transform transition-transform duration-500 ${
                  toggleState ? "translate-x-28" : "-translate-x-1"
                }`}
              ></div>

              <span
                className={`absolute right-1 w-full text-white text-sm font-medium transition-opacity duration-300 ${
                  toggleState ? "opacity-100" : "opacity-0"
                }`}
              >
                Texture
              </span>
            </button>
          </div>
          <button
            className="bg-[#181818] bg-opacity-30 font-bold text-white px-4 py-2 rounded-md hover:bg-opacity-50 transition-colors duration-100"
            onClick={handleSearch}
          >
            Search
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileSelected}
            style={{ display: "none" }}
          />
        </div>
        {searchError && (
          <div className="text-red-500 text-xl font-bold text-center my-2">
            {searchError}
          </div>
        )}
      </div>
      <div
        className={`transition-transform duration-1000 ${
          showResult ? "translate-y-0" : "translate-y-full"
        }`}
        style={{
          position: "relative",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 10,
        }}
      >
        {searchClicked && <Result searchInitiated={searchInitiated} />}
      </div>
    </section>
  );
};

export default ImageInput;
