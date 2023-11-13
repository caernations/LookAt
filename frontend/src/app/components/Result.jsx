'use client'
import React from "react";
import { Document, Page, Image, pdf } from "@react-pdf/renderer";
import { saveAs } from 'file-saver'; // Make sure this is installed
import { FolderArrowDownIcon } from "@heroicons/react/24/solid";

const imageResults = [
  {
    imagePath: "../../images/image5.png",
    alt: "Result",
  },
  {
    imagePath: "../../images/image5.png",
    alt: "Result",
  },
  {
    imagePath: "../../images/image5.png",
    alt: "Result",
  },
  {
    imagePath: "../../images/image5.png",
    alt: "Result",
  },
  {
    imagePath: "../../images/image5.png",
    alt: "Result",
  },
  {
    imagePath: "../../images/image5.png",
    alt: "Result",
  },
  // ... other images
];

// PDF Document Component
const MyDocument = ({ images }) => (
  <Document>
    {images.map((imagePath, index) => (
      <Page key={index} size="A4">
        <Image src={imagePath} style={{ height: "auto", width: "20%" }} />
      </Page>
    ))}
  </Document>
);

// Result Component
const Result = ({ searchInitiated }) => { // Receive the prop here
  const imagePaths = imageResults.map(data => data.imagePath);

  // Generate PDF and trigger download
  const downloadPDF = async () => {
    const doc = <MyDocument images={imagePaths} />;
    const asPdf = pdf(); // Initialize a new PDF instance
    asPdf.updateContainer(doc);
    const blob = await asPdf.toBlob();
    saveAs(blob, 'download.pdf');
  };

  return (
    <div className="bg-[#373737] bg-opacity-30 p-10 mt-20 m-80 rounded-t-3xl flex flex-col items-center justify-center">
      <h2 className="text-white text-lg">Result:</h2>
      <FolderArrowDownIcon className="h-6 mb-4 cursor-pointer" onClick={downloadPDF} />
      <div className="grid grid-cols-3 gap-10">
        {searchInitiated ? (
          imageResults.map((item, index) => (
            <img key={index} src={item.imagePath} alt={item.alt} className="aspect-square h-48" />
          ))
        ) : (
          // Render placeholder divs if search has not been initiated
          <div className="bg-blue-100 aspect-square h-48"></div>
        )}
        {searchInitiated ? (
          imageResults.map((item, index) => (
            <img key={index} src={item.imagePath} alt={item.alt} className="aspect-square h-48" />
          ))
        ) : (
          // Render placeholder divs if search has not been initiated
          <div className="bg-blue-100 aspect-square h-48"></div>
        )}
        {searchInitiated ? (
          imageResults.map((item, index) => (
            <img key={index} src={item.imagePath} alt={item.alt} className="aspect-square h-48" />
          ))
        ) : (
          // Render placeholder divs if search has not been initiated
          <div className="bg-blue-100 aspect-square h-48"></div>
        )}
        {searchInitiated ? (
          imageResults.map((item, index) => (
            <img key={index} src={item.imagePath} alt={item.alt} className="aspect-square h-48" />
          ))
        ) : (
          // Render placeholder divs if search has not been initiated
          <div className="bg-blue-100 aspect-square h-48"></div>
        )}
        {searchInitiated ? (
          imageResults.map((item, index) => (
            <img key={index} src={item.imagePath} alt={item.alt} className="aspect-square h-48" />
          ))
        ) : (
          // Render placeholder divs if search has not been initiated
          <div className="bg-blue-100 aspect-square h-48"></div>
        )}
        {searchInitiated ? (
          imageResults.map((item, index) => (
            <img key={index} src={item.imagePath} alt={item.alt} className="aspect-square h-48" />
          ))
        ) : (
          // Render placeholder divs if search has not been initiated
          <div className="bg-blue-100 aspect-square h-48"></div>
        )}
      </div>
    </div>
  );
};

export default Result;