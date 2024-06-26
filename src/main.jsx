import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import SettingsProvider from './context/SettingsProvider'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SettingsProvider>
      <App />
    </SettingsProvider>
  </React.StrictMode>
)
