import React, { useContext } from 'react';
import SettingsContext from '../context/settingsContext';

export default function Character({ word, pinyin, OtherPinyin, level, firstTranslation }) {
    const { userSettings } = useContext(SettingsContext);

    const playAudio = () => {
        if (userSettings.audio) {
            fetch(`https://pinyin-word-api.vercel.app/api/audio/${word}`)
                .then(response => response.blob())
                .then(blob => {
                    const audioUrl = URL.createObjectURL(blob);
                    const audio = new Audio(audioUrl);
                    audio.play();
                })
                .catch(error => console.error('Error fetching audio:', error));
        }
    };

    return (
        <div>
            <h3>{word}</h3>
            <span>{pinyin}</span>
            <span>{OtherPinyin}</span>
            <span>{level}</span>
            <span>{firstTranslation}</span>
            {userSettings.audio && <button onClick={playAudio}>Play Audio</button>}
        </div>
    );
}
