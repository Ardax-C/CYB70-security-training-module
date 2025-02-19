import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Chip,
  Grid,
  useTheme,
} from '@mui/material';
import {
  School,
  Article,
  Psychology,
  Science,
  MenuBook,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const FurtherReading = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/resources/further-reading.md`)
      .then(response => response.text())
      .then(text => {
        const linkArray = text.split('\n')
          .filter(line => line.trim().length > 0)
          .map(url => ({
            url: url.trim(),
            type: categorizeLink(url),
            domain: new URL(url).hostname.replace('www.', '')
          }));
        setLinks(linkArray);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading further reading:', error);
        setLoading(false);
      });
  }, []);

  const categorizeLink = (url) => {
    if (url.includes('research') || url.includes('article') || url.includes('paper')) return 'Research';
    if (url.includes('edu') || url.includes('training')) return 'Education';
    if (url.includes('tools') || url.includes('resources')) return 'Resources';
    if (url.includes('gov')) return 'Government';
    return 'General';
  };

  const getIcon = (type) => {
    switch (type) {
      case 'Research': return <Science />;
      case 'Education': return <School />;
      case 'Resources': return <Psychology />;
      case 'Government': return <Article />;
      default: return <MenuBook />;
    }
  };

  const getChipColor = (type) => {
    switch (type) {
      case 'Research': return 'primary';
      case 'Education': return 'success';
      case 'Resources': return 'info';
      case 'Government': return 'secondary';
      default: return 'default';
    }
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box
            sx={{
              position: 'relative',
              height: '300px',
              width: '100%',
              overflow: 'hidden',
              borderRadius: 2,
              mb: 4,
            }}
          >
            <Box
              component="img"
              src="/images/security.jpg"
              alt="Further Reading"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.7)',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                color: 'white',
                width: '100%',
                padding: 4,
              }}
            >
              <Typography variant="h3" component="h1" gutterBottom>
                Further Reading
              </Typography>
              <Typography variant="h6">
                Curated academic resources and research papers
              </Typography>
            </Box>
          </Box>
        </motion.div>

        <Grid container spacing={3}>
          {loading ? (
            <Grid item xs={12}>
              <Paper sx={{ p: 3 }}>
                <Box sx={{ pt: 0.5 }}>
                  <Skeleton />
                  <Skeleton width="60%" />
                  <Skeleton />
                  <Skeleton width="80%" />
                </Box>
              </Paper>
            </Grid>
          ) : (
            <Grid item xs={12}>
              <Paper 
                elevation={3}
                sx={{ 
                  p: 3,
                  backgroundColor: theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.05)' 
                    : 'rgba(255, 255, 255, 0.9)'
                }}
              >
                <List>
                  {links.map((link, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                      <ListItem
                        component="a"
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          mb: 2,
                          borderRadius: 1,
                          border: 1,
                          borderColor: 'divider',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            backgroundColor: theme.palette.mode === 'dark' 
                              ? 'rgba(255, 255, 255, 0.05)' 
                              : 'rgba(0, 0, 0, 0.02)',
                            transform: 'translateX(8px)',
                          },
                          textDecoration: 'none',
                          color: 'inherit',
                        }}
                      >
                        <ListItemIcon>
                          {getIcon(link.type)}
                        </ListItemIcon>
                        <ListItemText 
                          primary={link.domain}
                          secondary={
                            <Box sx={{ mt: 1 }}>
                              <Typography 
                                variant="body2" 
                                sx={{ 
                                  color: theme.palette.text.secondary,
                                  wordBreak: 'break-word',
                                  fontSize: '0.875rem',
                                }}
                              >
                                {link.url}
                              </Typography>
                              <Chip
                                label={link.type}
                                size="small"
                                color={getChipColor(link.type)}
                                sx={{ mt: 1 }}
                              />
                            </Box>
                          }
                        />
                      </ListItem>
                    </motion.div>
                  ))}
                </List>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default FurtherReading;