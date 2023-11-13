// Result.jsx
import React from 'react';

const Result = ({ imagePath }) => {
  return (
    <div className="bg-gray-800 p-10 mt-20 m-80 rounded-t-3xl flex flex-col items-center justify-center">
      <h2 className="text-white text-lg mb-4">Result:</h2>
      <div className="grid grid-cols-3 gap-10">
        {imagePath ? (
          <img src={imagePath} alt="Result" className="aspect-square h-48" />
        ) : (
          <div className="bg-blue-100 aspect-square h-48"></div>
        )}
        {imagePath ? (
          <img src={imagePath} alt="Result" className="aspect-square h-48" />
        ) : (
          <div className="bg-blue-100 aspect-square h-48"></div>
        )}
        {imagePath ? (
          <img src={imagePath} alt="Result" className="aspect-square h-48" />
        ) : (
          <div className="bg-blue-100 aspect-square h-48"></div>
        )}
        {imagePath ? (
          <img src={imagePath} alt="Result" className="aspect-square h-48" />
        ) : (
          <div className="bg-blue-100 aspect-square h-48"></div>
        )}
        {imagePath ? (
          <img src={imagePath} alt="Result" className="aspect-square h-48" />
        ) : (
          <div className="bg-blue-100 aspect-square h-48"></div>
        )}
        {imagePath ? (
          <img src={imagePath} alt="Result" className="aspect-square h-48" />
        ) : (
          <div className="bg-blue-100 aspect-square h-48"></div>
        )}
      </div>
    </div>
  );
};

export default Result;
