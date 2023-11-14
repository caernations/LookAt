"use client";
import React from "react";
import { useState } from "react";
import { Document, Page, Image, pdf, StyleSheet } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import {
  FolderArrowDownIcon,
  MinusIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/solid";

const imageResults = [
  {
    imagePath: "../../images/image5.png",
    percentage: "100%",
    alt: "Result",
  },
  {
    imagePath: "../../images/image5.png",
    percentage: "87%",
    alt: "Result",
  },
  {
    imagePath: "../../images/image5.png",
    percentage: "80%",
    alt: "Result",
  },
  {
    imagePath: "../../images/image5.png",
    percentage: "1%",
    alt: "Result",
  },
  {
    imagePath: "../../images/image5.png",
    percentage: "0%",
    alt: "Result",
  },
  {
    imagePath: "../../images/image5.png",
    percentage: "70%",
    alt: "Result",
  },
  {
    imagePath: "../../images/image5.png",
    percentage: "100%",
    alt: "Result",
  },
];

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#E4E4E4",
    padding: 10,
    justifyContent: "center",
  },
  image: {
    width: "30%",
    margin: "1%",
    height: "auto",
  },
});

const MyDocument = ({ images }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {images.map((imagePath, index) => (
        <Image key={index} src={imagePath} style={styles.image} />
      ))}
    </Page>
  </Document>
);

const ResultsPerPage = 6;
const Result = ({ searchInitiated }) => {
  const imagePaths = imageResults.map((data) => data.imagePath);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(imageResults.length / ResultsPerPage);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const startIndex = (currentPage - 1) * ResultsPerPage;
  const selectedResults = imageResults.slice(
    startIndex,
    startIndex + ResultsPerPage
  );

  const downloadPDF = async () => {
    const doc = <MyDocument images={imagePaths} />;
    const asPdf = pdf();
    asPdf.updateContainer(doc);
    const blob = await asPdf.toBlob();
    saveAs(blob, "download.pdf");
  };

  const sortedImageResults = [...imageResults].sort((a, b) => {
    return parseInt(b.percentage, 10) - parseInt(a.percentage, 10);
  });

  const gridHeight = "422px";

  return (
    <div className="bg-[#373737] bg-opacity-70 px-8 pb-8 mt-20 mx-80 rounded-t-3xl flex flex-col items-center justify-center">
      <MinusIcon className="h-12 text-black w-12 cursor-pointer hover:text-gray-500" />
      <h2 className="text-white text-lg">Result:</h2>
      <FolderArrowDownIcon
        className="h-6 mb-4 cursor-pointer"
        onClick={downloadPDF}
      />
      <div
        style={{ minHeight: gridHeight }}
        className="grid grid-cols-3 gap-x-12 gap-y-4"
      >
        {searchInitiated ? (
          sortedImageResults
            .slice(startIndex, startIndex + ResultsPerPage)
            .map((item, index) => (
              <div
                key={index}
                className="imageHover relative aspect-square h-48 rounded-2xl overflow-hidden"
              >
                <img
                  src={item.imagePath}
                  alt={item.alt}
                  className="rounded-2xl w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-40 font-bold rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-xl bg-black p-2 rounded-xl">{item.percentage}</span>
                </div>
              </div>
            ))
        ) : (
          <div className="bg-blue-100 aspect-square h-48"></div>
        )}
      </div>
      <div className="flex justify-center space-x-2 mt-4">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={`${
              currentPage === number ? "bg-gray-900" : "bg-gray-700"
            } hover:bg-gray-800 text-white font-bold py-2 px-4 rounded`}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Result;
