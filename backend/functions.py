from PIL import Image


def main():
    imagePATH = "./image/image.jpg"  # Path to image

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


if __name__ == "__main__":
    main()
