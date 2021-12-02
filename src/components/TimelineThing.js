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

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

const TimelineThing = ({
  movie,
  watchedData,
  userUID,
  notesTaken,
  ratings,
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
    var blinking = document.getElementById("myDIV");
    blinking.style.display = "none";
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
      <TimelineItem>
        <div onClick={handleDialog}>
          <TimelineOppositeContent>
            <div className="imageBox">
              <img
                height="120px"
                width="80px"
                src={movie.url}
                alt="marvel"
              ></img>
            </div>
          </TimelineOppositeContent>
        </div>
        <TimelineSeparator>
          <div onClick={toggleMovieWatched}>
            <TimelineDot>
              {isWatched ? (
                <CheckCircleIcon
                  fontSize="small"
                  color={isWatched ? "success" : "primary"}
                  variant={isWatched ? "filled" : "outline"}
                />
              ) : (
                <RadioButtonUncheckedIcon fontSize="small" />
              )}
            </TimelineDot>
          </div>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span">
            <div className="movietitle">{movie.name}</div>
          </Typography>
          <Typography>
            <div className="movietitle">{movie.year}</div>
          </Typography>
        </TimelineContent>
      </TimelineItem>

      <Dialog onClose={handleDialog} open={open}>
        <Typography component="legend">Rating</Typography>
        <Rating
          name="simple-controlled"
          value={rating}
          onChange={(event, newValue) => {
            console.log(newValue);
            handleRating(newValue);
          }}
        />
        <a href={movie.imdb}>Visit IMDB page for this movie!</a>

        <DialogTitle>What are your thoughts on {movie.name}?</DialogTitle>
        <TextField
          id="standard-multiline-static"
          multiline
          rows={4}
          value={text}
          variant="standard"
          onChange={(e) => setText(e.target.value)}
        />
        <Button
          variant="outlined"
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
