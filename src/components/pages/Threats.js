import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Divider,
  CardMedia,
} from '@mui/material';
import { motion } from 'framer-motion';

const Threats = () => {
  const threats = [
    {
      title: 'Weak Authentication',
      description: '52% of teens use fewer than five passwords for all online activities. This makes accounts vulnerable to credential-stuffing attacks.',
      stats: 'Only 12% utilize password managers',
      image: '/images/anon_hacker.jpg',
    },
    {
      title: 'Social Engineering',
      description: '46% of teens click links from unknown senders, and a significant number provide credentials to fraudulent sites.',
      stats: 'Increasing cases of peer impersonation attacks',
      image: '/images/hacking_group_anon.jpg',
    },
    {
      title: 'Malware Exposure',
      description: 'Downloading games or mods from unverified sources puts devices at risk of malware infection.',
      stats: '60% of teens download from unverified sources',
      image: '/images/computer_linux_desktop_view.jpg',
    },
    {
      title: 'Public Wi-Fi Risks',
      description: 'Unsecured public networks expose users to man-in-the-middle attacks and data theft.',
      stats: '90% regularly connect to public Wi-Fi',
      image: '/images/social_media_code.jpg',
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
              alt="Cybersecurity Threats"
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
                Common Cybersecurity Threats
              </Typography>
              <Typography variant="h6">
                Understanding the risks is the first step to protecting yourself online
              </Typography>
            </Box>
          </Box>
        </motion.div>

        <Grid container spacing={3}>
          {threats.map((threat, index) => (
            <Grid item xs={12} md={6} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={threat.image}
                    alt={threat.title}
                  />
                  <CardContent>
                    <Typography variant="h5" component="h2" gutterBottom>
                      {threat.title}
                    </Typography>
                    <Typography color="text.secondary" paragraph>
                      {threat.description}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle2" color="primary">
                      {threat.stats}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Threats; 