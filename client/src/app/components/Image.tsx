'use client'

import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import axios from 'axios';

interface ImageProps {
  image: {
    id: number;
    imageUrl: string;
    likes: number;
    dislikes: number;
    setImage: (image: { id: number; likes: number; dislikes: number }) => void; // function to update image state
  };
}

const Image: React.FC<ImageProps> = ({ image, setImage }) => {
  const handleVote = async (vote: 'like' | 'dislike') => {
    try {
      const response = await axios.post(`http://localhost:8000/vote/${image.id}/${vote}`);
      // After voting, update the image state with the new likes and dislikes
      setImage({
        id: image.id,
        likes: response.data.likes,
        dislikes: response.data.dislikes,
      });
    } catch (error) {
      console.error('Error voting on image:', error);
    }
  };

  return (
    <Card>
      <CardMedia
        component="img"
        alt="Image"
        height="200"
        image={image.imageUrl}
      />
      <CardContent>
        <Typography variant="body2">{image.likes} Likes</Typography>
        <Typography variant="body2">{image.dislikes} Dislikes</Typography>
        <Button onClick={() => handleVote('like')} variant="contained" color="primary">
          Like
        </Button>
        <Button onClick={() => handleVote('dislike')} variant="contained" color="secondary">
          Dislike
        </Button>
      </CardContent>
    </Card>
  );
};

export default Image;

