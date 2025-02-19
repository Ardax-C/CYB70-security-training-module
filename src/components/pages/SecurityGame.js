import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Card,
  CardContent,
  Alert,
  LinearProgress,
  Chip,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { motion } from 'framer-motion';
import { 
  Email, 
  CheckCircle, 
  Timer, 
  Lock, 
  Visibility, 
  VisibilityOff, 
  Security,
  ArrowBack,
  Warning,
  Computer,
  ErrorOutline,
  Folder,
  InsertDriveFile,
  MonetizationOn,
  Close,
  Minimize,
  OpenInFull,
  Send,
  Inbox,
  DeleteOutline,
  Star,
} from '@mui/icons-material';
import zxcvbn from 'zxcvbn';

const SecurityGame = () => {
  const theme = useTheme();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [gameComplete, setGameComplete] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timer, setTimer] = useState(30);
  const [timerActive, setTimerActive] = useState(true);
  const [gameMode, setGameMode] = useState('menu');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordFeedback, setPasswordFeedback] = useState(null);
  const [selectedElements, setSelectedElements] = useState([]);
  const [showSubmit, setShowSubmit] = useState(false);
  const [ransomwareState, setRansomwareState] = useState({
    infected: false,
    filesEncrypted: false,
    showDemand: false,
    timeLeft: 24,
    encryptedFiles: [],
    desktopView: 'desktop',
    selectedEmail: null,
  });

  const questions = useMemo(() => [
    {
      email: {
        from: "security@amazzon.com",
        subject: "Urgent: Your Account Security is Compromised",
        body: "Dear Valued Customer, We detected unusual activity in your account. Click here immediately to verify your identity and prevent unauthorized access: http://amaz0n-security.com/verify",
      },
      isPhishing: true,
      suspiciousElements: [
        {
          text: "security@amazzon.com",
          explanation: "Misspelled domain name (extra 'z' in Amazon)",
          type: "sender"
        },
        {
          text: "Urgent",
          explanation: "Creates false urgency to pressure users",
          type: "subject"
        },
        {
          text: "Dear Valued Customer",
          explanation: "Generic greeting instead of using your name",
          type: "greeting"
        },
        {
          text: "Click here immediately",
          explanation: "Pressure tactics using urgency",
          type: "urgency"
        },
        {
          text: "http://amaz0n-security.com/verify",
          explanation: "Suspicious URL using number '0' instead of 'o' and not the official domain",
          type: "link"
        }
      ],
      explanation: "Multiple red flags: Misspelled sender domain (amazzon), urgency tactics, suspicious link domain, generic greeting.",
      hints: ["Check the sender's email domain", "Look for pressure tactics", "Examine the URL carefully"]
    },
    {
      email: {
        from: "friend@gmail.com",
        subject: "Check out this cool game!",
        body: "Hey! Found this awesome free game. You can get unlimited coins! Download here: http://free-game-hack.xyz/download.exe",
      },
      isPhishing: true,
      suspiciousElements: [
        {
          text: "friend@gmail.com",
          explanation: "Generic 'friend' email address",
          type: "sender"
        },
        {
          text: "unlimited coins",
          explanation: "Too good to be true offer",
          type: "scam"
        },
        {
          text: "http://free-game-hack.xyz/download.exe",
          explanation: "Suspicious domain and executable file extension",
          type: "link"
        }
      ],
      explanation: "Red flags: Suspicious file extension (.exe), too-good-to-be-true offer, unofficial domain.",
      hints: ["Consider if the offer seems realistic", "Check file extensions", "Verify the website domain"]
    },
    // Add more questions...
  ], []);

  const mockFiles = useMemo(() => [
    { name: 'Documents', type: 'folder', contents: [
      { name: 'homework.docx', type: 'file' },
      { name: 'family_photos.zip', type: 'file' },
      { name: 'passwords.txt', type: 'file' },
    ]},
    { name: 'Downloads', type: 'folder', contents: [
      { name: 'game_setup.exe', type: 'file' },
      { name: 'important_document.pdf', type: 'file' },
    ]},
    { name: 'Desktop', type: 'folder', contents: [
      { name: 'thesis.docx', type: 'file' },
      { name: 'bank_details.xlsx', type: 'file' },
      { name: 'vacation_pics.jpg', type: 'file' },
    ]},
  ], []);

  const mockEmails = useMemo(() => [
    {
      id: 1,
      from: 'MovieTickets Support <support@m0vietickets.com>',
      subject: 'Your Free Movie Tickets Inside!',
      date: '10:45 AM',
      content: `
        Dear Valued Customer,

        Congratulations! You've been selected to receive 2 FREE movie tickets to any showing!

        Click here to claim your tickets: www.m0vietickets.com/claim-reward

        Hurry, this offer expires in 24 hours!

        Best regards,
        MovieTickets Support Team
      `,
      isPhishing: true
    },
    {
      id: 2,
      from: 'John Smith <john.smith@company.com>',
      subject: 'Meeting Notes',
      date: '9:30 AM',
      content: 'Here are the meeting notes from yesterday...',
      isPhishing: false
    },
    // Add more mock emails...
  ], []);

  const handleElementClick = useCallback((element) => {
    if (!showResult) {
      const isAlreadySelected = selectedElements.some(selected => selected.text === element.text);
      if (isAlreadySelected) {
        setSelectedElements(selectedElements.filter(selected => selected.text !== element.text));
      } else {
        setSelectedElements([...selectedElements, element]);
      }
      setShowSubmit(true);
    }
  }, [selectedElements, showResult]);

  const handleSubmit = useCallback(() => {
    setTimerActive(false);
    setShowResult(true);
    const foundSuspiciousElements = selectedElements.length;
    const totalSuspiciousElements = questions[currentQuestion].suspiciousElements.length;
    const percentageFound = (foundSuspiciousElements / totalSuspiciousElements) * 100;
    
    if (percentageFound >= 60) {
      setScore(score + 1);
      setFeedback({
        type: 'success',
        message: `Great job! You found ${foundSuspiciousElements} out of ${totalSuspiciousElements} suspicious elements.`
      });
    } else {
      setFeedback({
        type: 'error',
        message: `You only found ${foundSuspiciousElements} out of ${totalSuspiciousElements} suspicious elements. Keep practicing!`
      });
    }
  }, [currentQuestion, questions, score, selectedElements]);

  useEffect(() => {
    let interval = null;
    if (timerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      handleSubmit();
    }
    return () => clearInterval(interval);
  }, [timer, timerActive, handleSubmit]);

  useEffect(() => {
    const handleSuspiciousElementClick = (event) => {
      const elementSpan = event.target.closest('.suspicious-element');
      if (elementSpan) {
        const elementData = JSON.parse(decodeURIComponent(elementSpan.dataset.element));
        handleElementClick(elementData);
      }
    };

    document.addEventListener('click', handleSuspiciousElementClick);
    return () => document.removeEventListener('click', handleSuspiciousElementClick);
  }, [selectedElements, handleElementClick]);

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowResult(false);
      setFeedback(null);
      setTimer(30);
      setTimerActive(true);
      setSelectedElements([]);
      setShowSubmit(false);
    } else {
      setGameComplete(true);
    }
  };

  const renderEmail = (email) => {
    const currentSuspiciousElements = questions[currentQuestion].suspiciousElements;
    
    const highlightText = (text, elements) => {
      let result = text;
      elements.forEach(element => {
        const isSelected = selectedElements.some(selected => selected.text === element.text);
        result = result.replace(
          element.text,
          `<span class="suspicious-element ${isSelected ? 'selected' : ''}" 
                 data-element="${encodeURIComponent(JSON.stringify(element))}"
                 style="background-color: ${isSelected ? '#ffd7d7' : 'transparent'}; 
                        padding: 2px 4px; 
                        border-radius: 4px;
                        transition: background-color 0.3s">${element.text}</span>`
        );
      });
      return result;
    };

    return (
      <Card sx={{ mb: 3, backgroundColor: theme.palette.background.paper }}>
        <CardContent>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            dangerouslySetInnerHTML={{
              __html: highlightText(`From: ${email.from}`, currentSuspiciousElements.filter(e => e.type === 'sender'))
            }}
          />
          <Typography 
            variant="body2" 
            color="text.secondary"
            dangerouslySetInnerHTML={{
              __html: highlightText(`Subject: ${email.subject}`, currentSuspiciousElements.filter(e => e.type === 'subject'))
            }}
          />
          <Box sx={{ mt: 2 }}>
            <Typography 
              variant="body1"
              dangerouslySetInnerHTML={{
                __html: highlightText(email.body, currentSuspiciousElements.filter(e => !['sender', 'subject'].includes(e.type)))
              }}
            />
          </Box>
        </CardContent>
      </Card>
    );
  };

  const checkPasswordStrength = (pass) => {
    const result = zxcvbn(pass);
    const strength = result.score;
    const feedback = {
      score: strength,
      suggestions: result.feedback.suggestions,
      warning: result.feedback.warning,
      timeToBreak: result.crack_times_display.offline_fast_hashing_1e10_per_second,
    };
    setPasswordFeedback(feedback);
  };

  const renderGameMenu = () => (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Security Training Games
      </Typography>
      <Typography variant="body1" gutterBottom>
        <i>These games are examples of how teens and young adults can be educated on cybersecurity.</i>
      </Typography>
      <Grid container spacing={3} sx={{ mt: 2, justifyContent: 'center' }}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': { transform: 'scale(1.02)' },
            }}
            onClick={() => setGameMode('phishing')}
          >
            <Email sx={{ fontSize: 40, mb: 2, color: theme.palette.primary.main }} />
            <Typography variant="h6" gutterBottom>
              Phishing Detective
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Learn to spot suspicious emails and protect yourself from scams
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': { transform: 'scale(1.02)' },
            }}
            onClick={() => setGameMode('password')}
          >
            <Lock sx={{ fontSize: 40, mb: 2, color: theme.palette.secondary.main }} />
            <Typography variant="h6" gutterBottom>
              Password Analyzer
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Test password strength and learn best practices
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': { transform: 'scale(1.02)' },
            }}
            onClick={() => setGameMode('ransomware')}
          >
            <Computer sx={{ fontSize: 40, mb: 2, color: theme.palette.error.main }} />
            <Typography variant="h6" gutterBottom>
              Ransomware Simulator
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Experience the consequences of clicking malicious links
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );

  const renderPasswordGame = () => (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Password Strength Analyzer
      </Typography>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" gutterBottom>
            Create a password and see how strong it is. Learn what makes a password secure.
          </Typography>
        </Box>
        <Box sx={{ position: 'relative' }}>
          <TextField
            fullWidth
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              checkPasswordStrength(e.target.value);
            }}
            label="Enter a password"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />
        </Box>

        {passwordFeedback && (
          <Box sx={{ mt: 3 }}>
            <LinearProgress
              variant="determinate"
              value={(passwordFeedback.score / 4) * 100}
              color={
                passwordFeedback.score <= 1 ? 'error' :
                passwordFeedback.score === 2 ? 'warning' :
                passwordFeedback.score === 3 ? 'info' : 'success'
              }
              sx={{ height: 10, borderRadius: 5 }}
            />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Strength: {
                passwordFeedback.score <= 1 ? 'Very Weak' :
                passwordFeedback.score === 2 ? 'Weak' :
                passwordFeedback.score === 3 ? 'Strong' : 'Very Strong'
              }
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Time to crack: {passwordFeedback.timeToBreak}
            </Typography>
            {passwordFeedback.warning && (
              <Alert severity="warning" sx={{ mt: 2 }}>
                {passwordFeedback.warning}
              </Alert>
            )}
            {passwordFeedback.suggestions.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Suggestions for improvement:
                </Typography>
                <List>
                  {passwordFeedback.suggestions.map((suggestion, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <Security color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={suggestion} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </Box>
        )}
      </Paper>
      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Button
          variant="outlined"
          onClick={() => setGameMode('menu')}
          startIcon={<ArrowBack />}
        >
          Back to Menu
        </Button>
      </Box>
    </Box>
  );

  const renderPhishingGame = () => (
    <Box sx={{ mt: 2 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Phishing Email Detective
        </Typography>
        
        {!gameComplete ? (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Chip 
                icon={<Email />} 
                label={`Question ${currentQuestion + 1}/${questions.length}`} 
              />
              <Chip 
                icon={<CheckCircle />} 
                label={`Score: ${score}`} 
                color="primary" 
              />
              <Chip 
                icon={<Timer />} 
                label={`Time: ${timer}s`} 
                color={timer < 10 ? "warning" : "default"}
              />
            </Box>

            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
              {renderEmail(questions[currentQuestion].email)}
              
              {!showResult && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Click on any suspicious elements in the email above
                  </Typography>
                  {selectedElements.length > 0 && (
                    <Box sx={{ mt: 2, mb: 2 }}>
                      <Typography variant="subtitle1" gutterBottom>
                        Selected suspicious elements:
                      </Typography>
                      <List>
                        {selectedElements.map((element, index) => (
                          <ListItem key={index}>
                            <ListItemIcon>
                              <Warning color="warning" />
                            </ListItemIcon>
                            <ListItemText primary={element.text} />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}
                  {showSubmit && (
                    <Button 
                      variant="contained" 
                      color="primary"
                      onClick={handleSubmit}
                      sx={{ mt: 2 }}
                    >
                      Submit Findings
                    </Button>
                  )}
                </Box>
              )}

              {feedback && (
                <Box sx={{ mt: 3 }}>
                  <Alert severity={feedback.type} sx={{ mb: 2 }}>
                    {feedback.message}
                  </Alert>
                  <Button 
                    variant="outlined" 
                    onClick={() => setShowExplanation(true)}
                    sx={{ mr: 2 }}
                  >
                    Show Explanation
                  </Button>
                  <Button 
                    variant="contained" 
                    onClick={nextQuestion}
                  >
                    Next Email
                  </Button>
                </Box>
              )}
            </Paper>
          </Box>
        ) : (
          <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
              Game Complete!
            </Typography>
            <Typography variant="h6" gutterBottom>
              Your Score: {score}/{questions.length}
            </Typography>
            <Button 
              variant="contained" 
              onClick={() => window.location.reload()}
              sx={{ mt: 2 }}
            >
              Play Again
            </Button>
          </Paper>
        )}
      </motion.div>
    </Box>
  );

  const renderDesktop = () => (
    <Box 
      sx={{ 
        height: '70vh',
        backgroundColor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.100',
        borderRadius: 2,
        p: 2,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Grid container spacing={2}>
        {/* Desktop Icons */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
            {mockFiles.map((folder) => (
              <Paper
                key={folder.name}
                elevation={2}
                sx={{
                  p: 1,
                  textAlign: 'center',
                  cursor: 'pointer',
                  width: 100,
                  backgroundColor: 'background.paper',
                  '&:hover': { backgroundColor: 'action.hover' },
                }}
              >
                <Folder sx={{ fontSize: 40, color: 'primary.main' }} />
                <Typography variant="body2">{folder.name}</Typography>
              </Paper>
            ))}
            <Paper
              elevation={2}
              sx={{
                p: 1,
                textAlign: 'center',
                cursor: 'pointer',
                width: 100,
                backgroundColor: 'background.paper',
                '&:hover': { backgroundColor: 'action.hover' },
              }}
              onClick={() => setRansomwareState(prev => ({ ...prev, desktopView: 'email' }))}
            >
              <Email sx={{ fontSize: 40, color: 'secondary.main' }} />
              <Typography variant="body2">Email</Typography>
            </Paper>
          </Box>
        </Grid>
      </Grid>

      {/* Email Client Window */}
      {(ransomwareState.desktopView === 'email' || ransomwareState.desktopView === 'emailOpen') && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
            zIndex: 1000,
          }}
        >
          {renderEmailClient()}
        </Box>
      )}
    </Box>
  );

  const renderEmailClient = () => {
    const startInfection = () => {
      setRansomwareState(prev => ({ 
        ...prev, 
        infected: true,
        desktopView: 'desktop'
      }));
      setTimeout(() => {
        setRansomwareState(prev => ({ 
          ...prev, 
          filesEncrypted: true,
          encryptedFiles: mockFiles.flatMap(folder => 
            folder.contents.map(file => ({
              ...file,
              encrypted: true,
              newName: `${file.name}.encrypted`
            }))
          ),
        }));
      }, 2000);
      setTimeout(() => {
        setRansomwareState(prev => ({ ...prev, showDemand: true }));
      }, 3000);
    };

    return (
      <Paper 
        elevation={6}
        sx={{ 
          width: '100%',
          height: '100%',
          maxWidth: '1000px',
          maxHeight: '600px',
          backgroundColor: 'background.paper',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Window Controls */}
        <Box sx={{ 
          p: 1, 
          borderBottom: 1, 
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          bgcolor: 'primary.main',
          color: 'white',
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton 
              size="small" 
              sx={{ color: 'white' }}
              onClick={() => {
                if (ransomwareState.desktopView === 'emailOpen') {
                  setRansomwareState(prev => ({ ...prev, desktopView: 'email', selectedEmail: null }));
                } else {
                  setRansomwareState(prev => ({ ...prev, desktopView: 'desktop' }));
                }
              }}
            >
              <ArrowBack />
            </IconButton>
            <Typography variant="subtitle1">Email Client</Typography>
          </Box>
          <Box>
            <IconButton size="small" sx={{ color: 'white' }}>
              <Minimize />
            </IconButton>
            <IconButton size="small" sx={{ color: 'white' }}>
              <OpenInFull />
            </IconButton>
            <IconButton 
              size="small" 
              sx={{ color: 'white' }}
              onClick={() => setRansomwareState(prev => ({ ...prev, desktopView: 'desktop' }))}
            >
              <Close />
            </IconButton>
          </Box>
        </Box>

        {/* Email Interface */}
        <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          {/* Sidebar */}
          <Box sx={{ 
            width: 200, 
            borderRight: 1, 
            borderColor: 'divider',
            p: 2,
          }}>
            <List>
              <ListItem button selected>
                <ListItemIcon>
                  <Inbox />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <Send />
                </ListItemIcon>
                <ListItemText primary="Sent" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <Star />
                </ListItemIcon>
                <ListItemText primary="Starred" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <DeleteOutline />
                </ListItemIcon>
                <ListItemText primary="Trash" />
              </ListItem>
            </List>
          </Box>

          {/* Email List/Content */}
          <Box sx={{ flex: 1, overflow: 'auto' }}>
            {ransomwareState.desktopView === 'email' ? (
              <List>
                {mockEmails.map((email) => (
                  <ListItem 
                    key={email.id}
                    button
                    onClick={() => setRansomwareState(prev => ({ 
                      ...prev, 
                      desktopView: 'emailOpen',
                      selectedEmail: email
                    }))}
                    sx={{ 
                      borderBottom: 1, 
                      borderColor: 'divider',
                      '&:hover': { backgroundColor: 'action.hover' },
                    }}
                  >
                    <ListItemText 
                      primary={email.subject}
                      secondary={
                        <Box>
                          <Typography variant="body2" component="span">
                            {email.from}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            component="span" 
                            sx={{ float: 'right' }}
                          >
                            {email.date}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Box sx={{ p: 3 }}>
                <Typography variant="h6">{ransomwareState.selectedEmail?.subject}</Typography>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
                  From: {ransomwareState.selectedEmail?.from}
                </Typography>
                <Typography 
                  component="div"
                  sx={{ 
                    whiteSpace: 'pre-line',
                    '& .malicious-link': {
                      color: theme.palette.primary.main,
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      '&:hover': {
                        color: theme.palette.primary.dark,
                      }
                    },
                  }}
                >
                  {ransomwareState.selectedEmail?.content.split('www.m0vietickets.com/claim-reward').map((part, index, array) => (
                    <React.Fragment key={index}>
                      {part}
                      {index < array.length - 1 && (
                        <span 
                          className="malicious-link"
                          onClick={startInfection}
                        >
                          www.m0vietickets.com/claim-reward
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Paper>
    );
  };

  const renderRansomwareGame = () => {
    return (
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Ransomware Simulator
        </Typography>
        <Paper elevation={3} sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>
          {!ransomwareState.infected ? (
            <Box sx={{ 
              height: '70vh',
              backgroundColor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.100',
              borderRadius: 2,
              p: 2,
              position: 'relative',
              overflow: 'hidden',
            }}>
              <Grid container spacing={2}>
                {/* Desktop Icons */}
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                    {mockFiles.map((folder) => (
                      <Paper
                        key={folder.name}
                        elevation={2}
                        sx={{
                          p: 1,
                          textAlign: 'center',
                          cursor: 'pointer',
                          width: 100,
                          backgroundColor: 'background.paper',
                          '&:hover': { backgroundColor: 'action.hover' },
                        }}
                      >
                        <Folder sx={{ fontSize: 40, color: 'primary.main' }} />
                        <Typography variant="body2">{folder.name}</Typography>
                      </Paper>
                    ))}
                    <Paper
                      elevation={2}
                      sx={{
                        p: 1,
                        textAlign: 'center',
                        cursor: 'pointer',
                        width: 100,
                        backgroundColor: 'background.paper',
                        '&:hover': { backgroundColor: 'action.hover' },
                      }}
                      onClick={() => setRansomwareState(prev => ({ ...prev, desktopView: 'email' }))}
                    >
                      <Email sx={{ fontSize: 40, color: 'secondary.main' }} />
                      <Typography variant="body2">Email</Typography>
                    </Paper>
                  </Box>
                </Grid>
              </Grid>

              {/* Email Client Window */}
              {(ransomwareState.desktopView === 'email' || ransomwareState.desktopView === 'emailOpen') && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 2,
                    zIndex: 1000,
                  }}
                >
                  {renderEmailClient()}
                </Box>
              )}
            </Box>
          ) : (
            <Box>
              {ransomwareState.filesEncrypted ? (
                <Box>
                  <Typography variant="h5" color="error" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <ErrorOutline sx={{ mr: 1 }} />
                    Your files have been encrypted!
                  </Typography>
                  <Box sx={{ my: 3 }}>
                    {mockFiles.map(folder => (
                      <Box key={folder.name} sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Folder sx={{ mr: 1 }} />
                          <Typography variant="h6">{folder.name}</Typography>
                        </Box>
                        <Box sx={{ pl: 4 }}>
                          {folder.contents.map(file => (
                            <Box 
                              key={file.name}
                              sx={{ 
                                display: 'flex',
                                alignItems: 'center',
                                p: 1,
                                borderRadius: 1,
                                backgroundColor: file.encrypted ? 'error.main' : 'background.paper',
                                color: file.encrypted ? 'white' : 'text.primary',
                                mb: 1,
                              }}
                            >
                              <InsertDriveFile sx={{ mr: 1 }} />
                              <Typography>
                                {file.encrypted ? `${file.name}.encrypted` : file.name}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    ))}
                  </Box>
                  {ransomwareState.showDemand && (
                    <Paper 
                      elevation={24}
                      sx={{ 
                        p: 3, 
                        backgroundColor: 'error.main',
                        color: 'white',
                        textAlign: 'center',
                        mt: 3,
                      }}
                    >
                      <MonetizationOn sx={{ fontSize: 60, mb: 2 }} />
                      <Typography variant="h5" gutterBottom>
                        RANSOMWARE DEMAND
                      </Typography>
                      <Typography paragraph>
                        Your files have been encrypted. To recover them, you must pay 2 Bitcoin within 24 hours.
                      </Typography>
                      <Typography variant="h6" gutterBottom>
                        Time remaining: {ransomwareState.timeLeft} hours
                      </Typography>
                      <Box sx={{ mt: 3 }}>
                        <Button
                          variant="contained"
                          sx={{ 
                            backgroundColor: 'white',
                            color: 'error.main',
                            '&:hover': {
                              backgroundColor: 'grey.100',
                            }
                          }}
                          onClick={() => {
                            setRansomwareState({
                              infected: false,
                              filesEncrypted: false,
                              showDemand: false,
                              timeLeft: 24,
                              encryptedFiles: [],
                              desktopView: 'desktop',
                              selectedEmail: null,
                            });
                          }}
                        >
                          Reset Simulation
                        </Button>
                      </Box>
                    </Paper>
                  )}
                </Box>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ErrorOutline sx={{ fontSize: 60, color: 'error.main' }} />
                  </motion.div>
                  <Typography variant="h6" color="error" sx={{ mt: 2 }}>
                    Malware detected! Your system is being infected...
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </Paper>
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Button
            variant="outlined"
            onClick={() => {
              setGameMode('menu');
              setRansomwareState({
                infected: false,
                filesEncrypted: false,
                showDemand: false,
                timeLeft: 24,
                encryptedFiles: [],
                desktopView: 'desktop',
                selectedEmail: null,
              });
            }}
            startIcon={<ArrowBack />}
          >
            Back to Menu
          </Button>
        </Box>
      </Box>
    );
  };

  return (
    <Container maxWidth="md" sx={{ pt: 8, pb: 4 }}>
      {gameMode === 'menu' && renderGameMenu()}
      {gameMode === 'phishing' && renderPhishingGame()}
      {gameMode === 'password' && renderPasswordGame()}
      {gameMode === 'ransomware' && renderRansomwareGame()}

      <Dialog 
        open={showExplanation} 
        onClose={() => setShowExplanation(false)}
      >
        <DialogTitle>Explanation</DialogTitle>
        <DialogContent>
          <Typography paragraph>
            {questions[currentQuestion].explanation}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Suspicious Elements Found:
          </Typography>
          <List>
            {questions[currentQuestion].suspiciousElements.map((element, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <Warning color={selectedElements.some(selected => selected.text === element.text) ? "success" : "error"} />
                </ListItemIcon>
                <ListItemText 
                  primary={element.text}
                  secondary={element.explanation}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowExplanation(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SecurityGame; 