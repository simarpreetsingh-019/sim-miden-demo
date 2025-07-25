import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  TextField,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
import { sha256 } from 'js-sha256';
import ConsoleOutput from './ConsoleOutput';

/**
 * Utility to build a Merkle proof for a given leaf index.
 * Returns an array of sibling hashes for the proof.
 */
function getMerkleProof(leaves, index) {
  let proof = [];
  let idx = index;
  let level = leaves.slice();
  while (level.length > 1) {
    const nextLevel = [];
    for (let i = 0; i < level.length; i += 2) {
      let left = level[i];
      let right = i + 1 < level.length ? level[i + 1] : left;
      nextLevel.push(sha256(left + right));
      if (i === idx || i + 1 === idx) {
        proof.push(i === idx ? right : left);
        idx = Math.floor(i / 2);
      }
    }
    level = nextLevel;
  }
  return proof;
}

/**
 * VotingPage - For users to submit their note and vote anonymously.
 * Generates Merkle proof and (scaffolded) ZK proof, shows CLI output.
 */
const VotingPage = () => {
  const [note, setNote] = useState('');
  const [vote, setVote] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [consoleLines, setConsoleLines] = useState([]);
  const [merkleRoot, setMerkleRoot] = useState('');
  const [leaves, setLeaves] = useState([]);

  // Load Merkle root and leaves from uploaded notes file
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = JSON.parse(evt.target.result);
        setLeaves(data.noteHashes || []);
        setMerkleRoot(data.merkleRoot || '');
        setConsoleLines((lines) => [
          ...lines,
          'Loaded Merkle root and note hashes from file.',
        ]);
      } catch {
        setConsoleLines((lines) => [...lines, 'Failed to parse notes file.']);
      }
    };
    reader.readAsText(file);
  };

  // Handler for submitting a vote
  const handleSubmit = async (e) => {
    e.preventDefault();
    setConsoleLines([]);
    if (!note || !vote) {
      setConsoleLines(['Please enter your note and select Yes or No.']);
      return;
    }
    if (!merkleRoot || leaves.length === 0) {
      setConsoleLines(['Please upload the notes file from the admin first.']);
      return;
    }
    setConsoleLines((lines) => [...lines, 'Hashing note with SHA256...']);
    const noteHash = sha256(note);
    const index = leaves.indexOf(noteHash);
    if (index === -1) {
      setConsoleLines((lines) => [
        ...lines,
        'Note not found in Merkle leaves. Are you using the correct note?',
      ]);
      return;
    }
    setConsoleLines((lines) => [
      ...lines,
      `Found note at index ${index}. Generating Merkle proof...`,
    ]);
    const proof = getMerkleProof(leaves, index);
    setConsoleLines((lines) => [
      ...lines,
      `Merkle proof: [${proof.join(', ')}]`,
    ]);
    setConsoleLines((lines) => [
      ...lines,
      'Scaffolding ZK proof generation (replace with real Miden SDK logic)...',
    ]);
    // TODO: Integrate Miden SDK for real ZK proof and on-chain vote submission
    await new Promise((res) => setTimeout(res, 1200));
    setConsoleLines((lines) => [
      ...lines,
      `Vote (${vote.toUpperCase()}) submitted anonymously! (Demo)`,
    ]);
    setSubmitted(true);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Anonymous Voting
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Enter your secret note and select your vote. Your vote will be counted
        anonymously using a Merkle proof and (in a real app) a zero-knowledge
        proof.
      </Typography>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Button variant="outlined" component="label" sx={{ mb: 2 }}>
          Upload Notes File
          <input
            type="file"
            accept="application/json"
            hidden
            onChange={handleFileUpload}
          />
        </Button>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Your Secret Note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            disabled={submitted}
          />
          <RadioGroup
            row
            value={vote}
            onChange={(e) => setVote(e.target.value)}
            sx={{ mb: 2 }}
          >
            <FormControlLabel
              value="yes"
              control={<Radio />}
              label="Yes"
              disabled={submitted}
            />
            <FormControlLabel
              value="no"
              control={<Radio />}
              label="No"
              disabled={submitted}
            />
          </RadioGroup>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={submitted}
          >
            Submit Vote
          </Button>
        </form>
      </Paper>
      <ConsoleOutput lines={consoleLines} />
      {submitted && (
        <Paper sx={{ p: 2, mt: 2, background: '#222', color: '#fff' }}>
          <Typography variant="h6">
            Thank you for voting anonymously!
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default VotingPage;
