from PIL import Image
import math
import os
import numpy as np
from numba import jit


def color():
    imagePATH = "./static/image/image.jpg"  # Path to image (directly to image.jpg)
    datasetPATH = "./static/dataset"  # Path to dataset folder
    datasetFiles = os.listdir(datasetPATH)

    listDatasets = [None for _ in range(len(datasetFiles))]

    for i in range(len(datasetFiles)):
        listDatasets[i] = np.array(Image.open(os.path.join(datasetPATH, datasetFiles[i])))
        if listDatasets[i].shape[2] != 3:
            listDatasets[i] = listDatasets[i][:, :, :3]  # Keep only RGB channels

        # Convert RGB to HSV
        listDatasets[i] = np.apply_along_axis(convertRGBToHSV, -1, listDatasets[i])

    image = np.array(Image.open(imagePATH))  # Image variable
    if image.shape[2] != 3:
        image = image[:, :, :3]  # Keep only RGB channels

    # Convert RGB to HSV
    image = np.apply_along_axis(convertRGBToHSV, -1, image)

    # Histogram
    histH, histS, histV = histogramHSV(image)

    histDatasets = [histogramHSV(dataset) for dataset in listDatasets]

    listResultColor = [round(cosineSimilarity((histH, histS, histV), histDataset) * 100, 3)
                       for histDataset in histDatasets]

    return listResultColor


@jit(nopython=True)
def convertRGBToHSV(r, g, b):
    r, g, b = r / 255.0, g / 255.0, b / 255.0
    max_value = np.max([r, g, b])
    min_value = np.min([r, g, b])
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

    return h, s, v

def histogramHSV(image):
    histH = np.zeros(361)
    histS = np.zeros(101)
    histV = np.zeros(101)

    for i in range(len(image)):
        for j in range(len(image[0])):
            h, s, v = image[i, j]
            h = round(h)
            s = round(s)
            v = round(v)
            histH[h] += 1
            histS[s] += 1
            histV[v] += 1

    return histH, histS, histV

def cosineSimilarity(image1, image2):
    h1, s1, v1 = image1
    h2, s2, v2 = image2

    dotProductH = np.dot(h1, h2)
    magnitudeH1 = np.linalg.norm(h1)
    magnitudeH2 = np.linalg.norm(h2)
    resultH = dotProductH / (magnitudeH1 * magnitudeH2)

    dotProductS = np.dot(s1, s2)
    magnitudeS1 = np.linalg.norm(s1)
    magnitudeS2 = np.linalg.norm(s2)
    resultS = dotProductS / (magnitudeS1 * magnitudeS2)

    dotProductV = np.dot(v1, v2)
    magnitudeV1 = np.linalg.norm(v1)
    magnitudeV2 = np.linalg.norm(v2)
    resultV = dotProductV / (magnitudeV1 * magnitudeV2)

    overallResult = (resultH + resultS + resultV) / 3

    return overallResult


if __name__ == "__main__":
    color()
