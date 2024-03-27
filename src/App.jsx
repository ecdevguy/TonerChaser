import React from 'react'
import Study from './components/Study'
import Challenge from './components/Challenge'
import List from './components/List'
import Settings from './components/Settings'
import Homescreen from './components/Homescreen'
import SettingsProvider from './context/SettingsProvider'
import { tocflOne } from './vocabulary/tocfl-1'
import './App.css'

export default function App() {
  const [currentView, setCurrentView] = React.useState('home');
  const [vocab, setVocab] = React.useState(() => JSON.parse(localStorage.getItem("tocfl")) || tocflOne)
  const [currentCharacter, setCurrentCharacter] = React.useState()
  const [index, setIndex] = React.useState(0);
  // const [userSettings, setUserSettings] = React.useState({
  //   audio: false,
  //   darkMode: false,
  //   level: {
  //     tocfl1: true,
  //     tocfl2: false,
  //     tocfl3: false
  //   }
  // })
  
  //ADD SETTINGS 'VOCAB LIST' LIGHT/DARK, RANDOM OR IN ORDER, TOGGLE AUDIO

  const increaseIndex = () => {
    setIndex(prevIndex => (prevIndex + 1) % vocab.length);
  };

  const decreaseIndex = () => {
    setIndex(prevIndex => (prevIndex - 1 + vocab.length) % vocab.length);
  };

  React.useEffect(() => {
    setCurrentCharacter(vocab[index]);
  }, [index, vocab]);


  React.useEffect(() => {
    localStorage.setItem("tocfl", JSON.stringify(tocflOne))
  }, [])
  
  const handleViewChange = (view) => {
    setCurrentView(view);
  };


  return (
    <SettingsProvider>
    <div>
      {/* displays buttons to access parts of app */}
      {currentView === 'home' && (
        <Homescreen handleClick={handleViewChange}/>
      )}

      {currentView !== 'home' && <button onClick={() => handleViewChange('home')}>Go Home</button>}
      
      {currentView === 'study' && <Study currentCharacter={currentCharacter} handlePrevious={decreaseIndex} handleNext={increaseIndex}/>}
      {currentView === 'challenge' && <Challenge />}
      {currentView === 'list' && <List currentVocab={vocab}/>}
      {currentView === 'settings' && <Settings />}

    </div>
    </SettingsProvider>
    )
}
