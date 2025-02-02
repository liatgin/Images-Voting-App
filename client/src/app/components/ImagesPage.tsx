'use client'

import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import ImagesGrid from './ImagesGrid';
import axios from "axios";
import Box from '@mui/material/Box';

const ImagesPage: React.FC = () => {
  const handleDownload = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/download`, {responseType: 'blob'});
      const url = window.URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'votes.csv';
      link.click();
    } catch (error) {
      console.error('Error downloading CSV file:', error);
    }
  };

  // return (
  //   <Container>
  //     <Typography variant="h3" gutterBottom>
  //       Images Voting App
  //     </Typography>
  //     <Button variant="contained" color="primary" onClick={handleDownload}>
  //       Download Votes CSV
  //     </Button>
  //     <ImagesGrid />
  //   </Container>
  // );
  return (
    <Container>
      {/* Title and Button positioned in the same row */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
        <Typography variant="h3" gutterBottom>
          Images Voting App
        </Typography>
        <Button variant="contained" color="primary" onClick={handleDownload}>
          Download Votes CSV
        </Button>
      </Box>

      {/* Images Grid Component */}
      <ImagesGrid />
    </Container>
  );

};

export default ImagesPage;
