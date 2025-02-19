import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  CardMedia,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  const cards = [
    {
      title: 'Password Security',
      description: 'Only 34% of teens use unique passwords for all accounts. Learn how to protect your accounts.',
      image: '/images/anon_hacker.jpg',
      link: '/recommendations',
    },
    {
      title: 'Social Media Safety',
      description: 'Discover how to protect your privacy while staying connected with friends.',
      image: '/images/two_children_on_phones.jpg',
      link: '/recommendations',
    },
    {
      title: 'Online Gaming Risks',
      description: 'Learn about the risks of downloading unofficial game mods and how to stay safe while gaming.',
      image: '/images/computer_linux_desktop_view.jpg',
      link: '/threats',
    },
  ];

  return (
    <Box>
      <Box
        sx={{
          position: 'relative',
          height: '70vh',
          width: '100%',
          overflow: 'hidden',
        }}
      >
        <Box
          component="img"
          src={`${process.env.PUBLIC_URL}/images/security.jpg`}
          alt="Cybersecurity"
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h2" component="h1" gutterBottom>
              Protect Your Digital Future
            </Typography>
            <Typography variant="h5" paragraph sx={{ mb: 4 }}>
              Learn about cybersecurity threats affecting teenagers and young adults,
              and discover how to stay safe online.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={Link}
              to="/threats"
              sx={{ mr: 2 }}
            >
              Explore Threats
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              component={Link}
              to="/recommendations"
              sx={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderColor: 'white',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderColor: 'white',
                }
              }}
            >
              Safety Tips
            </Button>
          </motion.div>
        </Box>
      </Box>

      <Container sx={{ my: 8 }}>
        <Grid container spacing={4}>
          {cards.map((card, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={card.image}
                    alt={card.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" component="h2" gutterBottom>
                      {card.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {card.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button 
                      size="small" 
                      color="primary"
                      component={Link}
                      to={card.link}
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home; 