import React, { useContext } from 'react';
import SettingsContext from '../context/settingsContext';

export default function Character({ word, pinyin, otherPinyin, level }) {
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
            <span>{word}</span>
            <span>{pinyin}</span>
            <span>{otherPinyin}</span>
            <span>{level}</span>
            {userSettings.audio && <button onClick={playAudio}>Play Audio</button>}
        </div>
    );
}
