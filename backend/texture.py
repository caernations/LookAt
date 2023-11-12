from PIL import Image
import math
import os


def texture():
    imagePATH = "./static/image/image.jpg"  # Path to image (directly to image.jpg)
    datasetPATH = "./static/dataset"  # Path to dataset folder
    datasetFiles = os.listdir(datasetPATH)

    listDatasets = [None for _ in range(len(datasetFiles))]

    for i in range(len(datasetFiles)):
        listDatasets[i] = Image.open(os.path.join(datasetPATH, datasetFiles[i]))

        listDatasets[i] = listDatasets[i].convert("L")

        width, height = listDatasets[i].size

        listDatasets[i] = list(listDatasets[i].getdata())

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

    listTextureResult = [None for _ in range(len(listDatasets))]
    for i in range(len(listDatasets)):
        listTextureResult[i] = round(
            cosineSimilarityTexture(pixelMatrix, listDatasets[i]) * 100, 5
        )

    return listTextureResult


def GLCM(image):
    height = len(image)
    width = len(image[0])
    frameworkMatrix = [[0 for _ in range(256)] for _ in range(256)]
    for i in range(height):
        for j in range(width - 1):
            idxI = image[i][j]
            idxJ = image[i][j + 1]
            frameworkMatrix[idxI][idxJ] += 1
    transposeFramework = transposeMatrix(frameworkMatrix)

    for i in range(256):
        for j in range(256):
            frameworkMatrix[i][j] += transposeFramework[i][j]

    glcm = normaliseSymmetricMatrix(frameworkMatrix)
    return glcm


def metric(image):
    contrast = 0
    homogeneity = 0
    dissimilarity = 0
    asm = 0
    energy = 0
    glcm = GLCM(image)
    for i in range(255):
        for j in range(255):
            contrast += glcm[i][j] * ((i - j) ** 2)
            homogeneity += (glcm[i][j]) / (1 + ((i - j) ** 2))
            dissimilarity += glcm[i][j] * abs((i - j))
            asm += (glcm[i][j]) ** 2
    energy = math.sqrt(asm)
    vektor = []
    vektor.append(contrast)
    vektor.append(homogeneity)
    vektor.append(dissimilarity)
    vektor.append(asm)
    vektor.append(energy)
    return vektor


def cosineSimilarityTexture(image1, image2):
    v1 = metric(image1)
    v2 = metric(image2)

    dotProduct = sum(a * b for a, b in zip(v1, v2))
    magnitude1 = math.sqrt(sum(a**2 for a in v1))
    magnitude2 = math.sqrt(sum(b**2 for b in v2))
    result = dotProduct / (magnitude1 * magnitude2)

    return result


def transposeMatrix(matrix):
    return [list(i) for i in zip(*matrix)]


def sumElmtMatrix(matrix):
    sum = 0
    for i in range(len(matrix)):
        for j in range(len(matrix[i])):
            sum += matrix[i][j]
    return sum


def normaliseSymmetricMatrix(matrix):
    sum = sumElmtMatrix(matrix)
    for i in range(len(matrix)):
        for j in range(len(matrix[0])):
            matrix[i][j] /= sum
    return matrix


if __name__ == "__main__":
    texture()
