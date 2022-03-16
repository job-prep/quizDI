import React from 'react';
// import { useSelector, useDispatch } from 'react-redux'
// import { showAnswer, nextFlashcard } from '../redux/reducer'

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

const TopicContainer = props => {
  // const { question, answer } =  useSelector((state => state.systemDesign.currentFlashcard))
  // const showAnswer =  useSelector((state => state.systemDesign.showAnswer))
  // const dispatch = useDispatch();

  return (
  // <div>
  //   <button
  //     label="Show Answer"
  //     onClick={() => dispatch(showAnswer())}>
  //     Show Answer 
  //   </button>
  //   <button
  //     label="Next Card"
  //     onClick={() => dispatch(nextFlastcard())}>
  //     Next Card
  //   </button>
  // </div>
    <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
    >
      <Toolbar>
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
      </Toolbar>
    </AppBar>
    <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
      No users for this project yet
    </Typography>
  </Paper>
  )
}

export default TopicContainer