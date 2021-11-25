import React, { useState } from "react";
import "../App.css";
import { setData } from "../firebase";
import {
  Dialog,
  DialogTitle,
  TextField,
  Button,
  Typography,
  Rating,
} from "@mui/material";
import {
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from "@mui/lab";

const TimelineThing = ({
  movie,
  watchedData,
  userUID,
  notesTaken,
  ratings,
  index,
}) => {
  const [isWatched, setIsWatched] = useState(watchedData[movie.key]);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState(notesTaken[movie.key]);
  const [rating, setRating] = useState(ratings[movie.key]);

  const toggleMovieWatched = () => {
    if (userUID !== "") {
      setData(`users/${userUID}/watched/${movie.key}`, !isWatched);
    }
    setIsWatched(!isWatched);
  };

  const handleDialog = () => {
    setOpen(!open);
  };

  const handleDataSet = () => {
    if (userUID !== "") {
      setData(`users/${userUID}/notes/${movie.key}`, text);
    }
  };

  const handleRating = (value) => {
    if (userUID !== "") {
      setData(`users/${userUID}/ratings/${movie.key}`, value);
    }
    setRating(value);
  };

  return (
    <div>
      <TimelineItem index={index}>
        <div onClick={handleDialog}>
          <TimelineOppositeContent data-cy="opposite-content">
            <img
              data-cy={`movie-image${index}`}
              height="100px"
              src={movie.url}
              alt="marvel"
            ></img>
          </TimelineOppositeContent>
        </div>
        <TimelineSeparator>
          <div onClick={toggleMovieWatched}>
            <TimelineDot
              color={isWatched ? "success" : "primary"}
              variant={isWatched ? "filled" : "outline"}
            />
          </div>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>{movie.name}</TimelineContent>
      </TimelineItem>

      <Dialog data-cy="review-modal" onClose={handleDialog} open={open}>
        <Typography component="legend">Rating</Typography>
        <Rating
          name="simple-controlled"
          value={rating}
          onChange={(event, newValue) => {
            console.log(newValue);
            handleRating(newValue);
          }}
        />
        <DialogTitle>What are your thoughts on {movie.name}?</DialogTitle>

        <TextField
          data-cy="review-input"
          id="standard-multiline-static"
          multiline
          rows={4}
          value={text}
          variant="standard"
          onChange={(e) => setText(e.target.value)}
        />
        <Button
          variant="outlined"
          data-cy="submit"
          onClick={() => {
            handleDialog();
            handleDataSet();
          }}
        >
          Submit
        </Button>
      </Dialog>
    </div>
  );
};

export default TimelineThing;
