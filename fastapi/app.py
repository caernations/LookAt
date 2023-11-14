from fastapi import FastAPI, File, UploadFile, Form
from typing import List
from fastapi.responses import HTMLResponse
from color import color

app = FastAPI()


@app.post("/upload")
async def upload_files(
    dataset: List[UploadFile] = File(...),
    image: UploadFile = File(...),
    choice: str = Form(...),
):
    if choice == "texture":
        # return await texture(dataset, image)
        pass
    elif choice == "color":
        return await color(dataset, image)


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
                "Time taken: " + Math.round(timeTaken) + " ms";
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

      <label for="color">Color</label>
      <input type="radio" name="choice" id="color" value="color" />

      <label for="texture">Texture</label>
      <input type="radio" name="choice" id="texture" value="texture" />

      <input type="submit" value="Submit" />
    </form>
    <div id="images"></div>
  </body>
</html>


"""
    )
