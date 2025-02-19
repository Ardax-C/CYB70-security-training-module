import React, { useState, useEffect, useMemo } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Skeleton,
  Grid,
  useTheme,
  useMediaQuery,
  ButtonBase,
} from '@mui/material';
import {
  School,
  Schedule,
  Psychology,
  Assessment,
  Timeline,
} from '@mui/icons-material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ProgramOutline = () => {
  const [markdown, setMarkdown] = useState('');
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const sections = useMemo(() => [
    { icon: <School />, title: 'Introduction', id: 'introduction' },
    { icon: <Psychology />, title: 'Module Content', id: 'module-content' },
    { icon: <Schedule />, title: 'Engagement Strategy', id: 'engagement-strategy' },
    { icon: <Assessment />, title: 'Assessment', id: 'assessment' },
    { icon: <Timeline />, title: 'Timeline', id: 'timeline' },
  ], []);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/resources/Program_Outline.md`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then(text => {
        let processedText = text
          .replace(/\n{2,}/g, '\n\n')
          .replace(/^# (.+)$/m, '# $1\n')
          .replace(/\*\*(.+?)\*\*/g, '__$1__');

        sections.forEach(section => {
          processedText = processedText.replace(
            new RegExp(`^## ${section.title}`, 'm'),
            `## ${section.title} {#${section.id}}`
          );
        });

        setMarkdown(processedText);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading program outline:', error);
        setLoading(false);
      });
  }, [sections]);

  const components = {
    h1: ({ children }) => (
      <Typography 
        variant={isMobile ? "h4" : "h3"} 
        component="h1" 
        gutterBottom 
        sx={{ 
          mt: 2,
          scrollMarginTop: '100px',
          color: theme.palette.primary.main,
          fontWeight: 800,
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(45deg, #8B5CF6 30%, #34D399 90%)'
            : 'linear-gradient(45deg, #7C3AED 30%, #10B981 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {children}
      </Typography>
    ),
    h2: ({ children }) => {
      let id = '';
      let text = '';
      
      if (Array.isArray(children)) {
        text = children.join('');
      } else if (typeof children === 'string') {
        const match = children.match(/(.*?)\s*{#([^}]+)}/);
        if (match) {
          text = match[1];
          id = match[2];
        } else {
          text = children;
          id = children.toLowerCase().replace(/\s+/g, '-');
        }
      }

      return (
        <Typography 
          variant={isMobile ? "h5" : "h4"} 
          component="h2" 
          id={id} 
          gutterBottom 
          sx={{ 
            mt: 4,
            mb: 2,
            scrollMarginTop: '100px',
            color: theme.palette.secondary.main,
            fontWeight: 700,
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-8px',
              left: 0,
              width: '60px',
              height: '4px',
              borderRadius: '2px',
              backgroundColor: theme.palette.secondary.main,
            },
          }}
        >
          {text}
        </Typography>
      );
    },
    h3: ({ children }) => (
      <Typography 
        variant={isMobile ? "h6" : "h5"} 
        component="h3" 
        gutterBottom 
        sx={{ mt: 3, color: theme.palette.text.primary, fontWeight: 'medium' }}
      >
        {children}
      </Typography>
    ),
    p: ({ children }) => (
      <Typography 
        variant="body1" 
        paragraph 
        sx={{ 
          fontSize: isMobile ? '0.95rem' : '1rem',
          lineHeight: 1.6,
        }}
      >
        {children}
      </Typography>
    ),
    ul: ({ children }) => (
      <List 
        sx={{ 
          listStyleType: 'disc',
          pl: 4,
          '& li': {
            display: 'list-item',
            pl: 1,
            mb: 1,
          },
        }}
      >
        {children}
      </List>
    ),
    ol: ({ children }) => (
      <List 
        component="ol" 
        sx={{ 
          listStyleType: 'decimal',
          pl: 4,
          '& li': {
            display: 'list-item',
            pl: 1,
            mb: 1,
          },
        }}
      >
        {children}
      </List>
    ),
    li: ({ children }) => (
      <ListItem 
        sx={{ 
          display: 'list-item',
          pl: 0,
          py: 0.5,
        }}
      >
        <Typography
          variant="body1"
          component="span"
          sx={{
            fontSize: isMobile ? '0.95rem' : '1rem',
            lineHeight: 1.6,
          }}
        >
          {children}
        </Typography>
      </ListItem>
    ),
  };

  const handleSectionClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 10, mb: 4 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          {!isMobile && (
            <Grid item md={3}>
              <Paper
                elevation={3}
                sx={{
                  position: 'sticky',
                  top: 90,
                  p: 2,
                  backgroundColor: theme.palette.mode === 'dark'
                    ? 'rgba(31, 41, 55, 0.95)'
                    : 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(8px)',
                  border: `1px solid ${theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.1)' 
                    : 'rgba(0, 0, 0, 0.1)'}`,
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: theme.palette.primary.main,
                    fontWeight: 'medium',
                    mb: 2,
                  }}
                >
                  Quick Navigation
                </Typography>
                <List dense>
                  {sections.map((section) => (
                    <ButtonBase
                      key={section.id}
                      onClick={() => handleSectionClick(section.id)}
                      sx={{
                        width: '100%',
                        justifyContent: 'flex-start',
                        padding: '12px 16px',
                        borderRadius: 2,
                        mb: 1,
                        color: theme.palette.text.primary,
                        transition: 'all 0.2s ease',
                        background: theme.palette.mode === 'dark' 
                          ? 'rgba(255, 255, 255, 0.05)'
                          : 'rgba(0, 0, 0, 0.04)',
                        '&:hover': {
                          background: theme.palette.mode === 'dark'
                            ? 'rgba(255, 255, 255, 0.1)'
                            : 'rgba(0, 0, 0, 0.08)',
                          transform: 'translateX(4px)',
                        },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        {section.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={section.title}
                        primaryTypographyProps={{
                          fontSize: '0.9rem',
                          fontWeight: 'medium',
                        }}
                      />
                    </ButtonBase>
                  ))}
                </List>
              </Paper>
            </Grid>
          )}

          <Grid item xs={12} md={9}>
            <Paper
              elevation={3}
              sx={{
                p: isMobile ? 2 : 4,
                backgroundColor: theme.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.05)'
                  : 'rgba(255, 255, 255, 0.95)',
              }}
            >
              {loading ? (
                <Box sx={{ pt: 0.5 }}>
                  <Skeleton height={60} />
                  <Skeleton width="60%" />
                  <Skeleton />
                  <Skeleton width="80%" />
                </Box>
              ) : (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={components}
                  children={markdown}
                  skipHtml
                />
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ProgramOutline; 