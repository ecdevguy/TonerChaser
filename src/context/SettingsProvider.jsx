import React, { useState, useEffect } from 'react';
import SettingsContext from './settingsContext'; 

export default function SettingsProvider({ children }) {
    const [userSettings, setUserSettings] = useState(() => {
        const localSettings = localStorage.getItem('userSettings');
        return localSettings ? JSON.parse(localSettings) : {
            audio: false,
            darkMode: false,
            tocfl1: true,
            tocfl2: false,
            tocfl3: false
        };
    });

    useEffect(() => {
        localStorage.setItem('userSettings', JSON.stringify(userSettings));
    }, [userSettings]);

    const value = { userSettings, setUserSettings };

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    );
}
