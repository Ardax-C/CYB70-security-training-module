import React, { useState, useEffect } from 'react';
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
  Link,
} from '@mui/material';
import {
  Security,
  Person,
  Warning,
  School,
  Build,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Analysis = () => {
  const [markdown, setMarkdown] = useState('');
  const [references, setReferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  const sections = [
    { icon: <Person />, title: 'Demographic Profile', id: 'demographic-profile' },
    { icon: <Warning />, title: 'Key Vulnerabilities', id: 'key-vulnerabilities' },
    { icon: <Security />, title: 'Implications for Corporate', id: 'implications-for-corporate' },
    { icon: <School />, title: 'Recommendations for Training', id: 'recommendations-for-training' },
    { icon: <Build />, title: 'Conclusion', id: 'conclusion' },
  ];

  useEffect(() => {
    fetch('/resources/CyberThreats_Analysis.md')
      .then(response => response.text())
      .then(text => {
        let processedText = text
          .replace(/\n{2,}/g, '\n\n')
          .replace(/^# (.+)$/m, '# $1\n')
          .replace(/\*\*(.+?)\*\*/g, '__$1__')
          .replace(/\[(\^[0-9]+)\]/g, ' [$1]');

        processedText = processedText
          .replace(/^## Demographic Profile/m, '## Demographic Profile {#demographic-profile}')
          .replace(/^## Key Vulnerabilities/m, '## Key Vulnerabilities {#key-vulnerabilities}')
          .replace(/^## Implications for Corporate/m, '## Implications for Corporate {#implications-for-corporate}')
          .replace(/^## Recommendations for Training/m, '## Recommendations for Training {#recommendations-for-training}')
          .replace(/^## Conclusion/m, '## Conclusion {#conclusion}');

        setMarkdown(processedText);
        
        const refRegex = /\[(\^[0-9]+)\]:\s*(http[^\n]+)/g;
        const refs = [...text.matchAll(refRegex)].map(match => ({
          id: match[1],
          url: match[2].trim()
        }));
        setReferences(refs);
        setLoading(false);
      });
  }, []);

  const handleSectionClick = (sectionId) => {
    console.log('Clicking section:', sectionId);
    const element = document.getElementById(sectionId);
    console.log('Found element:', element);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const components = {
    h1: ({children, ...props}) => (
      <Typography 
        variant="h2" 
        component="h1" 
        gutterBottom 
        sx={{ 
          mb: 4,
          color: theme.palette.primary.main,
          fontWeight: 'bold',
        }}
        {...props}
      >
        {children}
      </Typography>
    ),
    h2: ({children, ...props}) => {
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

      console.log('Header text:', text, 'ID:', id);

      return (
        <Typography 
          variant="h3" 
          component="h2" 
          id={id}
          sx={{ 
            mt: 6, 
            mb: 3,
            color: theme.palette.secondary.main,
            fontWeight: 'medium',
            scrollMarginTop: '100px',
          }}
          {...props}
        >
          {text}
        </Typography>
      );
    },
    h3: ({children, ...props}) => (
      <Typography 
        variant="h4" 
        component="h3" 
        sx={{ 
          mt: 4, 
          mb: 2,
          color: theme.palette.text.primary,
          fontWeight: 'medium',
        }}
        {...props}
      >
        {children}
      </Typography>
    ),
    p: ({...props}) => {
      const isIntroText = props.children?.[0]?.startsWith?.('Recent studies');
      
      return (
        <Typography 
          paragraph 
          sx={{ 
            lineHeight: 1.8,
            fontSize: '1.1rem',
            color: isIntroText ? 'text.primary' : 'inherit',
          }}
          {...props}
        />
      );
    },
    strong: ({...props}) => (
      <Box 
        component="strong" 
        sx={{ 
          color: theme.palette.primary.main,
          fontWeight: 'bold',
        }} 
        {...props}
      />
    ),
    a: ({...props}) => (
      <Link
        {...props}
        sx={{ 
          color: theme.palette.primary.main,
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
          }
        }}
      />
    ),
    ol: ({...props}) => (
      <List 
        component="ol"
        sx={{ 
          pl: 2,
          listStyleType: 'decimal',
          '& li': { 
            display: 'list-item',
            pl: 0,
            py: 0.5,
          }
        }}
        {...props}
      />
    ),
    ul: ({...props}) => {
      const isFootnotes = props.children?.some?.(child => 
        child.props?.children?.[0]?.startsWith?.('https://')
      );

      return (
        <List 
          component={isFootnotes ? "ol" : "ul"}
          sx={{ 
            pl: 2,
            listStyleType: isFootnotes ? 'decimal' : 'disc',
            '& li': { 
              display: 'list-item',
              pl: 0,
              py: 0.5,
            }
          }}
          {...props}
        />
      );
    },
    li: ({ordered, ...props}) => {
      const isFootnote = props.children?.[0]?.startsWith?.('https://');
      
      return (
        <ListItem 
          component="li"
          sx={{ 
            display: 'list-item',
            listStyleType: isFootnote ? 'decimal' : 'disc',
            pl: 0,
            py: 0.5,
          }}
        >
          <Typography 
            component="span" 
            sx={{ 
              display: 'inline',
              '& a': {
                color: theme.palette.primary.main,
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                }
              }
            }}
            {...props}
          />
        </ListItem>
      );
    },
    h4: ({children, ...props}) => {
      if (children === 'References' || children === 'Footnotes') {
        return (
          <Typography 
            variant="h5" 
            component="h4" 
            sx={{ 
              mt: 6,
              mb: 2,
              color: theme.palette.secondary.main,
              fontWeight: 'medium',
            }}
            {...props}
          >
            {children}
          </Typography>
        );
      }
      return (
        <Typography 
          variant="h5" 
          component="h4" 
          sx={{ 
            mt: 4,
            mb: 2,
            color: theme.palette.text.primary,
            fontWeight: 'medium',
          }}
          {...props}
        >
          {children}
        </Typography>
      );
    },
  };

  return (
    <Container maxWidth="lg">
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
              alt="Analysis"
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
                Comprehensive Analysis
              </Typography>
              <Typography variant="h6">
                In-depth research on cybersecurity threats affecting young adults
              </Typography>
            </Box>
          </Box>
        </motion.div>

        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Paper 
              elevation={3}
              sx={{ 
                p: 2, 
                position: 'sticky', 
                top: 100,
                maxHeight: 'calc(100vh - 120px)',
                overflowY: 'auto',
                backgroundColor: theme.palette.mode === 'dark' 
                  ? 'rgba(255, 255, 255, 0.05)' 
                  : 'rgba(255, 255, 255, 0.95)',
              }}
            >
              <Typography 
                variant="h6" 
                gutterBottom
                sx={{ 
                  color: theme.palette.primary.main,
                  fontWeight: 'medium',
                }}
              >
                Quick Navigation
              </Typography>
              <List>
                {sections.map((section, index) => (
                  <ListItem 
                    button 
                    key={index}
                    onClick={() => handleSectionClick(section.id)}
                    sx={{
                      borderRadius: 1,
                      mb: 0.5,
                      '&:hover': {
                        backgroundColor: theme.palette.action.hover,
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
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={9}>
            <Paper 
              elevation={3}
              sx={{ 
                p: 4,
                backgroundColor: theme.palette.mode === 'dark' 
                  ? 'rgba(255, 255, 255, 0.05)' 
                  : 'rgba(255, 255, 255, 0.95)',
                '& h2': {
                  scrollMarginTop: '100px',
                },
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
                <>
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]} 
                    components={components}
                  >
                    {markdown}
                  </ReactMarkdown>
                </>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Analysis; 