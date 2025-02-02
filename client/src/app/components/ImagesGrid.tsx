'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Image from './Image';

interface ImageData {
  id: number;
  imageUrl: string;
  likes: number;
  dislikes: number;
}

const ImagesGrid: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);

  // Fetch and populate images if necessary on first render
  useEffect(() => {
    const populateImages = async () => {
      try {
        // Trigger the population of images (if the DB is empty)
        await axios.get('http://localhost:8000/populate-images');
      } catch (error) {
        console.error('Error triggering image population:', error);
      }
    };

    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:8000/images');
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    // Call the population endpoint on the first render
    populateImages().then(() => {
      fetchImages();  // Fetch the images after the population
    });
  }, []);

   // Update image state after a vote
  const updateImage = (updatedImage: { id: number; likes: number; dislikes: number }) => {
    setImages((prevImages) =>
      prevImages.map((image) =>
        image.id === updatedImage.id ? { ...image, likes: updatedImage.likes, dislikes: updatedImage.dislikes } : image
      )
    );
  };


//   return (
//     <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
//       <Grid container spacing={2}>
//         {images.map((image) => (
//           <Grid item xs={12} sm={6} md={4} lg={3} key={image.id}>
//             <Image image={image} setImage={updateImage}/>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
      <Grid container spacing={2}>
        {images.map((image) => (
          <Grid item size = {2} key={image.id}>
            <Image image={image} setImage={updateImage}/>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ImagesGrid;
