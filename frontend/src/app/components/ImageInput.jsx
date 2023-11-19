"use client";
import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  useReducer,
} from "react";
import Webcam from "react-webcam";
import Result from "./Result";
import {
  PhotoIcon,
  CameraIcon,
  XCircleIcon,
  FolderOpenIcon,
  ArrowUpTrayIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";

const ACTIONS = {
  SET_RESULTS: "set-results",
  SET_ERROR: "set-error",
  SET_LOADING: "set-loading",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_RESULTS:
      return { ...state, results: action.payload, error: null, loading: false };
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, results: [], loading: false };
    case ACTIONS.SET_LOADING:
      return { ...state, loading: true };
    default:
      return state;
  }
}

const initialState = {
  results: [],
  error: null,
  loading: false,
};

const ImageInput = () => {
  const webcamRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [toggleState, setToggleState] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [searchClicked, setSearchClicked] = useState(false);
  const [searchInitiated, setSearchInitiated] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [searchError, setError] = useState("");
  const [timer, setTimer] = useState(0);
  const intervalRef = useRef(null);
  const resultsRef = useRef(null);
  const fileInputRefSingle = useRef(null);
  const fileInputRefMultiple = useRef(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [selectedDataset, setSelectedDataset] = useState(null);
  const [data, setData] = useState(null);
  const [captureIntervalId, setCaptureIntervalId] = useState(null);
  const [exeTime, setExeTime] = useState(0);

  const imageStyle = {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
  };

  const handleSearch = (imageFile) => {
    dispatch({ type: ACTIONS.SET_LOADING });

    const formData = new FormData();

    formData.append("image", selectedImage);
    console.log(formData.getAll("image"));

    if (selectedDataset) {
      Array.from(selectedDataset).forEach((file, index) => {
        formData.append("dataset", file);
      });
    }
    console.log(formData.getAll("dataset"));

    formData.append("choice", toggleState ? "texture" : "color");
    var startTime = performance.now();

    fetch("http://127.0.0.1:8000/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        var endTime = performance.now();
        var runtime = endTime - startTime;
        setExeTime(runtime);
        setData(data);
        dispatch({ type: ACTIONS.SET_RESULTS, payload: data });
        setSearchClicked(true);
      })
      .catch((error) => {
        dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      });
  };

  const handleSearchClick = (event) => {
    event.preventDefault();
    if (selectedImage) {
      handleSearch(selectedImage);
      setSearchClicked(true);
    } else {
      dispatch({ type: ACTIONS.SET_ERROR, payload: "No image selected." });
    }
  };

  const handleFileSelected = (e) => {
    const file = e.target.files[0];
    if (file && file instanceof File) {
      setSelectedImage(file);
      setError("");
    } else {
      setError(
        "The selected item is not a valid file. Please select an image file."
      );
      setSelectedImage(null);
    }
  };

  const handleDeleteImage = () => {
    setSelectedImage(null);
    setSearchClicked(false);
    setData(null);
    setShowResult(false);
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
      setSelectedImage(file);
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
    setSearchInitiated(true);
  };

  const handleTextureMode = () => {
    setSearchInitiated(true);
  };

  const handleOpenCamera = () => {
    setShowCamera(true);
  };

  const handleDatasetUpload = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      setSelectedDataset(files);
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
    fetch(imageSrc)
      .then((res) => res.blob())
      .then((blob) => {
        const imageFile = new File([blob], "webcam.jpg", { type: "image/jpeg" });
        setSelectedImage(imageFile); // Set the captured image as the selected image
        handleSearch(imageFile); // Initiate search with the captured image
      })
      .catch((error) => {
        setError(`Error capturing the image: ${error.message}`);
      });
  } else {
    setError("No image captured from the webcam.");
  }
}, [webcamRef, handleSearch]); // Make sure to include handleSearch in the dependencies array if it uses any state variables


  useEffect(() => {
    if (showCamera && !captureIntervalId) {
      const newIntervalId = setInterval(() => {
        capture();
      }, 5000);
      setCaptureIntervalId(newIntervalId);
    }
    return () => {
      if (captureIntervalId) {
        clearInterval(captureIntervalId);
        setCaptureIntervalId(null);
      }
    };
  }, [showCamera, captureIntervalId, capture]);

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

  useEffect(() => {
    if (!state.loading && searchClicked) {
      setShowResult(true);

      setTimeout(() => {
        if (resultsRef.current) {
          const yOffset = -20;
          const y =
            resultsRef.current.getBoundingClientRect().top +
            window.scrollY +
            yOffset;

          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 300);
    }
  }, [state.loading, searchClicked]);

  return (
    <>
      <section className="mb-20">
        <div className="flex items-center justify-center">
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
                  mirrored={true}
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
                <img
                  src={
                    selectedImage
                      ? URL.createObjectURL(selectedImage)
                      : placeholderImage
                  }
                  alt="Selected"
                  style={imageStyle}
                  className="image-class"
                />
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
            <button
              className="bg-[#373737] font-bold text-white px-4 py-2 rounded-md hover:bg-opacity-50 transition-colors duration-100"
              onClick={handleSearchClick}
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
              multiple
            />
          </div>
          {searchError && (
            <div className="text-red-500 text-xl font-bold text-center my-2">
              {searchError}
            </div>
          )}
        </div>
        <div>
          {state.loading && (
            <div className="overlay">
              <div className="spinner-container">
                <div className="spinner"></div>
                <p className="loading-text font-mono">
                  Loading<span className="loading-ellipsis"></span>
                  <br />
                  It may take a while
                </p>
              </div>
            </div>
          )}
          {!state.loading && state.error && <p>Error: {state.error}</p>}
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
          {!state.loading && searchClicked && data && (
            <Result data={data} inputImage={selectedImage} time={exeTime} />
          )}
        </div>
      </section>
    </>
  );
};

export default ImageInput;
