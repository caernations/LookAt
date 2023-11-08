import os
from flask import Flask, request, redirect, render_template

app = Flask(__name__, static_folder="static")
UPLOAD_FOLDER_IMAGE = "image"
UPLOAD_FOLDER_DATASET = "dataset"
app.config["UPLOAD_FOLDER_IMAGE"] = UPLOAD_FOLDER_IMAGE
app.config["UPLOAD_FOLDER_DATASET"] = UPLOAD_FOLDER_DATASET

if not os.path.exists(UPLOAD_FOLDER_IMAGE):
    os.makedirs(UPLOAD_FOLDER_IMAGE)
if not os.path.exists(UPLOAD_FOLDER_DATASET):
    os.makedirs(UPLOAD_FOLDER_DATASET)


@app.route("/", methods=["GET"])
def index():
    # if request.method == "POST":
    #     if request.files == "image":
    #         image = request.files["image"]
    #         image.save(os.path.join(app.config["UPLOAD_FOLDER_IMAGE"], image.filename))
    #     else:
    #         dataset = request.files["dataset"]
    #         dataset.save(
    #             os.path.join(app.config["UPLOAD_FOLDER_DATASET"], dataset.filename)
    #         )

    return render_template("index.html")


@app.route("/image", methods=["POST"])
def image():
    if request.method == "POST":
        if request.files:
            image = request.files["image"]
            filename = "image.jpg"
            image.save(os.path.join(app.config["UPLOAD_FOLDER_IMAGE"], filename))
            return redirect("/")


@app.route("/dataset", methods=["POST"])
def dataset():
    if request.method == "POST":
        if request.files:
            dataset = request.files.getlist("dataset")
            i = 1
            for file in dataset:
                file.save(
                    os.path.join(app.config["UPLOAD_FOLDER_DATASET"], f"data{i}.jpg")
                )
                i += 1
            return redirect("/")


if __name__ == "__main__":
    app.run(debug=True)
