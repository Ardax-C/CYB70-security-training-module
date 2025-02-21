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
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
      image: `${process.env.PUBLIC_URL}/images/two_children_on_phones.jpg`,
      link: '/recommendations',
    },
    {
      title: 'Online Gaming Risks',
      description: 'Learn about the risks of downloading unofficial game mods and how to stay safe while gaming.',
      image: `${process.env.PUBLIC_URL}/images/computer_linux_desktop_view.jpg`,
      link: '/threats',
    },
  ];

  return (
    <Box>
      <Box
        sx={{
          position: 'relative',
          height: isMobile ? '50vh' : '70vh',
          width: '100%',
          overflow: 'hidden',
          mt: -8,
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
            padding: isMobile ? 2 : 4,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography 
              variant={isMobile ? "h4" : "h2"} 
              component="h1" 
              gutterBottom
            >
              Cybersecurity for Youth
            </Typography>
            <Typography 
              variant={isMobile ? "body1" : "h5"}
              sx={{ mb: 4 }}
            >
              Learn how to stay safe online and protect your digital life
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                component={Link}
                to="/threats"
              >
                Explore Threats
              </Button>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                component={Link}
                to="/security-game"
              >
                Play Security Game
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
            </Box>
          </motion.div>
        </Box>
      </Box>

      <Container sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {cards.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: 360,
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={card.image}
                    alt={card.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ 
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start'
                  }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.title}
                    </Typography>
                    <Typography variant="body2">
                      {card.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ p: 2 }}>
                    <Button 
                      size="small" 
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