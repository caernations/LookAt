import base64
import cv2
import numpy as np
from fastapi import FastAPI, File, UploadFile
from scipy.spatial import distance
from typing import List
from fastapi.responses import HTMLResponse

app = FastAPI()


def calculate_similarity(hist1, hist2):
    hist1 = hist1 / (sum(hist1) + 1e-10)
    hist2 = hist2 / (sum(hist2) + 1e-10)
    similarity = 1 - distance.cosine(hist1.flatten(), hist2.flatten())
    return similarity * 100


@app.post("/upload")
async def upload_files(
    dataset: List[UploadFile] = File(...),
    image: UploadFile = File(...),
):
    image_contents = await image.read()
    root_image = cv2.imdecode(np.fromstring(image_contents, np.uint8), cv2.IMREAD_COLOR)
    root_image_hsv = cv2.cvtColor(root_image, cv2.COLOR_BGR2HSV)
    root_histogram = cv2.calcHist(
        [root_image_hsv], [0, 1], None, [180, 256], [0, 180, 0, 256]
    )

    similar_images = []
    for dataset_image in dataset:
        dataset_contents = await dataset_image.read()
        dataset_image = cv2.imdecode(
            np.fromstring(dataset_contents, np.uint8), cv2.IMREAD_COLOR
        )
        dataset_image_hsv = cv2.cvtColor(dataset_image, cv2.COLOR_BGR2HSV)
        dataset_histogram = cv2.calcHist(
            [dataset_image_hsv], [0, 1], None, [180, 256], [0, 180, 0, 256]
        )

        similarity = calculate_similarity(root_histogram, dataset_histogram)

        if similarity >= 60:
            _, buffer = cv2.imencode(".jpg", dataset_image)
            dataset_image_base64 = base64.b64encode(buffer).decode("utf-8")
            similar_images.append(
                {
                    "base64imagedata": dataset_image_base64,
                    "similaritypercentage": similarity,
                }
            )
    return similar_images


@app.get("/")
def main():
    return HTMLResponse(
        """<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tubes Bentar</title>
    <script>
      window.onload = function () {
        document.getElementById("form1").onsubmit = function (event) {
          event.preventDefault();

          var formData = new FormData(this);
          var startTime = performance.now();

          fetch("/upload", {
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
                "Time taken: " + timeTaken.toFixed(3) + " ms";
              imagesContainer.appendChild(timeElement);

              data.forEach((imageData) => {
                var img = document.createElement("img");
                img.src = `data:image/jpeg;base64,${imageData.base64imagedata}`;
                imagesContainer.appendChild(img);

                var similarityElement = document.createElement("p");
                similarityElement.textContent =
                  "Similarity: " +
                  imageData.similaritypercentage.toFixed(3) +
                  "%";
                imagesContainer.appendChild(similarityElement);
              });
            });
        };
      };
    </script>
  </head>
  <body>
    <form id="form1" enctype="multipart/form-data">
      <label for="dataset">Select dataset:</label>
      <input type="file" name="dataset" multiple />

      <label for="image">Select root image:</label>
      <input type="file" name="image" />

      <input type="submit" value="Submit" />
    </form>
    <div id="images"></div>
  </body>
</html>

"""
    )
