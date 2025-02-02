-- This will create the table in the connected database
CREATE TABLE IF NOT EXISTS images (
    id SERIAL PRIMARY KEY,
    image_url TEXT NOT NULL,
    likes INT DEFAULT 0,
    dislikes INT DEFAULT 0
);
