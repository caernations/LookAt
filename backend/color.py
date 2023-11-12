from PIL import Image
import math
import os
from numba import jit


def color():
    imagePATH = "./static/image/image.jpg"  # Path to image (directly to image.jpg)
    datasetPATH = "./static/dataset"  # Path to dataset folder
    datasetFiles = os.listdir(datasetPATH)

    listDatasets = [None for _ in range(len(datasetFiles))]
    listvektorDatasets = []

    for i in range(len(datasetFiles)):
        listDatasets[i] = Image.open(os.path.join(datasetPATH, datasetFiles[i]))

        if listDatasets[i].mode != "RGB":
            listDatasets[i] = listDatasets[i].convert("RGB")

        width, height = listDatasets[i].size

        listDatasets[i] = list(
            Image.open(os.path.join(datasetPATH, datasetFiles[i])).getdata()
        )

        listDatasets[i] = [
            listDatasets[i][j * width : (j + 1) * width] for j in range(height)
        ]

        meanHD = 0
        meanSD = 0
        meanVD = 0
        # Convert RGB to HSV
        for j in range(height):
            for k in range(width):
                r, g, b = listDatasets[i][j][k]
                h, s, v = convertRGBToHSV(r, g, b)
                meanHD += h
                meanSD += s
                meanVD += v
        meanHD /= (height * width)
        meanVD /= (height * width)
        meanSD /= (height * width)
        vektorDataset = [meanHD, meanVD, meanSD] 
        listvektorDatasets.append(vektorDataset)

    image = Image.open(imagePATH)  # Image variable

    if image.mode != "RGB":  # Check if image is RGB
        image = image.convert("RGB")
    width, height = image.size

    pixelMatrix = list(image.getdata())
    pixelMatrix = [pixelMatrix[i * width : (i + 1) * width] for i in range(height)]

    meanHI = 0
    meanSI = 0
    meanVI = 0
    for i in range(height):
        for j in range(width):
            r, g, b = pixelMatrix[i][j]
            h, s, v = convertRGBToHSV(r, g, b)
            meanHI += h
            meanSI += s
            meanVI += v
    
    meanHI /= (height * width)
    meanVI /= (height * width)
    meanSI /= (height * width)

    vektorImage = [meanHI, meanSI, meanVI]

    # Pokoknya kalo mau akses foto-foto yang di dataset ada di listDatasets
    # Tinggal ambil index nya
    # Kalo mau akses foto image ada di pixelMatrix
    # fyi (semua foto sudah diubah ke HSV)

    listResultColor = [None for _ in range(len(listDatasets))]
    for i in range(len(listDatasets)):
        listResultColor[i] = round(
            cosineSimilarityImage(vektorImage, listvektorDatasets[i]) * 100, 3
        )

    return listResultColor

def splitImage(matrix):
    parts = []
    partRow = len(matrix) // 3
    partCol = len(matrix[0]) // 3
    for i in range(3):
        for j in range(3):
            left = j * partCol
            upper = i * partRow
            right = left + partCol
            lower = upper + partRow

            submatrix = [row[left:right] for row in matrix[upper:lower]]

            parts.append(submatrix)

    return parts

@jit(nopython=True)
def convertRGBToHSV(r, g, b):
    r, g, b = r / 255.0, g / 255.0, b / 255.0
    max_value = max(r, g, b)
    min_value = min(r, g, b)
    delta = max_value - min_value

    v = max_value
    if v == 0:
        s = 0
    else:
        s = delta / v

    if s == 0:
        h = 0
    else:
        if v == r:
            h = 60 * (((g - b) / delta) % 6)
        elif v == g:
            h = 60 * (((b - r) / delta) + 2)
        elif v == b:
            h = 60 * (((r - g) / delta) + 4)

    if h < 0:
        h += 360

    return (h, s, v)


def histogramHSV(image):
    histH = [0 for _ in range(360)]
    histS = [0 for _ in range(255)]
    histV = [0 for _ in range(255)]

    for i in range(len(image)):
        for j in range(len(image[0])):
            h, s, v = image[i][j]
            h = round(h)
            s = round(s)
            v = round(v)
            histH[h] += 1
            histS[s] += 1
            histV[v] += 1

    return (histH, histS, histV)


def cosineSimilarityImage(vektor1, vektor2):

    dotProduct = sum(a * b for a, b in zip(vektor1, vektor2))
    magnitude1 = math.sqrt(sum(a**2 for a in vektor1))
    magnitude2 = math.sqrt(sum(b**2 for b in vektor2))
    result = dotProduct / (magnitude1 * magnitude2)

    return result


if __name__ == "__main__":
    color()
