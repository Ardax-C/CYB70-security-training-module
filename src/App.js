import React, { useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';
import { lightTheme, darkTheme } from './theme/theme';
import Navbar from './components/Navbar';
import MainContent from './components/MainContent';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <MainContent />
      </Router>
    </ThemeProvider>
  );
}

export default App; 