import React, { useState } from 'react';
import { Box, Button, Typography, TextField, Paper } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { sha256 } from 'js-sha256';
import ConsoleOutput from './ConsoleOutput';

/**
 * Utility to build a Merkle tree and return the root and proofs.
 * For simplicity, this is a minimal implementation for demo/teaching.
 */
function buildMerkleTree(hashes) {
  let level = hashes.slice();
  const tree = [level];
  while (level.length > 1) {
    const nextLevel = [];
    for (let i = 0; i < level.length; i += 2) {
      if (i + 1 < level.length) {
        nextLevel.push(sha256(level[i] + level[i + 1]));
      } else {
        nextLevel.push(sha256(level[i] + level[i]));
      }
    }
    tree.unshift(nextLevel);
    level = nextLevel;
  }
  return { root: level[0], tree };
}

/**
 * AdminPage - For generating voting notes, note hashes, and Merkle root.
 * Only the admin can access this page.
 */
const AdminPage = () => {
  const [numNotes, setNumNotes] = useState(5); // Default to 5 notes
  const [notes, setNotes] = useState([]);
  const [noteHashes, setNoteHashes] = useState([]);
  const [merkleRoot, setMerkleRoot] = useState('');
  const [consoleLines, setConsoleLines] = useState([]);

  // Handler for generating notes and Merkle root
  const handleGenerate = () => {
    setConsoleLines([]);
    const newNotes = Array.from({ length: numNotes }, () => uuidv4());
    setConsoleLines((lines) => [
      ...lines,
      `Generated ${numNotes} random notes.`,
    ]);
    const hashes = newNotes.map((n) => sha256(n));
    setConsoleLines((lines) => [...lines, 'Hashed all notes with SHA256.']);
    const { root } = buildMerkleTree(hashes);
    setConsoleLines((lines) => [
      ...lines,
      `Built Merkle tree. Merkle root: ${root}`,
    ]);
    setNotes(newNotes);
    setNoteHashes(hashes);
    setMerkleRoot(root);
  };

  // Handler for downloading notes as JSON
  const handleDownload = () => {
    const data = JSON.stringify({ notes, noteHashes, merkleRoot }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'voting_notes.json';
    a.click();
    URL.revokeObjectURL(url);
    setConsoleLines((lines) => [
      ...lines,
      'Downloaded notes as voting_notes.json.',
    ]);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin: Generate Voting Notes
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Enter the number of voting notes to generate. Each note is a unique,
        secret code for a voter. The Merkle root is used for anonymous
        eligibility proofs.
      </Typography>
      <Paper sx={{ p: 2, mb: 2 }}>
        <TextField
          label="Number of Notes"
          type="number"
          value={numNotes}
          onChange={(e) => setNumNotes(Number(e.target.value))}
          inputProps={{ min: 1, max: 100 }}
          sx={{ mr: 2, width: 160 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleGenerate}
          sx={{ mr: 2 }}
        >
          Generate Notes
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleDownload}
          disabled={notes.length === 0}
        >
          Download Notes
        </Button>
      </Paper>
      {merkleRoot && (
        <Paper sx={{ p: 2, mb: 2, background: '#222', color: '#fff' }}>
          <Typography variant="subtitle1">Merkle Root</Typography>
          <Box sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>
            {merkleRoot}
          </Box>
        </Paper>
      )}
      <ConsoleOutput lines={consoleLines} />
      {notes.length > 0 && (
        <Paper sx={{ p: 2, mt: 2 }}>
          <Typography variant="subtitle2">
            First {numNotes} Notes (for demo):
          </Typography>
          <ul style={{ fontFamily: 'monospace', fontSize: 14 }}>
            {notes.slice(0, 5).map((n, i) => (
              <li key={i}>{n}</li>
            ))}
          </ul>
        </Paper>
      )}
    </Box>
  );
};

export default AdminPage;
