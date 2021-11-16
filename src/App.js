import React, { useState } from "react";
import "./App.css";
import { useData } from "./firebase";
import Timeline from "./Timeline";

function App() {
  const [data, loading, error] = useData("/");

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error :(</h1>;
  console.log(data[0], "app js data");
  return (
    <div className="App">
      {data.map((phase) => (
        <div>{phase.name}</div>
      ))}

      <Timeline data={data} />
    </div>
  );
}

export default App;
