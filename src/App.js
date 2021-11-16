import React from 'react';
import './App.css';
import { useData, setData, getUID, useUserState } from './firebase';

import Timeline from '@mui/lab/Timeline';
import TimelineThing from './components/TimelineThing';
import NavBar from './components/NavBar';

function App() {
  const [data, loading, error] = useData('/');
  const [user] = useUserState();
  var watchedData = {};
  var userUID = '';

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

  // If a user is signed in
  if (user) {
    // Get there uid
    userUID = getUID();

    // Get there watched data or set it to all false
    if (data.users[userUID]) {
      watchedData = data.users[userUID]['watched'];
    } else {
      data.movies.forEach(function (movie) {
        watchedData[movie.key] = false;
      });
      setData(`users/${userUID}/watched`, watchedData);
    }
  } else {
    // Set data to all false if no user
    data.movies.forEach(function (movie) {
      watchedData[movie.key] = false;
    });
  }

  console.log(watchedData);

  return (
    <div className='App'>
      <NavBar />
      <Timeline position='alternate'>
        {data.movies.map((movie, index) => (
          <TimelineThing
            movie={movie}
            watchedData={watchedData}
            userUID={userUID}
            key={index}
          />
        ))}
      </Timeline>
    </div>
  );
}

export default App;
