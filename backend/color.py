from PIL import Image
import math
import os
from numba import jit
import multiprocessing


def process_image(image_path, output, index):
    image = Image.open(image_path)

    if image.mode != "RGB":
        image = image.convert("RGB")

    width, height = image.size

    pixelMatrix = list(image.getdata())
    pixelMatrix = [pixelMatrix[i * width : (i + 1) * width] for i in range(height)]

    histH = [0 for _ in range(361)]
    histS = [0 for _ in range(256)]
    histV = [0 for _ in range(256)]

    for i in range(height):
        for j in range(width):
            r, g, b = pixelMatrix[i][j]
            h, s, v = convertRGBToHSV(r, g, b)
            h = round(h)
            s = round(s)
            v = round(v)
            histH[h] += 1
            histS[s] += 1
            histV[v] += 1

    hist = histH, histS, histV
    output[index] = hist


def color():
    imagePATH = "./static/image/image.jpg"
    datasetPATH = "./static/dataset"
    datasetFiles = os.listdir(datasetPATH)

    manager = multiprocessing.Manager()
    output = manager.dict()

    processes = []
    for i, datasetFile in enumerate(datasetFiles):
        process = multiprocessing.Process(
            target=process_image,
            args=(os.path.join(datasetPATH, datasetFile), output, i),
        )
        process.start()
        processes.append(process)

    for process in processes:
        process.join()

    histDatasets = [output[i] for i in range(len(datasetFiles))]

    image = Image.open(imagePATH)

    if image.mode != "RGB":
        image = image.convert("RGB")

    width, height = image.size

    pixelMatrix = list(image.getdata())
    pixelMatrix = [pixelMatrix[i * width : (i + 1) * width] for i in range(height)]

    histH = [0 for _ in range(361)]
    histS = [0 for _ in range(256)]
    histV = [0 for _ in range(256)]

    for i in range(height):
        for j in range(width):
            r, g, b = pixelMatrix[i][j]
            h, s, v = convertRGBToHSV(r, g, b)
            h = round(h)
            s = round(s)
            v = round(v)
            histH[h] += 1
            histS[s] += 1
            histV[v] += 1

    listResultColor = [None for _ in range(len(histDatasets))]
    for i in range(len(histDatasets)):
        listResultColor[i] = round(
            cosineSimilarity((histH, histS, histV), histDatasets[i]) * 100, 3
        )

    return listResultColor


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


def cosineSimilarity(image1, image2):
    h1, s1, v1 = image1
    h2, s2, v2 = image2

    dotProductH = sum(a * b for a, b in zip(h1, h2))
    magnitudeH1 = math.sqrt(sum(a**2 for a in h1))
    magnitudeH2 = math.sqrt(sum(b**2 for b in h2))
    resultH = dotProductH / (magnitudeH1 * magnitudeH2)

    dotProductS = sum(a * b for a, b in zip(s1, s2))
    magnitudeS1 = math.sqrt(sum(a**2 for a in s1))
    magnitudeS2 = math.sqrt(sum(b**2 for b in s2))
    resultS = dotProductS / (magnitudeS1 * magnitudeS2)

    dotProductV = sum(a * b for a, b in zip(v1, v2))
    magnitudeV1 = math.sqrt(sum(a**2 for a in v1))
    magnitudeV2 = math.sqrt(sum(b**2 for b in v2))
    resultV = dotProductV / (magnitudeV1 * magnitudeV2)

    overallResult = (resultH + resultS + resultV) / 3

    return overallResult


if __name__ == "__main__":
    color()
