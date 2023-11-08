from PIL import Image
import math
import os


def main():
    imagePATH = "./image/image.jpg"  # Path to image (directly to image.jpg)
    datasetPATH = "./dataset"  # Path to dataset folder
    datasetFiles = os.listdir(datasetPATH)

    listDatasets = [None for _ in range(len(datasetFiles))]

    for i in range(len(datasetFiles)):
        listDatasets[i] = Image.open(os.path.join(datasetPATH, datasetFiles[i]))

        listDatasets[i] = listDatasets[i].convert("L")

        width, height = listDatasets[i].size

        listDatasets[i] = list(
            Image.open(os.path.join(datasetPATH, datasetFiles[i])).getdata()
        )

        listDatasets[i] = [
            listDatasets[i][n : n + width]
            for n in range(0, len(listDatasets[i]), width)
        ]

        image = Image.open(imagePATH)  # Image variable
        image = image.convert("L")

        width, height = image.size

        pixelMatrix = list(image.getdata())
        pixelMatrix = [
            pixelMatrix[n : n + width] for n in range(0, len(pixelMatrix), width)
        ]


if __name__ == "__main__":
    main()
