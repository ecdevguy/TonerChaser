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
        <Box display="flex" flexDirection="row" alignItems="center"
        gap={{xs: 1, sm: 2}}
        p={1}
        >
            <Typography variant='h5' sx={{minWidth:{xs: "30px", sm: "75px"}, fontFamily: "KaiTi"}}>{word}</Typography>
            <Divider orientation='vertical' flexItem/>
            <Typography variant='h6' fontWeight={300}>
                {firstTranslation.length > 35
                ? firstTranslation.slice(0, firstTranslation.substring(0, 35).lastIndexOf(" ")) + "..."
                : firstTranslation}
            </Typography>
        </Box>
    );
}
