import React from 'react'
import Study from './components/Study'
import Challenge from './components/Challenge'
import List from './components/List'
import Settings from './components/Settings'
import Homescreen from './components/Homescreen'
import { tocflOne } from './vocabulary/tocfl-1'
// import './App.css'

function App() {
  const [currentView, setCurrentView] = React.useState('home');
  const [vocab, setVocab] = React.useState(() => JSON.parse(localStorage.getItem("tocfl")) || tocflOne)
  const [currentCharacter, setCurrentCharacter] = React.useState()
  const [index, setIndex] = React.useState(0);

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

export default App
