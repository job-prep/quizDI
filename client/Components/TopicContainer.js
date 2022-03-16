import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { submitFlashcard, submitNote } from '../redux/reducer'

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
import { ListItem } from '@mui/material';
import { ListItemText } from '@mui/material';
import { Avatar } from '@mui/material';

const TopicContainer = props => {
  // const currentTopic =  useSelector((state => state.systemDesign.currentTopic))
  const currentTopic = 'Twitter';
  // const notes =  useSelector((state => state.systemDesign.notes))
  const notes = [{
                  note: 'Design twitter', 
                  _id: 1,
                  topic: 'Twitter',
                  created_at: 1647455146
                },
                {
                  note: 'That is twitter', 
                  _id: 2,
                  topic: 'Twitter',
                  created_at: 1647455273
                }];
  // const flashcards =  useSelector((state => state.systemDesign.flashcards))
  const flashcards = [{
                  question: 'twitter', 
                  answer: 'is cool', 
                  _id: 1,
                  topic: 'Twitter',
                  created_at: 1647455263
                },
                {
                  question: 'twitter', 
                  answer: 'is fast', 
                  _id: 2,
                  topic: 'Twitter',
                  created_at: 1647455269
                }];
  // const dispatch = useDispatch();

  const generateOverview = (notes, flashcards, currTopic) => {
    const filteredNotes = notes.filter(note => note.topic === currTopic);
    const filteredFCs = flashcards.filter(fc => fc.topic === currTopic);
    const sortedDoc = filteredNotes.concat(filteredFCs).sort((a, b) => {
      return a.created_at - b.created_at;
    })
    let overview = [];
    sortedDoc.forEach(el => {
      if (el.note) overview.push(el.note);
    else return overview.push(el.question.concat(' ', el.answer));
    })
    return overview;
  }



  return (
    <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
    >
      <Toolbar>
        <Grid container spacing={2} alignItems="center">
          <Avatar variant="rounded">
            Q
          </Avatar>
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
            {/* <Tooltip title="Reload">
              <IconButton>
                <RefreshIcon color="inherit" sx={{ display: 'block' }} />
              </IconButton>
            </Tooltip> */}
          </Grid>
        </Grid>
      </Toolbar>
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
              Add Note
            </Button>
            {/* <Tooltip title="Reload">
              <IconButton>
                <RefreshIcon color="inherit" sx={{ display: 'block' }} />
              </IconButton>
            </Tooltip> */}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
    {generateOverview(notes, flashcards, currentTopic).map(el => {
      return (<Typography sx={{ my: 1, mx: 2 }} color="text.secondary" align="center">
        {el}
     </Typography>)
    })}
  </Paper>
  )
}

export default TopicContainer