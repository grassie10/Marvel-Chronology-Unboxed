import { initializeApp } from "firebase/app";
import { useState, useEffect } from "react";
import { getDatabase, onValue, ref } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBZYg3LHXvlnoDZAbw1kMW20DvoGg29b-U",
    authDomain: "marvel-chronology-unboxed.firebaseapp.com",
    databaseURL: "https://marvel-chronology-unboxed-default-rtdb.firebaseio.com",
    projectId: "marvel-chronology-unboxed",
    storageBucket: "marvel-chronology-unboxed.appspot.com",
    messagingSenderId: "838709761150",
    appId: "1:838709761150:web:e175ed41cb8a35c977742f",
    measurementId: "G-V3XJL6ZDYV"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useData = (path, transform) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const dbRef = ref(database, path);
    const devMode =
      !process.env.NODE_ENV || process.env.NODE_ENV === "development";
    if (devMode) {
      console.log(`loading ${path}`);
    }
    return onValue(
      dbRef,
      (snapshot) => {
        const val = snapshot.val();
        if (devMode) {
          console.log(val);
        }
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      },
      (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      }
    );
  }, [path, transform]);

  return [data, loading, error];
};