import React from 'react';
import { useDispatch } from 'react-redux'
import { showFlashcards } from '../redux/reducer'

import Button from '@mui/material/Button';
const FlashCardButton = props => {
  const dispatch = useDispatch();

  return (
    <div id="flashCard-button">
      <Button
        sx={{ borderColor: props.lightColor }}
        variant="outlined"
        color="inherit"
        size="small"
        label="Back To Topic"
        onClick={() => dispatch(showFlashcards())}
      >
        Back to Topic
      </Button>
    </div>
  )
}

export default FlashCardButton