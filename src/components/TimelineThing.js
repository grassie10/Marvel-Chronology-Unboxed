import React, { useState } from 'react';
import '../App.css';
import { setData } from '../firebase';
import { Dialog, DialogTitle, TextField, Button, Typography, Rating } from '@mui/material';
import {
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from '@mui/lab';

const TimelineThing = ({ movie, watchedData, userUID }) => {
  const [isWatched, setIsWatched] = useState(watchedData[movie.key]);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("Enter your thoughts here");
  const [rating, setRating] = useState(0);

  const toggleMovieWatched = () => {
    if (userUID !== '') {
      setData(`users/${userUID}/watched/${movie.key}`, !isWatched)
    }
    setIsWatched(!isWatched);
  };

  const handleDialog = () => {
    setOpen(!open);
  };

  return (
    <div>
      <TimelineItem>
        <div onClick={handleDialog}>
          <TimelineOppositeContent>
            <img height='100px' src={movie.url} alt='marvel'></img>
          </TimelineOppositeContent>
        </div>
        <TimelineSeparator>
          <div onClick={toggleMovieWatched}>
            <TimelineDot
              color={isWatched ? 'success' : 'primary'}
              variant={isWatched ? 'filled' : 'outline'}
            />
          </div>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>{movie.name}</TimelineContent>
      
      </TimelineItem>
      
      <Dialog onClose={handleDialog} open={open}>
      <Typography component="legend">Rating</Typography>
<Rating
  name="simple-controlled"
  value={rating}
  onChange={(event, newValue) => {
    setRating(newValue);
  }}
/>
        <DialogTitle>What are your thoughts on {movie.name}?</DialogTitle>
        
        <TextField
          id="standard-multiline-static"
          multiline
          rows={4}
          value={text}
          variant="standard"
          onChange={(e) => setText(e.target.value)}
        />
        <Button variant="outlined" onClick={handleDialog}>Submit</Button>
      </Dialog>
    </div>
  );
};

export default TimelineThing;
