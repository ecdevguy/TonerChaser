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
    const handleLevelChange = (event) => {
        const newLevel = event.target.value;
        setUserSettings(prevSettings => ({
            ...prevSettings,
            tocfl1: newLevel === 'tocfl1',
            tocfl2: newLevel === 'tocfl2',
            tocfl3: newLevel === 'tocfl3',
            tocfl4: newLevel === 'tocfl4',
            tocfl5: newLevel === 'tocfl5',
            tocfl6: newLevel === 'tocfl6',
            tocfl7: newLevel === 'tocfl7'
        }));
    };
    
    console.log(userSettings)
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
            <div>
                <label>
                    <input
                        type="radio"
                        name="level"
                        value="tocfl1"
                        checked={userSettings.tocfl1}
                        onChange={handleLevelChange}
                    />
                    TOCFL 1
                </label>
                <label>
                    <input
                        type="radio"
                        name="level"
                        value="tocfl2"
                        checked={userSettings.tocfl2}
                        onChange={handleLevelChange}
                    />
                    TOCFL 2
                </label>
                <label>
                    <input
                        type="radio"
                        name="level"
                        value="tocfl3"
                        checked={userSettings.tocfl3}
                        onChange={handleLevelChange}
                    />
                    TOCFL 3
                </label>
                <label>
                    <input
                        type="radio"
                        name="level"
                        value="tocfl4"
                        checked={userSettings.tocfl4}
                        onChange={handleLevelChange}
                    />
                    TOCFL 4
                </label>
                <label>
                    <input
                        type="radio"
                        name="level"
                        value="tocfl5"
                        checked={userSettings.tocfl5}
                        onChange={handleLevelChange}
                    />
                    TOCFL 5
                </label>
                <label>
                    <input
                        type="radio"
                        name="level"
                        value="tocfl6"
                        checked={userSettings.tocfl6}
                        onChange={handleLevelChange}
                    />
                    TOCFL 6
                </label>
                <label>
                    <input
                        type="radio"
                        name="level"
                        value="tocfl7"
                        checked={userSettings.tocfl7}
                        onChange={handleLevelChange}
                    />
                    TOCFL 7
                </label> 
            </div>
        </div>
    );
}
//copy radioboxes from list