import React, { useContext } from 'react';
import SettingsContext from '../context/settingsContext';

export default function Settings() {
    const { userSettings, setUserSettings } = useContext(SettingsContext);

    const toggleAudioSetting = () => {
        setUserSettings(prevSettings => ({
            ...prevSettings,
            audio: !prevSettings.audio
        }));
    };

    return (
        <div>
          <h1>settings mode</h1>
            <label>
                <input
                    type="checkbox"
                    checked={userSettings.audio}
                    onChange={toggleAudioSetting}
                />
                Enable Audio
            </label>
        </div>
    );
}
