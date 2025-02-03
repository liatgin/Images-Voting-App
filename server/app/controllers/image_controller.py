import csv
from fastapi import HTTPException

from db.database import get_db_connection
from models.image import Image


def get_images_from_db():
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM images ORDER BY id ASC")
        rows = cursor.fetchall()
        images = [Image(id=row[0], image_url=row[1], likes=row[2], dislikes=row[3]) for row in rows]
        return images


def populate_images():
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT COUNT(*) FROM images")
        count = cursor.fetchone()[0]

        if count == 0:
            for _ in range(100):
                image_url = f"https://picsum.photos/200/300?random={_}"  # Generate a random URL
                cursor.execute("INSERT INTO images (image_url, likes, dislikes) VALUES (%s, 0, 0)", (image_url,))
            conn.commit()


def vote_on_image(image_id: int, vote: str):
    if vote not in ['like', 'dislike']:
        raise HTTPException(status_code=400, detail="Invalid vote type")

    with get_db_connection() as conn:
        cursor = conn.cursor()
        if vote == 'like':
            cursor.execute('UPDATE images SET likes = likes + 1 WHERE id = %s RETURNING likes, dislikes', (image_id,))
        else:
            cursor.execute('UPDATE images SET dislikes = dislikes + 1 WHERE id = %s RETURNING likes, dislikes',
                           (image_id,))
        updated_counts = cursor.fetchone()
        conn.commit()

        if updated_counts:
            updated_likes, updated_dislikes = updated_counts
            return {"likes": updated_likes, "dislikes": updated_dislikes}
        else:
            raise HTTPException(status_code=404, detail="Image not found")



def generate_csv():
    images = get_images_from_db()
    csv_file = '/tmp/votes.csv'

    with open(csv_file, mode='w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(['Image_ID', 'Likes', 'Dislikes'])
        for image in images:
            writer.writerow([image.id, image.likes, image.dislikes])

    return csv_file
