from PIL import Image
import math
import os
import numpy as np
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor
from functools import partial

def process_image(image_path):
    image = Image.open(image_path)

    if image.mode != "RGB":
        image = image.convert("RGB")

    width, height = image.size

    pixel_matrix = list(image.getdata())
    pixel_matrix = [pixel_matrix[i * width: (i + 1) * width] for i in range(height)]

    for i in range(height):
        for j in range(width):
            r, g, b = pixel_matrix[i][j]
            h, s, v = convertRGBToHSV(r, g, b)
            pixel_matrix[i][j] = (h, s, v)

    return pixel_matrix

def parallel_process_dataset(dataset_path, num_workers=4):
    dataset_files = os.listdir(dataset_path)
    image_paths = [os.path.join(dataset_path, file) for file in dataset_files]

    with ThreadPoolExecutor(max_workers=num_workers) as executor:
        # Process images in parallel
        processed_datasets = list(executor.map(process_image, image_paths))

    return processed_datasets

def color():
    image_path = "./static/image/image.jpg"
    dataset_path = "./static/dataset"

    # Process the dataset in parallel
    processed_datasets = parallel_process_dataset(dataset_path)

    # Process the image
    image = Image.open(image_path)
    if image.mode != "RGB":
        image = image.convert("RGB")

    width, height = image.size

    pixel_matrix = list(image.getdata())
    pixel_matrix = [pixel_matrix[i * width: (i + 1) * width] for i in range(height)]

    for i in range(height):
        for j in range(width):
            r, g, b = pixel_matrix[i][j]
            h, s, v = convertRGBToHSV(r, g, b)
            pixel_matrix[i][j] = (h, s, v)

    # Histogram
    (hist_h, hist_s, hist_v) = histogramHSV(pixel_matrix)

    # Dataset histograms
    hist_datasets = [histogramHSV(dataset) for dataset in processed_datasets]

    # Cosine similarity
    list_result_color = [
        round(cosineSimilarity((hist_h, hist_s, hist_v), hist_dataset) * 100, 3)
        for hist_dataset in hist_datasets
    ]

    return list_result_color

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
    histH = [0 for _ in range(361)]
    histS = [0 for _ in range(101)]
    histV = [0 for _ in range(101)]

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
