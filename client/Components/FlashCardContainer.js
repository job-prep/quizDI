import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { showAnswer, nextFlashcard } from '../redux/reducer'

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';


const FlashCardContainer = props => {
  // const currentFlashcard = {question: 'To account for hot users, ', answer: 'use load balancers'};
  // const showAnswer = true;
  const currentFlashcard = useSelector(state => state.systemDesign.currentFlashcard);
  const showAnswers =  useSelector(state => state.systemDesign.showAnswerBool);
  const dispatch = useDispatch();

  return (
    <Paper sx={{ maxWidth: 936, height: 500, margin: 'auto', overflow: 'hidden' }}>
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
    >
      {/* <Toolbar>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <SearchIcon color="inherit" sx={{ display: 'block' }} />
          </Grid>
          <Grid item xs>
            <TextField
              fullWidth
              placeholder="Search by email address, phone number, or user UID"
              InputProps={{
                disableUnderline: true,
                sx: { fontSize: 'default' },
              }}
              variant="standard"
            />
          </Grid>
          <Grid item>
            <Button variant="contained" sx={{ mr: 1 }}>
              Add user
            </Button>
            <Tooltip title="Reload">
              <IconButton>
                <RefreshIcon color="inherit" sx={{ display: 'block' }} />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Toolbar> */}
    </AppBar>
    <Typography sx={{ my: 20, mx: 2 }} color="text.secondary" align="center">
      {showAnswers ? currentFlashcard.answer : currentFlashcard.question}
    </Typography>
        <Button
        sx={{margin:5}}
        variant="contained"
        color="inherit"
        size="medium"
        align="center"
        onClick={() => dispatch(showAnswer())}
        >
        Show Answer
        </Button>

        <Button
        variant="contained"
        color="inherit"
        size="medium"
        align="center"
        onClick={() => dispatch(nextFlashcard())}
        >
        Next Card
        </Button>
  </Paper>
  )
}

export default FlashCardContainer