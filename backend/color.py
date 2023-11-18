import base64
import cv2
import numpy as np


def bgr_to_hsv(bgr):
    bgr = bgr.astype("float32") / 255
    blue, green, red = bgr[..., 0], bgr[..., 1], bgr[..., 2]
    max_color, min_color = np.max(bgr, axis=-1), np.min(bgr, axis=-1)
    diff = max_color - min_color + 1e-10  # biar ga dibagi 0
    value = max_color
    saturation = np.zeros_like(max_color)
    saturation[max_color != 0] = diff[max_color != 0] / max_color[max_color != 0]
    hue = np.zeros_like(max_color)
    mask = max_color == red
    hue[mask] = (green[mask] - blue[mask]) / diff[mask]
    mask = max_color == green
    hue[mask] = 2.0 + (blue[mask] - red[mask]) / diff[mask]
    mask = max_color == blue
    hue[mask] = 4.0 + (red[mask] - green[mask]) / diff[mask]
    hue = (hue / 6) % 1
    hsv = np.stack([hue, saturation, value], axis=-1)
    return (hsv * np.array([180, 255, 255])).astype("uint8")


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
    root_image_hsv = bgr_to_hsv(root_image)
    root_histogram = cv2.calcHist(
        [root_image_hsv], [0, 1], None, [180, 256], [0, 180, 0, 256]
    )

    similar_images = []
    for dataset_image in dataset:
        dataset_contents = await dataset_image.read()
        dataset_image = cv2.imdecode(
            np.fromstring(dataset_contents, np.uint8), cv2.IMREAD_COLOR
        )
        dataset_image_hsv = bgr_to_hsv(dataset_image)
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
