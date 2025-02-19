import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Brightness4,
  Brightness7,
  Security,
  KeyboardArrowDown,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Navbar = ({ isDarkMode, toggleTheme }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const drawer = (
    <List>
      <ListItem 
        component={Link} 
        to="/" 
        onClick={handleDrawerToggle}
        sx={{
          color: theme.palette.text.primary,
          borderRadius: 1,
          mb: 0.5,
          transition: 'all 0.2s ease-in-out',
          '&:visited': {
            color: theme.palette.text.primary,
          },
          '&:hover': {
            backgroundColor: theme.palette.mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.1)'
              : theme.palette.action.hover,
            transform: 'translateX(8px)',
            color: theme.palette.primary.main,
          },
        }}
      >
        <ListItemText 
          primary="Home"
          primaryTypographyProps={{
            sx: {
              fontWeight: 500,
              transition: 'color 0.2s ease-in-out',
            }
          }}
        />
      </ListItem>
      <ListItem 
        component={Link} 
        to="/threats" 
        onClick={handleDrawerToggle}
        sx={{
          color: theme.palette.text.primary,
          borderRadius: 1,
          mb: 0.5,
          transition: 'all 0.2s ease-in-out',
          '&:visited': {
            color: theme.palette.text.primary,
          },
          '&:hover': {
            backgroundColor: theme.palette.mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.1)'
              : theme.palette.action.hover,
            transform: 'translateX(8px)',
            color: theme.palette.primary.main,
          },
        }}
      >
        <ListItemText 
          primary="Threats"
          primaryTypographyProps={{
            sx: {
              fontWeight: 500,
              transition: 'color 0.2s ease-in-out',
            }
          }}
        />
      </ListItem>
      <ListItem 
        component={Link} 
        to="/recommendations" 
        onClick={handleDrawerToggle}
        sx={{
          color: theme.palette.text.primary,
          borderRadius: 1,
          mb: 0.5,
          transition: 'all 0.2s ease-in-out',
          '&:visited': {
            color: theme.palette.text.primary,
          },
          '&:hover': {
            backgroundColor: theme.palette.mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.1)'
              : theme.palette.action.hover,
            transform: 'translateX(8px)',
            color: theme.palette.primary.main,
          },
        }}
      >
        <ListItemText 
          primary="Safety Tips"
          primaryTypographyProps={{
            sx: {
              fontWeight: 500,
              transition: 'color 0.2s ease-in-out',
            }
          }}
        />
      </ListItem>
      <ListItem 
        component={Link} 
        to="/analysis" 
        onClick={handleDrawerToggle}
        sx={{
          color: theme.palette.text.primary,
          borderRadius: 1,
          mb: 0.5,
          transition: 'all 0.2s ease-in-out',
          '&:visited': {
            color: theme.palette.text.primary,
          },
          '&:hover': {
            backgroundColor: theme.palette.mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.1)'
              : theme.palette.action.hover,
            transform: 'translateX(8px)',
            color: theme.palette.primary.main,
          },
        }}
      >
        <ListItemText 
          primary="Full Analysis"
          primaryTypographyProps={{
            sx: {
              fontWeight: 500,
              transition: 'color 0.2s ease-in-out',
            }
          }}
        />
      </ListItem>
      <ListItem 
        component={Link} 
        to="/further-reading" 
        onClick={handleDrawerToggle}
        sx={{
          color: theme.palette.text.primary,
          borderRadius: 1,
          mb: 0.5,
          transition: 'all 0.2s ease-in-out',
          '&:visited': {
            color: theme.palette.text.primary,
          },
          '&:hover': {
            backgroundColor: theme.palette.mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.1)'
              : theme.palette.action.hover,
            transform: 'translateX(8px)',
            color: theme.palette.primary.main,
          },
        }}
      >
        <ListItemText 
          primary="Further Reading"
          primaryTypographyProps={{
            sx: {
              fontWeight: 500,
              transition: 'color 0.2s ease-in-out',
            }
          }}
        />
      </ListItem>
      <ListItem 
        component={Link} 
        to="/program-outline" 
        onClick={handleDrawerToggle}
        sx={{
          color: theme.palette.text.primary,
          borderRadius: 1,
          mb: 0.5,
          transition: 'all 0.2s ease-in-out',
          '&:visited': {
            color: theme.palette.text.primary,
          },
          '&:hover': {
            backgroundColor: theme.palette.mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.1)'
              : theme.palette.action.hover,
            transform: 'translateX(8px)',
            color: theme.palette.primary.main,
          },
        }}
      >
        <ListItemText 
          primary="Program Outline"
          primaryTypographyProps={{
            sx: {
              fontWeight: 500,
              transition: 'color 0.2s ease-in-out',
            }
          }}
        />
      </ListItem>
      <ListItem 
        component={Link} 
        to="/security-game" 
        onClick={handleDrawerToggle}
        sx={{
          color: theme.palette.text.primary,
          borderRadius: 1,
          mb: 0.5,
          transition: 'all 0.2s ease-in-out',
          '&:visited': {
            color: theme.palette.text.primary,
          },
          '&:hover': {
            backgroundColor: theme.palette.mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.1)'
              : theme.palette.action.hover,
            transform: 'translateX(8px)',
            color: theme.palette.primary.main,
          },
        }}
      >
        <ListItemText 
          primary="Security Game"
          primaryTypographyProps={{
            sx: {
              fontWeight: 500,
              transition: 'color 0.2s ease-in-out',
            }
          }}
        />
      </ListItem>
    </List>
  );

  return (
    <AppBar 
      position="fixed" 
      elevation={0}
      sx={{
        background: theme => theme.palette.mode === 'dark' 
          ? 'linear-gradient(90deg, #1F2937 0%, #312E81 100%)'
          : 'linear-gradient(90deg, #7C3AED 0%, #6D28D9 100%)',
        borderRadius: 0,
      }}
    >
      <Toolbar>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          width: '100%',
          px: { xs: 1, sm: 2 }
        }}>
          <IconButton
            color="inherit"
            component={Link}
            to="/"
            sx={{ 
              mr: 2,
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.1)',
              }
            }}
          >
            <Security />
          </IconButton>
          
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              flexGrow: 1,
              fontWeight: 600,
              '&:hover': {
                color: 'rgba(255, 255, 255, 0.9)',
              }
            }}
          >
            CyberSafe Youth
          </Typography>

          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {!isMobile && (
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
                <MenuItem component={Link} to="/analysis" onClick={handleClose}>
                  Full Analysis
                </MenuItem>
                <MenuItem component={Link} to="/further-reading" onClick={handleClose}>
                  Further Reading
                </MenuItem>
                <MenuItem component={Link} to="/program-outline" onClick={handleClose}>
                  Program Outline
                </MenuItem>
                <MenuItem component={Link} to="/security-game" onClick={handleClose}>
                  Security Game
                </MenuItem>
              </Menu>
            </Box>
          )}
          <IconButton onClick={toggleTheme} color="inherit">
            {isDarkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>
      </Toolbar>
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': { 
            width: 240,
            backgroundColor: theme.palette.mode === 'dark' 
              ? theme.palette.background.default
              : theme.palette.background.paper,
            borderRight: `1px solid ${theme.palette.divider}`,
          },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar; 