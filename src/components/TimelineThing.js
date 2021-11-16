import React, { useState } from 'react';
import '../App.css';

import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

const TimelineThing = ({ movie }) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <TimelineItem>
      <TimelineOppositeContent>
        <img height='100px' src={movie.url} alt='marvel'></img>
      </TimelineOppositeContent>
      <TimelineSeparator>
        <div onClick={() => setIsClicked(!isClicked)}>
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
