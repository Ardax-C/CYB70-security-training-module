import React, { useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lightTheme, darkTheme } from './theme/theme';
import Navbar from './components/Navbar';
import MainContent from './components/MainContent';
import ProgramOutline from './components/pages/ProgramOutline';
import SecurityGame from './components/pages/SecurityGame';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/program-outline" element={<ProgramOutline />} />
          <Route path="/security-game" element={<SecurityGame />} />
        </Routes>
        <MainContent />
      </Router>
    </ThemeProvider>
  );
}

export default App; 