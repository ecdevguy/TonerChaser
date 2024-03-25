import React from 'react'
import Study from './components/Study'
import Challenge from './components/Challenge'
import List from './components/List'
import Settings from './components/Settings'
import Homescreen from './components/Homescreen'
import './App.css'

function App() {
  const [currentView, setCurrentView] = React.useState('home');

  const handleViewChange = (view) => {
    setCurrentView(view);
  };


  return (
    <div>
      {/* displays buttons to access parts of app */}
      {currentView === 'home' && (
        <Homescreen handleClick={handleViewChange}/>
      )}
      
      {currentView === 'study' && <Study />}
      {currentView === 'challenge' && <Challenge />}
      {currentView === 'list' && <List />}
      {currentView === 'settings' && <Settings />}
      
      {currentView !== 'home' && <button onClick={() => handleViewChange('home')}>Go Home</button>}

    </div>
    )
}

export default App
