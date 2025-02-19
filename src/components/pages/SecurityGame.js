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
  ArrowBack 
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

  const questions = useMemo(() => [
    {
      email: {
        from: "security@amazzon.com",
        subject: "Urgent: Your Account Security is Compromised",
        body: "Dear Valued Customer, We detected unusual activity in your account. Click here immediately to verify your identity and prevent unauthorized access: http://amaz0n-security.com/verify",
      },
      isPhishing: true,
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
      explanation: "Red flags: Suspicious file extension (.exe), too-good-to-be-true offer, unofficial domain.",
      hints: ["Consider if the offer seems realistic", "Check file extensions", "Verify the website domain"]
    },
    // Add more questions...
  ], []);

  const handleAnswer = useCallback((isPhishingResponse) => {
    setTimerActive(false);
    const correct = isPhishingResponse === questions[currentQuestion].isPhishing;
    setShowResult(true);
    if (correct) {
      setScore(score + 1);
      setFeedback({
        type: 'success',
        message: 'Correct! Good catch!'
      });
    } else {
      setFeedback({
        type: 'error',
        message: 'Incorrect. This could have been dangerous!'
      });
    }
  }, [currentQuestion, score, questions]);

  useEffect(() => {
    let interval = null;
    if (timerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      handleAnswer(null);
    }
    return () => clearInterval(interval);
  }, [timer, timerActive, handleAnswer]);

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowResult(false);
      setFeedback(null);
      setTimer(30);
      setTimerActive(true);
    } else {
      setGameComplete(true);
    }
  };

  const renderEmail = (email) => (
    <Card sx={{ mb: 3, backgroundColor: theme.palette.background.paper }}>
      <CardContent>
        <Typography variant="body2" color="text.secondary">From: {email.from}</Typography>
        <Typography variant="body2" color="text.secondary">Subject: {email.subject}</Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">{email.body}</Typography>
        </Box>
      </CardContent>
    </Card>
  );

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

  return (
    <Container maxWidth="md" sx={{ pt: 8, pb: 4 }}>
      {gameMode === 'menu' && renderGameMenu()}
      {gameMode === 'phishing' && (
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
                        Is this a phishing email?
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                        <Button 
                          variant="contained" 
                          color="error"
                          onClick={() => handleAnswer(true)}
                        >
                          Yes, it's phishing
                        </Button>
                        <Button 
                          variant="contained" 
                          color="success"
                          onClick={() => handleAnswer(false)}
                        >
                          No, it's legitimate
                        </Button>
                      </Box>
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
      )}
      {gameMode === 'password' && renderPasswordGame()}

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
            Key Warning Signs:
          </Typography>
          <ul>
            {questions[currentQuestion].hints.map((hint, index) => (
              <li key={index}>
                <Typography>{hint}</Typography>
              </li>
            ))}
          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowExplanation(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SecurityGame; 