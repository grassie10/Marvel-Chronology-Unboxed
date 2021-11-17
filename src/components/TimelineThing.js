import React, { useState } from 'react';
import '../App.css';
import { setData } from '../firebase';

import {
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from '@mui/lab';

const TimelineThing = ({ movie, watchedData, userUID }) => {
  const [isClicked, setIsClicked] = useState(watchedData[movie.key]);

  const handleClick = () => {
    if (userUID !== '') {
      setData(`users/${userUID}/watched/${movie.key}`, !isClicked)
    }
    setIsClicked(!isClicked);
  };

  return (
    <TimelineItem>
      <TimelineOppositeContent>
        <img height='100px' src={movie.url} alt='marvel'></img>
      </TimelineOppositeContent>
      <TimelineSeparator>
        <div onClick={handleClick}>
          <TimelineDot
            color={isClicked ? 'success' : 'primary'}
            variant={isClicked ? 'filled' : 'outline'}
          />
        </div>
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>{movie.name}</TimelineContent>
    </TimelineItem>
  );
};

export default TimelineThing;
