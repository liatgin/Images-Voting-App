import psycopg2
import os
import requests
from contextlib import contextmanager
from models.image import Image

@contextmanager
def get_db_connection():
    """Yield a database connection that will be used throughout the app's lifecycle."""
    conn = psycopg2.connect(
        dbname=os.getenv('DB_NAME', 'image_voting_db'),
        user=os.getenv('DB_USER', 'postgres'),
        password=os.getenv('DB_PASSWORD', 'password'),
        host=os.getenv('DB_HOST', 'localhost'),
        port=os.getenv('DB_PORT', 5432)
    )
    try:
        yield conn
    finally:
        conn.close()

def create_table():
    with get_db_connection() as conn:
        cursor = conn.cursor()
        create_table_query = """
        CREATE TABLE IF NOT EXISTS images (
            id SERIAL PRIMARY KEY,
            image_url TEXT NOT NULL,
            likes INT DEFAULT 0,
            dislikes INT DEFAULT 0
        );
        """
        cursor.execute(create_table_query)
        conn.commit()
        cursor.close()

def insert_images(images: list):
    """Insert images into the database."""
    with get_db_connection() as conn:
        cursor = conn.cursor()
        for image in images:
            cursor.execute(
                'INSERT INTO images (image_url) VALUES (%s) ON CONFLICT DO NOTHING',
                (image.image_url,)
            )
        conn.commit()
        cursor.close()

def fetch_images_from_lorem_picsum(count=100):
    images = []
    response = requests.get(f'https://picsum.photos/v2/list?page=1&limit={count}')
    if response.status_code == 200:
        data = response.json()
        for item in data:
            image = Image(id=None, image_url=item['download_url'], likes=0, dislikes=0)
            images.append(image)
    return images

def initialize_db_with_images():
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute('SELECT COUNT(*) FROM images')
        count = cursor.fetchone()[0]

        if count == 0:
            print("Database is empty, inserting 100 images...")
            images = fetch_images_from_lorem_picsum(count=100)
            insert_images(images)
        cursor.close()