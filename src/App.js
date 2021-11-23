import React, { useState } from "react";
import "./App.css";
import { useData, setData, getUID, useUserState } from "./firebase";

import Timeline from "@mui/lab/Timeline";
import TimelineThing from "./components/TimelineThing";
import NavBar from "./components/NavBar";

function App() {
  const [data, loading, error] = useData("/");
  const [user] = useUserState();
  const [order, setOrder] = useState("release");
  var watchedData = {};
  var userUID = "";
  var notesTaken = {};
  var ratings = {};

  if (loading)
    return (
      <h1
        style={{
          textAlign: "center",
          marginTop: "50",
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
      notesTaken = data.users[userUID]["notes"];
      watchedData = data.users[userUID]["watched"];
      ratings = data.users[userUID]["ratings"];
    } else {
      data.movies.forEach((movie) => {
        watchedData[movie.key] = false;
        notesTaken[movie.key] = "Enter thoughts here.";
        ratings[movie.key] = 0;
      });

      setData(`users/${userUID}/watched`, watchedData);
      setData(`users/${userUID}/notes`, notesTaken);
      setData(`users/${userUID}/ratings`, ratings);
    }
  } else {
    // Set data to all false if no user
    data.movies.forEach(function (movie) {
      watchedData[movie.key] = false;
      notesTaken[movie.key] = "Enter thoughts here.";
      ratings[movie.key] = 0;
    });
  }

  var orderedMovies = Array(data.movies.length);
  data.movies.forEach(function (movie) {
    orderedMovies[movie.order - 1] = movie;
  });

  return (
    <div className="App">
      <NavBar order={order} setOrder={setOrder} />
      <Timeline position="alternate">
        {order === "release" &&
          data.movies.map((movie, index) => (
            <TimelineThing
              movie={movie}
              ratings={ratings}
              watchedData={watchedData}
              notesTaken={notesTaken}
              userUID={userUID}
              key={index}
            />
          ))}
        {order === "chrono" &&
          orderedMovies.map((movie, index) => (
            <TimelineThing
              ratings={ratings}
              movie={movie}
              watchedData={watchedData}
              notesTaken={notesTaken}
              userUID={userUID}
              key={index}
            />
          ))}
      </Timeline>
    </div>
  );
}

export default App;
