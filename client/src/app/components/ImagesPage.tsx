'use client'

import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import ImagesGrid from './ImagesGrid';
import axios from "axios";
import Box from '@mui/material/Box';

const ImagesPage: React.FC = () => {

  const downloadVotesAsCSV = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/download`, {responseType: 'blob'});
      const url = window.URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'votes.csv';
      link.click();
    } catch (error) {
      console.error('Error downloading CSV votes file:', error);
    }
  };

  return (
    <Container>
      {}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
        <Typography variant="h3" gutterBottom>
          Images Voting App
        </Typography>
        <Button variant="contained" color="primary" onClick={downloadVotesAsCSV}>
          Download Votes CSV
        </Button>
      </Box>
      <ImagesGrid />
    </Container>
  );

};

export default ImagesPage;
