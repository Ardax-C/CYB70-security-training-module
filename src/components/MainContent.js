import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Threats from './pages/Threats';
import Recommendations from './pages/Recommendations';
import Resources from './pages/Resources';
import Analysis from './pages/Analysis';
import FurtherReading from './pages/FurtherReading';
import { Box } from '@mui/material';

const MainContent = () => {
  return (
    <Box sx={{ pt: 8 }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/threats" element={<Threats />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/further-reading" element={<FurtherReading />} />
      </Routes>
    </Box>
  );
};

export default MainContent; 