from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from color import color
from texture import texture
import uvicorn

app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:3000",  # Frontend URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/upload")
async def upload_files(
    dataset: List[UploadFile] = File(...),
    image: UploadFile = File(...),
    choice: str = Form(...),
):
    if choice == "texture":
        return await texture(dataset, image)
    elif choice == "color":
        return await color(dataset, image)


if __name__ == "__main__":
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)
