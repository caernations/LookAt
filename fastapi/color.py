import base64
import cv2
import numpy as np


def calculate_similarity(hist1, hist2):
    hist1 = hist1 / (sum(hist1) + 1e-10)
    hist2 = hist2 / (sum(hist2) + 1e-10)
    dot_product = np.dot(hist1.flatten(), hist2.flatten())
    norm_hist1 = np.linalg.norm(hist1)
    norm_hist2 = np.linalg.norm(hist2)
    similarity = dot_product / (norm_hist1 * norm_hist2)
    return similarity * 100


async def color(dataset, image):
    image_contents = await image.read()
    root_image = cv2.imdecode(np.fromstring(image_contents, np.uint8), cv2.IMREAD_COLOR)
    root_image_hsv = cv2.cvtColor(root_image, cv2.COLOR_BGR2HSV)
    root_histogram = cv2.calcHist(
        [root_image_hsv], [0, 1], None, [180, 256], [0, 180, 0, 256]
    )

    similar_images = []
    for dataset_image in dataset:
        dataset_contents = await dataset_image.read()
        dataset_image = cv2.imdecode(
            np.fromstring(dataset_contents, np.uint8), cv2.IMREAD_COLOR
        )
        dataset_image_hsv = cv2.cvtColor(dataset_image, cv2.COLOR_BGR2HSV)
        dataset_histogram = cv2.calcHist(
            [dataset_image_hsv], [0, 1], None, [180, 256], [0, 180, 0, 256]
        )

        similarity = calculate_similarity(root_histogram, dataset_histogram)

        if similarity >= 60:
            _, buffer = cv2.imencode(".jpg", dataset_image)
            dataset_image_base64 = base64.b64encode(buffer).decode("utf-8")
            similar_images.append(
                {
                    "base64imagedata": dataset_image_base64,
                    "similaritypercentage": similarity,
                }
            )

    similar_images = sorted(
        similar_images, key=lambda x: x["similaritypercentage"], reverse=True
    )
    return similar_images
