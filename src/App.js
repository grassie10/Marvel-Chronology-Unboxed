import React from 'react';
import './App.css';
import { useData } from './firebase';

import Timeline from '@mui/lab/Timeline';
import TimelineThing from './components/TimelineThing';

function App() {
  const [data, loading, error] = useData('/');

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error :(</h1>;

  return (
    <div className='App'>
      <Timeline position='alternate'>
        {data.map((phase) => {
          return phase['movies'].map((movie) => (
            <TimelineThing movie={movie} />
          ));
        })}
      </Timeline>
    </div>
  );
}

export default App;
