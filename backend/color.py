import cv2
import math
import os
import numpy as np
from concurrent.futures import ThreadPoolExecutor
from functools import partial
from numba import jit

def process_image(image_path):
    # Open the image using OpenCV
    image = cv2.imread(image_path)

    # Convert the image from BGR to RGB
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    # Convert the image to HSV using NumPy
    hsv_image = cv2.cvtColor(image, cv2.COLOR_RGB2HSV)

    return hsv_image.tolist()  # Convert NumPy array to list for compatibility with existing code

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
    image = cv2.imread(image_path)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    image = cv2.cvtColor(image, cv2.COLOR_RGB2HSV)


    height, width, _ = image.shape

    pixel_matrix = image.tolist()  # Convert NumPy array to list for compatibility with existing code

    # for i in range(height):
    #     for j in range(width):
    #         r, g, b = pixel_matrix[i][j]
    #         h, s, v = convertRGBToHSV(r, g, b)
    #         pixel_matrix[i][j] = (h, s, v)

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

def histogramHSV(image):
    histH = np.zeros(256, dtype=int)
    histS = np.zeros(256, dtype=int)
    histV = np.zeros(256, dtype=int)

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

    dotProductH = np.sum(np.multiply(h1, h2))
    magnitudeH1 = np.sqrt(np.sum(np.square(h1)))
    magnitudeH2 = np.sqrt(np.sum(np.square(h2)))
    resultH = dotProductH / (magnitudeH1 * magnitudeH2)

    dotProductS = np.sum(np.multiply(s1, s2))
    magnitudeS1 = np.sqrt(np.sum(np.square(s1)))
    magnitudeS2 = np.sqrt(np.sum(np.square(s2)))
    resultS = dotProductS / (magnitudeS1 * magnitudeS2)

    dotProductV = np.sum(np.multiply(v1, v2))
    magnitudeV1 = np.sqrt(np.sum(np.square(v1)))
    magnitudeV2 = np.sqrt(np.sum(np.square(v2)))
    resultV = dotProductV / (magnitudeV1 * magnitudeV2)

    overallResult = (resultH + resultS + resultV) / 3

    return overallResult

if __name__ == "__main__":
    color()
