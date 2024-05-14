import React, {useEffect, useState} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Study from './components/Study'
import Challenge from './components/Challenge'
import List from './components/List'
import Settings from './components/Settings'
import Homescreen from './components/Homescreen'
import Layout from './components/Layout'

import db from './firebase';
import { collection, getDocs } from "firebase/firestore";
import './App.css'

export default function App() {
  const [vocabData, setVocabData] = useState({});
  
  useEffect(() => {
    const fetchData = async () => {
      const levelKeys = ['TOCFL1', 'TOCFL2', 'TOCFL3', 'TOCFL4', 'TOCFL5', 'TOCFL6', 'TOCFL7'];
      const vocabData = {};
      const expiryDuration = 24 * 60 * 60 * 1000; // 24 hours

      for (const levelKey of levelKeys) {
        const cachedData = localStorage.getItem(levelKey);
        const lastFetch = localStorage.getItem(`${levelKey}_timestamp`);
    
        if (cachedData && lastFetch && (Date.now() - lastFetch < expiryDuration)) {
          vocabData[levelKey.toLowerCase()] = JSON.parse(cachedData);
        } else {
          const querySnapshot = await getDocs(collection(db, levelKey));
          const data = querySnapshot.docs.map(doc => doc.data());
          localStorage.setItem(levelKey, JSON.stringify(data));
          localStorage.setItem(`${levelKey}_timestamp`, Date.now().toString());
          vocabData[levelKey.toLowerCase()] = data;
        }
      }
  
      setVocabData(vocabData);
    };
  
    fetchData();
  }, []);

  



  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homescreen />} />
          <Route path="study" element={<Study />} />
          <Route path="challenge" element={<Challenge />} />
          <Route path="list" element={<List />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
    )
}


