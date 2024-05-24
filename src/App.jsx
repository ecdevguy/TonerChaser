import React, {useEffect, useState, useContext} from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Study from './components/Study'
import Challenge from './components/Challenge'
import List from './components/List'
import Settings from './components/Settings'
// import Homescreen from './components/Homescreen'
import Layout from './components/Layout'
import SettingsContext from './context/settingsContext';
import db from './firebase';
import { doc, getDoc } from "firebase/firestore";
import './App.css'
import { ThemeProvider, createTheme } from '@mui/material'

export default function App() {
  const [mode, setMode] = useState("light");
  const { userSettings, setUserSettings } = useContext(SettingsContext);

  const toggleDarkModeSetting = () => {
    setUserSettings(prevSettings => ({
        ...prevSettings,
        darkMode: prevSettings.darkMode === "light" ? "dark" : "light"
    }));
};
  const darkTheme = createTheme({
    palette:{
      mode: userSettings.darkMode
    }
  })
  
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
    <ThemeProvider theme={darkTheme}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout mode={userSettings.darkMode} setMode={toggleDarkModeSetting}/>}>
            {/* <Route index element={<Homescreen />} /> */}
            <Route  index element={<Study fetchTocfl={fetchVocabData} loading={loading}/>} />
            <Route  path="challenge" element={<Challenge />} />
            <Route  path="search" element={<List fetchTocfl={fetchVocabData} loading={loading}/>} />
            <Route  path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </HashRouter>
    </ThemeProvider>
    )
}


