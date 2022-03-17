import React from 'react';
import { useDispatch } from 'react-redux'
import { showFlashcards } from '../redux/reducer'
import Button from '@mui/material/Button';
const TopicButton = (props) => {
  const dispatch = useDispatch();
  // const lightColor = 'rgba(255, 255, 255, 0.7)';

  return (
    <div id="backToTopic-button">
      <Button
        sx={{ borderColor: props.lightColor }}
        variant="outlined"
        color="inherit"
        size="small"
        label="Back To Topic"
        onClick={() => dispatch(showFlashcards())}
      >
        Flashcards
      </Button>
    </div>
  )
}

export default TopicButton