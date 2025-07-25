import React from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Tooltip,
  Link as MuiLink,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

/**
 * ConsoleOutput - A CLI-style output box for displaying SDK/ZK operations.
 * @param {string[]} lines - Array of output lines to display.
 * @param {string[]} txHashes - Array of transaction hashes to display as links.
 */
const MIDENSCAN_URL = 'https://testnet.midenscan.com/';

const ConsoleOutput = ({ lines = [], txHashes = [] }) => {
  // Copy all output lines to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(lines.join('\n'));
  };

  return (
    <Paper
      elevation={3}
      sx={{
        background: 'rgba(24, 24, 32, 0.95)',
        color: '#00FF00',
        p: 2,
        mt: 2,
        fontFamily: 'JetBrains Mono, Fira Mono, monospace',
        minHeight: 120,
        position: 'relative',
        overflow: 'auto',
        border: '1.5px solid #222',
        boxShadow: '0 4px 24px 0 rgba(0,0,0,0.18)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Typography variant="subtitle2" sx={{ color: '#fff', flexGrow: 1 }}>
          Console Output
        </Typography>
        <Tooltip title="Copy output">
          <IconButton size="small" onClick={handleCopy} sx={{ color: '#fff' }}>
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
      <Box
        component="pre"
        sx={{
          m: 0,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          fontSize: 15,
        }}
      >
        {lines.length === 0 ? (
          <span style={{ color: '#888' }}>No output yet.</span>
        ) : (
          lines.map((line, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
              <span>{line}</span>
              {i === lines.length - 1 && (
                <span className="blinking-cursor">&#9608;</span>
              )}
            </div>
          ))
        )}
      </Box>
      {txHashes.length > 0 && (
        <Box
          sx={{
            mt: 2,
            background: 'rgba(0,0,0,0.18)',
            p: 1.5,
            borderRadius: 2,
          }}
        >
          <Typography variant="subtitle2" sx={{ color: '#fff', mb: 1 }}>
            Transaction Links
          </Typography>
          {txHashes.map((hash, i) => (
            <MuiLink
              key={hash}
              href={`${MIDENSCAN_URL}tx/${hash}`}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: '#00bcd4', fontSize: 14, display: 'block', mb: 0.5 }}
            >
              {hash}
            </MuiLink>
          ))}
        </Box>
      )}
      <style>{`
        .blinking-cursor {
          margin-left: 4px;
          animation: blink 1s steps(1) infinite;
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </Paper>
  );
};

export default ConsoleOutput;
