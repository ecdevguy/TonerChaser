import React, { useContext } from 'react';
import SettingsContext from '../context/settingsContext';
import { Box, Button, Divider, Typography } from '@mui/material';

export default function Character({ word, pinyin, OtherPinyin, level, firstTranslation, listItem }) {
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
        <Box>
            <Typography>{word}</Typography>
            <Typography>{pinyin}</Typography>
            <Typography>{OtherPinyin}</Typography>
            <Typography>{level}</Typography>
            <Typography>{firstTranslation}</Typography>
            {userSettings.audio && <Button onClick={playAudio}>Play Audio</Button>}
        </Box>
    );
}
