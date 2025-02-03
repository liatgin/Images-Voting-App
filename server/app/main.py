from fastapi import FastAPI
from fastapi.responses import FileResponse
from controllers.image_controller import vote_on_image, generate_csv, get_images_from_db, populate_images
from db.database import create_db_table, initialize_db_with_images

app = FastAPI()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins='*',
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

create_db_table()

# Initialize the database with images if it's empty
initialize_db_with_images()

@app.get("/populate-images")
async def populate_images_endpoint():
    populate_images()  # Trigger image population
    return {"message": "Images populated successfully!"}

@app.get("/images")
async def get_images():
    images = get_images_from_db()
    return [{"id": image.id, "imageUrl": image.image_url, "likes": image.likes, "dislikes": image.dislikes} for image in images]

@app.post("/vote/{image_id}/{vote}")
def vote(image_id: int, vote: str):
    return vote_on_image(image_id, vote)

@app.get("/download")
def download_csv():
    csv_file = generate_csv()
    return FileResponse(csv_file, filename="votes.csv", media_type="text/csv")
