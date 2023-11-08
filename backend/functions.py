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

        if listDatasets[i].mode != "RGB":
            listDatasets[i] = listDatasets[i].convert("RGB")

        width, height = listDatasets[i].size

        listDatasets[i] = list(
            Image.open(os.path.join(datasetPATH, datasetFiles[i])).getdata()
        )

        listDatasets[i] = [
            listDatasets[i][j * width : (j + 1) * width] for j in range(height)
        ]

        # Convert RGB to HSV
        for j in range(height):
            for k in range(width):
                r, g, b = listDatasets[i][j][k]
                h, s, v = convertRGBToHSV(r, g, b)
                listDatasets[i][j][k] = (h, s, v)

    image = Image.open(imagePATH)  # Image variable

    if image.mode != "RGB":  # Check if image is RGB
        image = image.convert("RGB")
    width, height = image.size

    pixelMatrix = list(image.getdata())
    pixelMatrix = [pixelMatrix[i * width : (i + 1) * width] for i in range(height)]

    for i in range(height):
        for j in range(width):
            r, g, b = pixelMatrix[i][j]
            h, s, v = convertRGBToHSV(r, g, b)
            pixelMatrix[i][j] = (h, s, v)

    # Pokoknya kalo mau akses foto-foto yang di dataset ada di listDatasets
    # Tinggal ambil index nya
    # Kalo mau akses foto image ada di pixelMatrix
    # fyi (semua foto sudah diubah ke HSV)

    # Bikin histogram
    # Image
    histH, histS, histV = histogramHSV(pixelMatrix)
    # Dataset
    histDatasets = [None for _ in range(len(listDatasets))]
    for i in range(len(listDatasets)):
        histDatasets[i] = histogramHSV(listDatasets[i])

    # listResultColor = [None for _ in range(len(listDatasets))]
    # for i in range(len(listDatasets)):


def compareImage(pixelMatriksImage, pixelMatriksDataset):
    if (
        len(pixelMatriksImage)
        != len(pixelMatriksDataset) | len(pixelMatriksImage[0])
        != len(pixelMatriksDataset[0])
    ):
        return False
    else:
        for i in range(len(pixelMatriksImage)):
            for j in range(len(pixelMatriksImage[0])):
                if pixelMatriksImage[i][j] != pixelMatriksDataset[i][j]:
                    return False
        return True


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

    return h, s, v


def histogramHSV(image):
    histH = [0] * 180
    histS = [0] * 256
    histV = [0] * 256

    for i in range(len(image)):
        for j in range(len(image[0])):
            h, s, v = image[i][j]
            histH[h] += 1
            histS[s] += 1
            histV[v] += 1

    return histH, histS, histV


def cosineSimilarity(hist1, hist2):
    dot_product = sum(a * b for a, b in zip(hist1, hist2))
    magnitude1 = math.sqrt(sum(a**2 for a in hist1))
    magnitude2 = math.sqrt(sum(b**2 for b in hist2))
    if magnitude1 == 0 or magnitude2 == 0:
        return 0
    return dot_product / (magnitude1 * magnitude2)


if __name__ == "__main__":
    main()
