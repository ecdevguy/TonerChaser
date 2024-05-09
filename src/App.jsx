import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
import { tocflFive } from './vocabulary/tocfl-5'
import { tocflSix } from './vocabulary/tocfl-6'
import { tocflSeven } from './vocabulary/tocfl-7'
import './App.css'

export default function App() {

  React.useEffect(() => {
    // Check if localStorage has the items before setting them
    if (!localStorage.getItem("tocfl1")) {
        localStorage.setItem("tocfl1", JSON.stringify(tocflOne));
    }
    if (!localStorage.getItem("tocfl2")) {
        localStorage.setItem("tocfl2", JSON.stringify(tocflTwo));
    }
    if (!localStorage.getItem("tocfl3")) {
        localStorage.setItem("tocfl3", JSON.stringify(tocflThree));
    }
    if (!localStorage.getItem("tocfl4")) {
        localStorage.setItem("tocfl4", JSON.stringify(tocflFour));
    }
    if (!localStorage.getItem("tocfl5")) {
        localStorage.setItem("tocfl5", JSON.stringify(tocflFive));
    }
    if (!localStorage.getItem("tocfl6")) {
        localStorage.setItem("tocfl6", JSON.stringify(tocflSix));
    }
    if (!localStorage.getItem("tocfl7")) {
        localStorage.setItem("tocfl7", JSON.stringify(tocflSeven));
    }
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


