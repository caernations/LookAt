"use client";
import React from "react";
import { useState } from "react";
import {
  Document,
  Page,
  Image,
  Text,
  View,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import {
  FolderArrowDownIcon,
  MinusIcon,
  ChevronUpIcon,
  ChevronDoubleRightIcon,
  ChevronDoubleLeftIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/solid";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    padding: 10,
    alignItems: "center",
  },
  titleContainer: {
    marginBottom: 10,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "extrabold",
  },
  imagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  imageContainer: {
    width: "30%",
    height: 200,
    margin: "1%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
  },
  image: {
    maxWidth: "100%",
    maxHeight: "100%",
    height: "auto",
    width: "auto",
  },
  input: {
    maxWidth: "70%",
    maxHeight: "70%",
    height: "auto",
    width: "auto",
  },
  similarityText: {
    marginTop: 5,
    fontSize: 8,
  },
});

const MyDocument = ({ images, similarityData, imageInput }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Input Image:</Text>
      </View>
      <View>
        <Image src={URL.createObjectURL(imageInput)} style={styles.input} />
      </View>
    </Page>
    <Page size="A4" style={styles.page}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Results:</Text>
      </View>
      <View style={styles.imagesContainer}>
        {images.map((item, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image
              src={`data:image/jpeg;base64,${item.base64imagedata}`}
              style={styles.image}
            />
            <Text style={styles.similarityText}>
              Similarity: {similarityData[index].toFixed(4)}%
            </Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

const ResultsPerPage = 6;
const Result = ({ data, inputImage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages =
    data && data.length <= ResultsPerPage
      ? 1
      : Math.ceil(data.length / ResultsPerPage);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );
  const [customFileName, setCustomFileName] = useState("");
  const startIndex = (currentPage - 1) * ResultsPerPage;

  const [pageNumberSet, setPageNumberSet] = useState(1);
  const pageNumberSets = Math.ceil(totalPages / 10);

  const downloadPDF = async () => {
    const similarityData = data.map((item) => item.similaritypercentage);
    const doc = (
      <MyDocument
        images={data}
        similarityData={similarityData}
        imageInput={inputImage}
      />
    );
    const asPdf = pdf();
    asPdf.updateContainer(doc);
    const blob = await asPdf.toBlob();
    saveAs(blob, `${customFileName || "download"}.pdf`);
  };

  const goToNextPageSet = () => {
    if (pageNumberSet < pageNumberSets) {
      setPageNumberSet(pageNumberSet + 1);
    }
  };

  const goToPreviousPageSet = () => {
    if (pageNumberSet > 1) {
      setPageNumberSet(pageNumberSet - 1);
    }
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
    setPageNumberSet(1);
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
    setPageNumberSet(Math.ceil(totalPages / 10));
  };

  const startPage = (pageNumberSet - 1) * 10 + 1;
  const endPage = Math.min(startPage + 9, totalPages);

  const gridHeight = "422px";

  return (
    <div className="bg-[#373737] bg-opacity-70 px-8 pb-8 mt-20 mx-80 rounded-t-3xl flex flex-col items-center justify-center">
      <MinusIcon className="h-12 text-black w-12 cursor-pointer hover:text-gray-500" />
      <div>
        <h2 className="text-white text-lg">Result: {data.length}</h2>
        {/* <p className="text-white text-sm">{runtime}</p> */}
      </div>
      <input
        type="text"
        value={customFileName}
        onChange={(e) => setCustomFileName(e.target.value)}
        placeholder="Enter file name"
        className="filename-input text-sm bg-[#373737] bg-opacity-70 rounded-2xl px-2"
      />
      <FolderArrowDownIcon
        className="h-6 mb-4 cursor-pointer"
        onClick={downloadPDF}
      />
      <div
        style={{ minHeight: gridHeight }}
        className="grid grid-cols-3 gap-x-12 gap-y-4"
      >
        {data ? (
          data
            .slice(startIndex, startIndex + ResultsPerPage)
            .map((item, index) => (
              <div
                key={index}
                className="imageHover relative aspect-square h-48 rounded-2xl overflow-hidden"
              >
                <img
                  src={`data:image/jpeg;base64,${item.base64imagedata}`}
                  // alt={item.alt}
                  className="rounded-2xl w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-40 font-bold rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-xl bg-black p-2 rounded-xl">
                    {item.similaritypercentage.toFixed(3)} %
                  </span>
                </div>
              </div>
            ))
        ) : (
          <div className="flex justify-center items-center">
            <ChevronUpIcon className="h-12 text-black w-12 cursor-pointer hover:text-gray-500" />
          </div>
        )}
      </div>
      <div className="flex justify-center space-x-2 mt-4">
        {pageNumberSet > 1 && (
          <button onClick={goToFirstPage} className="pagination-button">
            <ChevronDoubleLeftIcon className="h-6 text-white hover:text-black transition-colors duration-300" />
          </button>
        )}
        {pageNumberSet > 1 && (
          <button onClick={goToPreviousPageSet} className="pagination-button">
            <ChevronLeftIcon className="h-6 text-white hover:text-black transition-colors duration-300" />
          </button>
        )}
        {Array.from(
          { length: endPage - startPage + 1 },
          (_, index) => startPage + index
        ).map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={`pagination-number border-black p-2 h-10 items-center hover:bg-black transition-colors duration-300 w-12 rounded-lg ${
              currentPage === number
                ? "bg-black text-white"
                : "text-white"
            }`}
          >
            {number}
          </button>
        ))}
        {pageNumberSet < pageNumberSets && (
          <button onClick={goToNextPageSet} className="pagination-button">
            <ChevronRightIcon className="text-white h-6 hover:text-black transition-colors duration-300" />
          </button>
        )}

        {pageNumberSet < pageNumberSets && (
          <button onClick={goToLastPage} className="pagination-button">
            <ChevronDoubleRightIcon className="h-6 text-white hover:text-black transition-colors duration-300" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Result;
