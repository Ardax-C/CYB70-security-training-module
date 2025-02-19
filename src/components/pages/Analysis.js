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
  Link,
  useMediaQuery,
  IconButton,
  Collapse,
  Fab,
  ButtonBase,
} from '@mui/material';
import {
  Person,
  Warning,
  Business,
  School,
  Flag,
  MenuBook,
  ExpandMore,
  ExpandLess,
  Menu,
} from '@mui/icons-material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Analysis = () => {
  const [markdown, setMarkdown] = useState('');
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [navExpanded, setNavExpanded] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  const sections = useMemo(() => [
    { icon: <Person />, title: 'Demographic Profile', id: 'demographic-profile' },
    { icon: <Warning />, title: 'Key Vulnerabilities', id: 'key-vulnerabilities' },
    { icon: <Business />, title: 'Implications for Corporate', id: 'implications-corporate' },
    { icon: <School />, title: 'Recommendations for Training', id: 'recommendations-training' },
    { icon: <Flag />, title: 'Conclusion', id: 'conclusion' },
    { icon: <MenuBook />, title: 'References', id: 'references' },
  ], []);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/resources/CyberThreats_Analysis.md`)
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

        processedText = processedText
          .replace(/^## Demographic Profile/m, '## Demographic Profile {#demographic-profile}')
          .replace(/^## Key Vulnerabilities/m, '## Key Vulnerabilities {#key-vulnerabilities}')
          .replace(/^## Implications for Corporate/m, '## Implications for Corporate {#implications-for-corporate}')
          .replace(/^## Recommendations for Training/m, '## Recommendations for Training {#recommendations-for-training}')
          .replace(/^## Conclusion/m, '## Conclusion {#conclusion}');

        setMarkdown(processedText);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading analysis:', error);
        setLoading(false);
      });
  }, []);

  const handleSectionClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleNavClose = () => {
    setNavOpen(false);
    setNavExpanded(false);
  };

  const handleFootnoteClick = (e, href) => {
    e.preventDefault();
    const targetId = href.slice(1); // Remove the # from the href
    const element = document.getElementById(targetId);
    if (element) {
      const yOffset = -80; // Adjust for header height
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

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
          fontWeight: 'bold',
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
            fontWeight: 'medium',
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
        sx={{ mt: 3 }}
      >
        {children}
      </Typography>
    ),
    p: ({ children }) => {
      const isIntroText = children?.[0]?.startsWith?.('Recent studies');
      
      return (
        <Typography 
          variant="body1" 
          paragraph 
          sx={{ 
            fontSize: isMobile ? '0.95rem' : '1rem',
            lineHeight: 1.8,
            overflowWrap: 'break-word',
            wordWrap: 'break-word',
            hyphens: 'auto',
            color: isIntroText ? theme.palette.text.primary : 'inherit',
          }}
        >
          {children}
        </Typography>
      );
    },
    strong: ({ children }) => (
      <Box 
        component="strong" 
        sx={{ 
          color: theme.palette.primary.main,
          fontWeight: 'bold',
        }} 
      >
        {children}
      </Box>
    ),
    a: ({ href, children }) => {
      if (href && /^#\d+$/.test(href)) {
        return (
          <ButtonBase
            onClick={(e) => handleFootnoteClick(e, href)}
            sx={{
              background: 'none',
              border: 'none',
              padding: '0 2px',
              color: theme.palette.primary.main,
              cursor: 'pointer',
              fontSize: '0.8em',
              verticalAlign: 'super',
              fontFamily: 'inherit',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            {children}
          </ButtonBase>
        );
      }

      return (
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: theme.palette.primary.main,
            textDecoration: 'none',
            wordBreak: 'break-all',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          {children}
        </Link>
      );
    },
    ol: ({ children }) => (
      <List 
        component="ol"
        sx={{ 
          pl: 2,
          '& li': {
            display: 'list-item',
            listStyleType: 'decimal',
            pl: 1,
            mb: 1,
          },
        }}
      >
        {children}
      </List>
    ),
    ul: ({ children }) => {
      const isFootnotes = children?.some?.(child => 
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
        >
          {children}
        </List>
      );
    },
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
    h4: ({ children }) => {
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
        >
          {children}
        </Typography>
      );
    },
    table: ({ children }) => (
      <Box sx={{ overflowX: 'auto', mb: 2 }}>
        <table style={{ 
          minWidth: isMobile ? '100%' : '600px',
          borderCollapse: 'collapse',
          width: '100%',
        }}>
          {children}
        </table>
      </Box>
    ),
    th: ({ children }) => (
      <th style={{ 
        padding: isMobile ? '8px 4px' : '12px 8px',
        borderBottom: `1px solid ${theme.palette.divider}`,
        textAlign: 'left',
        fontSize: isMobile ? '0.875rem' : '1rem',
      }}>
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td style={{ 
        padding: isMobile ? '8px 4px' : '12px 8px',
        borderBottom: `1px solid ${theme.palette.divider}`,
        fontSize: isMobile ? '0.875rem' : '1rem',
      }}>
        {children}
      </td>
    ),
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {isMobile ? (
            <>
              <Paper
                elevation={4}
                sx={{
                  display: navOpen ? 'block' : 'none',
                  position: 'fixed',
                  bottom: '80px',
                  right: '20px',
                  width: '85%',
                  maxWidth: '300px',
                  maxHeight: '60vh',
                  overflowY: 'auto',
                  zIndex: 1000,
                  borderRadius: 2,
                  backgroundColor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Box sx={{ p: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      mb: 1,
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: theme.palette.mode === 'dark' 
                          ? theme.palette.primary.light 
                          : theme.palette.primary.main,
                        fontWeight: 'medium',
                      }}
                    >
                      Quick Navigation
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={handleNavClose}
                      sx={{ 
                        color: theme.palette.mode === 'dark' 
                          ? theme.palette.primary.light 
                          : theme.palette.primary.main 
                      }}
                    >
                      <ExpandLess />
                    </IconButton>
                  </Box>
                  <List dense>
                    {sections.map((section) => (
                      <ButtonBase
                        key={section.id}
                        onClick={() => {
                          handleSectionClick(section.id);
                          handleNavClose();
                        }}
                        sx={{
                          width: '100%',
                          justifyContent: 'flex-start',
                          padding: '8px 16px',
                          borderRadius: 1,
                          mb: 0.5,
                          color: theme.palette.text.primary,
                          '&:hover': {
                            backgroundColor: theme.palette.mode === 'dark'
                              ? 'rgba(255, 255, 255, 0.1)'
                              : theme.palette.action.hover,
                          },
                        }}
                      >
                        <ListItemIcon 
                          sx={{ 
                            minWidth: 32,
                            color: theme.palette.mode === 'dark'
                              ? theme.palette.primary.light
                              : theme.palette.primary.main,
                          }}
                        >
                          {section.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={section.title}
                          primaryTypographyProps={{
                            fontSize: '0.85rem',
                            fontWeight: 'medium',
                            color: 'inherit',
                          }}
                        />
                      </ButtonBase>
                    ))}
                  </List>
                </Box>
              </Paper>

              <Fab
                color="primary"
                aria-label="navigation"
                onClick={() => setNavOpen(!navOpen)}
                sx={{
                  position: 'fixed',
                  bottom: '20px',
                  right: '20px',
                  zIndex: 1000,
                  bgcolor: theme.palette.mode === 'dark' 
                    ? theme.palette.primary.light 
                    : theme.palette.primary.main,
                  '&:hover': {
                    bgcolor: theme.palette.mode === 'dark'
                      ? theme.palette.primary.main
                      : theme.palette.primary.dark,
                  },
                }}
              >
                <Menu />
              </Fab>
            </>
          ) : (
            <Grid item md={3}>
              <Paper 
                elevation={3}
                sx={{ 
                  p: 3,
                  position: 'sticky',
                  top: '80px',
                  maxHeight: 'calc(100vh - 100px)',
                  overflowY: 'auto',
                  zIndex: 1,
                  mt: 8,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography 
                    variant={isMobile ? "subtitle1" : "h6"} 
                    gutterBottom={!isMobile}
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: 'medium',
                    }}
                  >
                    Quick Navigation
                  </Typography>
                  {isMobile && (
                    <IconButton 
                      size="small" 
                      onClick={() => setNavExpanded(!navExpanded)}
                      sx={{ color: theme.palette.primary.main }}
                    >
                      {navExpanded ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                  )}
                </Box>
                <Collapse in={!isMobile || navExpanded}>
                  <List dense={isMobile}>
                    {sections.map((section) => (
                      <ButtonBase
                        key={section.id}
                        onClick={() => {
                          handleSectionClick(section.id);
                          if (isMobile) setNavExpanded(false);
                        }}
                        sx={{
                          width: '100%',
                          justifyContent: 'flex-start',
                          padding: '8px 16px',
                          borderRadius: 1,
                          mb: 0.5,
                          border: 'none',
                          color: theme.palette.text.primary,
                          '&:hover': {
                            backgroundColor: theme.palette.action.hover,
                          },
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: isMobile ? 32 : 40 }}>
                          {section.icon}
                        </ListItemIcon>
                        <ListItemText 
                          primary={section.title}
                          primaryTypographyProps={{
                            fontSize: isMobile ? '0.85rem' : '0.9rem',
                            fontWeight: 'medium',
                          }}
                        />
                      </ButtonBase>
                    ))}
                  </List>
                </Collapse>
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

export default Analysis; 