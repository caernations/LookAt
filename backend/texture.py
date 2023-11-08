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


def GLCM(image):
    width, height = image.size
    frameworkMatrix = [[0 for _ in range(256)] for _ in range(256)]

    for i in range(width):
        for j in range(height - 1):
            idxI = image[i][j]
            idxJ = image[i][j + 1]
            frameworkMatrix[idxI][idxJ] += 1
    transposeFramework = transposeMatrix(frameworkMatrix)
    
    for i in range (256):
        for j in range (256):
            frameworkMatrix[i][j] += transposeFramework[i][j]

def transposeMatrix(matrix):
    return [list(i) for i in zip(*matrix)]


if __name__ == "__main__":
    main()
