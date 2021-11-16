import React, { useState } from "react";
import "./App.css";
import { useData } from "./firebase";

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

function App() {
  const [data, loading, error] = useData("/");

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error :(</h1>;
  console.log(data[0], "app js data");
  return (
    <div className="App">

<Timeline>
      {data.map((phase) => {
return (
        phase['movies'].map((movie) => (
              <TimelineItem>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                
                {movie.name}
                
                </TimelineContent>
            </TimelineItem> 
       ) )) } )}
</Timeline>
  

    </div>



  );
}

export default App;




