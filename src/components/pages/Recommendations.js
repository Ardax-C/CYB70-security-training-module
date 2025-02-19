import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  CardMedia,
} from '@mui/material';
import {
  Lock,
  Games,
  Public,
  Group,
  CheckCircle,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const Recommendations = () => {
  const recommendations = [
    {
      title: 'Password Security',
      icon: <Lock />,
      image: '/images/anon_hacker.jpg',
      tips: [
        'Use unique passwords for each account',
        'Enable two-factor authentication (2FA)',
        'Try password phrases like "PurpleTiger$RunsFast!"',
        'Use a trusted password manager',
      ],
    },
    {
      title: 'Social Media Safety',
      icon: <Group />,
      image: '/images/two_children_on_phones.jpg',
      tips: [
        'Review privacy settings regularly',
        'Be careful what personal information you share',
        'Don\'t accept friend requests from strangers',
        'Think twice before clicking on links',
      ],
    },
    {
      title: 'Gaming Security',
      icon: <Games />,
      image: '/images/computer_linux_desktop_view.jpg',
      tips: [
        'Only download games from official sources',
        'Be wary of "free" game currency generators',
        'Don\'t share account credentials',
        'Use secure payment methods',
      ],
    },
    {
      title: 'Network Safety',
      icon: <Public />,
      image: '/images/social_media_code.jpg',
      tips: [
        'Avoid using public Wi-Fi for sensitive tasks',
        'Use a VPN when on public networks',
        'Keep your home router firmware updated',
        'Change default router passwords',
      ],
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
              alt="Safety Recommendations"
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
                Safety Recommendations
              </Typography>
              <Typography variant="h6">
                Practical steps to protect yourself online
              </Typography>
            </Box>
          </Box>
        </motion.div>

        <Grid container spacing={3}>
          {recommendations.map((section, index) => (
            <Grid item xs={12} md={6} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Paper elevation={3} sx={{ height: '100%' }}>
                  <Card sx={{ height: '100%' }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={section.image}
                      alt={section.title}
                    />
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Box sx={{ mr: 2, color: 'primary.main' }}>
                          {section.icon}
                        </Box>
                        <Typography variant="h5" component="h2">
                          {section.title}
                        </Typography>
                      </Box>
                      <List>
                        {section.tips.map((tip, tipIndex) => (
                          <ListItem key={tipIndex}>
                            <ListItemIcon>
                              <CheckCircle color="primary" />
                            </ListItemIcon>
                            <ListItemText 
                              primary={tip}
                              primaryTypographyProps={{
                                sx: { fontWeight: 500 }
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
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

export default Recommendations; 