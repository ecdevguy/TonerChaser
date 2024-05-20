import React, {useEffect, useState} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Study from './components/Study'
import Challenge from './components/Challenge'
import List from './components/List'
import Settings from './components/Settings'
import Homescreen from './components/Homescreen'
import Layout from './components/Layout'

import db from './firebase';
import { doc, getDoc } from "firebase/firestore";
import './App.css'

export default function App() {
  const expiryDuration = 24 * 60 * 60 * 1000; // 24 hours
  const [loading, setLoading] = React.useState(false);
  const fetchVocabData = async (levelKey) => {
    const cachedData = localStorage.getItem(levelKey);
    const lastFetch = localStorage.getItem(`${levelKey}_timestamp`);
    
    if (cachedData && lastFetch && (Date.now() - lastFetch < expiryDuration)) {
      console.log(`Using cached data for ${levelKey}`);
    } 
    else {
      console.log(`Fetching data for ${levelKey} from Firestore`);
      setLoading(true);
      const docRef = doc(db, "VocabLevels", levelKey);  // Adjust path to match your Firestore setup
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data().vocabItems;  // Assuming 'vocabItems' holds the array of vocab
        localStorage.setItem(levelKey, JSON.stringify(data));
        localStorage.setItem(`${levelKey}_timestamp`, Date.now().toString());

      } 
      else {
          console.log("No such document!");
      }
      setLoading(false);
    }
  }
  // React.useEffect(() => {
  //   fetchVocabData("TOCFL1")
  // }, []);
  
  
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homescreen />} />
          <Route path="study" element={<Study fetchTocfl={fetchVocabData} loading={loading}/>} />
          <Route path="challenge" element={<Challenge />} />
          <Route path="list" element={<List fetchTocfl={fetchVocabData} loading={loading}/>} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
    )
}


