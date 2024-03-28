import React, { useContext } from 'react'
import Study from './components/Study'
import Challenge from './components/Challenge'
import List from './components/List'
import Settings from './components/Settings'
import Homescreen from './components/Homescreen'
import SettingsContext from './context/settingsContext'
import { tocflOne } from './vocabulary/tocfl-1'
import { tocflTwo } from './vocabulary/tocfl-2'
import { tocflThree } from './vocabulary/tocfl-3'
import './App.css'

export default function App() {
  const [currentView, setCurrentView] = React.useState('home');
  const [vocab, setVocab] = React.useState(() => JSON.parse(localStorage.getItem("tocfl1")) || tocflOne)
  const [currentCharacter, setCurrentCharacter] = React.useState()
  const [index, setIndex] = React.useState(0);
  const { userSettings } = useContext(SettingsContext);

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
    localStorage.setItem("tocfl1", JSON.stringify(tocflOne))
    localStorage.setItem("tocfl2", JSON.stringify(tocflTwo))
    localStorage.setItem("tocfl3", JSON.stringify(tocflThree))
  }, [])

  React.useEffect(() => {
    const levels = ['tocfl1', 'tocfl2', 'tocfl3'];
    const selectedLevelKey = levels.find(level => userSettings[level]) || 'tocfl1';
    
    const storedVocab = localStorage.getItem(selectedLevelKey);
    const vocabList = storedVocab ? JSON.parse(storedVocab) : [];

    setVocab(vocabList);
}, [userSettings]);

  const handleViewChange = (view) => {
    setCurrentView(view);
  };


  return (
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
    )
}
