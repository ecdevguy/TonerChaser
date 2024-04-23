import React, { useContext } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Study from './components/Study'
import Challenge from './components/Challenge'
import List from './components/List'
import Settings from './components/Settings'
import Homescreen from './components/Homescreen'
import Layout from './components/Layout'
import { tocflOne } from './vocabulary/tocfl-1'
import { tocflTwo } from './vocabulary/tocfl-2'
import { tocflThree } from './vocabulary/tocfl-3'
import { tocflFour } from './vocabulary/tocfl-4'
import './App.css'

export default function App() {
  React.useEffect(() => {
    localStorage.setItem("tocfl1", JSON.stringify(tocflOne))
    localStorage.setItem("tocfl2", JSON.stringify(tocflTwo))
    localStorage.setItem("tocfl3", JSON.stringify(tocflThree))
    localStorage.setItem("tocfl4", JSON.stringify(tocflFour))
  }, [])

  const [currentView, setCurrentView] = React.useState('home');
  

  const handleViewChange = (view) => {
    setCurrentView(view);
  };


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


    // <div>
    //   {/* displays buttons to access parts of app */}
    //   {currentView === 'home' && (
    //     <Homescreen handleClick={handleViewChange}/>
    //   )}

    //   {currentView !== 'home' && <button onClick={() => handleViewChange('home')}>Go Home</button>}
      
    //   {currentView === 'study' && <Study />}
    //   {currentView === 'challenge' && <Challenge />}
    //   {currentView === 'list' && <List />}
    //   {currentView === 'settings' && <Settings />}

    // </div>
    )
}


