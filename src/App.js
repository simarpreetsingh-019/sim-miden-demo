import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Container,
  Paper,
} from '@mui/material';
import AdminPage from './components/AdminPage';
import VotingPage from './components/VotingPage';
import ResultsPage from './components/ResultsPage';

/**
 * App - Main entry point for the voting demo.
 * Sets up navigation, layout, and routing for all main pages.
 */
function App() {
  return (
    <Router>
      <Box
        sx={{
          width: '100%',
          background: 'linear-gradient(90deg, #00fff7 0%, #8f00ff 100%)',
          color: '#181818',
          fontWeight: 900,
          fontSize: 18,
          textAlign: 'center',
          py: 1.2,
          letterSpacing: 1,
          boxShadow: '0 2px 16px #00fff7',
          zIndex: 2000,
          fontFamily: 'Audiowide, Orbitron, sans-serif',
        }}
      >
        Want to try the real thing?{' '}
        <a
          href="https://miden-demo-main-z2b4.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#ff00cc',
            textDecoration: 'underline',
            fontWeight: 900,
            marginLeft: 8,
            textShadow: '0 0 8px #ff00cc',
          }}
        >
          Go to the Live Voting App!
        </a>
      </Box>
      <AppBar position="static" sx={{ mb: 4, background: '#181818' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Miden Voting Demo Simulator
          </Typography>
          <Button color="inherit" component={Link} to="/admin">
            Admin
          </Button>
          <Button color="inherit" component={Link} to="/vote">
            Vote
          </Button>
          <Button color="inherit" component={Link} to="/results">
            Results
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <Paper sx={{ p: 3, mb: 4, background: '#23272f', color: '#fff' }}>
          <Typography variant="h5" gutterBottom>
            Welcome to the Miden Voting Demo
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            This app demonstrates anonymous, privacy-preserving voting using the
            Miden SDK. All cryptography and ZK logic runs in your browser. Use
            the navigation above to:
          </Typography>
          <ul>
            <li>
              <b>Admin</b>: Generate voting notes, note hashes, and Merkle root
              (for admins only).
            </li>
            <li>
              <b>Vote</b>: Submit your note and vote anonymously (for voters).
            </li>
            <li>
              <b>Results</b>: See the live Yes/No tally (for everyone).
            </li>
          </ul>
          <Typography variant="body2" sx={{ mt: 2, color: '#aaa' }}>
            For learning and demo purposes. See README for full documentation
            and links to Miden tutorials.
          </Typography>
        </Paper>
        <Routes>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/vote" element={<VotingPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="*" element={<VotingPage />} />
        </Routes>
      </Container>
      <Box sx={{ textAlign: 'center', py: 3, color: '#888', fontSize: 14 }}>
        Built with ❤️ for the Miden ecosystem. &nbsp;|&nbsp;{' '}
            <a href="https://miden.xyz/developers" style={{ color: '#aaa' }}>
              Miden SDK
            </a>
            &nbsp;|&nbsp; by &nbsp;
            <a href="https://x.com/simarpreet_019" style={{ color: '#aaa' }}>
              simarpreet_019
            </a>
      </Box>
    </Router>
  );
}

export default App;
