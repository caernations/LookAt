"use client";
import React, { useEffect } from "react";

const test = () => {
  useEffect(() => {
    const form = document.getElementById("form1");
    form.onsubmit = function (event) {
      event.preventDefault();

      var formData = new FormData(this);
      var startTime = performance.now();

      fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          var endTime = performance.now();
          var timeTaken = endTime - startTime;

          var imagesContainer = document.getElementById("images");
          imagesContainer.innerHTML = ""; // Clear the container

          // Display the time taken
          var timeElement = document.createElement("p");
          timeElement.textContent =
            "Time taken: " + Math.round(timeTaken) + " ms";
          imagesContainer.appendChild(timeElement);

          data.forEach((imageData) => {
            var img = document.createElement("img");
            img.src = `data:image/jpeg;base64,${imageData.base64imagedata}`;
            imagesContainer.appendChild(img);

            var similarityElement = document.createElement("p");
            similarityElement.textContent =
              "Similarity: " + imageData.similaritypercentage.toFixed(5) + "%";
            imagesContainer.appendChild(similarityElement);
          });
        });
    };
  }, []);

  return (
    <>
      <form id="form1" encType="multipart/form-data">
        <label htmlFor="dataset">Select dataset:</label>
        <input type="file" name="dataset" multiple />

        <label htmlFor="image">Select root image:</label>
        <input type="file" name="image" />

        <label htmlFor="color">Color</label>
        <input type="radio" name="choice" id="color" value="color" />

        <label htmlFor="texture">Texture</label>
        <input type="radio" name="choice" id="texture" value="texture" />

        <input type="submit" value="Submit" />
      </form>
      <div id="images"></div>
    </>
  );
};

export default test;
