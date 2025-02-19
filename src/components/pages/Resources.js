import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Link,
  Chip,
  CardMedia,
  Paper,
} from '@mui/material';
import {
  School,
  Security,
  Games,
  Public,
  Psychology,
  Article,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const Resources = () => {
  const resources = [
    {
      title: 'Online Safety Courses',
      description: 'Free interactive courses designed for teenagers to learn about cybersecurity.',
      link: 'https://www.cybersafeteens.org',
      tags: ['Education', 'Interactive'],
      image: '/images/boy_coding.jpg',
      icon: <School />,
    },
    {
      title: 'Password Strength Checker',
      description: 'Test the strength of your passwords and get recommendations for improvement.',
      link: 'https://howsecureismypassword.net',
      tags: ['Tools', 'Security'],
      image: '/images/anon_hacker.jpg',
      icon: <Security />,
    },
    {
      title: 'Safe Gaming Guide',
      description: 'Comprehensive guide to staying safe while gaming online.',
      link: 'https://www.safegaming.guide',
      tags: ['Gaming', 'Guide'],
      image: '/images/computer_linux_desktop_view.jpg',
      icon: <Games />,
    },
    {
      title: 'Social Media Privacy Checker',
      description: 'Tool to review and optimize your social media privacy settings.',
      link: 'https://www.privacycheck.social',
      tags: ['Privacy', 'Social Media'],
      image: '/images/two_children_on_phones.jpg',
      icon: <Public />,
    },
    {
      title: 'Cybersecurity Research Hub',
      description: 'Latest research and articles about cybersecurity threats and prevention.',
      link: 'https://cyber.org',
      tags: ['Research', 'Education'],
      image: '/images/girl_hacking_headset.jpg',
      icon: <Article />,
    },
    {
      title: 'Interactive Security Training',
      description: 'Hands-on training modules for practical cybersecurity skills.',
      link: 'https://www.knowbe4.com/cybersecurity-activity-kit',
      tags: ['Training', 'Interactive'],
      image: '/images/hacking_group_anon.jpg',
      icon: <Psychology />,
    },
  ];

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
              alt="Cybersecurity Resources"
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
                Helpful Resources
              </Typography>
              <Typography variant="h6">
                Tools and guides to enhance your online security
              </Typography>
            </Box>
          </Box>
        </motion.div>

        <Grid container spacing={3}>
          {resources.map((resource, index) => (
            <Grid item xs={12} md={6} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Paper elevation={3}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={resource.image}
                      alt={resource.title}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Box sx={{ mr: 2, color: 'primary.main' }}>
                          {resource.icon}
                        </Box>
                        <Typography variant="h5" component="h2">
                          {resource.title}
                        </Typography>
                      </Box>
                      <Typography color="text.secondary" paragraph>
                        {resource.description}
                      </Typography>
                      <Box sx={{ mt: 2 }}>
                        {resource.tags.map((tag, tagIndex) => (
                          <Chip
                            key={tagIndex}
                            label={tag}
                            color="primary"
                            size="small"
                            sx={{ mr: 1, mb: 1 }}
                          />
                        ))}
                      </Box>
                    </CardContent>
                    <CardActions sx={{ p: 2, pt: 0 }}>
                      <Button
                        component={Link}
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="contained"
                        color="primary"
                        startIcon={<Article />}
                      >
                        Learn More
                      </Button>
                    </CardActions>
                  </Card>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Resources; 