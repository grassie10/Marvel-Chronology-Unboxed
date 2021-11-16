import React from 'react';
import './App.css';
import { useData } from './firebase';

import Timeline from '@mui/lab/Timeline';
import TimelineThing from './components/TimelineThing';
import NavBar from './components/NavBar';

function App() {
  const [data, loading, error] = useData('/movies');

  if (loading)
    return (
      <h1
        style={{
          textAlign: 'center',
          marginTop: '50',
        }}
      >
        Loading...
      </h1>
    );
  if (error) return <h1>Error :(</h1>;

  return (
    <div className='App'>
      <NavBar />
      <Timeline position='alternate'>
        {data.map((movie) => (
          <TimelineThing movie={movie} />
        ))}
      </Timeline>
    </div>
  );
}

export default App;
