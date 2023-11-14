import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Item from '@mui/material/Box';

const HomeScreen = ({ onStart }) => {
  const [showInstructions, setShowInstructions] = useState(false);

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  return (
    <Container className="page-container"> 
      <Box className="content-container">
        <Stack spacing={2}>
          <Typography variant='h3'>Ezy Subs</Typography>
            <button onClick={onStart} className="start-button">
              Start Game
            </button>
            <Link onClick={toggleInstructions}>
              Instructions
            </Link>
          {showInstructions && (
            <>
              <Typography variant='h4'>How To</Typography>

              <Box sx={{ maxHeight:300, overflow: 'auto'}}>
                <Stack spacing={2}>
                  <Item>
                    <Typography align='left' variant='h5'>Number of Players Screen</Typography>
                    <Typography align='left'>1. Enter the number of players on your team.</Typography>
                    <Typography align='left'>2. Click the "Next" button.</Typography>
                  </Item>

                  <Item>
                    <Typography align='left' variant='h5'>Player Input Screen</Typography>
                    <Typography align='left'>1. Enter player names and select their sizes.</Typography>
                    <Typography align='left'>2. Click the "Next" button.</Typography>
                  </Item>

                  <Item>
                    <Typography align='left' variant='h5'>Substitution Setup</Typography>
                    <Typography align='left'>1. Enter the desired "Minutes per Half".</Typography>
                    <Typography align='left'>2. Specify the "Number of players per substitution".</Typography>
                    <Typography align='left'>3. Click the "Next" button.</Typography>
                  </Item>

                  <Item>
                    <Typography align='left' variant='h5'>Game Information Screen</Typography>
                    <Typography align='left'>1. Click the "Start Game" button to initiate the game timer.</Typography>
                    <Typography align='left'>2. During the game, you can "Restart" the timer if needed.</Typography>
                    <Typography align='left'>3. Click the "Select Subs" button to select the number of substitutions specified from the bench.</Typography>
                    <Typography align='left'>4. Click "Update Subs" to perform the substitutions.</Typography>
                    <Typography align='left'>5. Under players on court, click the player name for emergency substitutions (e.g., injury).</Typography>
                    <Typography align='left'>6. Once the player is on the bench, click the pause button to exclude them from being selected.</Typography>
                    <Typography align='left'>7. Press the play button next to their name to include them back into substitutions.</Typography>
                    <Typography align='left'>8. More than one player can be paused on the bench.</Typography>
                    <Typography align='left'>9. Single substitutions can be done by clicking the player name on the court at any time and not paused.</Typography>
                  </Item>
                </Stack>
              </Box>
            </>
          )}
        </Stack>
      </Box>
    </Container>
  );
};

export default HomeScreen;






