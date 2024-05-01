import React, { useContext } from 'react';
import SettingsContext from '../context/settingsContext';
import { Box, Button, Divider, Typography } from '@mui/material';

export default function ListCharacter({ word, pinyin, OtherPinyin, level, firstTranslation }) {
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
        <Box display="flex">
            <Typography m={2}>{word}</Typography>
            <Divider orientation='vertical' flexItem/>
            <Typography m={2}>
                {firstTranslation.length > 35
                ? firstTranslation.slice(0, firstTranslation.substring(0, 35).lastIndexOf(" ")) + "..."
                : firstTranslation}
            </Typography>
        </Box>
    );
}
