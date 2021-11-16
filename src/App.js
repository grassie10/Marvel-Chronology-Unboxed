import React, { useState } from "react";
import "./App.css";
import { useData } from "./firebase";

function App() {

  const [data, loading, error] = useData("/");

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error :(</h1>;

  return (
    <div className="App">

    </div>
  );
}

export default App;
