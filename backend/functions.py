from PIL import Image

imagePATH = "./image/image.jpg"  # Path to image

image = Image.open(imagePATH)  # Image variable

if image.mode != "RGB":  # Check if image is RGB
    image = image.convert("RGB")
width, height = image.size


pixelMatrix = list(image.getdata())
pixelMatrix = [pixelMatrix[i * width : (i + 1) * width] for i in range(height)]


def normalize(pixelMatrix):
    for i in range(len(pixelMatrix)):
        for j in range(len(pixelMatrix[i])):
            pixelMatrix[i][j] = tuple(
                map(lambda x: x / 255, pixelMatrix[i][j])
            )  # Normalize pixel values
    return pixelMatrix
