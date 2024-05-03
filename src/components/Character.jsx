import React, { useContext } from 'react';
import SettingsContext from '../context/settingsContext';
import { Box, Button, Card, CardContent, Divider, IconButton, Typography } from '@mui/material';
import { Hearing, VolumeUp } from '@mui/icons-material';

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
        <Box >
            <Card sx={{ width:{xs: 290, sm: 340}, height:{xs: 320, sm: 300}, p: 1 }}>
                <CardContent>
                    <Typography variant='h3' sx={{display:"inline", marginBottom: 2}}>{word}</Typography>
                    {userSettings.audio && <IconButton aria-label="play audio" onClick={playAudio}><VolumeUp/></IconButton>}
                    <Typography variant='h5' sx={{marginBottom: 1}}>{pinyin}</Typography>
                    <Divider sx={{marginBottom: 2}}/>
                    {/* <Typography>{OtherPinyin}</Typography> */}
                    {/* <Typography>{level}</Typography> */}
                    <Typography variant='h6' fontWeight={300}>{firstTranslation}</Typography>
                </CardContent>
            </Card>
        </Box>
    );
}
