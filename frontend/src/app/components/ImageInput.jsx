"use client";
import React, { useRef, useState, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import Result from "./Result";
import {
  PhotoIcon,
  CameraIcon,
  XCircleIcon,
  FolderOpenIcon,
  ArrowUpTrayIcon,
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
  const resultsRef = useRef(null);
  const fileInputRefSingle = useRef(null);
  const fileInputRefMultiple = useRef(null);

  const handleImageUpload = (event) => {
    fileInputRef.current.click();
    if (event.target.files && event.target.files[0]) {
      handleSearch(event.target.files[0]);
    }
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
    const newToggleState = !toggleState;
    setToggleState(newToggleState);

    if (newToggleState) {
      handleTextureMode();
    } else {
      handleColorMode();
    }
  };

  const handleColorMode = () => {
    setSearchInitiated(false);
    console.log("Color mode is active."); // ubah ke color
  };

  const handleTextureMode = () => {
    setSearchInitiated(true);
    console.log("Texture mode is active."); // ubah ke texture
  };

  const handleOpenCamera = () => {
    setShowCamera(true);
  };

  const handleSearch = (imageSrc) => {
    setSelectedImage(imageSrc);
    setShowResult(false);
    setError("");
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });

    if (imageSrc) {
      setSearchClicked(true);
      setSearchInitiated(true);
      setImagePath(imageSrc);
      setShowResult(true);
    } else {
      setError("Please upload an image first.");
      setSearchClicked(false);
    }
  };

  const handleDatasetUpload = (e) => {
    const files = e.target.files;
    const imageUrls = [];

    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const imageUrl = URL.createObjectURL(file);
        imageUrls.push(imageUrl);
      }

      setSelectedImage(imageUrls);
    }
  };

  const mirroredStyle = {
    transform: "scaleX(-1)",
  };

  const videoConstraints = {
    width: 460,
    height: 280,
  };

  const slideDownAnimation = {
    animationName: "slideDown",
    animationTimingFunction: "ease-out",
    animationDuration: "0.5s",
    animationFillMode: "forwards",
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      handleSearch(imageSrc);
    }

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.translate(img.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(img, 0, 0);
      const mirroredImage = canvas.toDataURL("image/jpeg");
      setSelectedImage(mirroredImage);
    };
    img.src = imageSrc;
  }, [webcamRef, handleSearch]);

  useEffect(() => {
    if (showCamera) {
      if (timer === 0) {
        capture();
        setTimer(5);
      } else {
        const timerId = setTimeout(() => {
          setTimer((prevTimer) => prevTimer - 1);
        }, 1000);
        return () => clearTimeout(timerId);
      }
    } else {
      setTimer(5);
    }
  }, [showCamera, timer, capture]);

  return (
    <>
      <section>
        <div className="flex items-center justify-center h">
          {showCamera && (
            <div
              style={slideDownAnimation}
              className="top-0 fixed rounded-b-3xl w-[700px] h-[400px] z-50 bg-[#181818] bg-opacity-75 flex items-center justify-center"
            >
              <div className="camera-modal">
                <div className="timer">{timer}</div>
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                  style={mirroredStyle}
                  className="webcam p-4 rounded-2xl bg-[#373737] bg-opacity-30"
                />
                <button
                  onClick={() => {
                    setShowCamera(false);
                    clearInterval(intervalRef.current);
                  }}
                  className="absolute top-0 right-0 m-4"
                >
                  <XCircleIcon className="h-8 w-8 text-white" />{" "}
                </button>
              </div>
            </div>
          )}
        </div>
        <div
          className={`mx-auto bg-opacity-50 mt-16 grid grid-cols-1 md:grid-cols-5 gap-5 bg-[#373737] p-4 rounded-3xl w-full md:w-[900px] border-8 border-opacity-10 border-[#373737] ${
            isDragging ? "border-gray-600" : ""
          }`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <div className="md:col-span-3 bg-[#373737] h-[300px] md:h-[300px] w-full flex items-center justify-center relative">
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
                onClick={() => fileInputRefSingle.current.click()}
                className="h-20 cursor-pointer"
              />
            )}
          </div>
          <div className="rounded-3xl md:col-span-2 bg-[#181818] h-[300px] md:h-[300px] w-full flex flex-col items-center justify-center">
            <button
              className="camera-button h-9 flex items-center justify-center space-x-2 bg-[#373737] text-white px-4 py-2 rounded-full shadow-lg hover:scale-105 hover:bg-opacity-50 transition-colors duration-200"
              onClick={handleOpenCamera}
            >
              <CameraIcon className="h-5 w-5 text-white" />
              <span className="font-bold">| Open Camera</span>
            </button>

            <button
              className="h-9 mt-2 flex items-center justify-center space-x-2 bg-[#373737] text-white px-4 py-2 rounded-full shadow-lg hover:scale-105 hover:bg-opacity-50 transition-colors duration-200"
              onClick={() => fileInputRefSingle.current.click()}
            >
              <FolderOpenIcon className="h-5 w-5 text-white" />
              <span className="font-bold">| Choose From File</span>
            </button>

            <div className="flex items-center justify-center mb-4 mt-4">
              <button
                onClick={handleToggle}
                className={`relative w-36 h-9 flex items-center rounded-full p-1 ${
                  toggleState ? "bg-[#373737]" : "bg-[#373737]"
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
            <div>
              {searchInitiated ? (
                // texture
                <div>Texture Options Here</div>
              ) : (
                // color
                <div>Color Options Here</div>
              )}
            </div>
            <button
              className="bg-[#373737] font-bold text-white px-4 py-2 rounded-md hover:bg-opacity-50 transition-colors duration-100"
              onClick={() => handleSearch(selectedImage)}
            >
              Search
            </button>
            <button
              className="h-9 mt-2 flex items-center justify-center space-x-2 bg-[#373737] text-white px-4 py-2 rounded-full shadow-lg hover:scale-105 hover:bg-opacity-50 transition-colors duration-200"
              onClick={() => fileInputRefMultiple.current.click()}
            >
              <ArrowUpTrayIcon className="h-5 w-5 text-white" />
              <span className="font-bold">| Upload Dataset</span>
            </button>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRefSingle}
              onChange={handleFileSelected}
              style={{ display: "none" }}
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRefMultiple}
              onChange={handleDatasetUpload}
              webkitdirectory=""
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
          ref={resultsRef}
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
    </>
  );
};

export default ImageInput;
