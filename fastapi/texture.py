import base64
import cv2
import numpy as np
from scipy.spatial import distance

def GLCM(image):
    height, width = image.shape
    frameworkMatrix = np.zeros((256, 256), dtype=np.uint64)
    for i in range(height):
        for j in range(width - 1):
            idxI = image[i, j]
            idxJ = image[i, j + 1]
            frameworkMatrix[idxI, idxJ] += 1
    transposeFramework = frameworkMatrix.T

    frameworkMatrix += transposeFramework

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
            contrast += glcm[i, j] * ((i - j) ** 2)
            homogeneity += (glcm[i, j]) / (1 + ((i - j) ** 2))
            dissimilarity += glcm[i, j] * abs((i - j))
            asm += (glcm[i, j]) ** 2
    energy = np.sqrt(asm)
    vektor = [contrast, homogeneity, dissimilarity, asm, energy]
    return vektor


def cosineSimilarityTexture(image1, image2):
    v1 = metric(image1)
    v2 = metric(image2)

    dotProduct = np.dot(v1, v2)
    magnitude1 = np.sqrt(np.dot(v1, v1))
    magnitude2 = np.sqrt(np.dot(v2, v2))
    result = dotProduct / (magnitude1 * magnitude2)

    return result


def normaliseSymmetricMatrix(matrix):
    total_sum = np.sum(matrix)
    return matrix / total_sum

async def texture(dataset, image):
    image_contents = await image.read()
    root_image = cv2.imdecode(np.fromstring(image_contents, np.uint8), cv2.IMREAD_COLOR)
    root_image_g = cv2.cvtColor(root_image, cv2.COLOR_BGR2GRAY)

    similar_images = []
    for dataset_image in dataset:
        dataset_contents = await dataset_image.read()
        dataset_image = cv2.imdecode(
            np.fromstring(dataset_contents, np.uint8), cv2.IMREAD_COLOR
        )
        dataset_image_hsv = cv2.cvtColor(dataset_image, cv2.COLOR_BGR2GRAY)

        similarity = cosineSimilarityTexture(root_image, dataset_image_hsv)
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
