'use client'

import React from 'react';
import { Card, CardMedia, CardContent, Button } from '@mui/material';
import axios from 'axios';
import Box from '@mui/material/Box';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

interface ImageProps {
  image: {
    id: number;
    imageUrl: string;
    likes: number;
    dislikes: number;
    setImage: (image: { id: number; likes: number; dislikes: number }) => void;
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
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="Image"
        height="200"
        image={image.imageUrl}
      />
      <CardContent>
        {/* Row for likes and dislikes with icons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ThumbUpIcon sx={{ marginRight: 1 }} />
            <span>{image.likes}</span>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ThumbDownIcon sx={{ marginRight: 1 }} />
            <span>{image.dislikes}</span>
          </Box>
        </Box>

        {/* Row for like and dislike buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            onClick={() => handleVote('like')}
            variant="contained"
            color="primary"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <ThumbUpIcon sx={{ marginRight: 1 }} />
          </Button>
          <Button
            onClick={() => handleVote('dislike')}
            variant="contained"
            color="secondary"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <ThumbDownIcon sx={{ marginRight: 1 }} />
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Image;

