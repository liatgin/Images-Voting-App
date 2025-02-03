from fastapi import FastAPI, HTTPException, status
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
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

create_db_table()

# Initialize the database with images if it's empty
initialize_db_with_images()

@app.get("/populate-images", status_code=status.HTTP_200_OK)
async def populate_images_endpoint():
    try:
        populate_images()
        return {"message": "Images populated successfully!"}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Error populating images: {str(e)}")

@app.get("/images", response_model=list[dict], status_code=status.HTTP_200_OK)
async def get_images():
    try:
        images = get_images_from_db()
        if not images:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="No images found in the database.")
        return [{"id": image.id, "imageUrl": image.image_url, "likes": image.likes, "dislikes": image.dislikes} for image in images]
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Error retrieving images: {e}")

@app.post("/vote/{image_id}/{vote}", status_code=status.HTTP_200_OK)
def vote(image_id: int, vote: str):
    try:
        if vote not in ['like', 'dislike']:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Vote must be 'like' or 'dislike'. got: {vote}")
        return vote_on_image(image_id, vote)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Error voting on image_id:{image_id}, {e}")

@app.get("/download", status_code=status.HTTP_200_OK)
def download_csv():
    try:
        csv_file = generate_csv()
        return FileResponse(csv_file, filename="votes.csv", media_type="text/csv")
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Error generating CSV: {e}")
