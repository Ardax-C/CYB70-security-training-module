import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Brightness4,
  Brightness7,
  Security,
  KeyboardArrowDown,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Navbar = ({ isDarkMode, toggleTheme }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Security sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          CyberSafe Youth
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/threats">
            Threats
          </Button>
          <Button color="inherit" component={Link} to="/recommendations">
            Safety Tips
          </Button>
          <Button
            color="inherit"
            onClick={handleClick}
            endIcon={<KeyboardArrowDown />}
          >
            Learn More
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem 
              component={Link} 
              to="/analysis" 
              onClick={handleClose}
            >
              Full Analysis
            </MenuItem>
            <MenuItem 
              component={Link} 
              to="/further-reading" 
              onClick={handleClose}
            >
              Further Reading
            </MenuItem>
          </Menu>
          <Button color="inherit" component={Link} to="/resources">
            Resources
          </Button>
          <IconButton onClick={toggleTheme} color="inherit">
            {isDarkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 