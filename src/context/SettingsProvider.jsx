import React, { useState } from 'react';
import SettingsContext from './settingsContext'; 

export default function SettingsProvider({ children }) {
    const [userSettings, setUserSettings] = useState({
        audio: false,
        darkMode: false,
        level: {
            tocfl1: true,
            tocfl2: false,
            tocfl3: false
        }
    });

    const value = { userSettings, setUserSettings };

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    );
}
