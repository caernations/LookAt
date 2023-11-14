import base64
import cv2
import numpy as np
from scipy.spatial import distance


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

        # similarity = calculate_similarity(root_image, dataset)
        # if similarity >= 60:
        #     _, buffer = cv2.imencode(".jpg", dataset_image)
        #     dataset_image_base64 = base64.b64encode(buffer).decode("utf-8")
        #     similar_images.append(
        #         {
        #             "base64imagedata": dataset_image_base64,
        #             "similaritypercentage": similarity,
        #         }
        #     )

        # return similar_images
